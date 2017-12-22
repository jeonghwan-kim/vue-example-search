<template>
  <form v-on:submit.prevent="onSubmit">
    <input type="text" 
      placeholder="검색어를 입력하세요." 
      autofocus 
      v-model="input" />
    <button type="reset"
      class="btn-reset" 
      v-show="input.length" 
      v-on:click.stop="onReset"></button>
  </form>
</template>

<script>
export default {
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
</script>
