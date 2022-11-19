<template>
  <div class="py-4">
    <div v-if="!!value" class="space-y-4 md:pb-0 pb-20">
      <div v-if="pasbq" class="bg-red-50 dark:bg-gray-600 p-2 space-y-2 rounded-lg shadow-lg">
        <h2>Physical Activity & Sedentary Behaviours Questionnaire</h2>  
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <CSEP-Result title="Sedentary Behaviours" :result="pasbq.sedentary + ' Hrs Daily'" :score="sedentaryBehaviours" :color="sedentaryBehaviours | color"/>
          <CSEP-Result title="Aerobic Physical Activity" :result="pasbq.aerobicPA + ' Mins Weekly'" :score="aerobicPA" :color="aerobicPA | color"/>
          <CSEP-Result title="Strength Physical Activity" :result="pasbq.strengthPA + ' Days/Week'" :score="strengthPA" :color="strengthPA | color"/>
          <CSEP-Result title="Percieved Aerobic Fitness" :result="perceivedAF" :score="perceivedAF" :color="perceivedAF | color"/>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-gray-600 p-2 space-y-2 rounded-lg shadow-lg">
        <h2>Musculoskeletal Results & Health Benefit Ratings</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <CSEP-Result :dnc="dnc" title="Vo2 Max" :result="vo2 + ' mL/kg/min'" :score="vo2Max" :color="vo2Max | color" />
          <CSEP-Result :dnc="dnc" title="Grip Strength" :result="musculoskeletal.gripStrength + 'kg'" :score="gripStrength" :color="gripStrength | color" />
          <CSEP-Result :dnc="dnc" title="Max Push Up" :result="musculoskeletal.pushUp + ' push ups'" :score="maxPushup" :color="maxPushup | color"/>
          <CSEP-Result :dnc="dnc" title="Sit & Reach" :result="musculoskeletal.sitReach + 'cm'" :score="sitReach" :color="sitReach | color"/>
          <CSEP-Result :dnc="dnc" title="Vertical Jump" :result="legPower + 'w (' + musculoskeletal.legPower + ' cm)'" :score="verticalJump" :color="verticalJump | color"/>
          <CSEP-Result :dnc="dnc" title="Back Extension" :result="musculoskeletal.backExtension + ' seconds'" :score="backExtension" :color="backExtension | color"/>
          <CSEP-Result :dnc="dnc" title="One Leg Balance (Open)" :result="musculoskeletal.balance.open + ' seconds'" :score="balanceOpen" :color="balanceOpen | color"/>
          <CSEP-Result :dnc="dnc" title="One Leg Balance (Closed)" :result="musculoskeletal.balance.closed + ' seconds'" :score="balanceClosed" :color="balanceClosed | color"/>
        </ul>
      </div>
      <div class="bg-red-50 dark:bg-gray-600 p-2 space-y-2 rounded-lg shadow-lg">
        <h2>Health Risk Ratings</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <CSEP-Result title="BMI Risk" :result="BMI+ ' (' + bmiCategory + ')'" :score="bmiRisk" :color="bmiRisk | color" />
          <CSEP-Result :dnc="dnc" title="Waist Circumference" :result="wc + ' cm'" :score="waistCircumference" :color="waistCircumference | color" />
        </ul>
      </div>
    </div>
    <div v-else class="bg-red-50 dark:bg-gray-600 rounded-lg shadow-lg py-2 pl-5 flex items-center">
      <h1 class="grow">
        {{ date | formattedDate }}
      </h1>
      <button @click="$emit('input', id)">View</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['id', 'date', 'value', 'musculoskeletal', 'age', 'height', 'weight', 'wc', 'female', 'vo2', 'ethnicity', 'pasbq'],
  computed: {
    dnc() {
      return this.female == null ? true : false
    },
    aerobicPA () {
      const { aerobicPA } = this.pasbq
      switch (true) {
        case aerobicPA >= 300:
          return 'excellent'
        case aerobicPA >= 225 && aerobicPA <= 299:
          return 'very good'
        case aerobicPA >= 150 && aerobicPA <= 224:
          return 'good'
        case aerobicPA >= 75 && aerobicPA <= 149:
          return 'fair'
        case aerobicPA < 75:
          return 'poor'
        default:
          return 'N/A'
      }
    },
    strengthPA() {
      const { strengthPA } = this.pasbq
      switch (true) {
        case strengthPA > 3:
          return 'excellent'
        case strengthPA == 3:
          return 'very good'
        case strengthPA == 2:
          return 'good'
        case strengthPA == 1:
          return 'fair'
        case strengthPA == 0:
          return 'poor'
        default:
          return 'N/A'
      }
    },
    perceivedAF() {
      const { perceivedAF } = this.pasbq
      switch (true) {
        case perceivedAF == 'excellent':
          return 'Excellent'
        case perceivedAF == 'very good':
          return 'Very Good'
        case perceivedAF == 'good':
          return 'Good'
        case perceivedAF == 'fair':
          return 'Fair'
        case perceivedAF == 'poor':
          return 'Poor'
        default:
          return 'Poor'
      }
    },
    sedentaryBehaviours() {
      const { sedentary } = this.pasbq
      switch (true) {
        case sedentary < 2:
          return 'excellent'
        case sedentary >= 2 && sedentary < 4:
          return 'very good'
        case sedentary >= 4 && sedentary < 6:
          return 'good'
        case sedentary >= 6 && sedentary < 8:
          return 'fair'
        case sedentary >= 8:
          return 'poor'
        default:
          return 'N/A'
      }
    },
    vo2Max() {
      const { vo2, age, female } = this
      if (female) {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case vo2 >= 49.0:
                return 'excellent'
              case vo2 >= 43.7 && vo2 <= 48.9:
                return 'very good'
              case vo2 >= 39.5 && vo2 <= 43.6:
                return 'good'
              case vo2 >= 36.8 && vo2 <= 39.4:
                return 'fair'
              case vo2 < 36.8:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case vo2 >= 47.2:
                return 'excellent'
              case vo2 >= 42.0 && vo2 <= 47.1:
                return 'very good'
              case vo2 >= 37.8 && vo2 <= 41.9:
                return 'good'
              case vo2 >= 35.0 && vo2 <= 37.7:
                return 'fair'
              case vo2 < 35:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 29 && age < 40:
            switch (true) {
              case vo2 >= 45.4:
                return 'excellent'
              case vo2 >= 40.1 && vo2 <= 45.3:
                return 'very good'
              case vo2 >= 36.0 && vo2 <= 40.0:
                return 'good'
              case vo2 >= 33.0 && vo2 <= 35.9:
                return 'fair'
              case vo2 < 33.0:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case vo2 >= 40.0:
                return 'excellent'
              case vo2 >= 35.1 && vo2 <= 39.9:
                return 'very good'
              case vo2 >= 31.9 && vo2 <= 35.0:
                return 'good'
              case vo2 >= 27.1 && vo2 <= 31.8:
                return 'fair'
              case vo2 < 27.1:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case vo2 >= 36.6:
                return 'excellent'
              case vo2 >= 34.0 && vo2 <= 36.5:
                return 'very good'
              case vo2 >= 31.0 && vo2 <= 33.9:
                return 'good'
              case vo2 >= 24.6 && vo2 <= 30.9:
                return 'fair'
              case vo2 < 24.6:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case vo2 >=35.8:
                return 'excellent'
              case vo2 >= 32.8 && vo2 <= 35.7:
                return 'very good'
              case vo2 >= 29.6 && vo2 <= 32.7:
                return 'good'
              case vo2 >= 23.5 && vo2 <= 29.5:
                return 'fair'
              case vo2 < 23.5:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      } else {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case vo2 >= 57.4:
                return 'excellent'
              case vo2 >= 52.4 && vo2 <= 57.3:
                return 'very good'
              case vo2 >= 48.8 && vo2 <= 52.3:
                return 'good'
              case vo2 >= 43.6 && vo2 <= 48.7:
                return 'fair'
              case vo2 < 43.6:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case vo2 >= 55.6:
                return 'excellent'
              case vo2 >= 50.6 && vo2 <= 55.5:
                return 'very good'
              case vo2 >= 47.2 && vo2 <= 50.5:
                return 'good'
              case vo2 >= 41.6 && vo2 <= 47.1:
                return 'fair'
              case vo2 < 41.6:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 29 && age < 40:
            switch (true) {
              case vo2 >= 48.8:
                return 'excellent'
              case vo2 >= 45.4 && vo2 <= 48.7:
                return 'very good'
              case vo2 >= 40.1 && vo2 <= 45.3:
                return 'good'
              case vo2 >= 33.7 && vo2 <= 40.0:
                return 'fair'
              case vo2 < 33.7:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case vo2 >= 47.0:
                return 'excellent'
              case vo2 >= 42.7 && vo2 <= 46.9:
                return 'very good'
              case vo2 >= 35.5 && vo2 <= 42.6:
                return 'good'
              case vo2 >= 31.9 && vo2 <= 35.4:
                return 'fair'
              case vo2 < 31.9:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case vo2 >= 41.8:
                return 'excellent'
              case vo2 >= 36.5 && vo2 <= 41.7:
                return 'very good'
              case vo2 >= 30.1 && vo2 <= 36.4:
                return 'good'
              case vo2 >= 26.0 && vo2 <= 30.0:
                return 'fair'
              case vo2 < 26.0:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case vo2 >= 38.4:
                return 'excellent'
              case vo2 >= 32.8 && vo2 <= 38.3:
                return 'very good'
              case vo2 >= 28.7 && vo2 <= 32.7:
                return 'good'
              case vo2 >= 23.5 && vo2 <= 28.6:
                return 'fair'
              case vo2 < 23.5:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      }
    },
    BMI() {
      const BMI = (this.weight / (this.height / 100)) / (this.height / 100)
      return Math.round(BMI)
    },
    bmiCategory() {
      const { BMI } = this
      switch (true) {
        case BMI < 18.5:
          return 'Underweight'
        case BMI >= 18.5 && BMI <= 24.9:
          return 'Normal'
        case BMI >= 25 && BMI <= 29.9:
          return 'Overweight'
        case BMI >= 30 && BMI <= 34.9:
          return 'Obese Class I'
        case BMI >= 35 && BMI <= 39.9:
          return 'Obese Class II'
        case BMI >= 40:
          return 'Obese Class III'
        default:
          return 'N/A'
      }
    },
    bmiRisk() {
      const { bmiCategory } = this
      switch (true) {
        case bmiCategory ==  'Underweight':
          return 'Increased Risk'
        case bmiCategory == 'Normal':
          return 'Least Risk'
        case bmiCategory == 'Overweight':
          return 'Increased Risk'
        case bmiCategory == 'Obese Class I':
          return 'High Risk'
        case bmiCategory == 'Obese Class II':
          return 'Very High Risk'
        case bmiCategory == 'Obese Class III':
          return 'Extremely High'
        default:
          return 'N/A'
      }
    },
    waistCircumference() {
      const { wc, ethnicity, female } = this
      const bmi = this.BMI
      const bmiRisk = this.bmiRisk
      const EuSsaEmMe = [
        'european',
        'sub-saharan african',
        'eastern mediterranean',
        'middle eastern'
      ]
      const SaSaCa = [
        'south asian',
        'japanese',
        'chinese',
        'malasian',
        'indian',
        'south american',
        'central american'
      ]
      if (female) {
        switch (true) {
          case EuSsaEmMe.includes(ethnicity):
            return wc >= 80 ? 'Increased Risk' : 'Least Risk'
          case SaSaCa.includes(ethnicity):
            return wc >= 80 ? 'Increased Risk' : 'Least Risk'
          default:  
            switch (true) {
              case bmiRisk == 'least' && wc >= 80:
                return 'High Risk'
              case bmiRisk == 'increased' && wc >= 90:
                return 'Very High Risk'
              case bmiRisk == 'high' && wc >= 105:
                return 'Extremely High Risk'
              case bmiRisk == 'very high' && wc >= 115:
                return 'Extremely High Risk'
              case bmiRisk == 'extremely high' && wc >= 125:
                return 'Extremely High Risk'
              default:
                return 'No Additional Risk'
            }
        }
      } else {
        switch (true) {
          case EuSsaEmMe.includes(ethnicity):
            return wc >= 94 ? 'Increased Risk' : 'Least Risk'
          case SaSaCa.includes(ethnicity):
            return wc >= 90 ? 'Increased Risk' : 'Least Risk'
          default:
            switch (true) {
              case bmiRisk == 'least' && wc >= 90:
                return 'High Risk'
              case bmiRisk == 'increased' && wc >= 100:
                return 'Very High Risk'
              case bmiRisk == 'high' && wc >= 110:
                return 'Extremely High Risk'
              case bmiRisk == 'very high' && wc >= 125:
                return 'Extremely High Risk'
              case bmiRisk == 'extremely high' && wc >= 125:
                return 'Extremely High Risk'
              default:
                return 'No Additional Risk'
            }
        }
      }
    },
    gripStrength() {
      const { age, musculoskeletal, female } = this
      const { gripStrength } = musculoskeletal
      if (female) {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case gripStrength >= 68:
                return 'excellent'
              case gripStrength >= 60 && gripStrength <= 67:
                return 'very good'
              case gripStrength >= 53 && gripStrength <= 59:
                return 'good'
              case gripStrength >= 48 && gripStrength <= 52:
                return 'fair'
              case gripStrength < 48:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case gripStrength >= 70:
                return 'excellent'
              case gripStrength >= 63 && gripStrength <= 69:
                return 'very good'
              case gripStrength >= 58 && gripStrength <= 62:
                return 'good'
              case gripStrength >= 52 && gripStrength <= 57:
                return 'fair'
              case gripStrength < 52:
                return 'poor'
              default:
                return 'N/A'
            }
          case  age > 29 && age < 40:
            switch (true) {
              case gripStrength >= 71:
                return 'excellent'
              case gripStrength >= 63 && gripStrength <= 70:
                return 'very good'
              case gripStrength >= 58 && gripStrength <= 62:
                return 'good'
              case gripStrength >= 51 && gripStrength <= 57:
                return 'fair'
              case gripStrength < 51:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case gripStrength >= 69:
                return 'excellent'
              case gripStrength >= 61 && gripStrength <= 68:
                return 'very good'
              case gripStrength >= 54 && gripStrength <= 60:
                return 'good'
              case gripStrength >= 49 && gripStrength <= 53:
                return 'fair'
              case gripStrength < 49:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case gripStrength >= 61:
                return 'excellent'
              case gripStrength >= 54 && gripStrength <= 60:
                return 'very good'
              case gripStrength >= 49 && gripStrength <= 53:
                return 'good'
              case gripStrength >= 45 && gripStrength <= 48:
                return 'fair'
              case gripStrength <45:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case gripStrength >= 54:
                return 'excellent'
              case gripStrength >= 48 && gripStrength <= 53:
                return 'very good'
              case gripStrength >= 45 && gripStrength <= 47:
                return 'good'
              case gripStrength >= 41 && gripStrength <= 44:
                return 'fair'
              case gripStrength < 41:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      } else {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case gripStrength >= 108:
                return 'excellent'
              case gripStrength >= 98 && gripStrength <= 107:
                return 'very good'
              case gripStrength >= 90 && gripStrength <= 97:
                return 'good'
              case gripStrength >= 79 && gripStrength <= 89:
                return 'fair'
              case gripStrength < 79:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case gripStrength >= 115:
                return 'excellent'
              case gripStrength >= 104 && gripStrength <= 114:
                return 'very good'
              case gripStrength >= 95 && gripStrength <= 103:
                return 'good'
              case gripStrength >= 84 && gripStrength <= 94:
                return 'fair'
              case gripStrength < 84:
                return 'poor'
              default:
                return 'N/A'
            }
          case  age > 29 && age < 40:
            switch (true) {
              case gripStrength >= 115:
                return 'excellent'
              case gripStrength >= 104 && gripStrength <= 114:
                return 'very good'
              case gripStrength >= 95 && gripStrength <= 103:
                return 'good'
              case gripStrength >= 84 && gripStrength <= 94:
                return 'fair'
              case gripStrength < 84:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case gripStrength >= 108:
                return 'excellent'
              case gripStrength >= 97 && gripStrength <= 107:
                return 'very good'
              case gripStrength >= 88 && gripStrength <= 96:
                return 'good'
              case gripStrength >= 80 && gripStrength <= 87:
                return 'fair'
              case gripStrength < 80:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case gripStrength >= 101:
                return 'excellent'
              case gripStrength >= 92 && gripStrength <= 100:
                return 'very good'
              case gripStrength >= 84 && gripStrength <= 91:
                return 'good'
              case gripStrength >= 76 && gripStrength <= 83:
                return 'fair'
              case gripStrength < 76:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case gripStrength >= 100:
                return 'excellent'
              case gripStrength >= 91 && gripStrength <= 99:
                return 'very good'
              case gripStrength >= 84 && gripStrength <= 90:
                return 'good'
              case gripStrength >= 73 && gripStrength <= 83:
                return 'fair'
              case gripStrength < 73:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      }
    },
    maxPushup() {
      const { age, musculoskeletal, female } = this
      const { pushUp } = musculoskeletal
      if (female) {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case pushUp >= 33:
                return 'excellent'
              case pushUp >= 25 && pushUp <= 32:
                return 'very good'
              case pushUp >= 18 && pushUp <= 24:
                return 'good'
              case pushUp >= 12 && pushUp <= 17:
                return 'fair'
              case pushUp < 12:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case pushUp >= 30:
                return 'excellent'
              case pushUp >= 21 && pushUp <= 29:
                return 'very good'
              case pushUp >= 15 && pushUp <= 20:
                return 'good'
              case pushUp >= 10 && pushUp <= 14:
                return 'fair'
              case pushUp < 10:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 29 && age < 40:
            switch (true) {
              case pushUp >= 27:
                return 'excellent'
              case pushUp >= 20 && pushUp <= 26:
                return 'very good'
              case pushUp >= 13 && pushUp <= 19:
                return 'good'
              case pushUp >= 8 && pushUp <= 12:
                return 'fair'
              case pushUp < 8:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case pushUp >= 24:
                return 'excellent'
              case pushUp >= 15 && pushUp <= 23:
                return 'very good'
              case pushUp >= 11 && pushUp <= 14:
                return 'good'
              case pushUp >= 5 && pushUp <= 10:
                return 'fair'
              case pushUp < 5:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case pushUp >= 21:
                return 'excellent'
              case pushUp >= 11 && pushUp <= 20:
                return 'very good'
              case pushUp >= 7 && pushUp <= 10:
                return 'good'
              case pushUp >= 2 && pushUp <= 6:
                return 'fair'
              case pushUp < 2:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case pushUp >= 17:
                return 'excellent'
              case pushUp >= 12 && pushUp <= 16:
                return 'very good'
              case pushUp >= 5 && pushUp <= 11:
                return 'good'
              case pushUp >= 2 && pushUp <= 4:
                return 'fair'
              case pushUp < 2:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      } else {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case pushUp >= 39:
                return 'excellent'
              case pushUp >= 29 && pushUp <= 38:
                return 'very good'
              case pushUp >= 23 && pushUp <= 28:
                return 'good'
              case pushUp >= 18 && pushUp <= 22:
                return 'fair'
              case pushUp < 18:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case pushUp >= 36:
                return 'excellent'
              case pushUp >= 29 && pushUp <= 25:
                return 'very good'
              case pushUp >= 22 && pushUp <= 28:
                return 'good'
              case pushUp >= 17 && pushUp <= 21:
                return 'fair'
              case pushUp < 17:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 30 && age < 22:
            switch (true) {
              case pushUp >= 30:
                return 'excellent'
              case pushUp >= 22 && pushUp <= 29:
                return 'very good'
              case pushUp >= 17 && pushUp <= 21:
                return 'good'
              case pushUp >= 12 && pushUp <= 16:
                return 'fair'
              case pushUp < 12:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case pushUp >= 25:
                return 'excellent'
              case pushUp >= 17 && pushUp <= 24:
                return 'very good'
              case pushUp >= 13 && pushUp <= 16:
                return 'good'
              case pushUp >= 10 && pushUp <= 12:
                return 'fair'
              case pushUp < 10:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case pushUp >= 21:
                return 'excellent'
              case pushUp >= 13 && pushUp <= 20:
                return 'very good'
              case pushUp >= 10 && pushUp <= 12:
                return 'good'
              case pushUp >= 7 && pushUp <= 9:
                return 'fair'
              case pushUp < 7:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case pushUp >= 18:
                return 'excellent'
              case pushUp >= 11 && pushUp <= 17:
                return 'very good'
              case pushUp >= 8 && pushUp <= 10:
                return 'good'
              case pushUp >= 5 && pushUp <= 7:
                return 'fair'
              case pushUp < 5:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      }
    },
    sitReach() {
      const { age, musculoskeletal, female } = this
      const { sitReach } = musculoskeletal
      if (female) {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case sitReach >= 43:
                return 'excellent'
              case sitReach >= 38 && sitReach <= 42:
                return 'very good'
              case sitReach >= 34 && sitReach <= 37:
                return 'good'
              case sitReach >= 29 && sitReach <= 33:
                return 'fair'
              case sitReach < 29:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case sitReach >= 41:
                return 'excellent'
              case sitReach >= 37 && sitReach <= 40:
                return 'very good'
              case sitReach >= 33 && sitReach <= 36:
                return 'good'
              case sitReach >= 28 && sitReach <= 32:
                return 'fair'
              case sitReach < 28:
                return 'poor'
              default:
                return 'N/A'
            }
          case  age > 29 && age < 40:
            switch (true) {
              case sitReach >= 41:
                return 'excellent'
              case sitReach >= 36 && sitReach <= 40:
                return 'very good'
              case sitReach >= 32 && sitReach <= 35:
                return 'good'
              case sitReach >= 27 && sitReach <= 31:
                return 'fair'
              case sitReach < 27:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case sitReach >= 38:
                return 'excellent'
              case sitReach >= 34 && sitReach <= 37:
                return 'very good'
              case sitReach >= 30 && sitReach <= 33:
                return 'good'
              case sitReach >= 25 && sitReach <= 29:
                return 'fair'
              case sitReach < 25:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case sitReach >= 39:
                return 'excellent'
              case sitReach >= 33 && sitReach <= 38:
                return 'very good'
              case sitReach >= 30 && sitReach <= 32:
                return 'good'
              case sitReach >= 25 && sitReach <= 29:
                return 'fair'
              case sitReach < 25:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case sitReach >= 35:
                return 'excellent'
              case sitReach >= 31 && sitReach <= 34:
                return 'very good'
              case sitReach >= 27 && sitReach <= 30:
                return 'good'
              case sitReach >= 23 && sitReach <= 26:
                return 'fair'
              case sitReach < 23:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      } else {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case sitReach >= 39:
                return 'excellent'
              case sitReach >= 34 && sitReach <= 38:
                return 'very good'
              case sitReach >= 29 && sitReach <= 33:
                return 'good'
              case sitReach >= 24 && sitReach <= 28:
                return 'fair'
              case sitReach < 24:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case sitReach >= 40:
                return 'excellent'
              case sitReach >= 34 && sitReach <= 39:
                return 'very good'
              case sitReach >= 30 && sitReach <= 33:
                return 'good'
              case sitReach >= 25 && sitReach <= 29:
                return 'fair'
              case sitReach < 25:
                return 'poor'
              default:
                return 'N/A'
            }
          case  age > 29 && age < 40:
            switch (true) {
              case sitReach >= 38:
                return 'excellent'
              case sitReach >= 33 && sitReach <= 37:
                return 'very good'
              case sitReach >= 28 && sitReach <= 32:
                return 'good'
              case sitReach >= 23 && sitReach <= 27:
                return 'fair'
              case sitReach < 23:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case sitReach >= 35:
                return 'excellent'
              case sitReach >= 29 && sitReach <= 34:
                return 'very good'
              case sitReach >= 24 && sitReach <= 28:
                return 'good'
              case sitReach >= 18 && sitReach <= 23:
                return 'fair'
              case sitReach < 18:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case sitReach >= 35:
                return 'excellent'
              case sitReach >= 28 && sitReach <= 34:
                return 'very good'
              case sitReach >= 24 && sitReach <= 27:
                return 'good'
              case sitReach >= 16 && sitReach <= 23:
                return 'fair'
              case sitReach < 16:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case sitReach >= 33:
                return 'excellent'
              case sitReach >= 25 && sitReach <= 32:
                return 'very good'
              case sitReach >= 20 && sitReach <= 24:
                return 'good'
              case sitReach >= 15 && sitReach <= 19:
                return 'fair'
              case sitReach < 15:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      }
    },
    verticalJump() {
      const { age, female, legPower } = this

      if (female) {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case legPower >= 3167:
                return 'excellent'
              case legPower >= 2795 && legPower <= 3166:
                return 'very good'
              case legPower >= 2399 && legPower <= 2794:
                return 'good'
              case legPower >= 2156 && legPower <= 2398:
                return 'fair'
              case legPower < 2156:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case legPower >= 3250:
                return 'excellent'
              case legPower >=2804 && legPower <= 3249:
                return 'very good'
              case legPower >= 2478 && legPower <= 2803:
                return 'good'
              case legPower >= 2271 && legPower <= 2477:
                return 'fair'
              case legPower < 2271:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 29 && age < 40:
            switch (true) {
              case legPower >= 3193:
                return 'excellent'
              case legPower >= 2550 && legPower <= 3192:
                return 'very good'
              case legPower >= 2335 && legPower <= 2549:
                return 'good'
              case legPower >= 2147 && legPower <= 2334:
                return 'fair'
              case legPower < 2147:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case legPower >= 2675:
                return 'excellent'
              case legPower >= 2288 && legPower <= 2674:
                return 'very good'
              case legPower >= 2101 && legPower <= 2287:
                return 'good'
              case legPower >= 1688 && legPower <= 2100:
                return 'fair'
              case legPower < 1688:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case legPower >= 2559:
                return 'excellent'
              case legPower >= 2161 && legPower <= 2558:
                return 'very good'
              case legPower >= 1701 && legPower <= 2160:
                return 'good'
              case legPower >= 1386 && legPower <= 1700:
                return 'fair'
              case legPower < 1386:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case legPower >= 2475:
                return 'excellent'
              case legPower >= 1717 && legPower <= 2474:
                return 'very good'
              case legPower >= 1317 && legPower <= 1716:
                return 'good'
              case legPower >= 1198 && legPower <= 1316:
                return 'fair'
              case legPower < 1198:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      } else {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case legPower >= 4644:
                return 'excellent'
              case legPower >= 4185 && legPower <= 4683:
                return 'very good'
              case legPower >= 3858 && legPower <= 4184:
                return 'good'
              case legPower >= 3323 && legPower <= 3857:
                return 'fair'
              case legPower < 3323:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case legPower >= 5094:
                return 'excellent'
              case legPower >=4640 && legPower <= 5953:
                return 'very good'
              case legPower >= 4297 && legPower <= 4639:
                return 'good'
              case legPower >= 3775 && legPower <= 4296:
                return 'fair'
              case legPower < 3775:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 29 && age < 40:
            switch (true) {
              case legPower >= 4860:
                return 'excellent'
              case legPower >= 4389 && legPower <= 4859:
                return 'very good'
              case legPower >= 3967 && legPower <= 4388:
                return 'good'
              case legPower >= 3485 && legPower <= 3966:
                return 'fair'
              case legPower < 3485:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case legPower >= 4320:
                return 'excellent'
              case legPower >= 3700 && legPower <= 4319:
                return 'very good'
              case legPower >= 3242 && legPower <= 3699:
                return 'good'
              case legPower >= 2708 && legPower <= 3241:
                return 'fair'
              case legPower < 2708:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case legPower >= 4019:
                return 'excellent'
              case legPower >= 3567 && legPower <= 4018:
                return 'very good'
              case legPower >= 2937 && legPower <= 3566:
                return 'good'
              case legPower >= 2512 && legPower <= 2936:
              case legPower < 2512:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case legPower >= 3764:
                return 'excellent'
              case legPower >= 3291 && legPower <= 3763:
                return 'very good'
              case legPower >= 2848 && legPower <= 3290:
                return 'good'
              case legPower >= 2383 && legPower <= 2847:
                return 'fair'
              case legPower < 2383:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      }
    },
    backExtension() {
      const { age, musculoskeletal, female } = this
      const { backExtension } = musculoskeletal
      if (female) {
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case backExtension >= 169 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 141 && backExtension <= 168:
                return 'very good'
              case backExtension >= 122 && backExtension <= 140:
                return 'good'
              case backExtension >= 91 && backExtension <= 121:
                return 'fair'
              case backExtension < 91:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case backExtension == 180:
                return 'excellent'
              case backExtension >= 136 && backExtension <= 179:
                return 'very good'
              case backExtension >= 102 && backExtension <= 135:
                return 'good'
              case backExtension >= 66 && backExtension <= 101:
                return 'fair'
              case backExtension < 66:
                return 'poor'
              default:
                return 'N/A'
            }
          case  age > 29 && age < 40:
            switch (true) {
              case backExtension == 180:
                return 'excellent'
              case backExtension >= 141 && backExtension <= 179:
                return 'very good'
              case backExtension >= 112 && backExtension <= 140:
                return 'good'
              case backExtension >= 61 && backExtension <= 111:
                return 'fair'
              case backExtension < 61:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case backExtension == 180:
                return 'excellent'
              case backExtension >= 115 && backExtension <= 179:
                return 'very good'
              case backExtension >= 80 && backExtension <= 114:
                return 'good'
              case backExtension >= 42 && backExtension <= 79:
                return 'fair'
              case backExtension < 42:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case backExtension >= 110 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 75 && backExtension <= 109:
                return 'very good'
              case backExtension >= 47 && backExtension <= 74:
                return 'good'
              case backExtension >= 15 && backExtension <= 46:
                return 'fair'
              case backExtension < 15:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case backExtension >= 91 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 40 && backExtension <= 90:
                return 'very good'
              case backExtension >= 19 && backExtension <= 39:
                return 'good'
              case backExtension >= 6 && backExtension <= 18:
                return 'fair'
              case backExtension < 6:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      } else {                
        switch (true) {
          case age > 14 && age < 20:
            switch (true) {
              case backExtension >= 158 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 135 && backExtension <= 157:
                return 'very good'
              case backExtension >= 119 && backExtension <= 134:
                return 'good'
              case backExtension >= 91 && backExtension <= 118:
                return 'fair'
              case backExtension < 91:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 19 && age < 30:
            switch (true) {
              case backExtension >= 176 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 133 && backExtension <= 175:
                return 'very good'
              case backExtension >= 99 && backExtension <= 132:
                return 'good'
              case backExtension >= 86 && backExtension <= 98:
                return 'fair'
              case backExtension < 86:
                return 'poor'
              default:
                return 'N/A'
            }
          case  age > 29 && age < 40:
            switch (true) {
              case backExtension >= 147 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 109 && backExtension <= 146:
                return 'very good'
              case backExtension >= 91 && backExtension <= 108:
                return 'good'
              case backExtension >= 56 && backExtension <= 90:
                return 'fair'
              case backExtension < 56:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 39 && age < 50:
            switch (true) {
              case backExtension >= 130 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 84 && backExtension <= 129:
                return 'very good'
              case backExtension >= 71 && backExtension <= 83:
                return 'good'
              case backExtension >= 32 && backExtension <= 70:
                return 'fair'
              case backExtension < 32:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 49 && age < 60:
            switch (true) {
              case backExtension >= 120 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 88 && backExtension <= 119:
                return 'very good'
              case backExtension >= 54 && backExtension <= 87:
                return 'good'
              case backExtension >= 20 && backExtension <= 53:
                return 'fair'
              case backExtension < 20:
                return 'poor'
              default:
                return 'N/A'
            }
          case age > 59 && age < 70:
            switch (true) {
              case backExtension >= 117 && backExtension <= 180:
                return 'excellent'
              case backExtension >= 78 && backExtension <= 116:
                return 'very good'
              case backExtension >= 52 && backExtension <= 77:
                return 'good'
              case backExtension >= 20 && backExtension <= 51:
                return 'fair'
              case backExtension < 20:
                return 'poor'
              default:
                return 'N/A'
            }
        }
      }
    },
    balanceOpen() {
      const { age, musculoskeletal, female } = this
      const { balance } = musculoskeletal
      const result = balance.open
      if (female) {
        switch (true) {
          case age > 17 && age < 40:
            return result >= 45.0 ? 'Above Mean': 'Below Mean'
          case age > 39 && age < 50:
            return result >= 42.1 ? 'Above Mean': 'Below Mean'
          case  age > 49 && age < 60:
            return result >= 40.9 ? 'Above Mean': 'Below Mean'
          case age > 59 && age < 70:
            return result >= 30.4 ? 'Above Mean': 'Below Mean'
        }
      } else {
        switch (true) {
          case age > 17 && age < 40:
            return result >= 44.4 ? 'Above Mean': 'Below Mean'
          case age > 39 && age < 50:
            return result >= 41.6 ? 'Above Mean': 'Below Mean'
          case  age > 49 && age < 60:
            return result >= 41.5 ? 'Above Mean': 'Below Mean'
          case age > 59 && age < 70:
            return result >= 33.8 ? 'Above Mean': 'Below Mean'
        }
      }
    },
    balanceClosed() {
      const { age, musculoskeletal, female } = this
      const { balance } = musculoskeletal
      const result = balance.closed
      if (female) {
        switch (true) {
          case age > 17 && age < 40:
            return result >= 13.1 ? 'Above Mean': 'Below Mean'
          case age > 39 && age < 50:
            return result >= 13.5 ? 'Above Mean': 'Below Mean'
          case  age > 49 && age < 60:
            return result >= 7.9 ? 'Above Mean': 'Below Mean'
          case age > 59 && age < 70:
            return result >= 3.6 ? 'Above Mean': 'Below Mean'
        }
      } else {
        switch (true) {
          case age > 17 && age < 40:
            return result >= 16.9 ? 'Above Mean': 'Below Mean'
          case age > 39 && age < 50:
            return result >= 12.0 ? 'Above Mean': 'Below Mean'
          case  age > 49 && age < 60:
            return result >= 8.6 ? 'Above Mean': 'Below Mean'
          case age > 59 && age < 70:
            return result >= 5.1 ? 'Above Mean': 'Below Mean'
        }
      }
    },
    legPower() {
      const { musculoskeletal, weight } = this
      const jumpHeight = musculoskeletal['legPower']
      return [(60.7 * jumpHeight) + (45.3 * weight)] - 2055
    }
  },
  filters: {
    color(val)  {
      if (!val) {
        return
      }
      val = val.toLowerCase()
      switch (true) {
        case val == 'excellent'
          || val == 'above mean'
          || val == 'least risk'
          || val == 'no additional risk':
          return 'text-emerald-400'
        case val == 'very good':
          return 'text-lime-400'
        case val == 'good'
          || val == 'increased risk':
          return 'text-yellow-400'
        case val == 'fair'
          || val == 'high risk':
          return 'text-orange-400'
        case val == 'extremely high':
          return 'text-red-600'
        default:
          return 'text-red-400'
      }
    },
    formattedDate(val) {
      // return new Date(val).toLocaleDateString("en-CA")
      const dow = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      return dow[new Date(val).getDay()] + ' ' + Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(val));
    }
  },
}
</script>