export default {
  template: `<div v-if="data.length">
            <ul>
              <li v-for="item in data">
                <img v-bind:src="item.image"> {{item.name}}
              </li>
            </ul>
          </div>

          <div v-else>
             {{query}} 검색어로 찾을수 없습니다 
          </div>`,
  props: ['data', 'query']
}