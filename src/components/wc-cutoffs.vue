<template>
<div>
  <table class="w-full border">
    <thead>
      <tr class="border bg-accent">
        <th 
          class="border"
          v-for="item in cols"
          :key="item">{{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories" :key="category.bmi">
        <td class="border text-center">{{ category.category }}</td>
        <td class="border text-center">{{ category.male }}</td>
        <td class="border text-center">{{ category.female }}</td>
        <td class="border text-center">{{ category.risk }}</td>
      </tr>
    </tbody>
  </table>
  <table class="w-full border my-4">
    <thead>
      <tr class="border bg-accent">
        <th 
          class="border"
          v-for="item in cols2"
          :key="item">{{ item }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in categories2" :key="category.category">
        <td class="border text-center">{{ category.category }}</td>
        <td class="border text-center">{{ category.male }}</td>
        <td class="border text-center">{{ category.female }}</td>
        <td class="border text-center">{{ category.risk }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data: () => ({
    cols: [
      'Category',
      'Male',
      'Female',
      'Additional Health Risk'
    ],
    cols2: [
      'Country or Ethnic Group',
      'Male',
      'Female',
      'Abdominal Obesity Risk'
    ],
    categories: [
      {
        category: 'Underweight',
        male: '-',
        female: '-',
        risk: '-'
      },
      {
        category: 'Normal weight',
        male: '≥ 90 cm',
        female: '≥ 80 cm',
        risk: 'High risk'
      },
      {
        category: 'Overweight',
        male: '≥ 100 cm',
        female: '≥ 90 cm',
        risk: 'Very high risk'
      },
      {
        category: 'Obese class 1',
        male: '≥ 110 cm',
        female: '≥ 105 cm',
        risk: 'Extremely high risk'
      },
      {
        category: 'Obese class 2',
        male: '≥ 125 cm',
        female: '≥ 115 cm',
        risk: 'Extremely high risk'
      },
      {
        category: 'Obese class 3',
        male: '≥ 125 cm',
        female: '≥ 125 cm',
        risk: 'Extremely high risk'
      },
    ],
    categories2: [
      {
        category: 'Europe',
        male: '≥ 94 cm',
        female: '≥ 80 cm',
        risk: 'Increased risk'
      },
      {
        category: 'Chinese, Japanese & South Asian',
        male: '≥ 90 cm',
        female: '≥ 80 cm',
        risk: 'Increased risk'
      },
      {
        category: 'South & Central American',
        male: '≥ 90 cm',
        female: '≥ 80 cm',
        risk: 'Increased risk'
      },
      {
        category: 'Sub-Saharan African',
        male: '≥ 94 cm',
        female: '≥ 80 cm',
        risk: 'Increased risk'
      },
      {
        category: 'Eastern Mediterranean & Middle East',
        male: '≥ 94 cm',
        female: '≥ 80 cm',
        risk: 'Increased risk'
      },
    ]
  })
}
</script>