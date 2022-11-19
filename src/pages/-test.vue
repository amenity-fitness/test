<template>
<div>
  <img :src="require('~/assets/gif/hero.gif')" alt="">
</div>
<!-- <div class="prose dark:prose-invert" v-html="content"/>
  <!-- <p>hello</p> -->
  <!-- <h1 class="font-black">{{ themePreference }}</h1>
  <div class="bg-gray-500 w-full h-screen"></div>
  <p ref="p">Fade Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus inventore minus libero placeat, ipsa exercitationem consequuntur delectus error nihil, voluptatem illo numquam reiciendis pariatur repellendus quis rem commodi deserunt. Voluptatibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate quaerat at veritatis dolor excepturi, et inventore tempora quisquam rem velit cumque, aperiam vitae quidem esse. Deleniti provident necessitatibus nesciunt ipsa? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita doloribus quia quaerat nam aliquam totam a unde autem officiis quisquam, quas, exercitationem explicabo eligendi adipisci, beatae fuga et ut assumenda? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, ad pariatur reprehenderit possimus totam id dolores aut a ex repudiandae eum cum perferendis quisquam sunt vel beatae! Eveniet, exercitationem voluptate! Fade Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus inventore minus libero placeat, ipsa exercitationem consequuntur delectus error nihil, voluptatem illo numquam reiciendis pariatur repellendus quis rem commodi deserunt. Voluptatibus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate quaerat at veritatis dolor excepturi, et inventore tempora quisquam rem velit cumque, aperiam vitae quidem esse. Deleniti provident necessitatibus nesciunt ipsa? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita doloribus quia quaerat nam aliquam totam a unde autem officiis quisquam, quas, exercitationem explicabo eligendi adipisci, beatae fuga et ut assumenda? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, ad pariatur reprehenderit possimus totam id dolores aut a ex repudiandae eum cum perferendis quisquam sunt vel beatae! Eveniet, exercitationem voluptate!</p> -->
</template> -->
<script>
import MarkdownIt from "markdown-it"
export default {
  asyncData() {
    const md = new MarkdownIt()
    return { 
      content: md.render(`# Header One`)
    }
  },
  mounted() {
    // window.localStorage['theme'] = 'light'
    // window.onscroll = (e) => this.handleScroll(e)
  },
  data: () => ({
    // content: `
    //   <h3>Hello</h3>
    //   <p>Hello lorem</p>
    // `
    // content: `
    //   # H1

    //   abc def
    // `
  }),
  methods: {
    scrollTop(element) {
      return parseInt(element.offsetTop - window.scrollY)
    },
    handleScroll(e) {
      const { p } = this.$refs,
      offset = this.scrollTop(p),
      { innerHeight } = window,
      offsetBottom = offset - innerHeight
      // opacity = this.getOpacity(p)
      // switch (true) {
      //   case offset < (0 - window.innerHeight):
      //     console.log(offset - innerHeight)
      // }
      // From Bottom
      // console.log(offset - innerHeight)
      if (offsetBottom < 0) {
        const positiveInt = offsetBottom / -1,
        ratio = positiveInt / 100
        if (ratio <= 1) {
          this.setOpacity(0 + ratio)
        }
      }
      // From Top
      if (offset < 0) {
      }
    },
    getOpacity() {
      const element = document.body,
      cssObj = window.getComputedStyle(element, null);
      return cssObj.getPropertyValue("--tw-text-opacity")
    },
    getProp(prop) {
      const element = document.body,
      cssObj = window.getComputedStyle(element, null);
      return cssObj.getPropertyValue(prop)
    },
    setOpacity(val) {
      document.body
        .style.setProperty('--tw-text-opacity', val)
    },
    setProp(prop, val) {
      document.body
        .style.setProperty(prop, val)
    }
  },
  computed: {
    themePreference() {
      if (process.client) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }
  }
}
</script>