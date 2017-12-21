import View from './View.js'
const tag = '[SearchResultView]'
const SearchResultView = Object.create(View)


SearchResultView._messages = {
  NO_RESULT: '검색결과가 없습니다'
}
SearchResultView.setup = function (el) {
  return this.init(el)
}
SearchResultView.render = function (data = []) {
  console.log(tag, 'render()', data)
  this.el.innerHTML = data.length ? this._getSearchResultsHtml(data) : this._messages.NO_RESULT
}
SearchResultView.reset = function () {
  console.log(tag, 'reset()')
  this.el.innerHTML = ''
}
SearchResultView._getSearchResultsHtml = function (data) {
  return data.reduce((html, item) => {
    html += this._getSearchItemHtml(item)
    return html
  }, '<ul>') + '</ul>' 
}
SearchResultView._getSearchItemHtml = function(item) {
  return `<li>
      <img src="${item.image}">
      <p>${item.name}</p>
    </li>`
}

export default SearchResultView