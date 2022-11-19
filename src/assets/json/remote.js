import {
  amenity,
  // serviceLocation,
  remotePrivateThirty,
  remotePrivateThirtySpecial

} from './index.js'
const json = [
  {
    "@context": "http://schema.org",
    "@type": "Service",
    "name": "Remote Personal Training",
    "serviceType": "Health & Wellness",
    "category": "Fitness Studios",
    "provider": amenity,
    "termsOfService": "https://amenity.fitness/terms-of-service",
    "description": "Our Online Personal Training session provides our clients the ability to discuss the details of a personalized exercise prescription. Our undivided attention allows for a greater opportunity to ask questions and receive feedback (including exercise technique you have pre-recorded) over a web-based video call. The most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority. If there are geographical constraints and we are unable to perform the protocol for determining all of the Health Benefit Ratings, we have additional tools that can assist in individualizing the exercise prescription, including: areas of behaviour change in physical activity and sedentary behaviour, relapse planning, and nationally recognized resources on nutritious foods and food preparation skills.",
    "serviceOutput": "Exercise prescription program",
    "alternateName": [
      "Private Fitness Class",
      "Private Coaching",
      "Studio Personal Training",
      "1-on-1 Personal Training",
      "Fitness Training",
      "Private Workout",
      "Remote personal training",
      "Online personal training",
      "Remote training",
      "Online training",
      "Online training program",
      "Online workout program",
      "Online one-on-one training",
      "Remote workout",
      "Online workout",
      "Online trainer"
    ],
    "offers": [
      remotePrivateThirty,
      remotePrivateThirtySpecial
    ],
    "audience": {
      "@type": "PeopleAudience",
      "geographicArea": {
        "@type": "Country",
        "name": "CA"
      }
    },
    // "availableChannel": {
    //   "@type": "ServiceChannel",
    //   "serviceLocation": serviceLocation
    // }
  }
]
export default json