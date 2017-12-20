<template>
  <form v-on:submit="onSubmit">
    <input type="text" placeholder="검색어를 입력하세요." autofocus v-bind:value="input">
    <button v-show="input.length" type="reset" class="btn-reset" 
      v-on:click.stop="onClickReset"></button>
  </form>
</template>

<script>
  export default {
    name: 'search-form',
    props: ['value'],
    computed: {
      input() {
        return this.value
      }
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
</script>
