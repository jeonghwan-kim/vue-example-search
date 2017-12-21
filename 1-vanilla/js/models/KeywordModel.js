export default {
  data: [
    '이탈리아', 
    '세프의요리', 
    '제철', 
    '홈파티'
  ],

  list() {
    return new Promise(res => {
      setTimeout(() => {
        res(this.data)
      }, 200)
    })
  }
}
