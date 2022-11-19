<template>
<div v-if="intro" class="grow flex flex-col justify-center items-center p-2">
  <div class="w-full max-w-2xl">
    <!-- <div v-if="hash == i"> -->
    <div>
      <h1>Client Information</h1>
      <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
        <!-- <h4 class="pb-2 font-semibold">Please answer the following questions based on what you do in a typical week</h4> -->
        <div class="flex flex-col">
          <div class="pb-2">
            <input @input="checkbox = !checkbox" type="checkbox" id="checkbox">
            <label for="checkbox">Compare results against age-matched norms of the same sex?</label>
          </div>
          <Button-Toggle
            v-if="checkbox"
            :value="female ? 'Female' : 'Male'"
            @input="female = !female"
          />
          <Select-DOB
            ref="dob"
            @input="dob = $event.value"
            :value="dob"
            id="dob"
          />
          <Floating-Select
            :value="ethnicity"
            @input="ethnicity = $event.value"
            :options="ethnicities"
            :data="{ id: 'ethnicity' }"
            :label="'Ethnicity'"
            :key="33"
          />
          <Floating-Input
            v-model="weight"
            :data="{ label: 'Weight (nearest 0.1 kg)', id: 'weight', number: true }"/>
          <Floating-Input
            v-model="height"
            :data="{ label: 'Height (nearest 0.5 cm)', id: 'height', number: true }"/>
          <Floating-Input
            v-model="wc"
            :data="{ label: 'Waist Circumference (nearest 0.5 cm)', id: 'wc', number: true }"/>
          <Floating-Select
            :value="finalStage"
            @input="finalStage = $event.id"
            :object="true"
            :options="female ? stagesF : stagesM"
            :label="'Final mCAFT Stage'"
            :id="'mcaft'"
            :key="123"
          />
        </div>
        <footer class="flex flex-row-reverse pt-4">
          <button @click="intro = !intro">Next</button>
        </footer>
      </div>
    </div>
  </div>
</div>
<div v-else class="grow flex flex-col justify-center items-center p-2">
  <div v-for="(assess, i) in assessments" :key="assess.name" class="w-full max-w-2xl">
    <div v-show="hash == i">
      <h1>{{ assess.name }}</h1>
      <div class="bg-white dark:bg-gray-600 rounded-lg p-4">
        <div class="flex flex-col">
          <ul>
            <li v-for="i in assess.introduction" :key="i">
              <p>
                - {{ i }}
              </p>
            </li>
          </ul>
          <div>
            <h2>Notes</h2>
            <ul>
              <li v-for="note in assess.notes" :key="note">
                <p>
                  - {{ note }}
                </p>
              </li>
            </ul>
          </div>
          <div
            v-for="(trial, n) in assess.trials"
            :key="'trial' + n"
            class="flex">
            <div
              class="grow"
              v-for="(input, nn) in trial"
              :key="'input' + nn">
              <Floating-Input
                :value="musculoskeletal[assess.id][input.data][n]"
                @input="musculoskeletal[assess.id][input.data].splice(n, 1, $event)"
                :data="{ label: input.label, id: assess.id + 'trial' + n + nn, number: input.number }"/>
            </div>
          </div>
        </div>
        <footer class="flex flex-row-reverse pt-4">
          <button v-if="hash < 5" @click="increment">Increment</button>
          <button-action v-else :loading="loading" :text="'Submit'" @click="submit" />
          <button v-if="hash > 0" @click="decrement">Decrement</button>
          <button v-else @click="intro = !intro">Back</button>
        </footer>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Client Fitness Assessment',
  }),
  async asyncData({route, store}) {
    const { query } = route,
    { uid } = query,
    { state } = store,
    { user } = state,
    { localId } = user
    return { uid: uid || localId }
  },
  data: () => ({
    checkbox: false,
    loading: false,
    intro: true,
    dob: null,
    ethnicities: [
      'european',
      'sub-saharan african',
      'eastern mediterranean',
      'middle eastern',
      'south asian',
      'japanese',
      'chinese',
      'malasian',
      'indian',
      'south american',
      'central american'
    ],
    female: true,
    height: null,
    weight: null,
    ethnicity: null,
    wc: null,
    finalStage: null,
    stagesM: [
      {
        id: '15.9',
        name: 'Stage 1'
      },
      {
        id: '18.0',
        name: 'Stage 2'
      },
      {
        id: '22.0',
        name: 'Stage 3'
      },
      {
        id: '24.5',
        name: 'Stage 4'
      },
      {
        id: '29.5',
        name: 'Stage 5'
      },
      {
        id: '33.6',
        name: 'Stage 6'
      },
      {
        id: '36.2',
        name: 'Stage 7'
      },
      {
        id: '40.1',
        name: 'Stage 8'
      },
    ],
    stagesF: [
      {
        id: '15.9',
        name: 'Stage 1'
      },
      {
        id: '18.0',
        name: 'Stage 2'
      },
      {
        id: '22.0',
        name: 'Stage 3'
      },
      {
        id: '24.5',
        name: 'Stage 4'
      },
      {
        id: '26.3',
        name: 'Stage 5'
      },
      {
        id: '29.5',
        name: 'Stage 6'
      },
      {
        id: '33.6',
        name: 'Stage 7'
      },
      {
        id: '36.2',
        name: 'Stage 8'
      },
    ],
    assessments: [
      {
        id: 'gripStrength',
        name: 'Grip Strength',
        trials: [
          [
            {
              label: 'Right: Trial 1',
              data: 'right',
              number: true
            },
            {
              label: 'Left: Trial 1',
              data: 'left',
              number: true
            }
          ],
          [
            {
              label: 'Right: Trial 2',
              data: 'right',
              number: true
            },
            {
              label: 'Left: Trial 2',
              data: 'left',
              number: true
            }
          ]
        ],
        introduction: [
          'Direct measure of isometric strength',
          'Indirect measure of total body strength',
          'Predictive of limitations and disability later in life'
        ],
        notes: [
          'Place a marker on the wall and have the client concentrate on it and exhale as they squeeze',
          'Neither the hand nor the dynamometer should touch the body or any other object',
          'Measure each hand twice, alternating hands. Record the scores to the nearest kilogram'
        ]
      },
      {
        id: 'pushUp',
        name: 'Max Push-Up',
        trials: [
          [
            {
              label: 'Total Repetitions',
              data: 'total',
              number: true
            }
          ]
        ],
        introduction: [
          'Measure of muscular endurance (chest, shoulders and arms)',
          'Muscular endurance is important in the performance of everyday tasks, such as carrying groceries and shoveling snow'
        ],
        notes: [
          'Starting position is with chin to the mat. Stomach and thighs do not touch the mat',
          'Have the client perform 1 or 2 reps to check for proper technique before beginning',
          'Stop the test if the client feels any pain or discomfort, appears to strain forcibly or is unable to maintain the proper technique over 2 consecutive reps. Do not count reps with improper technique',
          'Remind the client to exhale during the upward phase of the push-up and to avoid holding their breath'
        ]
      },
      {
        id: 'sitReach',
        name: 'Sit & Reach',
        trials: [
          [
            {
              label: 'Trial 1 (nearest 0.5 cm)',
              data: 'trials',
              number: true
            }
          ],
          [
            {
              label: 'Trial 2 (nearest 0.5 cm)',
              data: 'trials',
              number: true
            }
          ]
        ],
        introduction: [
          'The most common way to measure lower back and hamstring flexibility',
          'Considered a valid and reliable measure of general flexibility',
          'Tightness in the hamstrings and the lower back is also an indicator of current poor back health',
          'Reduced flexibility may limit one’s ability to perform activities of daily living (shorter stride length, slower walking speeds), leading to loss of independence'
        ],
        notes: [
          'Warm-up by performing the modified hurdler stretch for 20 seconds twice on each leg, alternating legs',
          'Position the ruler at the 26cm mark where the feet are placed without shoes on. The inner edge of the feet are 6 inches apart',
          'With palms down and one hand over the other, the maximum flexion position must be held for approximately 2 seconds',
          'If the knees bend the trial is not counted. Do not allow the client to use a bouncing or jerking motion',
          'If the client is unable to reach the mark on the ruler, measure the distance from the fingertips to the 0 mark'
        ]
      },
      {
        id: 'legPower',
        name: 'Vertical Jump',
        trials: [
          [
            {
              label: 'Trial 1 (nearest 0.5 cm)',
              data: 'trials',
              number: true
            },
            {
              label: 'Standing Reach (nearest 0.5 cm)',
              data: 'standingReach',
              number: true
            },
          ],
          [
            {
              label: 'Trial 2 (nearest 0.5 cm)',
              data: 'trials',
              number: true
            }
          ],
          [
            {
              label: 'Trial 3 (nearest 0.5 cm)',
              data: 'trials',
              number: true
            }
          ]
        ],
        introduction: [
          'A measure of peak leg power (ability to contract leg muscles with speed and force in one explosive action)',
          'An important factor for functional capacity and independent living, especially as one ages'
        ],
        notes: [
          'Feet flat on the floor to start. No run up, step up, or pre-jump is permitted',
          'Have the client pause 1-2 seconds in the semi-squat position and then concentrate on the tape as they jump as high as possible',
          'Allow a rest period of 10-15 seconds between trials'
        ]
      },
      {
        id: 'backExtension',
        name: 'Back Extension',
        trials: [
          [
            {
              label: 'Total Duration (seconds)',
              data: 'trials',
              number: true
            }
          ]
        ],
        introduction: [
          'A measure of the isometric endurance of the trunk extensor muscles',
          'Lower back pain is a significant public health concern',
          'Evidence suggests that good isometric trunk endurance may help to prevent lower back pain'
        ],
        notes: [
          'Ask the client to lie face down and perform a single straight-leg extension with each leg, followed by the same straight-leg extension combined with an extension of the opposite arm - If there is discomfort or pain, the test should not be done',
          'Hold the lower thighs or upper calves. Do not straddle the client or hold the ankles',
          'Terminate the test if the client experiences pain discomfort or fatigue, if their torso drops below the horizontal (allow for 1 warning and adjustment), or reaches a maximum time of 180 seconds',
          'Help the client off the step and lie on their back with both knees bent for 1 minute (relaxing the back muscles)'
        ]
      },
      {
        id: 'balance',
        name: 'One-Leg Stance',
        trials: [
          [
            {
              label: 'Left: Eyes Open',
              data: 'open',
              number: true
            },
            {
              label: 'Left: Eyes Closed',
              data: 'closed',
              number: true
            }
          ],
          [
            {
              label: 'Right: Eyes Open',
              data: 'open',
              number: true
            },
            {
              label: 'Right: Eyes Closed',
              data: 'closed',
              number: true
            }
          ]
        ],
        introduction: [
          'A simple, valid and reliable method to assess balance including balance impairments, particularly in the older adult population',
          'Balancing on one leg requires balance, leg strength, and integration of visual and inner ear signals and receptors in the muscles and joints',
          'Transient balancing on a single limb is essential for normal gait and is critical for activities of daily living such as turning, stair climbing and dressing',
          'Test results of < 5 seconds put one at twice the risk of incurring an injurious fall'
        ],
        notes: [
          'Have the client stand barefoot next to a sturdy chair for safety, with arms crossed in front of the chest',
          'Ask the client to focus on a marker on the wall at eye level. Time commences when the foot is raised and lasts up to 45 seconds',
          'If the client loses balance in the first 3 seconds of the eyes-closed test, allow a second try to allow for potential set-up error',
        ]
      },
    ],
    hash: 0,
    musculoskeletal: {
      backExtension: {
        total: []
      },
      gripStrength: {
        left: [],
        right: []
      },
      pushUp: {
        total: []
      },
      sitReach: {
        trials: []
      },
      legPower: {
        standingReach: [],
        trials: []
      },
      backExtension: {
        trials: []
      },
      balance: {
        open: [],
        closed: []
      }
    },
  }),
  methods: {
    ...mapActions(['handleSuccess', 'handleError']),
    ...mapActions('db', ['dbCreate']),
    decrement() {
      if (!this.hash || this.hash == 0) {
      } else {
        this.hash--
        this.setHash(this.hash)
      }
    },
    increment() {
      this.hash++
      this.setHash(this.hash)
    },
    setHash(val) {
      if (val) {
        window.location.hash = val
      } else {
        window.location.hash = '0'
        window.history.replaceState("", "", window.location.pathname)
      }
    },
   async submit() {
      try {
        this.loading = true
        const data = {
          date: new Date().toISOString(),
          ...this.predictedVo2,
          ...this.formattedHBR,
          ...this.profile,
        },
        { uid } = this,
        result = await this.dbCreate({
          url: `documents/users/${ uid }/assessments`,
          collectionId: 'assessments',
          parent: `projects/amenity-fitness/databases/(default)/documents/users/${ uid }`,
          data
        })
        console.log(result)
        this.$router.push(`/assessment-results?uid=${ uid }&status=success&message=success`)
      } catch (err) {
        this.loading = false
        console.log(err)
      }
    }
  },
  computed: {
    profile () {
      const { checkbox, female, ethnicity, weight, height, wc, age } = this
      return {
        female: !checkbox ? null : female,
        age,
        ethnicity,
        weight,
        height,
        wc
      }
    },
    age() {
      const { dob } = this
      if (dob) {
        return ((new Date() - new Date(dob)) / 31556952000).toFixed(0)
      } 
    },
    predictedVo2() {
      const { finalStage, weight, age } = this
      return {
        vo2: (17.2 + (1.29 * parseFloat(finalStage)) - (0.09 * weight) - (0.18 * age))
          .toFixed(1)
      }
    },
    formattedHBR () {
      const max = (num) => {
        return Math.max.apply(null, num)
      },
      { gripStrength, backExtension, legPower, balance, pushUp, sitReach } = this.musculoskeletal
      return {
        musculoskeletal: {
          backExtension: max(backExtension.trials),
          gripStrength: max(gripStrength.left) + max(gripStrength.right),
          pushUp: max(pushUp.total),
          sitReach: max(sitReach.trials),
          legPower: max(legPower.trials) - max(legPower.standingReach),
          balance: {
            open: max(balance.open),
            closed: max(balance.closed)
          }
        }
      }
    }
  },
  watch: {
    $route({ hash }) {
      this.hash = hash.split('#')[1]
    },
  }
}
</script>
<style scoped>
h1 {
  @apply mx-auto w-full text-center pb-4 text-3xl text-violet-50
}
h2 {
  @apply text-gray-700 dark:text-violet-100
}
p {
  @apply text-sm
}
ul {
  @apply space-y-1 py-1
}
button {
  @apply bg-green-500/50 ml-2
}
</style>