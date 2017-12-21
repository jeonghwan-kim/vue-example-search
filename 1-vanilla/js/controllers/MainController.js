import SearchFormView from '../views/SearchFormView.js'
import SearchResultView from '../views/SearchResultView.js'
import TabView from '../views/TabView.js'
import SearchKeywordView from '../views/SearchKeywordView.js'
import SearchHistoryView from '../views/SearchHistoryView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[MainController]'

export default {
  init() {
    SearchFormView.setup(document.querySelector('form'))
      .on('submitForm', e => this.onSubmit(e.detail.input))
      .on('resetForm', e => this.onResetForm())

    SearchResultView.setup(document.querySelector('#search-result'))

    SearchKeywordView.setup(document.querySelector('#search-keyword'))    
      .on('clickKeyword', e => this.onClickKeyword(e.detail.keyword))
    SearchHistoryView.setup(document.querySelector('#search-history'))
      .on('clickKeyword', e => this.onClickHistory(e.detail.keyword))
      .on('clickRemove', e => this.onRemvoeHistory(e.detail.keyword))

    TabView.setup(document.querySelector('#tabs'))
      .on('changeTab', e => this.onChnageTab(e.detail.tabName))

    this.selectedTab = '추천 검색어'
    this.renderView()
  },
  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
  },
  onResetForm(e) {
    console.log(tag, 'onResetForm()')
    this.renderView()
  },
  onClickKeyword(keyword) {
    console.log(tag, 'onClickKeyword()', keyword)
    this.search(keyword)
  },
  onClickHistory(keyword) {
    console.log(tag, 'onClickHistory()', keyword)
    this.search(keyword)
  },
  onRemvoeHistory(keyword) {
    console.log(tag, 'onRemvoeHistory()', keyword)
    HistoryModel.remove(keyword)
    this.renderView()
  },
  onChnageTab(tabName) {
    console.log(tag, 'onChnageTab()', tabName)
    this.selectedTab = tabName
    this.renderView()
  },
  renderView() {
    console.log(tag, 'renderView()')
    TabView.setActiveTab(this.selectedTab)
    
    if (this.selectedTab === '추천 검색어') {
      this.fetchSearchKeywords()
      SearchHistoryView.hide()
    } else {
      this.fetchSearchHistory()
      SearchKeywordView.hide()
    }

    SearchResultView.hide()
  },
  search(query) {
    SearchFormView.setValue(query)
    HistoryModel.add(query)
    SearchModel.list(query).then(data => {
      this.searchResult(data)
    })
  },
  searchResult(data) {
    TabView.hide()
    SearchKeywordView.hide()
    SearchHistoryView.hide()
    SearchResultView.render(data)
  },
  fetchSearchKeywords() {
    KeywordModel.list().then(data => SearchKeywordView.render(data))
  },
  fetchSearchHistory() {
    HistoryModel.list().then(data => SearchHistoryView.render(data).bindRemoveBtn())
  }
}