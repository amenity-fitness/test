<template>
  <table class="w-full border my-4">
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
        <td class="border text-center">{{ category.bmi }}</td>
        <td class="border text-center">{{ category.category }}</td>
        <td class="border text-center">{{ category.risk }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: () => ({
    cols: [
      'BMI',
      'Category',
      'Health Risk'
    ],
    categories: [
      {
        bmi: '< 18.5',
        category: 'Underweight',
        risk: 'Increased risk'
      },
      {
        bmi: '18.5 - 24.9',
        category: 'Normal weight',
        risk: 'Least risk'
      },
      {
        bmi: '25.0 - 29.9',
        category: 'Overweight',
        risk: 'Increased risk'
      },
      {
        bmi: '30.0 - 34.9',
        category: 'Obese class 1',
        risk: 'High risk'
      },
      {
        bmi: '35.0 - 39.9',
        category: 'Obese class 2',
        risk: 'Very high risk'
      },
      {
        bmi: '≥ 40.0',
        category: 'Obese class 3',
        risk: 'Extremely high risk'
      },
    ]
  })
}
</script>