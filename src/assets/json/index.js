const studioPrivateSixty = {
  "@type": "Offer",
  "priceCurrency": "CAD",
  "price": "90.00",
  "itemOffered": {
    "@type": "Service",
    "name": "60-minute 1-on-1 Training",
    "disambiguatingDescription": "One-on-one training"
  }
},
studioPrivateSixtySpecial = {
  "@type": "Offer",
  "priceCurrency": "CAD",
  "price": "1026.00",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 60-minute 1-on-1 Training",
    "disambiguatingDescription": "One-on-one training Special"
  }
},
studioPartnerSixty = {
  "@type": "Offer",
  "priceCurrency": "CAD",
  "price": "50.00",
  "itemOffered": {
    "@type": "Service",
    "name": "60-minute Partner Training (ea.)",
    "disambiguatingDescription": "Partner Training"
  }
},
studioPartnerSixtySpecial = {
  "@type": "Offer",
  "priceCurrency": "CAD",
  "price": "570.00",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 60-minute Partner Training (ea.)",
    "disambiguatingDescription": "Partner Training Special"
  }
},
studioGroupSixty = {
  "@type": "Offer",
  "priceCurrency": "CAD",
  "price": "40.00",
  "itemOffered": {
    "@type": "Service",
    "name": "60-minute Group Training (ea.)",
    "disambiguatingDescription": "Group Training"
  }
},
studioGroupSixtySpecial = {
  "@type": "Offer",
  "priceCurrency": "CAD",
  "price": "456.00",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 60-minute Group Training (ea.)",
    "disambiguatingDescription": "Group Training Special"
  }
},
mobilePrivateNinety = {
  "@type": "Offer",
  "price": "180.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "90-minute Private Training",
    "disambiguatingDescription": "One-on-one training for ninety minutes"
  }
},
mobilePrivateNinetySpecial = {
  "@type": "Offer",
  "price": "2052.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 90-minute Private Training",
    "disambiguatingDescription": "One-on-one training for ninety minutes special"
  }
},
mobilePrivateSixty = {
  "@type": "Offer",
  "price": "150.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "60-minute Private Training",
    "disambiguatingDescription": "One-on-one training for sixty minutes"
  }
},
mobilePrivateSixtySpecial = {
  "@type": "Offer",
  "price": "1710.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 60-minute Private Training",
    "disambiguatingDescription": "One-on-one training for sixty minutes special"
  }
},
mobilePartnerNinety = {
  "@type": "Offer",
  "price": "110.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "90-minute Partner Training (ea.)",
    "disambiguatingDescription": "Partner training for ninety minutes"
  }
},
mobilePartnerNinetySpecial = {
  "@type": "Offer",
  "price": "1254.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 90-minute Partner Training (ea.)",
    "disambiguatingDescription": "Partner training for ninety minutes special"
  }
},
mobilePartnerSixty = {
  "@type": "Offer",
  "price": "90.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "60-minute Partner Training (ea.)",
    "disambiguatingDescription": "Partner training for sixty minutes"
  }
},
mobilePartnerSixtySpecial = {
  "@type": "Offer",
  "price": "1026.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 60-minute Partner Training (ea.)",
    "disambiguatingDescription": "Partner training for sixty minutes special"
  }
},
remotePrivateThirty = {
  "@type": "Offer",
  "price": "60.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "30-minute Check-in"
  }
},
remotePrivateThirtySpecial = {
  "@type": "Offer",
  "price": "684.00",
  "priceCurrency": "CAD",
  "itemOffered": {
    "@type": "Service",
    "name": "12 x 30-minute Check-in"
  }
},
offerCatalog = {
  "@type": "OfferCatalog",
  "name": "Personal Training Services",
  "itemListElement": [
    {
      "@type": "OfferCatalog",
      "name": "Remote (Online) Personal Training",
      "itemListElement": [
        remotePrivateThirty,
        remotePrivateThirtySpecial
      ]
    },
    {
      "@type": "OfferCatalog",
      "name": "Private Studio Personal Training",
      "itemListElement": [
        studioPrivateSixty,
        studioPrivateSixtySpecial,
        studioPartnerSixty,
        studioPartnerSixtySpecial,
        studioGroupSixty,
        studioGroupSixtySpecial
      ]
    },
    {
      "@type": "OfferCatalog",
      "name": "Mobile Personal Training",
      "itemListElement": [
        mobilePrivateNinety,
        mobilePrivateNinetySpecial,
        mobilePrivateSixty,
        mobilePrivateSixtySpecial,
        mobilePartnerNinety,
        mobilePartnerNinetySpecial,
        mobilePartnerSixty,
        mobilePartnerSixtySpecial,
      ]
    }
  ]
},
vancouver = {
  "@type": "Place",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vancouver",
    "addressRegion": "BC",
    "addressCountry": "CA"
  }
},
humber = {
  "@type": "EducationalOccupationalCredential",
  "name": "Humber College - Fitness and Health Promotion",
  "description": "Skills learned include anatomy, physiology, biomechanics, business administration and marketing, nutrition, injury management and special event planning. Graduates will combine theory with hands-on training for a comprehensive foundation in fitness that includes working with personal training clients and preparing to earn nationally and internationally recognized certifications",
  "competencyRequired": [
    {
      "@type": "DefinedTerm",
      "termCode": "PSE4U",
      "name": "Grade 12 Exercise Science"
    },
    {
      "@type": "DefinedTerm",
      "termCode": "HSD",
      "name": "High school diploma or equivalent"
    }
  ],
  "credentialCategory": 'Diploma'
},
nsca = {
  "@type": "EducationalOccupationalCredential",
  "name": "Certified Personal Trainer",
  "url": "https://www.nsca.com/certification/nsca-cpt/",
  "description": "Certified Personal Trainers are health/fitness professionals who, using an individualized approach, assess, motivate, educate and train clients regarding their personal health and fitness needs. They design safe and effective exercise programs, provide the guidance to help clients achieve their personal health/fitness goals, and respond appropriately in emergency situations.",
  "competencyRequired": [
    {
      "@type": "DefinedTerm",
      "termCode": "CPR-C/AED",
      "name": "Standard First Aid CPR-C & AED"
    },
    {
      "@type": "DefinedTerm",
      "termCode": "HSD",
      "name": "High school diploma or equivalent"
    }
  ],
  "credentialCategory": {
    "@type": "DefinedTerm",
    "@id": "http://purl.org/ctdl/terms/Certification",
    "name": "Certification",
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "@id": "http://purl.org/ctdl/terms/",
      "name": "Credential Transparency Description Language"
    }
  },
  "recognizedBy": {
    "@type": "Organization",
    "name": "National Strength and Conditioning Association (NSCA)",
    "url": "https://www.nsca.com/"
  }
},
nasm = {
  "@type": "EducationalOccupationalCredential",
  "name": "Certified Personal Trainer of Distinction",
  "description": "Certified Personal Trainers are health/fitness professionals who, using an individualized approach, assess, motivate, educate and train clients regarding their personal health and fitness needs. They design safe and effective exercise programs, provide the guidance to help clients achieve their personal health/fitness goals, and respond appropriately in emergency situations.",
  "competencyRequired": [
    {
      "@type": "DefinedTerm",
      "termCode": "CPR-C/AED",
      "name": "Standard First Aid CPR-C & AED"
    },
    {
      "@type": "DefinedTerm",
      "termCode": "HSD",
      "name": "High school diploma or equivalent"
    }
  ],
  "credentialCategory": {
    "@type": "DefinedTerm",
    "@id": "http://purl.org/ctdl/terms/Certification",
    "name": "Certification",
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "@id": "http://purl.org/ctdl/terms/",
      "name": "Credential Transparency Description Language"
    }
  },
  "recognizedBy": {
    "@type": "Organization",
    "name": "National Academy of Sport Medicine (NASM)",
    "url": "https://www.nasm.org/"
  }
},
paul = {
  "@type": "Person",
  "givenName": "Paul",
  "familyName": "Elliott",
  "birthDate": "1993-12-21",
  "homeLocation": vancouver,
  "jobTitle": "Principal Director",
  "hasCredential": [
    nsca,
    humber
  ]
},
katey = {
  "@type": "Person",
  "additionalName": "Katey",
  "givenName": "Kathleen",
  "familyName": "Milton",
  "birthDate": "1993-05-16",
  "homeLocation": vancouver,
  "jobTitle": "Director",
  "hasCredential": nasm
},
keywords = [
  "Active Living",
  "Activity",
  "Agility",
  "Assessment",
  "Balance",
  "Body Composition",
  "Chinatown",
  "Canada",
  "Coaching",
  "Endurance",
  "Exercise",
  "Flexibility",
  "Fitness",
  "Group",
  "Health",
  "In Home",
  "Muscular",
  "Partner",
  "Physical",
  "Private",
  "Personal",
  "Physically",
  "Program",
  "Seniors",
  "Strength",
  "Testing",
  "Trainer",
  "Training",
  "Vancouver",
  "Workout",
  "Workouts"
],
description = `
  Amenity offers private group, partner and 1-on-1 personal training, fitness assessments, 
  and the prescription of an individualized exercise program. Based out of Chinatown, 
  Vancouver we are able to meet in studio, in-home, shared recreational spaces, 
  or check in remotely with our in-app video calls.
`,
location = {
  "@type": "Place",
  "name": "The Program Fitness",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "747 Gore Avenue",
    "addressLocality": "Vancouver",
    "postalCode": "V6A 2Z9",
    "addressRegion": "BC",
    "addressCountry": "CA"
  }
},
funding = {
  "@type": "MonetaryGrant",
  "identifier": "18064",
  "name": "The Small and Medium Sized Business Recovery Grant",
  "funder": {
    "@type": "Organization",
    "name": "Province of British Columbia",
    "url": "https://www2.gov.bc.ca/gov/content/home"
  }
},
knows = [
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Interval Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Interval Workouts"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "High Intensity Workouts"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "High Intensity Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Muscular Endurance"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Muscular Strength"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Personal Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Body Composition"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Physical Activity"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Healthy Eating"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Healthy Living"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Behaviour Modification"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Exercise Prescription"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Program Design"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Active Living"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Injury Prevention"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Fitness Assessment"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Corporate Wellness"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Sports Nutrition"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Athletic Performance"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "First Aid & CPR"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Strength Workouts"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Strength Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Flexibility Workouts"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Flexibility Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Endurance Workouts"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Endurance Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Resistance Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Goal Setting"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "SMART Goals"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Athlete Needs Analysis"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Balance & Stability Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Agility Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Power Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Youth Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Long-Term Athletic Development"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Off-Season Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Cardiovascular Workouts"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Cardiovascular Training"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Muscle Building"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Bone Strengthening"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Weight Loss"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Nutritious Foods"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Sports Suppliments"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Food Preparation Skills"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Safe Food Handling"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Weight Gain"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Canada's Food Guide"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Canadian Health Resources"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "Disease Prevention"
  },
  {
    "@context": "https://schema.org/",
    "@type": "Thing",
    "name": "City of Vancouver Parks & Recreation"
  },
],
serviceLocation = {
  "@type": "Place",
  "geo": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "49.2819181",
      "longitude": "-123.1185109"
    },
    "geoRadius": "7"
  }
},
amenity = {
  "@context": "http://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Amenity Fitness",
  "legalName": "Amenity: Lifestyle & Fitness Inc.",
  "description": description,
  "slogan": "Amenity helps busy Canadians improve their Health and Wellness",
  "keywords": keywords,
  "url": "https://amenity.fitness",
  "funding": funding,
  "openingHours": "Su,Mo,Tu,We,Th,Fr,Sa 06:00-19:00",
  "currenciesAccepted": "CAD",
  "paymentAccepted": "Cash, Credit Card, Interac e-Transfer",
  "priceRange": "$$$",
  "email": "info@amenity.fitness",
  "knowsAbout": knows,
  "foundingDate": "2016-06-01",
  "foundingLocation": vancouver,
  "location": location,
  "hasOfferCatalog": offerCatalog,
  "areaServed": serviceLocation,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 5.0,
    "reviewCount": 13
  },
  "employee": [
    {
      ...paul,
      "spouse": katey
    },
    {
      ...katey,
      "spouse": paul
    }
  ],
  "founder": [
    paul,
    katey
  ],
},
fitnessAssessment = {
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

export { 
  amenity,
  fitnessAssessment,
  location,
  serviceLocation,
  studioPrivateSixty,
  studioPartnerSixty,
  studioGroupSixty,
  studioPrivateSixtySpecial,
  studioPartnerSixtySpecial,
  studioGroupSixtySpecial,
  mobilePrivateNinety,
  mobilePrivateNinetySpecial,
  mobilePrivateSixty,
  mobilePrivateSixtySpecial,
  mobilePartnerNinety,
  mobilePartnerNinetySpecial,
  mobilePartnerSixty,
  mobilePartnerSixtySpecial,
  remotePrivateThirty,
  remotePrivateThirtySpecial,
  vancouver
}