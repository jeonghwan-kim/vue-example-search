import SearchFormView from '../views/SearchFormView.js'
import SearchResultView from '../views/SearchResultView.js'
import TabView from '../views/TabView.js'
import SearchKeywordView from '../views/SearchKeywordView.js'


import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'

const tag = '[MainController]'

export default {
  init() {
    SearchFormView.setup(document.querySelector('form'))
      .on('submitForm', e => this.onSubmit(e))
      .on('resetForm', e => this.onResetForm())

    SearchResultView.setup(document.querySelector('#search-result'))
    SearchKeywordView.setup(document.querySelector('#search-keyword'))    
      .on('clickKeyword', e => this.onClickKeyword(e))

    TabView.setup(document.querySelector('#tabs'))
      .on('changeTab', e => this.onChnageTab(e.detail.tabName))

    KeywordModel.list().then(data => SearchKeywordView.render(data))
    
  },
  onSubmit(e) {
    console.log(tag, 'onSubmit', e.detail.input)
    this.search(e.detail.input)
  },
  onResetForm(e) {
    console.log(tag, 'onResetForm')
    SearchResultView.reset()
  },
  onClickKeyword(e) {
    console.log(tag, e.detail)
    SearchFormView.setValue(e.detail.keyword)
    this.search(e.detail.keyword)
  },
  onChnageTab(tabName) {
    console.log(tag, 'onChnageTab()', tabName)
  },
  search(query) {
    SearchModel.list(query).then(data => {
      SearchResultView.render(data)
    })
  } 
}