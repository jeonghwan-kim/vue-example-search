// import KeywordModel from '../models/KeywordModel.js'
// import HistoryModel from '../models/HistoryModel.js'

export default {
  template: '#list',
  props: ['data', 'type'],
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