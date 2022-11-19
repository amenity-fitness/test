import { location, amenity } from './index.js'
const json = {
  "@context": "http://schema.org",
  "@type": "Service",
  "name": "Fitness Assessment",
  "serviceType": "Health & Wellness",
  "category": "Fitness Assessment",
  "provider": amenity,
  "termsOfService": "https://amenity.fitness/terms-of-service",
  "description": "Administered by a Certified Personal Trainer, we utilize the CSEP-PATH for assessing body composition, metabolic health, muscular strength, endurance, flexibility, power, balance and stability, and aerobic capacity. Assessment results can be used for comparison against Canadians of a similar population, and are used to determine adequate types and intensities for your fitness level. Future re-assessments are able to provide feedback in regards to prior program effectiveness and determine new goals and areas of priority.",
  "alternateName": [
    "Fitness Testing",
    "Body Composition",
    "Musculoskeletal Fitness Testing",
    "Aerobic Fitness Testing"
  ],
  "serviceOutput": [
    "Assessment Report",
    "Health Benefit Ratings"
  ],
  "offers": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "90-minute Fitness Assessment",
    }
  },
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
}
export default json