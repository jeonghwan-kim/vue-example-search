import SearchForm from './views/SearchForm.js'

const tag = '[app]'

const onload = () => {
  SearchForm.init(document.querySelector('form'))
  SearchForm.on('submitForm', onSubmit)
  SearchForm.on('resetForm', onResetForm)
};

const onSubmit = e => {
  console.log(tag, 'onSubmit', e.detail.input)
  // todo 
}
const onResetForm = e => {
  console.log(tag, 'onResetForm')
  // todo 
}

document.addEventListener('DOMContentLoaded', onload)