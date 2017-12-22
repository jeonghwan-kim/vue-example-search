<template>
  <div id="app">
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <search-form v-bind:value="query" v-on:@submit="onSubmit" 
        v-on:@reset="onReset"></search-form>

      <div class="content">
        <div v-if="!submitted">
          <ul class="tabs">
            <li v-for="tab in tabs" v-on:click="onChangeTab(tab)" 
              v-bind:class="{active: tab === selectedTab}">
              {{tab}}
            </li>
          </ul>

          <div v-if="selectedTab === tabs[0]">
            <list type="recommend" v-bind:data="keywords" 
              v-on:@click="onClickKeyword">
            </list>
          </div>
          
          <div v-if="selectedTab === tabs[1]">
            <list type="history" v-bind:data="history" 
              v-on:@click="onClickKeyword" v-on:@remove="onRemoveKeyword">
            </list>
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
import HistoryModel from './models/HistoryModel.js'
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'

import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import ListComponent from './components/ListComponent.vue'

export default {
  name: 'app',
  data() {
    return {
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      query: '',
      submitted: false,
      keywords: [],
      history: [],
      searchResult: []
    }
  },
  components: {
    'search-form': FormComponent, 
    'search-result': ResultComponent, 
    'list': ListComponent
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
}
</script>
