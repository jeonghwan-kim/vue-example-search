// Views
import FormView from '../views/FormView.js'
import ResultView from '../views/ResultView.js'
import TabView from '../views/TabView.js'
import KeywordView from '../views/KeywordView.js'
import HistoryView from '../views/HistoryView.js'

// Models
import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'
import HistoryModel from '../models/HistoryModel.js'

const tag = '[MainController]'

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))
      .on('@reset', e => this.onResetForm())

    ResultView.setup(document.querySelector('#search-result'))

    KeywordView.setup(document.querySelector('#search-keyword'))    
      .on('@click', e => this.onClickKeyword(e.detail.keyword))
    HistoryView.setup(document.querySelector('#search-history'))
      .on('@click', e => this.onClickHistory(e.detail.keyword))
      .on('@remove', e => this.onRemvoeHistory(e.detail.keyword))

    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChnageTab(e.detail.tabName))

    this.selectedTab = '추천 검색어'
    this.renderView()
  },
  onSubmit(input) {
    console.log(tag, 'onSubmit()', input)
    this.search(input)
  },
  onResetForm() {
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
      HistoryView.hide()
    } else {
      this.fetchSearchHistory()
      KeywordView.hide()
    }

    ResultView.hide()
  },
  search(query) {
    FormView.setValue(query)
    HistoryModel.add(query)
    SearchModel.list(query).then(data => {
      this.onSearchResult(data)
    })
  },
  onSearchResult(data) {
    TabView.hide()
    KeywordView.hide()
    HistoryView.hide()
    ResultView.render(data)
  },
  fetchSearchKeywords() {
    KeywordModel.list().then(data => KeywordView.render(data))
  },
  fetchSearchHistory() {
    HistoryModel.list().then(data => HistoryView.render(data).bindRemoveBtn())
  }
}