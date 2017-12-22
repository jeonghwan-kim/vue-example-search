import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'
import SearchModel from './models/SearchModel.js'

new Vue({
  el: '#app',
  data: {
    tabs: ['추천 검색어', '최근 검색어'],
    keywords: [],
    history: [],
    result: [],
    selectedTab: '',
    query: '',
    submitted: false
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
    this.fetchHistory()
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.search()
    },
    onClickReset() {
      this.query = ''
      this.submitted = false
      this.result = []
    },
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search()
    },
    onClickRemoveHistory(keyword) {
      console.log('onClickRemoveHistory', keyword)
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    search() {
      console.log('search()', this.query)
      this.submitted = true
      SearchModel.list().then(data => this.result = data)
      HistoryModel.add(this.query)
      this.fetchHistory()
    },
    fetchKeyword() {
      KeywordModel.list().then(data => this.keywords = data)
    },
    fetchHistory() {
      HistoryModel.list().then(data => this.history = data)
    }
  }
})