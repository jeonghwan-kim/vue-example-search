import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.js'
import ResultComponent from './components/ResultComponent.js'
import ListComponent from './components/ListComponent.js'

new Vue({
  el: '#app',
  data: {
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    query: '',
    submitted: false,
    keywords: [],
    history: [],
    searchResult: []
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeywords()
    this.fetchHistory()
  },
  methods: {
    onSubmit(query) {
      this.query = query
      this.search()
    },
    onReset() {
      this.query = ''
      this.submitted = false
      this.searchResult = []
    },
    onChangeTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search()
    },
    onRemoveKeyword(keyword) {
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    search() {
      this.submitted = true
      SearchModel.list().then(data => this.searchResult = data)
      HistoryModel.add(this.query)
      this.fetchHistory()
    },
    fetchKeywords() {
      KeywordModel.list().then(data => this.keywords = data)
    },
    fetchHistory() {
      HistoryModel.list().then(data => this.history = data)
    }
  }
})