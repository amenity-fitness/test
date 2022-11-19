<template>
<section v-if="render" class="flex flex-col items-center grow p-2" @click="handleClick($event)">
  <h1 class="text-2xl text-bold pt-1 pb-2">My Pantry</h1>
  <div class="w-full md:basis-9/12 bg-gray-500 grow rounded-lg">
    <Dialog
      @close="closeDialog"
      @submit="addItem"
      @success="success"
      @validate="validate"
      :component="'Pantry-Window'"
      :buttonless="true"
      :footerless="true"
      :data="dialogData"
    />
    <div v-for="category in categories" :key="category.id" :class="concatItems(category.id).length ? 'pb-1' : ''" class="">
      <!-- <div :id="category.id" class="overflow-hidden transition-all rounded-lg bg-gray-600 shadow-lg"> -->
      <div :id="category.id" class="rounded-lg bg-gray-600 shadow-lg">
        <Pantry-Category
          @return="edit = false"
          @setEdit="setEdit"
          @editItem="editItem"
          @setDialog="setDialog"
          @showDetails="toggleDetails"
          @removeItem="removeItem($event)"
          @input="focus = $event"
          :focus="focus"
          :edit="edit"
          :id="category.id"
          :details="details"
          :name="category.name"
          :ogItems="filteredItems(category.id)"
          :items="concatItems(category.id)"
        />
      </div>
    </div>
    <button 
      @click="DIALOG_SET('Pantry-Window')"
      class="fixed right-8 bottom-8 h-12 w-12 p-0 m-0 md:h-14 md:w-14 rounded-full bg-orange-300">
      <img :src="require('~/assets/svg/plus.svg')" alt="">
    </button>
  </div>
</section>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  layout: 'app',
  head: () => ({
    title: 'Pantry'
  }),
  async asyncData({ store }) {
    try {
      const { state, dispatch } = store,
      { user } = state.auth,
      uid = user.localId,
      res = await dispatch('db/dbRead',
        {
          url: `documents/users/${ uid }/pantry`
        },
        {
          root: true 
        }),

      dialogData = {
        name: { label: 'Name' },
        uid
      },
      categories = [
        {
          id: 'protein',
          name: 'Protein'
        },
        {
          id: 'vegetable',
          name: 'Vegetables'
        },
        {
          id: 'fruit',
          name: 'Fruits'
        },
        {
          id: 'grain',
          name: 'Grain Products'
        },
        {
          id: 'dairyAlt',
          name: 'Dairy & Alternatives'
        },
        {
          id: 'beverage',
          name: 'Beverages'
        },
        {
          id: 'oil',
          name: 'Oils'
        },
        {
          id: 'seasoning',
          name: 'Seasonings'
        },
        {
          id: 'sauce',
          name: 'Sauces'
        },
        {
          id: 'ready',
          name: 'Ready Food Products'
        },
        {
          id: 'leftover',
          name: 'Leftovers'
        },
        {
          id: 'confectionary',
          name: 'Confectionaries'
        },
        {
          id: 'baby',
          name: 'Baby Food'
        },
        {
          id: 'other',
          name: 'Other'
        }
      ]
      let pantry = []
      Object.keys(res)
        .forEach(key => {
          pantry.push({
            ...res[key],
            id: key
          })
        })
      return {
        categories,
        dialogData,
        pantry,
        uid
      }
    } catch (err) {
      console.log(err)
        // const { error } = err.data
        // console.log(error)
        // this.handleError(error)
    }
  },
  mounted() {
    const { pantry } = this
    if (!pantry.length) {
      this.DIALOG_SET('Pantry-Window')
    }
    // this.categories
    //   .forEach(category => {
    //     document.querySelector(`#${category.id}`).style.height = `${document.querySelector(`#${category.id}`).clientHeight}px`
    //     document.querySelector(`#${category.id}`).style.maxHeight = `${document.querySelector(`#${category.id}`).clientHeight}px`
    //   })
  },
  data: () => ({
    height: null,
    focus: null,
    loading: false,
    details: false,
    edit: false,
    open: false,
    render: true
  }),
  methods: {
    ...mapMutations(['DIALOG_SET']),
    ...mapActions(['handleError', 'handleSuccess']),
    ...mapActions('db', ['dbDelete', 'dbWrite']),
    async editItem(data) {
      const { pantry, uid } = this,
      url = `documents/users/${ uid }/pantry/${ data['id'] }`,
      { id } = data,
      oldId = id
      delete data['id']
      
      const newItem = await this.dbWrite({
        url,
        data
      })
      pantry
        .forEach((item, i) => {
          if ( oldId == item.id ) {
            this.pantry.splice(i, 1, newItem)
          }
        })
      this.details = false
      this.edit = false
      this.handleSuccess({ message: 'Success' })
    },
    addItem(item) {
      this.edit = false
      this.details = false
      this.focus = null
      this.pantry.push(item)
      console.log(item)
      this.closeDialog()
    },
    concatItems(category) {
      const map = new Map(),
      map2 = new Map()
      this.filteredItems(category)
        .forEach((item, i) => {
          const propertyValue = item['type']
          if (map.has(propertyValue)) {
            map.set(`${propertyValue}${i}`, item)
          } else {
            map.set(propertyValue, { ...item, first: true })
          }
        })
      Array.from(map.values())
        .forEach((item, i) => {
          const propertyValue = item['name']
          if (map2.has(propertyValue)) {
            const { unit } = map2.get(propertyValue)
            if (unit !== item['unit']) {
              map2.set(`${propertyValue}${i}`, item)
            } else {
              const prevItem = map2.get(propertyValue)
              map2.set(propertyValue, {
                ...prevItem,
                qty: parseFloat(item['qty']) + parseFloat(map2.get(propertyValue).qty) || ''
              })
            }
          } else {
            map2.set(propertyValue, item)
          }
        })
      return Array.from(map2.values())
    },
    closeDialog() {
      delete this.dialogData['item']
      this.dialogData['name'].error = false
    },
    handleClick(evt) {
      let parent = document.querySelector('#' + this.details)
      if (!!parent) {
        // if (this.open && !parent.contains(evt.target)) {
        if (!parent.contains(evt.target)) {
          this.details = false
          this.edit = false
        }
        this.open = !this.open
      }
    },
    filterCategory (category) {
      const { pantry } = this
      if (category == 'other') {
        return pantry.filter(product => product.category == category)
          .concat(pantry.filter(product => product.category == ''))
      } else {
        return pantry.filter(product => product.category == category)
      }
    },
    filteredItems(category) {
      return this.filterCategory(category)
        .sort((a, b) => {
          const nameA = a.category.toUpperCase(),
          nameB = b.category.toUpperCase()
          switch (true) {
            case nameA < nameB:
              return -1
            case nameA > nameB:
              return 1
            default:
              return 0
          }
        })
    },
    async removeItem(id) {
      try {
        this.loading = true
        const { uid } = this,
        url = `documents/users/${ uid }/pantry/${id}`
        await this.dbDelete({ url })
        const doc = this.pantry.filter(doc => doc.id == id)[0]
        this.pantry.splice(this.pantry.indexOf(doc), 1)
        this.pantry = this.pantry
        this.handleSuccess({ message: 'Success' })
        this.loading = false
        this.edit = false
        this.details = false
        this.focus = false
      } catch (err) {
        console.log(err)
        this.handleError()
      }
    },
    success($event) {
      this.closeDialog()
      this.handleSuccess($event)
    },
    validate(evt) {
      Object.keys(evt)
        .forEach(prop => {
          if (!evt[prop]) {
            this.dialogData[prop] = {
              ...this.dialogData[prop],
              error: true
            }
            this.handleError({ message: 'Name is required' })
          }
        })
    },
    setDialog($event) {
      this.details = false
      this.dialogData['item'] = $event
      this.DIALOG_SET('Pantry-Window')
    },
    setEdit($event) {
      this.edit = $event
    },
    toggleDetails($event) {
      const { details } = this
      if (details) {
        this.details = null
        this.setEdit(false)
      } else {
        this.details = $event
      }
    }
  },
  watch: {
    focus(val) {
      console.log(val)
    },
    // focus(val, oldVal) {
    //   if (val !== false) {
    //     switch (true) {
    //       case val !== null && oldVal !== null:
    //         setTimeout(() => {
    //           //Close
    //           if (!!oldVal) {
    //             document.querySelector(`#${oldVal}`).style.height = this.height
    //             document.querySelector(`#${oldVal}`).style.maxHeight = this.height
    //           }
    //           //Open
    //           document.querySelector(`#${val}`).style.height = document.querySelector(`#${this.focus}-child`).getBoundingClientRect().height + 'px'
    //           document.querySelector(`#${val}`).style.maxHeight = document.querySelector(`#${this.focus}-child`).getBoundingClientRect().height + 'px'
    //         }, 200)
    //         setTimeout(() => document.querySelector(`#${val}`).classList.toggle('overflow-hidden'), 500)
    //         // if (!!oldVal) {
    //         //   // setTimeout(() => document.querySelector(`#${this.focus}`).classList.toggle('overflow-hidden'), 500)
    //         // }
    //         break
    //       case this.height !== null:
    //         document.querySelector(`#${oldVal}`).style.height = this.height
    //         document.querySelector(`#${oldVal}`).style.maxHeight = this.height
    //         this.height = null
    //         break
    //       default:
    //         setTimeout(() => {
    //           document.querySelector(`#${this.focus || oldVal}`).style.height = document.querySelector(`#${this.focus}-child`).getBoundingClientRect().height + 'px'
    //           document.querySelector(`#${this.focus || oldVal}`).style.maxHeight = document.querySelector(`#${this.focus}-child`).getBoundingClientRect().height + 'px'
    //           this.height = `${document.querySelector(`#${this.focus || oldVal}`).offsetHeight }px`
    //         }, 200)
    //         setTimeout(() => document.querySelector(`#${this.focus || oldVal}`).classList.toggle('overflow-hidden'), 500)
    //     }
    //   }
    // },
    async pantry() {
      this.details = false
      this.focus = false
      this.render = false
      await this.$nextTick();
      this.render = true
    }
  }
}
</script>
<style scoped>
h1 {
  @apply text-transparent bg-clip-text
  bg-gradient-to-t from-orange-200 to-sky-300
}
</style>