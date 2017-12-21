const tag = '[SearchKeywordController]'

export default {
  messages: {
    NO_KEYWORDS: 'NO_KEYWORDS'
  },
  init(el) {
    if (!el) throw 'el'
    this.el  = el
  },
  on(event, handler) {
    this.el.addEventListener(event, handler)
  },
  render(data = []) {
    this.el.innerHTML = data.length ? this._getKeywordsHtml(data) : this.messages.NO_KEYWORDS
    this._bindClickEvent()
  },
  _getKeywordsHtml(data) {
    return data.reduce((html, keyword, index) => {
      html += `<li data-keyword="${keyword}"><span class="number">${index + 1}</span> ${keyword}</li>`
      return html
    }, '<ul class="list">') + '</ul>'
  },
  _bindClickEvent() {
    Array.from(this.el.querySelectorAll('li')).forEach(el => {
      el.addEventListener('click', e => this._onClickKeyword(e))
    })
  },
  _onClickKeyword(e) {
    const {keyword} = e.currentTarget.dataset
    console.log(tag, keyword)
    const evt = new CustomEvent('clickKeyword', {detail: {keyword}})
    this.el.dispatchEvent(evt)
  }
  
}