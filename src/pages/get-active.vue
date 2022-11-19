<template>
  <div class="mx-auto max-w-xl">
    <div v-if="!result" class="space-y-4 p-4 mx-auto max-w-xl">
      <div class="space-y-2">
        <h1>Get Active Questionnaire</h1>
        <p class="italic text-cyan-100">Physical activity improves your physical and mental health. Even small amounts of physical activity are good, and more is better.</p>
        <p>For almost everyone, the benefits of physical activity far outweigh any risks. For some individuals, specific advice from a Qualified Exercise Professional or health care provider is advisable. This questionnaire is intended for all ages – to help move you along the path to becoming more physically active.</p>
      </div>
      <div class="space-y-2 p-2 rounded bg-gray-700">
        <h2>Prepare To Become More Active</h2>
        <p>The following questions will help to ensure that you have a safe physical activity experience. Please answer YES or NO to each question before you become more physically active. If you are unsure about any question, answer YES.</p>
        <get-active :questions="questions" @submit="submit"/>
      </div>
    </div>
    <div class="p-4" v-else>
      <!-- <p>Unless advised otherwise, you are all set to engage in or increase your physical activity.</p> -->
      <p><span class="font-semibold">Advice On What To Do If You Have A Yes Response: </span>Use this reference document if you answered YES to any question and you have not consulted a health care provider or Qualified Exercise Professional about becoming more physically active.</p>
      <get-active-result :form="result" :questions="questions" :reference="reference"/>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Get Active Questionnaire'
  }),
  asyncData({store}) {
    const { state} = store,
    { user } = state,
    { localId } = user
    return { uid: localId }
  },
  data: () => ({
    result: null,
    questions: [
      'A diagnosis of/treatment for heart disease or stroke, or pain/discomfort/pressure in your chest during activities of daily living or during physical activity?',
      'A diagnosis of/treatment for high blood pressure (BP), or a resting BP of 160/90 mmHg or higher?',
      'Dizziness or lightheadedness during physical activity?',
      'Shortness of breath at rest?',
      'Loss of consciousness/fainting for any reason?',
      'Concussion?',
      'Do you currently have pain or swelling in any part of your body (such as from an injury, acute flare-up of arthritis, or back pain) that affects your ability to be physically active?',
      'Has a health care provider told you that you should avoid or modify certain types of physical activity?',
      'Do you have any other medical or physical condition (such as diabetes, cancer, osteoporosis, asthma, spinal cord injury) that may affect your ability to be physically active?'
    ],
    reference: [
      'Physical activity is likely to be beneficial. If you have been treated for heart disease but have not completed a cardiac rehabilitation program within the past 6 months, consult a doctor – a supervised cardiac rehabilitation program is strongly recommended. If you are resuming physical activity after more than 6 months of inactivity, begin slowly with light- to moderate-intensity physical activity. If you have pain/discomfort/pressure in your chest and it is new for you, talk to a doctor.',
      'Physical activity is likely to be beneficial if you have been diagnosed and treated for high blood pressure (BP). If you are unsure of your resting BP, consult a health care provider or a Qualified Exercise Professional (QEP) to have it measured. If you are taking BP medication and your BP is under good control, regular physical activity is recommended as it may help to lower your BP. Your doctor should be aware of your physical activity level so your medication needs can be monitored. If your BP is 160/90 or higher, you should receive medical clearance and consult a QEP about safe and appropriate physical activity.',
      'There are several possible reasons for feeling this way and many are not worrisome. Before becoming more active, consult a health care provider to identify reasons and minimize risk. Until then, refrain from increasing the intensity of your physical activity.',
      'If you have asthma and this is relieved with medication, light to moderate physical activity is safe. If your shortness of breath is not relieved with medication, consult a doctor.',
      'Before becoming more active, consult a doctor to identify reasons and minimize risk. Once you are medically cleared, consult a Qualified Exercise Professional (QEP) about types of physical activity suitable for your condition.',
      'A concussion is an injury to the brain that requires time to recover. Increasing physical activity while still experiencing symptoms may worsen your symptoms, lengthen your recovery, and increase your risk for another concussion. A health care provider will let you know when you can start becoming more physically active, and a Qualified Exercise Professional (QEP) can help get you started.',
      'If this swelling or pain is new, consult a health care provider. Otherwise, keep joints healthy and reduce pain by moving your joints slowly and gently through the entire pain-free range of motion. If you have hip, knee or ankle pain, choose low-impact activities such as swimming or cycling. As the pain subsides, gradually resume your normal physical activities starting at a level lower than before the flare-up. Consult a Qualified Exercise Professional (QEP) in follow-up to help you become more active and prevent or minimize future pain.',
      'Listen to the advice of your health care provider. A Qualified Exercise Professional (QEP) will ask you about any considerations and provide specific advice for physical activity that is safe and that takes your lifestyle and health care provider’s advice into account.',
      'Some people may worry if they have a medical or physical condition that physical activity might be unsafe. In fact, regular physical activity can help to manage and improve many conditions. Physical activity can also reduce the risk of complications. A Qualified Exercise Professional (QEP) can help with specific advice for physical activity that is safe and that takes your medical history and lifestyle into account.',
    ]
  }),
  methods: {
    ...mapActions('db', ['dbWrite']),
    submit(data) {
      this.result = data
      let getActive = []
      data.forEach((r, i) => {
        if (r == 'yes') {
          getActive.push({
            question: this.questions[i],
            response: this.reference[i]
          })
        }
      })
      this.dbWrite({
        url: `documents/users/${ this.uid }`,
        collectionId: 'users',
        data: {
          getActive
        }
      })
    }
  }
}
</script>