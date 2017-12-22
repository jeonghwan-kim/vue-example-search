<template>
  <ul class="list">
    <li v-for="(item, index) in data" v-on:click="onClickList(item.keyword)">
      <span class="number" v-if="recommendType">{{index + 1}}</span>
      {{item.keyword}}
      <span class="date" v-if="historyType">{{item.date}}</span>
      <button class="btn-remove" v-if="historyType" 
        v-on:click.stop="onRemoveHistory(item.keyword)"></button>
    </li>
  </ul>
</template>

<script>
export default {
  template: '#keyword-list',
  props: ['type', 'data'],
  computed: {
    recommendType() {
      return this.type === 'recommend'
    },
    historyType() {
      return this.type === 'history'
    }
  },
  methods: {
    onClickList(keyword) {
      this.$emit('@click', keyword)
    },
    onRemoveHistory(keyword) {
      this.$emit('@remove', keyword)
    }
  }
}
</script>