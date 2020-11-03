<template>
  <div class="articleList">

   <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  props: ['channel'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 时间戳
    }
  },
  methods: {
    // onLoad加载执行
    async onLoad () {
      // 异步更新数据

      if (!this.timestamp) {
        // 如果不存在时间戳,初始化时间戳
        this.timestamp = +new Date()
      }
      const result = await reqGetArticles(this.channel.id, this.timestamp)
      // 保存时间戳, 以便下一次传入
      this.timestamp = result.data.data.pre_timestamp

      // 1. 将请求结果, 添加到 list 中
      const arr = result.data.data.results
      this.list = [...this.list, ...arr]
      // 2. 将loading改成false
      this.loading = false
      // 3. 判断是否完全加载完了, 如果是, 把finished改成true
      if (arr.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>
