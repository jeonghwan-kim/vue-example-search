const tag = '[SearchResultController]'

export default {
  _messages: {
    NO_RESULT: '검색결과가 없습니다'
  },
  init(el) {
    if (!el) throw 'el'
    this.el = el
  },
  render(data = []) {
    console.log(tag, 'render()', data)
    const html = data.length ? this._getSearchResultsHtml(data) : this._messages.NO_RESULT

    console.log(tag, html)
    this.el.innerHTML = html
  },
  reset() {
    console.log(tag, 'reset()')
    this.el.innerHTML = ''
  },
  _getSearchResultsHtml(data) {
    return data.reduce((html, item) => {
      html += this._getSearchItemHtml(item)
      return html
    }, '<ul>') + '</ul>' 
  },
  _getSearchItemHtml(item) {
    return `<li>
        <img src="${item.image}">
        <p>${item.name}</p>
      </li>`
  }
}