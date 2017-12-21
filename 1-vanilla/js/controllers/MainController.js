import SearchForm from './SearchFormController.js'

const tag = '[MainController]'

export default {
  init() {
    SearchForm.init(document.querySelector('form'))
    SearchForm.on('submitForm', this.onSubmit)
    SearchForm.on('resetForm', this.onResetForm)
  },
  onSubmit(e) {
    console.log(tag, 'onSubmit', e.detail.input)
    // todo 
  },
  onResetForm(e) {
    console.log(tag, 'onResetForm')
    // todo 
  }
  
}