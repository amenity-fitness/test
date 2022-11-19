import { vancouver, amenity } from './index.js'

const url = "https://amenity.fitness/articles/weight-related-health-risk-in-canadians",
dateModified = new Date().toISOString(),
name = "Weight-related Health Risk in Canadians",
alternateName = [
  "Body mass index and waist circumference classifications",
  "Body mass index for Canadians",
  "Waist circumference cut-off points for Canadians",
  "Overweight and obesity health risks",
  "Underweight health risks",
  "Identifying health risk using BMI and waist circumference"
],
description = "This article describes a body weight classification system for the purpose of identifying health risk in Canadian adults. We discuss the risks for underweight, overweight and the additional risks for abdominal obesity. We also discuss the limitations to the classification system and populations that it may not be appropriate for.",
potentialAction = [
  {
    "@context": "https://schema.org",
    "@type": "AssessAction",
    "name": "Calculate personal body mass index",
    "alternateName": "Calculate BMI",
    "description": "Body weight in kilograms divided by height in meters squared to calculate body mass index",
    "result": {
      "@type": "Thing",
      "name": "Body mass index rating",
      "description": "A number is calculated to provide a rating to compare to the body mass index"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "InteractAction",
    "name": "Contact form",
    "description": "Contact us by inputing an email address and message",
    "result": {
      "@type": "Thing",
      "name": "Message sent",
      "description": "A message sent to the organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "InteractAction",
    "name": "Request a callback",
    "description": "Schedule a callback with us by providing a date, time, first name, phone number and email address",
    "result": {
      "@type": "Thing",
      "name": "Callback scheduled",
      "description": "A date and time scheduled for us to call the participant"
    }
  },
],
about = {
  "@context": "https://schema.org/",
  "@type": "Thing",
  "description": "A calculation of body mass index is used to determine weight-related health risk in Canadians, and a measurement of waist circumference is used to determine possible elevated health risk"
},
audience = {
  "@context": "http://schema.org",
  "@type": "PeopleAudience",
  "geographicArea": {
    "@type": "Country",
    "name": "Canada"
  }
},
inLanguage = {
  "@context": "http://schema.org",
  "@type": "Language",
  "name": "English",
  "alternateName": "en"
},
keywords = [
  "overweight",
  "obesity",
  "underweight",
  "body mass index",
  "waist circumerence",
  "obese class one",
  "obese class two",
  "obese class three",
  "health risk",
  "Canadians",
  "BMI",
  "BMI category",
  "type two diabetes",
  "dyslipidemia",
  "cardiovascular disease"
],

article = {
  "@context": "http://schema.org",
  "@type": "Article",
  "author": amenity,
  "name": name,
  "url": url,
  "alternateName": alternateName,
  "description": description,
  "potentialAction": potentialAction,
  "about": about,
  "audience": audience,
  "dateModified": dateModified,
  "inLanguage": inLanguage,
  "isAccessibleForFree": true,
  "keywords": keywords,
  "learningResourceType": "article",
  "locationCreated": vancouver
},

webPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "author": amenity,
  "name": name,
  "url": url,
  "alternateName": alternateName,
  "description": description,
  "potentialAction": potentialAction,
  "about": about,
  "audience": audience,
  "dateModified": dateModified,
  "inLanguage": inLanguage,
  "keywords": keywords,
  "learningResourceType": "article",
  "locationCreated": vancouver
}

export {
  article,
  webPage
}