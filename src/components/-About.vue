<template>
<div>
  <section>    
    <img src="http://www.macleans.ca/wp-content/uploads/2013/09/MAC37_BODYBREAK01.jpg" alt="">
    <span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </span>
  </section>
</div>
</template>
<script>
export default {
  data: () => ({
    title: 'The Bodies Behind Our Business',
    description: 'Founders Katey Milton and Paul Elliott blend tradition with technology in their approach to personal training and program design to help Canadians realize the benefits of leading an active lifestyle. They wish to help Canadians of all ages and abilities realize the benefits of living an active lifestyle through engaging, and specific physical activity appropriate for the individual.'
  })
}
</script>
<style scoped>
img {
  @apply object-cover rounded-lg grow
}
section {
  @apply p-4 h-full
  bg-foreground rounded-xl 
  flex flex-col
}
span {
  @apply flex flex-col justify-center shrink space-y-2 mt-4
}
div {
  @apply h-full
}
</style>