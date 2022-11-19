<template>
  <div>
    <h1>Rates</h1>
    <div v-for="service in services" :key="service.name" class="w-full p-4 space-y-1">
      <h2>{{service.name}}</h2>
      <div v-for="offer in service.offers" :key="offer.name" class="bg-gray-800 px-4 py-2 rounded">
        <h4>{{offer.name}}</h4>
        <p>{{ offer.duration }}: ${{ offer.price }}.00 CAD</p>
        <p>12 Sessions: ${{ offer.price * 12 * 0.95 }}.00 CAD (5% savings)</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    services: [
      {
        name: 'Studio',
        description: 'Currently opperating out of Vancouver personal training studio, The Program, we\'re excited to work with industry leading equipment in a safe, professional environment; Wheelchair accessible and conveniently located at Gore St. & Union St. next to bike lanes and bus stops',
        offers: [
          {
            name: '1-on-1 Training',
            price: 90,
            duration: '60 min. Session'
          },
          {
            name: 'Partner Training',
            price: 50,
            duration: '60 min. Session'
          },
          {
            name: 'Group Training',
            price: 40,
            duration: '60 min. Session'
          },
        ],
      },
      {
        name: 'Mobile',
        description: 'We provide Mobile Personal Training for effective exercise solutions at home or a shared recreational space. Our primary service location is 3 kilometers from Downtown Vancouver, while our secondary service location is 7 kilometers (additional $50 travel charge)',
        offers: [
          {
            name: '1-on-1 Training',
            price: 150,
            duration: '60 min. Session'
          },
          {
            name: '1-on-1 Training',
            price: 180,
            duration: '90 min. Session'
          },
          {
            name: 'Partner Training',
            price: 75,
            duration: '60 min. Session'
          },
          {
            name: 'Partner Training',
            price: 90,
            duration: '90 min. Session'
          }
        ],
      },
      {
        name: 'Remote',
        description: 'Get your questions answered with a remote visit from our Personal Trainers. Remote sessions allow us to reach clients outside our service location for program design, techincal feedback, and general inqueries',
        offers: [
          {
            name: 'Online Check-in',
            price: 60,
            duration: '30 min. Session'
          },
        ]
      }
    ]
  })
}
</script>
<style scoped>
h1 {
  @apply text-transparent bg-clip-text text-2xl
  bg-gradient-to-t from-orange-200 to-sky-300 p-4 pb-0
}
h2 {
  @apply text-xl pb-1
}
h4 {
  @apply font-bold
}
</style>