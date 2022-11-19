<template>
<section>
  <div v-if="hash == 2" @click="handleClick">
    <h1 v-if="item">Add Your {{ item.name | cap }}</h1>
    <h1 v-else>Add Your {{ updatedName | cap }}</h1>
    <div class="mt-2">
      <Date-Select v-model="selectDate" :i="0" :label="'Date Stocked'" :date="date" @select="select" :open="open" @open="openMenu(0)"/>
      <Date-Select v-model="selectDate2" :i="1" :label="'Best Before'" :date="date" :noPlaceholder="true" @select="select" :open="open2" @open="openMenu(1)"/>
    </div>
  </div>
  <div v-else-if="hash == 1">
    <h1 v-if="item">Add Your {{ item.name | cap }}</h1>
    <h1 v-else>Add Your {{ updatedName | cap }}</h1>
    <p class="mt-2">Choose the most appropriate category & type</p>
    <!-- <Floating-Select 
      @input="setCategory($event)"
      :value="item ? getCategory(item.category) : category" 
      :options="categoryNames" 
      :label="'Food Category'" 
      :key="1"
    /> -->
    <Floating-Select
      @input="category = $event.id"
      :value="item ? item.category : category"
      :object="true"
      :options="categories"
      :label="'Food Category'" 
      :key="1"
    />
    <Floating-Select 
      @input="type = $event.value" 
      :value="item ? item.type : type"
      :options="setType(category)" 
      :label="'Food Type'" 
      :key="0"
      />
  </div>
  <div v-else>
    <h1>Add A New Food</h1>
    <div>
      <Floating-Input :data="{ id: 'name', label: 'Name' }" @input="updatedName = $event" :value="item ? item.name : updatedName"/>
      <Floating-Input :data="{ label: 'Quantity', number: true }" v-model="qty"/>
      <Floating-Input :data="{ label: 'Unit' }" :value="item ? item.unit : unit" @input="unit = $event"/>
    </div>
  </div>
  <footer>
    <button v-if="hash == 0 || !hash" @click="refresh(false)">
      Cancel
    </button>
    <button v-else @click="decrement">
      Back
    </button>
    <button
      v-if="hash <= 1 || !hash"
      @click="proceed(updatedName)"
      class="bg-green-500/50">
      Next
    </button>
    <Button-Action
      v-else-if="hash == 2"
      @click="proceed(updatedName)"
      :loading="loading"
      :text="'Add'"
    />
  </footer>
</section>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['name', 'item', 'uid'],
  data: () => ({
    hash: 0,
    category: '',
    categories: [
      {
        id: 'protein',
        name: 'Proteins'
      },      
      {
        id: 'vegetable',
        name: 'Vegetables'
      },
      {
        id: 'fruit',
        name: 'Fruits',
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
    ],
    loading: false,
    open: false,
    open2: false,
    selectDate: '',
    selectDate2: '',
    type: '',
    qty: '',
    updatedName: '',
    unit: ''
  }),
  methods: {
    getCategory(val) {
      let res
      this.categories.forEach(category => {
        const { id, name } = category
        if ( id == val ) {
          res = name.toLowerCase()
        }
      })
      return res
    },
    ...mapActions('db', ['dbCreate']),
    proceed(name) {
      let { hash, setHash, updatedName, validate, selectDate, selectDate2, date, qty, unit, type, category, item } = this

      validate({ name: item && Object.keys(item).length ? item.name : name })
      if (hash == 2) {
        const dateStocked = selectDate || date
        let itemLength
        if ( item ) {
          itemLength = Object.keys(item).length
        }
        const bestBefore = !!selectDate2 ? selectDate2 : ''
        if (this.categories.filter(cat => cat.name == category)[0]) {
          category = this.categories.filter(cat => cat.name == category)[0].id
        }
        this.submit({
          name: updatedName || item.name,
          qty: qty,
          unit: itemLength ? item.unit || '' : unit || '',
          type: itemLength ? item.type || '' : type || '',
          category: itemLength ? item.category || '' : category || '',
          dateStocked: dateStocked || item.dateStocked,
          bestBefore: bestBefore ? new Date(bestBefore) : ''
        })
      } else if (updatedName) {
        if (!hash) {
          setHash(1)
        } else {
          hash++
          setHash(hash)
        }
      } else if (item) {
        if ( Object.keys(item).includes('name')) {
          if (!hash) {
            setHash(1)
          } else {
            hash++
            setHash(hash)
          }  
        }
      }
    },
    decrement() {
      this.hash--
      this.setHash(this.hash)
    },
    handleClick(evt) {
      if (this.open) {
        let parent = document.querySelector('#calendar0')
        if (!parent.contains(evt.target)) {
          this.open = false
        }
      } else {
        parent = document.querySelector('#calendar1')
        if (!parent.contains(evt.target)) {
          this.open2 = false
        }
      }
    },
    setHash(val) {
      if (val) {
        window.location.hash = val
      } else {
        window.location.hash = ''
        window.history.replaceState("", "", window.location.pathname)
      }
    },
    async submit(data) {
      try {
        this.loading = true
        const { uid } = this,
        item = await this.dbCreate({
          url: `documents/users/${ uid }/pantry`,
          collectionId: 'pantry',
          parent: `projects/amenity-fitness/databases/(default)/documents/users/${ uid }`,
          data
        })
        this.$emit('submit', item)
        this.refresh(true)
      } catch (err) {
        console.log(err)
      }
    },
    validate(val) {
      this.$emit('validate', val)
    },
    openMenu(val) {
      if (val == 0) {
        this.open2 = false
        this.open = true
      } else {
        this.open = false
        this.open2 = true
      }
    },
    refresh(success) {
      if (success) {
        this.$emit('success', { message: 'Success' })
      }
      this.$emit('close')
      this.loading = false
      this.setHash()
      this.type = ''
      this.unit = ''
      this.qty = ''
      this.category = ''
      this.updatedName = ''
      this.selectDate = ''
      this.selectDate2 = ''
    },
    select($event) {
      this.open = false
      this.open2 = false
    },
    setType(category) {
      switch(true) {
        case category == 'protein':
          return [
            'Fresh',
            'Dried',
            'Cured',
            'Frozen',
            'Canned',
            'Powdered',
            'Other'
          ]
        case category == 'vegetable':
          return [
            'Fresh',
            'Dried',
            'Frozen',
            'Canned',
            'Jarred',
            'Other'
          ]
        case category == 'fruit':
          return [
            'Fresh',
            'Dried',
            'Frozen',
            'Canned',
            'Jarred',
            'Other'
          ]
        case category == 'grain':
          return [
            'Fresh',
            'Dried',
            'Frozen',
            'Ground',
            'Other'
          ]
        case category == 'dairyAlt':
          return [
            'Fresh',
            'Powdered',
            'Other'
          ]
        case category == 'beverage':
          return [
            'Fresh',
            'Frozen',
            'Canned',
            'Powdered',
            'Other'
          ]
        case category == 'oil':
          return [
            'Liquid',
            'Solid',
            'Spreadable',
            'Other'
          ]
        case category == 'seasoning':
          return [
            'Fresh',
            'Dried',
            'Other'
          ]
        case category == 'sauce':
          return [
            'Bottled',
            'Canned',
            'Jarred',
            'Other'
          ]
        case category == 'ready':
          return [
            'Fresh',
            'Frozen',
            'Canned',
            'Jarred',
            'Other'
          ]
        case category == 'leftover':
          return [
            'Fresh',
            'Frozen',
            'Other'
          ]
        case category == 'confectionary':
          return [
            'Fresh',
            'Dried',
            'Frozen',
            'Packaged',
            'Canned',
            'Jarred',
            'Other'
          ]
        case category == 'baby':
          return [
            'Fresh',
            'Dried',
            'Frozen',
            'Powdered',
            'Packaged',
            'Canned',
            'Jarred',
            'Other'
          ]
        default:
          return [
            'Fresh',
            'Dried',
            'Frozen',
            'Ground',
            'Powdered',
            'Packaged',
            'Canned',
            'Jarred',
            'Cured',
            'Liquid',
            'Solid',
            'Spreadable',
            'Other'
          ]
      }
    },
    // setCategory($event) {
    //   const { categories } = this,
    //   { value } = $event
    //   categories.forEach(category => {
    //     const { name, id } = category
    //     if (name == value) {
    //       this.category = name
    //     }
    //   })
    // }
  },
  computed: {
    categoryNames() {
      const { categories } = this
      let array = []
      categories.forEach(category => {
        array.push(category.name)
      })
      return array
    },
    date() {
      const date = new Date()
      date.setMinutes(0)
      date.setHours(0)
      date.setSeconds(0)
      date.setMilliseconds(0)
      return date
    }
  },
  filters: {
    cap(val) {
      if (val) {
        return val.charAt(0, 1).toUpperCase() + val.slice(1)
      }
    }
  },
  watch: {
    $route({ hash }) {
      this.hash = hash.split('#')[1]
    },
  }
}
</script>
<style scoped>
footer {
  @apply flex flex-row justify-end pt-4 space-x-4
}
</style>