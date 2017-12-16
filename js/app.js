import keywordService from './keywordService.js'
import historyService from './historyService.js'
import searchService from './searchService.js'

new Vue({
  el: '#app',
  data: {
    tabs: ['추천 검색어', '최근 검색어'],
    keywords: [],
    history: [],
    searchResult: [],
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
      this.searchResult = []
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
      historyService.remove(keyword)
      this.fetchHistory()
    },
    search() {
      console.log('search()', this.query)
      this.submitted = true
      searchService.list().then(data => this.searchResult = data)
      historyService.add(this.query)
      this.fetchHistory()
    },
    fetchKeyword() {
      keywordService.list().then(data => this.keywords = data)
    },
    fetchHistory() {
      historyService.list().then(data => this.history = data)
    }
  }
})