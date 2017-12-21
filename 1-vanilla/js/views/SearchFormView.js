import View from './View.js'

const tag = '[SearchFormView]'

const SearchFormView = Object.create(View)

SearchFormView.setup = function (el) {
  this.init(el)
  this.inputEl = el.querySelector('[type=text]')
  this.resetEl = el.querySelector('[type=reset]')
  this.showResetBtn(false)
  this.bindEvents()
  return this
}
SearchFormView.showResetBtn = function (show = true) {
  this.resetEl.style.display = show ? 'block' : 'none'
}
SearchFormView.bindEvents = function() {
  this.on('submit', e => e.preventDefault())
  this.inputEl.addEventListener('keyup', e => {
    const enter = 13
    this.showResetBtn(this.inputEl.value.length)
    if (e.keyCode !== enter) return

    console.log(tag, 'enter')
    this.emit('submitForm', { input: this.inputEl.value })
  })
  this.resetEl.addEventListener('click', e => {
    this.emit('resetForm')
    this.showResetBtn(false)
  })
}
SearchFormView.setValue = function (value = '') {
  this.inputEl.value = value
  this.showResetBtn(this.inputEl.value.length)
}

export default SearchFormView