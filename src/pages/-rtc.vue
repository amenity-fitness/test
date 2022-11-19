<template>
  <div>
    room: {{ roomId }}
    <video class="w-80 h-80" id="remoteVideo" autoplay muted/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Spark: Online Video Call'
  }),
  data: () => ({
    candidates: [],
    configuration: {
      iceServers:[
        {
          urls: [
            "turn:173.194.72.127:19305?transport=udp",
            "turn:[2404:6800:4008:C01::7F]:19305?transport=udp",
            "turn:173.194.72.127:443?transport=tcp",
            "turn:[2404:6800:4008:C01::7F]:443?transport=tcp"
          ],
          username:"CKjCuLwFEgahxNRjuTAYzc/s6OMT",
          credential:"u1SQDR/SQsPQIxXNWQT7czc/G4c="
        },
        {
          urls:["stun:stun.l.google.com:19302"]}
      ]
    },
    dc: null,
    pc: null,
    remoteChannel: null,
    roomId: null
  }),
  asyncData({route}) {
    const { query } = route,
    { uid } = query
    return { roomId: uid }
  },
  async mounted() {
    const { $rdb, auth, roomId } = this,
    { idToken } = auth
    $rdb.defaults.params = { auth: idToken }
    if (!!window.EventSource) {
      if (roomId) {
        await this.initPC(false)
        this.handleEvents({ host: false })
      } else {
        await this.initPC(true)
        await this.createRoom()
        this.handleEvents({ host: true })
      }
    }
  },
  computed: {
    ...mapState('auth', ['auth']),
  },
  methods: {
    addListeners() {
      const { pc, dc } = this
      pc.addEventListener('connectionstatechange', (e) => {
        if (e.target['connectionState'] == 'connected'
          && dc) {
            
          dc.onmessage = (event) => {
            console.log(`received: ${event.data}`);
          }
    
          dc.onopen = () => {
            this.dc.send('Hi you!');
            console.log("datachannel open");
          }
    
          dc.onclose = () => {
            console.log("datachannel close");
          }
        }
      })

      pc.addEventListener('datachannel', (e) => {
        const remoteChannel = e.channel
        remoteChannel.binaryType = 'arraybuffer'
        remoteChannel.addEventListener('message', ({ data }) => {
          console.log(data)
        })
        this.remoteChannel = remoteChannel
      })
      pc.addEventListener('icecandidate', async event => {
        if (event.candidate) {
          switch (true) {
            case !!this.roomId:
              await this.$rdb({
                method: 'POST',
                url: `/${this.roomId}/guest_candidates/ice.json`,
                data: event.candidate
              })
              break
            case this.roomId:
              await this.$rdb({
                method: 'POST',
                url: `/${this.roomId}/host_candidates/ice.json`,
                data: event.candidate
              })
              break
            case !this.roomId:
              return this.candidates.push(event.candidate)
          }
        }
      })
      pc.addEventListener('oniceclient', (e) => console.log(e))
      pc.addEventListener('onnegationneeded', (e) => console.log(e))
      pc.addEventListener('track', (e) => {
        const [remoteStream] = e.streams
        document.getElementById('remoteVideo').srcObject = remoteStream
      })
    },
    async clientSetup({ offer }) {
      const { pc, roomId } = this
      this.dc = pc.createDataChannel(roomId)
      pc.setRemoteDescription(new RTCSessionDescription(offer))
      const answer = await pc.createAnswer()
      pc.setLocalDescription(answer)
      const res = await this.$rdb({
        method: 'PATCH',
        url: `/${ roomId }.json`,
        data: {
          guest_candidates: {
            answer
          }
        }
      })
    },
    async connectClient({ answer }) {
      const { pc, candidates, roomId } = this,
      remoteDesc = new RTCSessionDescription(answer)
      await pc.setRemoteDescription(remoteDesc)
      if (candidates.length) {
        candidates
          .forEach(candidate => {
            this.$rdb({
              method: 'POST',
              url: `/${ roomId }/host_candidates/ice.json`,
              data: candidate
            })
          })
      }
    },
    async createRoom() {
      const { pc } = this,
      offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      const res = await this.$rdb({
        method: 'POST',
        url: '/.json',
        data: {
          host_candidates: {
            offer
          }
        }
      })
      const { name } = res.data
      this.roomId = name
    },
    handleEvents({ host }) {
      const { auth, roomId, pc, $rdb, dc } = this,
      { idToken } = auth,
      { baseURL } = $rdb.defaults,
      col = !!host
        ? `${ roomId }/guest_candidates.json`
        : `${ roomId }/host_candidates.json`
      const source = new EventSource(`${ baseURL }/${col}?auth=${idToken}`)
      source.addEventListener('put', async (e) => {
        const { data } = JSON.parse(e.data)
        if (data) {
          const keys = Object.keys(data)
          console.log(keys)
          switch (true) {
            case keys.includes('offer'):
              await this.clientSetup(data)
              break
            case keys.includes('answer'):
              await this.connectClient(data)
              break
            case keys.includes('candidate'):
              await pc.addIceCandidate(data)
          }
        }
      }, false)
    },
    async initPC(host) {
      const { configuration } = this
      const pc = new RTCPeerConnection(configuration)
      this.pc = pc
      if ( host ) {
        this.dc = pc.createDataChannel('123')
      }
      await this.startVideo()
      await this.addListeners()
    },
    async startVideo() {
      const { pc } = this,
      constraints = { audio: true, video: true },
      stream = await navigator
        .mediaDevices.getUserMedia(constraints)
      stream.getTracks()
        .forEach(track => {
          pc.addTrack(track, stream)
        })
    }
  }
}
</script>