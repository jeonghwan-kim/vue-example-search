<template>
  <div id="app">
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query" v-on:submit="onSubmit" v-on:reset="onClickReset"></search-form>
      <div class="content">
        <div v-if="!submitted">
          <ul class="tabs">
            <li v-for="tab in tabs" v-on:click="onClickTab(tab)" v-bind:class="{active: tab === selectedTab}">
              {{tab}}
            </li>
          </ul>

          <div v-if="selectedTab === tabs[0]">
            <keyword-list type="recommand" v-on:click-keyword="onClickKeyword"></keyword-list>
          </div>
          
          <div v-if="selectedTab === tabs[1]">
            <keyword-list type="history" v-on:click-keyword="onClickKeyword"></keyword-list>
          </div>
        </div>
        <div v-else>
          <search-result v-bind:data="searchResult"></search-result>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import historyService from './services/history.js'
import searchService from './services/search.js'

import SearchForm from './components/SearchForm.vue'
import SearchResult from './components/SearchResult.vue'
import KeywordList from './components/KeywordList.vue'

export default {
  name: 'app',
  data() {
    return {
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      query: '',
      submitted: false,
      searchResult: []
    }
  },
  components: {
    SearchForm, SearchResult, KeywordList
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
}
</script>

