import historyService from './historyService.js'
import searchService from './searchService.js'

import searchForm from './components/searchForm.js'
import searchResult from './components/searchResult.js'
import keywordList from './components/keywordList.js'

new Vue({
  el: '#app',
  data: {
    tabs: ['추천 검색어', '최근 검색어'],
    selectedTab: '',
    query: '',
    submitted: false
  },
  components: {
    'search-form': searchForm,
    'search-result': searchResult,
    'keyword-list': keywordList,
  },
  created() {
    this.selectedTab = this.tabs[0]
  },
  methods: {
    onSubmit(query) {
      this.query = query
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
    search() {
      console.log('search()', this.query)
      this.submitted = true
      searchService.list().then(data => this.searchResult = data)
      historyService.add(this.query)
    },
  }
})