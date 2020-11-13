<template>
  <div class="search-result">
    <!-- 导航栏 -->
 <van-nav-bar
  :title="$route.query.keyword + '的搜索结果'"
  left-arrow
  fixed
  @click-left="$router.back()"
/>
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        @click="$router.push('/article/' + item.art_id.toString())"
        v-for="item in list"
    :key="item.art_id.toString()"
    :title="item.title"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { reqGetSearch } from '@/api/search.js'
export default {
  name: 'SearchResult',
  created () {
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad () {
      const res = await reqGetSearch(this.$route.query.keyword, this.page)
      console.log('res: ', res)
      const arr = res.data.data.results
      console.log('arr: ', arr)
      this.list = [...this.list, ...arr]
      this.page++ // 页码自增
      // 3. 将loading改成false
      this.loading = false

      // 4. 判断是否已经全部加载了数据
      if (arr.length === 0) {
        this.finished = true
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.search-result {
  .article-list {
    margin-top: 39px;
  }
}
</style>
