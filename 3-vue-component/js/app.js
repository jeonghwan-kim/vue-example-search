import HistoryModel from './models/HistoryModel.js'
import searchService from './models/SearchModel.js'

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
    searchResult: []
  },
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'keyword-list': ListComponent,
  },
  created() {
    this.selectedTab = this.tabs[0]
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
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword;
      this.search()
    },
    search() {
      this.submitted = true
      searchService.list().then(data => this.searchResult = data)
      HistoryModel.add(this.query)
    },
  }
})