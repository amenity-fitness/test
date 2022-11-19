<template>
  <footer>
    <Subscribe
      @submit="$emit('submit', $event)"
      @error="$emit('error', $event)"/>
    <Acknowledgement/>
    <span>
      Amenity: Lifestyle & Fitness Inc. Copyright {{ year }}
    </span>
  </footer>
</template>

<script>
export default {
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
ul {
  @apply p-4 w-full
}
footer {
  @apply flex flex-col mx-auto bg-foreground rounded-t-xl shadow-2xl max-w-4xl
}
span {
  @apply border-t mx-2 text-xs text-center py-4
}
svg {
  @apply mx-auto h-10 my-2 xl:h-16 xl:my-4;
}
</style>