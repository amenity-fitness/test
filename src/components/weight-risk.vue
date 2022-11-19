<template>
  <ul>
    <li
      class="bg-foremost p-3 rounded-lg shadow" 
      v-for="risk in risks" :key="risk">{{ risk }}</li>
  </ul>
</template>
<script>
export default {
  props: ['risks']
}
</script>