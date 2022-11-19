import {
  amenity,
  location,
  studioPrivateSixty,
  studioPartnerSixty,
  studioGroupSixty,
  studioPrivateSixtySpecial,
  studioPartnerSixtySpecial,
  studioGroupSixtySpecial
} from './index.js'
const json = [
  {
    "@context": "http://schema.org",
    "@type": "Service",
    "name": "Private Personal Training",
    "serviceType": "Health & Wellness",
    "category": "Fitness Studios",
    "provider": amenity,
    "termsOfService": "https://amenity.fitness/terms-of-service",
    "description": "Our private personal training offers clients our undivided attention as we go through a personalized warmup, conditioning and cooldown. A one-on-one experience allows our clients a greater opportunity to ask questions and receive technical feedback on exercise technique in a private and professional setting. The most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority.",
    "serviceOutput": "Exercise prescription program",
    "alternateName": [
      "Private Fitness Class",
      "Private Coaching",
      "Studio Personal Training",
      "1-on-1 Personal Training",
      "Fitness Training",
      "Private Workout"
    ],
    "offers": [
      studioPrivateSixty,
      studioPrivateSixtySpecial
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
      "serviceLocation": location
    }
  },

  {
    "@context": "http://schema.org",
    "@type": "Service",
    "name": "Partner Personal Training",
    "serviceType": "Health & Wellness",
    "category": "Fitness Studios",
    "provider": amenity,
    "termsOfService": "https://amenity.fitness/terms-of-service",
    "description": "Our partner personal training offers clients the attention of a trainer as we go through a personalized warmup, conditioning and cooldown, so matching fitness levels will not be necessary. A partner session provides our clients a more cost-effective option while allowing for questions and feedback on exercise technique in a private and professional setting. For each idividual, the most effective fitness program will come after an initial fitness assessment where we are able to identify goals and areas of priority.",
    "alternateName": [
      "Tandem Personal Training",
      "Partner Coaching",
      "Partner Workout",
      "Partner Fitness Training",
      "Partner Fitness Classes"
    ],
    "serviceOutput": "Exercise prescription program for each client",
    "offers": [
      studioPartnerSixty,
      studioPartnerSixtySpecial
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
      "serviceLocation": location
    }
  },

  {
    "@context": "http://schema.org",
    "@type": "Service",
    "name": "Group Personal Training",
    "serviceType": "Health & Wellness",
    "category": "Fitness Studios",
    "provider": amenity,
    "termsOfService": "https://amenity.fitness/terms-of-service",
    "description": "Our group personal training offers 3-12 clients the attention of a trainer as we go through a general warmup, conditioning and cooldown with variations to each movement provided for different levels of ability. A group session allows our clients the most cost-effective option in a private and social setting.",
    "alternateName": [
      "Small Group Fitness",
      "Small Group Training",
      "Group Training",
      "Fitness Classes",
      "Workout Classes",
      "Group Workout"
    ],
    "serviceOutput": "Group exercise program",
    "offers": [
      studioGroupSixty,
      studioGroupSixtySpecial
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
      "serviceLocation": location
    }
  },
]
export default json