<template>
  <div class="search">
    <!-- 搜索组件一级路由   $router.back()返回上一个页面-->
    <van-nav-bar
      left-arrow
      title="搜索中心"
      @click-left="$router.back()">
    </van-nav-bar>

    <!-- https://youzan.github.io/vant/#/zh-CN/search -->
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      v-model.trim="keyword"
      @input="getSuggestion"
    >
      <template #action>
        <div  @click="clickSearch">搜索</div>
      </template>
    </van-search>

    <!-- 联想建议 -->
<van-cell-group  v-if="keyword">
  <van-cell @click='getSuggestion(item)' v-for="item in showSuggestion" :key="item" icon="search">
    <div v-html="item" ></div>
  </van-cell>
</van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <!-- 搜索历史记录 -->
<van-cell-group v-else>
  <van-cell v-if="history.length > 0" title="历史记录">
  </van-cell>
  <van-cell @click="clickHistory(item)" v-for="(item, index) in history" :key="item" :title="item">
    <van-icon @click.stop="delHistory(index)" name="close"/>
  </van-cell>
</van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { reqGetSuggestion } from '@/api/search.js'
import { setHistory, getHistory } from '@/utils/storage.js'
export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索关键字
      suggestion: [],
      history: getHistory()
    }
  },
  methods: {
    getSuggestion () {
      // 调用方法, 发送请求, 对发送的请求进行防抖处理(延迟执行)
      clearTimeout(this.timeId)
      this.timeId = setTimeout(async () => {
        // 检查当前关键字是否为空
        if (this.keyword === '') {
          this.suggestion = []
          return
        }
        const res = await reqGetSuggestion(this.keyword)
        this.suggestion = res.data.data.options
      }, 300)
    },
    // 点击搜索按钮
    clickSearch () {
      if (this.keyword === '') return
      this.addHistory(this.keyword)
    },
    // 点击联想推荐
    clickSuggestion (index) {
      this.addHistory(this.suggestion[index])
    },
    // 添加历史
    addHistory (str) {
      const index = this.history.findIndex(item => item === str)
      if (index !== -1) {
      // 说明历史记录中已经有了这一项, 应该删除掉
        this.history.splice(index, 1)
      }
      this.history.unshift(str)

      setHistory(this.history)
      this.$router.push('/searchResult?keyword=' + str)
    },

    delHistory (index) {
      this.history.splice(index, 1)

      setHistory(this.history)
    },
    clickHistory (item) {
      this.addHistory(item)
    }
  },
  computed: {
  // 基于返回的suggestion, 动态计算出用于渲染的高亮的showSuggestion
    showSuggestion () {
      const regExp = new RegExp(this.keyword, 'gi')// 全局模式忽略大小写
      const arr = this.suggestion.map(item => {
        const newStr = item.replace(regExp, (match) => {
          return `<span style="color: #3196fa;">${match}</span>`
        })
        return newStr
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
