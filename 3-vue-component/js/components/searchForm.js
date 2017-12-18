export default {
  template: `<form v-on:submit="onSubmit">
        <input type="text" placeholder="검색어를 입력하세요." autofocus v-model="query">
        <button v-show="query.length" type="reset" class="btn-reset" v-on:click.stop="onClickReset"></button>
      </form>`,
  props: ['query'],
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$emit('submit', this.query.trim())
    },
    onClickReset() {
      this.query = ''
      this.$emit('reset')
    }
  }
}