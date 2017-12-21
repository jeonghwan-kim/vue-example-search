import SearchFormView from '../views/SearchFormView.js'
import SearchResultView from '../views/SearchResultView.js'
import SearchKeywordView from '../views/SearchKeywordView.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'

const tag = '[MainController]'

export default {
  init() {
    SearchFormView.init(document.querySelector('form'))
    SearchFormView.on('submitForm', this.onSubmit)
    SearchFormView.on('resetForm', this.onResetForm)

    SearchResultView.init(document.querySelector('#search-result'))
    SearchKeywordView.init(document.querySelector('#search-keyword'))    
    SearchKeywordView.on('clickKeyword', e => this.onClickKeyword(e))

    KeywordModel.list().then(data => SearchKeywordView.render(data))
    
  },
  onSubmit(e) {
    console.log(tag, 'onSubmit', e.detail.input)
    search(e.detail.input)
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
  search(query) {
    SearchModel.list(query).then(data => {
      SearchResultView.render(data)
    })
  }
  
}