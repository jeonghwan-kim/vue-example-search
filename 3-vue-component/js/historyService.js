export default {
  data: ['검색기록0', '검색기록1', '검색기록2'],

  list() {
    return Promise.resolve(this.data)
  },
  
  add(keyword = '') {
    keyword = keyword.trim()
    if (!keyword) return 
    if (this.data.includes(keyword)) {
      this.remove(keyword)
    }

    this.data = [keyword, ...this.data]
  },
  
  remove(keyword) {
    this.data = this.data.filter(_keyword => _keyword !== keyword)
  }
}