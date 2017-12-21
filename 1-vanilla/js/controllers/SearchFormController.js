const tag = '[SearchFormController]'

export default {
  init(el) {
    if (!el) throw 'el'
    this.el = el
    this.inputEl = el.querySelector('[type=text]')
    this.resetEl = el.querySelector('[type=reset]')
    this.showResetBtn(false)
    this.bindEvents()
  },
  showResetBtn(show = true) {
    this.resetEl.style.display = show ? 'block' : 'none'
  },
  on(event, handler) {
    this.el.addEventListener(event, handler)
  },
  bindEvents() {
    this.el.addEventListener('submit', e=> e.preventDefault())
    this.inputEl.addEventListener('keyup', e => {
      const enter = 13
      this.showResetBtn(this.inputEl.value.length)
      if (e.keyCode !== enter) return 

      console.log(tag, 'enter')
      const evt = new CustomEvent('submitForm', {detail: {input: this.inputEl.value}})
      this.el.dispatchEvent(evt)
    })
    this.resetEl.addEventListener('click', e => {
      const evt = new CustomEvent('resetForm')
      this.el.dispatchEvent(evt)
      this.showResetBtn(false)
    })
  },
  setValue(value = '') {
    this.inputEl.value = value
    this.showResetBtn(this.inputEl.value.length)
  }
}