<template>
<div :id="'id' + id" @click="handleClick">
  <h4 class="flex" v-if="first">
    <span class="basis-10"/>
    {{ type && type.length ? type : 'other' | cap }}
  </h4>
  <div class="relative flex" >
    <div v-if="details == 'id' + id"
      :class="edit ? 'w-full md:w-[75%] left-0 ml-auto mr-auto' : 'w-full md:w-[50%]'"
      class="z-10 flex absolute -top-10 transition-all p-2">
      <div v-if="!edit" class="hidden md:block h-0 w-0 mt-10 border-[10px] border-transparent border-r-gray-700"/>
      <div v-if="items" class="rounded bg-gray-700 grow px-4 py-2 space-y-2" >
        <h2 class="text-center">Details for {{ name | cap }}</h2>
        <div v-for="(item, n) in ogItems.filter(item => item.unit == unit)" :key="n">
          <span v-if="!!edit && edit == item.id" class="flex items-center space-x-2">
            <div class="grow">
              <div class="flex">
                <Floating-Input
                  :value="modified.includes('qty') ? updQty : item.qty"
                  @input="modify($event, 'qty', 'updQty')" class="grow"
                  :data="{ label: 'Quantity', number: true }"
                />
                <Floating-Input
                  :value="modified.includes('unit') ? updUnit : item.unit"
                  @input="modify($event, 'unit', 'updUnit')"
                  class="grow"
                  :data="{ label: 'Unit' }"/>

              </div>
              <Date-Select 
                :i="0"
                :label="'Date Stocked'"
                :date="new Date(item.dateStocked)"
                @select="select($event, { i: 0 } )"
                :open="open"
                @open="openMenu(0)"/>
              <Date-Select 
                :i="1"
                :label="'Best Before'"
                :date="item.bestBefore ? new Date(item.bestBefore) : date"
                @select="select($event, { i: 1 } )"
                :open="open2"
                :noPlaceholder="item.bestBefore ? false : true"
                @open="openMenu(1)"/>
            </div>
            <hr class="mt-1">
          </span>
          <span v-show="!edit">
            <div class="flex items-center">
              <div class="grow text-sm">
                <h4 class="text-md font-bold">
                  {{ item.qty }} {{ item.unit | cap }}
                </h4>
                <p>
                  <span class="font-bold">
                    Date Stocked<br>
                  </span>{{ item.dateStocked | shortDate }}
                </p>
                <p v-if="item.bestBefore">
                  <span class="font-bold">
                    Best Before<br>
                  </span>{{ item.bestBefore | shortDate }}
                </p>
              </div>
              <button @click="$emit('setEdit', item.id)">{{ 'Edit' }}</button>
            </div>
            <hr v-if="n !== ogItems.filter(item => item.unit == unit).length - 1" class="mt-2">
          </span>
        </div>
        <footer class="flex flex-row-reverse w-full">
          <div v-if="edit" class="space-x-2">
            <Button-Action @click="removeItem(edit)" :text="'Remove'" :minimal="true" :loading="loading"/>
            <Button-Action @click="editItem(id)" :text="'Edit'" :loading="loading"/>
          </div>
          <span v-if="edit" class="grow"></span>
          <button v-if="edit" @click="$emit('return')">Return</button>
          <button v-if="!edit" @click="addItem">Add</button>
        </footer>
      </div>
    </div>
    <span class="basis-20"/>
    <h4 class="grow py-4" @click="$emit('showDetails', 'id' + id)">
      {{ qty }} {{ unit }} {{ name }}
    </h4>
  </div>
</div>
</template>

<script>
export default {
  data: () => ({
    updBB: null,
    updDS: null,
    updQty: null,
    updUnit: null,
    open: false,
    open2: false,
    selectDate: null,
    modified: []
  }),
  props: [ 'bestBefore', 'category', 'dateStocked', 'first', 'name', 'qty', 'type', 'unit', 'i', 'id', 'details', 'loading', 'ogItems', 'items', 'edit' ],
  methods: {
    modify ($event, id, val) {
      this[val] = $event
      if (!this.modified.includes(id)) {
        this.modified.push(id)
      }
    },
    editItem() {
      const { edit } = this
      let item
      this.ogItems
        .forEach(obj => {
          if (obj.id == edit) {
            item = obj
          }
        })
      const { id, qty, unit } = item,
      { modified, updBB, bestBefore, updDS, dateStocked, updQty, updUnit, name, type } = this,
      dStocked = updDS || dateStocked,
      bBefore = updBB || bestBefore,
      qtys = modified.includes('qty') ? updQty || '' : qty || '',
      units = modified.includes('unit') ? updUnit || '' : unit
      this.$emit('editItem', {
        id,
        qty: qtys,
        unit: units,
        dateStocked: new Date(dStocked),
        bestBefore: bBefore ? new Date(bBefore) : '',
        name,
        type
      })
    },
    handleClick(evt) {
      let parent
      if (this.open) {
        parent = document.querySelector('#calendar0')
        if (!parent.contains(evt.target)) {
          this.open = false
        }
      } 
      if (this.open2) {
        parent = document.querySelector('#calendar1')
        if (!parent.contains(evt.target)) {
          this.open2 = false
        }
      }
      // if (this.edit == true) {
      //   this.edit = false
      // }
    },
    // itemName(qty) {
    //   const { filters } = this.$options
    //   return qty <= 1
    //     ? filters.cap(this.name)
    //     : filters.capPlural(this.name)
    // },
    conditionalClass(i) {
      if (i !== 0) {
        return true
      }
    },
    conditionalType(i) {
      if (i == 0) {
        return this.type + ' : '
      }
    },
    addItem() {
      const { bestBefore, category, dateStocked, name, qty, type, unit } = this
      this.$emit('setDialog', {
        bestBefore,
        category,
        dateStocked,
        name,
        qty,
        type,
        unit
      })
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
    removeItem (id) {
      this.$emit('removeItem', id)
    },
    select($event, obj) {
      const { i } = obj
      if (i == 0) {
        this.updDS = $event
      } else {
        this.updBB = $event
      }
      this.open = false
      this.open2 = false
    },
  },
  computed: {
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
    // capPlural(val) {
    //   if (val) {
    //     if (val.charAt(val.length - 1, 1) == 'y') {
    //       return val.charAt(0, 1).toUpperCase() + val.slice(1, val.length - 1) + 'ies'
    //     } else if (val.charAt(val.length - 1, 1) !== 's') {
    //       return val.charAt(0, 1).toUpperCase() + val.slice(1) + 's'
    //     } else {
    //       return val.charAt(0, 1).toUpperCase() + val.slice(1)
    //     }
    //   }
    // },
    cap(val) {
      if (val) {
        return val.charAt(0, 1).toUpperCase() + val.slice(1)
      }
    },
    shortDate(date) {
      return new Date(date)
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
    }
  }
}
</script>
<style scoped>
</style>