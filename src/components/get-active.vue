<template>
  <div v-if="!completed">
    <div v-for="(ques, i) in questions" :key="i">
      <div v-if="counter == i" class="space-y-2">
        <h4>
          {{ ques }}
        </h4>
        <div class="flex justify-around">
          <div>
            <input :checked="form[i] == 'yes'" @input="form[i] ? form.splice(counter, 1, $event.target.id) : form.splice(counter, 0, $event.target.id)" type="radio" :id="'yes'" name="question">
            <label :for="'yes'">Yes</label>
          </div>
          <div>
            <input :checked="form[i] == 'no'" @input="form[i] ? form.splice(counter, 1, $event.target.id) : form.splice(counter, 0, $event.target.id)" type="radio" :id="'no'" name="question">
            <label :for="'no'">No</label>
          </div>
        </div>
      </div>
    </div>
    <footer class="flex flex-row-reverse p-2">
      <div>
        <button :disabled="counter == 0" @click="counter--" depressed>Prev</button>
        <button v-if="counter !== (questions.length - 1)" :disabled="!form[counter]" @click="counter++" depressed>Next</button>
        <button v-else :disabled="!form[counter]" depressed @click="$emit('submit', form)">Submit</button>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  layout: 'app',
  props: ['questions'],
  data: () => ({
    completed: false,
    form: [],
    counter: 0
  }),
}
</script>
<style scoped>
button:disabled {
  @apply text-gray-500
}
</style>