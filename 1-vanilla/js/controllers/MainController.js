import SearchForm from './SearchFormController.js'
import SearchResult from './SearchResultController.js'
import SearchKeyword from './SearchKeywordController.js'

import SearchModel from '../models/SearchModel.js'
import KeywordModel from '../models/KeywordModel.js'

const tag = '[MainController]'

export default {
  init() {
    SearchForm.init(document.querySelector('form'))
    SearchForm.on('submitForm', this.onSubmit)
    SearchForm.on('resetForm', this.onResetForm)

    SearchResult.init(document.querySelector('#search-result'))
    SearchKeyword.init(document.querySelector('#search-keyword'))    
    SearchKeyword.on('clickKeyword', e => this.onClickKeyword(e))

    KeywordModel.list().then(data => SearchKeyword.render(data))
    
  },
  onSubmit(e) {
    console.log(tag, 'onSubmit', e.detail.input)
    search(e.detail.input)
  },
  onResetForm(e) {
    console.log(tag, 'onResetForm')
    SearchResult.reset()
  },
  onClickKeyword(e) {
    console.log(tag, e.detail)
    SearchForm.setValue(e.detail.keyword)
    this.search(e.detail.keyword)
  },
  search(query) {
    SearchModel.list(query).then(data => {
      SearchResult.render(data)
    })
  }
  
}