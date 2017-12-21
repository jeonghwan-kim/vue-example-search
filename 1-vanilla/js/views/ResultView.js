import View from './View.js'

const tag = '[SearchResultView]'

const SearchResultView = Object.create(View)

SearchResultView.messages = {
  NO_RESULT: '검색결과가 없습니다'
}

SearchResultView.setup = function (el) {
  return this.init(el)
}

SearchResultView.render = function (data = []) {
  console.log(tag, 'render()', data)
  this.el.innerHTML = data.length ? this.getSearchResultsHtml(data) : this.messages.NO_RESULT
  this.show()
}

SearchResultView.getSearchResultsHtml = function (data) {
  return data.reduce((html, item) => {
    html += this.getSearchItemHtml(item)
    return html
  }, '<ul>') + '</ul>' 
}

SearchResultView.getSearchItemHtml = function(item) {
  return `<li>
      <img src="${item.image}">
      <p>${item.name}</p>
    </li>`
}

export default SearchResultView