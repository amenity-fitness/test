<template>
  <div itemscope itemtype="https://schema.org/Place">
    <!-- <h1>
      <span itemprop="name">The Program Fitness Studio</span>
    </h1>
    <span itemprop="description">
      A beautifully located private fitness studio right in Vancouver Chinatown.
      <br>
      Work out 1-on-1, or in a group up to 12 people.
    </span> -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ul class="pl-2 space-y-1">
        <h3>
          Studio Features:
        </h3>
        <Amenity-Feature v-for="feature in features" :value="feature" :key="feature" class="rounded-lg shadow text-center p-2 bg-foremost"/>
      </ul>
      <div class="flex justify-between flex-col">
        <div class="pl-4 md:pl-8 mt-1 md:mt-10">
          <h3>The Program Fitness</h3>
          <p>747 Gore Avenue, V6A 2Z9</p>
          <p>Vancouver, British Columbia</p>
        </div>
        <!-- <div class="flex items-end justify-end pr-4"> -->
        <footer>
          <a href="https://maps.google.com/?daddr=747%20Gore%20Avenue%20Vancouver" target="_blank">
            <button>
              Get Directions
            </button>
          </a>
        </footer>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    features: [
      "Towel Service",
      "Private Showers",
      "Clean & Bright Space",
      "Professional Environment",
      "Accessible To Mobility Devices",
      "Street Parking Available"
    ]
  })
}
</script>