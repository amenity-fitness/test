---
title: Weight-related Health Risk in Canadians
description: This article describes a body weight classification system for the purpose of identifying health risk in Canadian adults; while understanding possible risk should not be understated, the importance of a positive body image should remain a priority for all individuals, including those working towards a healthier body weight. We discuss the risks for underweight, overweight and the additional risks for abdominal obesity. We also discuss the limitations to the classification system and populations that it may not be appropriate for.
riskAbdominal:
  - Coronary Events (i.e heart attack, ischemic stroke)
  - Type 2 Diabetes
riskUnderweight:
  - Undernutrition
  - Osteoporosis
  - Infertility
  - Impaired immunocompetence
  - (*) May be an indication of an eating disorder or other underlying illness
riskOverweight:
  - Type 2 Diabetes
  - Dyslipidemia
  - Insulin resistance
  - Gallbladder disease
  - Obstructive sleep apnea and respiratory problems
  - Cardiovascular disease (i.e. coronary heart disease, ischemic stroke)
  - Cancer (breast, endometrial, colon, prostate, kidney, liver, gallbladder)
  - Psychosocial problems
  - Functional limitations
  - Impaired fertility
riskLimitation:
  - Those who are pregnant or lactating
  - Young adults who have not attained full growth
  - Adults who have a naturally very lean body build
  - Adults who have a naturally very muscular body build
  - Adults over 65 years of age
  - Certain ethnic or racial groups
---
## Measuring Body Mass Index
#### Input your height and weight to calculate BMI
<bmi-calculator></bmi-calculator>

## Background
<div class="space-y-2">
  <p>
    Body weight and concerns about body weight results in a considerable physical, psychosocial, and economic cost in the Canadian population. Overweight and obesity have increased among Canadians over the past 4 decades and have been linked to several chronic diseases; while less prevalent, underweight has also been linked to serious health problems.
  </p>
  <p>
    Canada’s first weight classification system was released in 1988 to identify weight-related health risks, and was based off of the research of the 1980’s. International study led to the World Health Organization’s release of a global weight classification system in 1995, which was later revised in 2000. This led to Canada updating its system in 2003 which adopted the use of Body Mass Index (BMI) and Waist Circumference (WC) to assess body weight and abdominal obesity risks independently.
  </p>
</div>

## Body Mass Index Categories
Despite not being a direct measure of body fat or lean tissue, BMI is the most widely investigated and useful indicator of health problems that are associated with underweight and overweight. The relationship between BMI and health risk is continuous, and should be used as part of a more comprehensive assessment to clarify health risk.

<bmi-cutoffs></bmi-cutoffs>

### Health problems associated with underweight
<weight-risk :risks="riskUnderweight"></weight-risk>

### Health problems associated with overweight and obesity
<weight-risk :risks="riskOverweight"></weight-risk>

## Waist Circumference Cut-off Points
Like BMI, the relationship between WC and health risk is continuous. WC is positively correlated with abdominal fat and can be used to identify health risk associated with abdominal obesity. Lower female cut-off points are due to females presenting higher risk than males at similar levels of WC.

<wc-cutoffs></wc-cutoffs>

### Additionally elevated risk associated with abdominal obesity
<weight-risk :risks="riskAbdominal"></weight-risk>

## Populations with limitations to the Body Weight Classification System

<weight-risk :risks="riskLimitation"></weight-risk>

Note: BMI and WC measurements are not appropriate for those who are pregnant or lactating. For the other identified populations, BMI and WC measurements are still appropriate, but may less accurately depict risk.

### General limitations
Individual risk and protective factors that result from eating habits, physical activity patterns, tobacco use, and genetic influences may affect the risk of developing health problems, independent of weight status.

As mentioned earlier, BMI and WC should be used as a part of a more comprehensive assessment of health. Our fitness assessment adopted from the Canadian Society for Exercise Physiology looks at risk factors including body composition, lifestyle factors, physical activity and sedentary behaviours, and 6 components of musculoskeletal fitness to develop a greater understanding of abilities and health risk.
