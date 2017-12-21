import SearchKeywordView from './SearchKeywordView.js'

const tag = '[SearchHistoryView]'

const SearchHistoryView = Object.create(SearchKeywordView)

SearchHistoryView.getKeywordsHtml = function (data) {
  return data.reduce((html, item) => {
    html += `<li data-keyword="${item.keyword}">${item.keyword} <span class="date">${item.date}</span>
      <button class="btn-remove"></button></li>`
    return html
  }, '<ul class="list">') + '</ul>'
}
SearchHistoryView.bindRemoveBtn = function() {
  Array.from(this.el.querySelectorAll('button.btn-remove')).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation()
      this.onRemove(btn.parentElement.dataset.keyword)
    })
  })
}
SearchHistoryView.onRemove = function (keyword) {
  this.emit('clickRemove', { keyword })
}


export default SearchHistoryView