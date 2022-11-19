<template>
  <nav class="not-prose lg:hidden space-y-2 bg-black/20 p-3 pb-4 my-4 rounded-lg">
    <h1>Navigation</h1>
    <a
      class="block text-sm text-inherit"
      v-for="link in toc"
      :key="link.id"
      :href="'#' + link.id">
      {{ link.text }}
    </a>
  </nav>
</template>
<script>
export default {
  props: ['toc']
}
</script>