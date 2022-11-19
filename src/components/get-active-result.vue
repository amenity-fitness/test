<template>
<div class="p-2">
  <div v-for="(item, i) in items" :key="i">
    <div v-if="counter == i" class="space-y-2">
      <h4>
        <span class="text-lg font-bold">
          Have you experienced ANY of the following within the past six months?
        </span>
        <span class="italic">
          {{ item.question }}
        </span>
      </h4>
      <div>
        <div class="bg-gray-700 rounded p-2">
          <p class="text-cyan-100">
            {{ item.response}}
          </p>
        </div>
      </div>
    </div>
  </div>
  <footer class="flex flex-row-reverse p-2">
      <div>
        <button :disabled="counter == 0" @click="counter--">Prev</button>
        <button v-if="counter !== (questions.length - 1)" :disabled="!form[counter]" @click="counter++">Next</button>
        <button v-else :disabled="!form[counter]" @click="">Submit</button>
      </div>
    </footer>
</div>
</template>
<script>
export default {
  props: ['form', 'questions', 'reference'],
  data: () => ({
    counter: 0,
    dialog: false
  }),
  methods: {
    increment(elmnt) {

    },
    decrement() {

    },
    reset() {

    }
  },
  computed: {
    items() {
      let items = []
      this.form.forEach((item, i) => {
        if (item == 'yes') {
          items.push({
            question: this.questions[i],
            response: this.reference[i]
          })
        }
      })
      return items
    }
  }
}
</script>
<style scoped>
button:disabled {
  @apply text-gray-500
}
</style>