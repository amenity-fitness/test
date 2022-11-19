<template>
  <li itemprop="amenityFeature" itemscope itemtype="https://schema.org/LocationFeatureSpecification">
    <span itemprop="name">{{ value }}</span>
    <meta itemprop="value" content="True">
  </li>
</template>
<script>
export default {
  props: ['value']
}
</script>