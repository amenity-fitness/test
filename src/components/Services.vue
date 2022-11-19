<template>
  <section>
    <h1 class="title pl-3">
      Services
    </h1>
    <Service 
      v-for="(service, i) in services"
      :service="service"
      :key="i"/>
  </section>
</template>
<script>
export default {
  props: ['services']
}
</script>