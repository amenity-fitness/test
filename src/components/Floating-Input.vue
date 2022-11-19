<template>
  <div
    class="relative"
    @click="$emit('clear', i)"
    :class="label ? 'mt-6' : ''">
    <textarea
      class="border-b"
      v-if="multi"
      cols="30"
      rows="5"
      placeholder=" "
      :class="error ? 'border-red-500' : ''"
      :value="value"
      :name="id"
      :id="id"
      @input="updateValue"
      @focus="$emit('clear', i)"
      @blur="validate"/>
    <input 
      v-else
      placeholder=" "
      :type="filterType(id)"
      class="border-b"
      :class="error ? 'border-red-500' : ''"
      :value="id == 'number' ? ccValue : value"
      :name="id"
      :id="id"
      @input="updateValue"
      @blur="validate"
      @focus="handleFocus($event)">
    <label :for="id">{{ label }}</label>
    <span
      v-if="data.password"
      class="absolute right-1 top-0 h-full flex items-center">
      <Password-Toggle 
        v-model="viewPassword"/>
    </span>
  </div>
</template>

<script>
export default {
  data: () => ({
    viewPassword: false,
    ccValue: null,
    amex: null
  }),
  props: ['data', 'value', "i"],
  methods: {
    filterType(id) {
      const { data, viewPassword } = this
      switch (true) {
        case id == 'number':
          return 'tel'
        case data.password && !viewPassword:
          return 'password'
        case data.email:
          return 'email'
        case data.number:
          return 'number'
        default:
          return 'text'
      }
    },
    formatCC(cc) {
      const firstDigit = cc.substr(0, 1)
      switch (true) {
        case firstDigit == 3:
          this.amex = true
          break
        default:
          this.amex = false
      }
      if (this.amex) {
        const firstFour = cc.substr(0, 4)
        const secondSix = cc.substr(4, 6)
        const thirdFive = cc.substr(10, 5)
        switch (true) {
          case cc.length <= 4:
            this.ccValue = `${ firstFour }`
            break
          case cc.length <= 10:
            this.ccValue = `${ firstFour } ${ secondSix }`
            break
          case cc.length <= 15:
            this.ccValue = `${ firstFour } ${ secondSix } ${ thirdFive }`
            break
        }
      } else {
        const firstFour = cc.substr(0, 4)
        const secondFour = cc.substr(4, 4)
        const thirdFour = cc.substr(8, 4)
        const fourthFour = cc.substr(12, 4)
        switch (true) {
          case cc.length <= 4:
            this.ccValue = `${ firstFour }`
            break
          case cc.length <= 8:
            this.ccValue = `${ firstFour } ${ secondFour }`
            break
          case cc.length <= 12:
            this.ccValue = `${ firstFour } ${ secondFour } ${ thirdFour }`
            break
          case cc.length <= 16:
            this.ccValue = `${ firstFour } ${ secondFour } ${ thirdFour } ${ fourthFour }`
            break
        }
      }
    },
    handleFocus(e) {
      this.$emit('focus', e.srcElement)
      this.$emit('clear, i')
    },
    validate(e) {
      if (!e.target.value) {
        this.$emit('error', this.i)
      }
    },
    updateValue(e) {
      if ( this.id == 'number') {
        const str = e.target.value
        const noSpaces = str.replace(/\s/g, '')
        this.$emit('input', noSpaces)
      } else {
        this.$emit('input', e.target.value)
      }
    },
  },
  computed: {
    error() {
      return this.data['error']
    },
    id() {
      return this.data['id']
    },
    label() {
      return this.data['label']
    },
    multi() {
      return this.data['multi']
    },
  },
  watch:{
    value(val) {
      const { id } = this
      switch (true) {
        case id == 'tempo':
          if (val.length == 1) {
            this.$emit('next')
          }
          break
        case id == 'number':
          if (val.length == 16) {
            this.$emit('next')
          }
          this.formatCC(val)
          break
        case id == 'exp_month':
          if (val.length == 2) {
            this.$emit('next')
          }
          break
        case id == 'exp_year': {
          if (val.length == 4) {
            this.$emit('next')
          }
        }
      }
        
      }
  }
}
</script>