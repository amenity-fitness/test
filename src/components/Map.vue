<template>
  <div id="map" ref="map"/>
</template>
<script>
import { Loader } from "@googlemaps/js-api-loader"
export default {
  mounted () {
    const loader = new Loader({
      apiKey: this.$config['mapsKey'],
      version: "weekly",
    });

    loader.load().then(() => {
      this.createMap()
    });
  },
  methods: {
    createMap() {
      const lat = 49.2819181
      const lng = -123.1185109
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat, lng},
        zoom: 11
      });
      new google.maps.Circle({
        map,
        strokeColor: "#000000",
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: "#000000",
        fillOpacity: 0.125,
        center: new google.maps.LatLng(lat, lng),
        radius: 4 * 1000,
      });
      new google.maps.Circle({
        map,
        strokeColor: "#000000",
        strokeOpacity: 0.4,
        strokeWeight: 2,
        fillColor: "#000000",
        fillOpacity: 0.125,
        center: new google.maps.LatLng(lat, lng),
        radius: 7 * 1000,
      });
    },
  }
}
</script>
<style scoped>
  #map {
    @apply aspect-[3/2] w-full rounded-lg shadow
  }
</style>