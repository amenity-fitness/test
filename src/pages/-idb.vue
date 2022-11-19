<template>
<div>
  <div v-for="(doc) in docs" :key="doc.id">{{ doc.id }}: {{ doc.val }}</div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data: () => ({
    docs: []
  }),
  async mounted() {
    await this.initDB()
    this.docs = await this.getDocs()
  },
  methods: {
    ...mapActions('idb', ['initDB', 'getDocs', 'setDB'])
  }
}
</script>