import {
  amenity,
  serviceLocation,
  mobilePrivateNinety,
  mobilePrivateNinetySpecial,
  mobilePrivateSixty,
  mobilePrivateSixtySpecial,
  mobilePartnerNinety,
  mobilePartnerNinetySpecial,
  mobilePartnerSixty,
  mobilePartnerSixtySpecial
} from './index.js'
const json = [
  {
    "@context": "http://schema.org",
    "@type": "Service",
    "name": "Private Mobile Personal Training",
    "serviceType": "Health & Wellness",
    "category": "Mobile Fitness",
    "provider": amenity,
    "termsOfService": "https://amenity.fitness/terms-of-service",
    "description": "Our private personal training offers clients our undivided attention as we go through a personalized warmup, conditioning and cooldown. A one-on-one session provides our clients a greater opportunity to ask questions and receive technical feedback on exercise technique in the convenience of your home or shared fitness space. The most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority. Our service area is a seven kilometer radius from downtown Vancouver.",
    "serviceOutput": "Exercise prescription program",
    "alternateName": [
      "Private fitness class",
      "Private coaching",
      "1-on-1 personal training",
      "Fitness training",
      "Private workout",
      "Mobile private training",
      "In-home personal training",
      "At-home personal training",
      "Mobile personal training",
      "Mobile private coaching",
      "Private mobile personal training",
      "In-home workouts",
      "Outdoor personal training"
    ],
    "offers": [
      mobilePrivateSixty,
      mobilePrivateSixtySpecial,
      mobilePrivateNinety,
      mobilePrivateNinetySpecial
    ],
    "audience": {
      "@type": "PeopleAudience",
      "geographicArea": {
        "@type": "City",
        "name": "Vancouver"
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": serviceLocation
    }
  },

  {
    "@context": "http://schema.org",
    "@type": "Service",
    "name": "Partner Mobile Personal Training",
    "serviceType": "Health & Wellness",
    "category": "Mobile Fitness",
    "provider": amenity,
    "termsOfService": "https://amenity.fitness/terms-of-service",
    "description": "Our partner personal training offers clients the attention of a trainer as we go through a personalized warmup, conditioning and cooldown, so matching fitness levels will not be necessary. A partner session provides our clients a more cost-effective option while allowing for questions and feedback on exercise technique in the convenience of your home or shared fitness space. For each idividual, the most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority. Our service area is a seven kilometer radius from downtown Vancouver.",
    "serviceOutput": "Exercise prescription program for each client",
    "alternateName": [
      "Tandem personal training",
      "Partner coaching",
      "Partner fitness training",
      "Partner workout",
      "Mobile partner training",
      "In-home partner training",
      "At-home partner training",
      "Mobile partner workouts",
      "Mobile tandem personal training",
      "Mobile tandem coaching",
      "Outdoor partner training"
    ],
    "offers": [
      mobilePartnerSixty,
      mobilePartnerSixtySpecial,
      mobilePartnerNinety,
      mobilePartnerNinetySpecial
    ],
    "audience": {
      "@type": "PeopleAudience",
      "geographicArea": {
        "@type": "City",
        "name": "Vancouver"
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": serviceLocation
    }
  }
]
export default json