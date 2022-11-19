<template>
<section>
  <button
    v-if="!buttonless"
    :class="accent ? 'primary' : ''"
    @click="DIALOG_SET(component)">{{ text }}</button>
  <transition name="fade">
    <div v-if="dialog == component" id="overlay" @click="overlayClose">
      <div class="dialog">
        <component
          ref="component"
          :is="component"
          v-bind="data"
          @update="modifiedData = evt"
          @delete="confirmDelete"
          @input="handleUpdate"
          @validate="$emit('validate', { ...$event })"
          @success="$emit('success', $event)"
          @error="$emit('error', $event)"
          @submit="$emit('submit', $event)"
          @close="close"
          @refresh="$emit('refresh')"/>
        <footer v-if="!footerless">
          <button @click="DIALOG_SET(false)" class="shadow-none">Return</button>
          <button v-if="submit" class="bg-accent" @click="confirm">{{ submit || 'Update' }}</button>
        </footer>
      </div>
    </div>
  </transition>
</section>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['component', "data", 'submit', "text", "accent", 'buttonless', 'footerless', 'persistent'],
  data: () => ({
    modifiedData: {}
  }),
  methods: {
    ...mapMutations(['DIALOG_SET', 'ERROR_SHOW']),
    close() {
      this.$emit('close')
      this.DIALOG_SET(false)
    },
    confirmDelete() {
      const message = 'Are you sure you want to delete your account?'
      this.ERROR_SHOW({ message, deleteAccount: true })
    },
    handleUpdate(e) {
      const { id, value } = e
      this.modifiedData[id] = value
    },
    confirm() {
      this.$emit('confirm', this.modifiedData )
      this.modifiedData = {}
      this.$refs['component'].clear()
    },
    overlayClose({ target }) {
      const { persistent } = this
      if (!persistent && target.id == "overlay") {
        this.close()
      }
    }
  },
  computed: {
    ...mapState(['dialog'])
  }
}
</script>
<style>
#overlay {
  @apply fixed top-0 left-0
  h-full w-full z-10 bg-black/50
  flex items-center justify-center
  backdrop-filter backdrop-blur-md
}
.dialog {
  @apply flex flex-col
  bg-foreground rounded-lg shadow-xl
  relative
  max-w-lg w-11/12 p-4
}
.dialog {
  @apply overscroll-none
}
</style>