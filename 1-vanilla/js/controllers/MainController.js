import SearchForm from './SearchFormController.js'
import SearchResult from './SearchResultController.js'
import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default {
  init() {
    SearchForm.init(document.querySelector('form'))
    SearchForm.on('submitForm', this.onSubmit)
    SearchForm.on('resetForm', this.onResetForm)

    SearchResult.init(document.querySelector('#search-result'))
    
  },
  onSubmit(e) {
    console.log(tag, 'onSubmit', e.detail.input)
    SearchModel.list(e.detail.input).then(data => {
      SearchResult.render(data)
    })
  },
  onResetForm(e) {
    console.log(tag, 'onResetForm')
    // todo 
    SearchResult.reset()
  }
  
}