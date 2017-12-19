import keywordService from '../services/keyword.js'
import historyService from '../services/history.js'

export default {
  template: '#keyword-list',
  props: ['type'],
  data() {
    return {
      keywords: []
    }
  },
  created() {
    this.fetch()
  },
  computed: {
    recommandType() {
      return this.type === 'recommand'
    },
    historyType() {
      return this.type === 'history'
    },
  },
  methods: {
    onClickKeyword(keyword) {
      this.$emit('click-keyword', keyword)
    },
    onClickRemoveHistory(keyword) {
      historyService.remove(keyword)
      this.fetch()
    },
    fetch() {
      const service = this.recommandType ? keywordService : historyService
      service.list().then(data => this.keywords = data)
    }
  }
}