import keywordService from '../keywordService.js'
import historyService from '../historyService.js'

export default {
  template: `<ul class="list">
              <li v-for="(keyword, index) in keywords" v-on:click="onClickKeyword(keyword)">
                <span v-if="recommandType" class="number">{{index + 1}}</span>
                  {{keyword}}
                <span v-if="historyType" class="date">12.11</span>
                <button v-if="historyType" class="btn-remove" v-on:click.stop="onClickRemoveHistory(keyword)"></button>
              </li>
            </ul>`,
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