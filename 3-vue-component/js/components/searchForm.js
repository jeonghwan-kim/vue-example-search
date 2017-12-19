export default {
  template: '#search-form',
  props: ['value'],
  computed: {
    input() {
      return this.value
    }
  },
  created() {
    console.log('created')
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$emit('submit', this.input.trim())
    },
    onClickReset() {
      this.$emit('reset')
    }
  }
}