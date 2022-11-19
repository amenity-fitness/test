<template>  
  <span @click="id == focus ? $emit('input', null) : $emit('input', id)" v-if="items.length" :id="`${id}-child`">
  <!-- <span v-if="items.length" :id="`${id}-child`"> -->
    <div class="relative flex">
      <!-- <button
        v-if="focus !== id"
        @click="$emit('input', id)"
        class="absolute left-2 top-5 h-6 w-6 p-0 m-0 bg-gray-100 rounded-full">
        <img :src="require('~/assets/svg/plus.svg')" alt="">
      </button>
      <button 
        v-else
        @click="$emit('input', null)"
        class="absolute left-2 top-5 h-6 w-6 p-0 m-0 bg-gray-100 rounded-full">
        <img :src="require('~/assets/svg/minus.svg')" alt="">
      </button>
      <div class="basis-10" /> -->
      <h2 class="pt-5 pl-4 pb-4">{{ name }}</h2>
    </div>
    <transition name="fade">
      <div v-show="focus == id && items.length">
        <div
          v-for="(item, i) in items" :key="i">
          <Pantry-Item
            @return="$emit('return', $event)"
            @setEdit="$emit('setEdit', $event)"
            @editItem="$emit('editItem', $event)"
            @removeItem="$emit('removeItem', $event)"
            @setDialog="$emit('setDialog', $event)"
            @showDetails="$emit('showDetails', $event)"
            :edit="edit"
            :items="items"
            :ogItems="filteredItems(item)"
            :details="details"
            :bestBefore="item.bestBefore"
            :category="item.category"
            :dateStocked="item.dateStocked"
            :first="item.first"
            :name="item.name"
            :qty="item.qty"
            :type="item.type"
            :unit="item.unit"
            :i="i"
            :id="item.id"
          />
        </div>
      </div>
    </transition>
  </span>
</template>
<script>
export default {
  props: ['id', 'focus', 'ogItems', 'items', 'name', 'details', 'edit'],
  filters: {
    cap(val) {
      if (val) {
        return val.charAt(0, 1).toUpperCase() + val.slice(1)
      }
    }
  },
  methods: {
    filteredItems(item) {
      const { ogItems } = this
      if ( ogItems.length ) {
        return ogItems.filter((abc) => abc.name == item.name)
      } else {
        return []
      }
    }
  }
}
</script>