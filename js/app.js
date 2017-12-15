new Vue({
  el: '#app',
  data: {
    tabs: ['추천 검색어', '최근 검색어'],
    keywords: ['이탈리아', '세프의요리', '제철', '홈파티'],
    history: ['검색기록0', '검색기록1', '검색기록2'],
    selectedTab: '',
    query: ''
  },
  created() {
    this.selectedTab = this.tabs[0]

    // todo keywordsService
    // todo historyService
  },
  methods: {
    onSearch() {
      this.search()
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
    },
    search() {
      console.log('search()', this.query)
    }
  }
})