import View from './View.js'

const tag = '[SearchKeywordView]'

const SearchKeywordView = Object.create(View)
SearchKeywordView.messages = {
  NO_KEYWORDS: 'NO_KEYWORDS'
}
SearchKeywordView.setup = function (el) {
  return this.init(el)
}
SearchKeywordView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : this.messages.NO_KEYWORDS
  this.show()
  this.bindClickEvent()
  return this
}
SearchKeywordView.getKeywordsHtml = function (data) {
  return data.reduce((html, keyword, index) => {
    html += `<li data-keyword="${keyword}"><span class="number">${index + 1}</span> ${keyword}</li>`
    return html
  }, '<ul class="list">') + '</ul>'
}
SearchKeywordView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(el => {
    el.addEventListener('click', e => {
      this.onClickKeyword(e)
    })
  })
}
SearchKeywordView.onClickKeyword = function (e) {
  const {keyword} = e.currentTarget.dataset
  console.log(tag, keyword)
  this.emit('clickKeyword', { keyword })
}

export default SearchKeywordView