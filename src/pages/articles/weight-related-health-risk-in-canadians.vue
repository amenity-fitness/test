<template>
  <div>
    <Dialog
      @submit="bookCallback"
      @error="$nuxt.$emit('error', $event)"
      :persistent="true"
      :submit="'Submit'"
      :component="'Request-Callback'"
      :footerless="true"
      :buttonless="true"
      :data="{ conflicts }"/>
    <section class="lg:flex lg:space-x-4">
      <div class="fixed hidden shrink lg:block pt-3 max-w-[25rem]">
        <h2 class="underline">Navigation</h2>
        <nav class="space-y-2 mt-2">
          <a
            class="block text-sm text-inherit"
            v-for="link in doc.toc"
            :key="link.id"
            :href="'#' + link.id">
            {{ link.text }}
          </a>
        </nav>
      </div>
      <div class="lg:pl-[25rem] flex justify-center grow">
        <div class="w-full">
          <article class="mx-auto">
            <div :class="contentStyles" class="card">
              <h1 class="title pt-2 lg:w-fit">{{ doc.title }}</h1>
              <h5 class="firstLetter pb-2">{{ doc.description }}</h5>
              <Article-Nav :toc="doc.toc"/>
              <Nuxt-Content :document="doc" />
            </div>
            <Form
              :cta="cta"
              class="px-0"
              @error="$nuxt.$emit('error', $event)"
              @submit="$nuxt.$emit('success', $event)"/>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { article, webPage } from '~/assets/json/article-weight-risk.js'
import { mapActions } from 'vuex' 

export default {
  async asyncData({ $content, store }) {
    const conflicts = await store
      .dispatch('scheduling/reqCallback'),
    doc = await $content('articles/weight-risk').fetch()
    return { doc, conflicts }
  },
  head: () => ({
    script: [
      {
        type: 'application/ld+json',
        json: [
          article,
          webPage
        ]
      }
    ],
    title: webPage.name,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: webPage.description
      },
      {
        property: "og:title",
        content: webPage.name
      },
      {
        property: "og:type",
        content: article['@type']
      },
      {
        property: "og:description",
        content: webPage.description
      },
      {
        property: "og:image",
        content: webPage.primaryImageOfPage
      },
      {
        property: "og:url",
        content: webPage.url
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
    ]
  }),
  data: () => ({
    cta: 'Interested in learning more about your risks, or have a question? It would be great to hear from you.',
    contentStyles: `
      prose-th:px-0 prose-th:py-2 prose-th:text-center
      dark:prose-invert prose prose-h2:mt-8 max-w-none
      prose-h4:pb-2 prose-h1:mb-0 prose-h3:mt-2
    `
  }),
  methods: {
    ...mapActions('scheduling', ['publicWrite']),
    async bookCallback(data) {
      try {
        const callback = true,
        { status } = await this.publicWrite({
          ...data,
          callback
        })
        if (status == 200) this.$nuxt.$emit('success', { message: 'Success' }) 
      } catch (error) {
        this.$nuxt.$emit('error', error)
      }
    }
  }
}
</script>
<style scoped>
.firstLetter::first-letter {
  @apply text-2xl font-medium 
}
</style>