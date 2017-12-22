export default {
  template: '#search-form',
  props: ['value'],
  data() {
    return {
      input: this.value
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.input = newVal
    }
  },
  methods: {
    onSubmit(e) {
      this.$emit('@submit', this.input.trim())
    },
    onReset() {
      this.input = ''
      this.$emit('@reset')
    },
    setValue(value) {
      this.input = value
    }
  }
}