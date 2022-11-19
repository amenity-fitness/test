<template>
<div class="relative container">
  <div class="h-full pb-10">
    <img :src="data.url">
    <h2>
      <span>
        {{ data.firstName }}
      </span>
      {{ data.familyName }},
      <span>{{ data.shortTitle }}</span>
    </h2>
    <h4>{{ data.longTitle }}</h4>
    <p>{{ data.accreditor }}</p>
    <p v-if="data.postSecondary">{{ data.postSecondary }}</p>
    <p>CPR & AED First Aid</p>
    <p>Vancouver, British Columbia</p>
    <p>
      <span>Canada</span>
    </p>
  </div>
  <span class="absolute bottom-4 text-center w-full">
    <div class="relative w-full">
      <div class="absolute relative w-full">
        <div v-show="showCopy" class="absolute bottom-4 w-full">
          <div class="w-fit mx-auto flex flex-col items-center">
            <div class="text-sm bg-emerald-600 p-2 rounded">Copied To Clipboard</div>
            <div class="border-t-emerald-600 border-transparent border-8 w-0"></div>
          </div>
        </div>
        <h4 :id="data.firstName" class="flex items-center justify-center">
          {{ data.firstName }}@Amenity.Fitness
          <button class="ml-2 w-8 p-1 border" @click="copyClipboard">
            <img class="m-0" :src="require('~/assets/svg/clipboard.svg')" alt="">
          </button>
        </h4>
      </div>
    </div>
  </span>
</div>
</template>
<script>
export default {
  props: ['data'],
  data: () => ({
    showCopy: false
  }),
  methods: {
    async copyClipboard (evt) {
      const { innerText, id } = evt.target
      navigator.clipboard.writeText(innerText);
      this.showCopy = true
      setTimeout(() => this.showCopy = false, 2000)
    }
  }
}
</script>
<style scoped>
img[src$=".jpg"] {
  @apply rounded-3xl shadow-md w-full mb-3;
}
</style>