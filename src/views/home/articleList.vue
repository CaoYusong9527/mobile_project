<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title">
          <template #label>
            <van-grid :column-num="item.cover.images.length">
              <!-- 列的每一项 -->
              <van-grid-item v-for="(img, index) in item.cover.images" :key="index" icon="photo-o" text="文字" >
                <van-image lazy-load :src="img"></van-image>
              </van-grid-item>

              <!-- 底部文字说明 -->
              <div class="meta">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}} 评论</span>
                <span>{{item.pubdate | relative }}</span>
                <div @click="close(item)" class="right-icon">
                  <van-icon name="cross" />
                </div>
              </div>
            </van-grid>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  created () {
    this.$eventBus.$on('del-article', (obj) => {
    })
  },
  props: ['channel'],
  data () {
    return {
      timestamp: null,
      list: [],
      loading: false,
      finished: false,
      isRefreshing: false // 是否在下拉刷新中
    }
  },
  methods: {
    async onLoad () {
      if (!this.timestamp) {
        // 初始化时间戳
        this.timestamp = +new Date()
      }

      const res = await reqGetArticles(this.channel.id, this.timestamp)
      this.timestamp = res.data.data.pre_timestamp
      const arr = res.data.data.results
      this.list = [...this.list, ...arr]
      this.loading = false
      if (arr.length === 0) {
        this.finished = true
      }
    },

    async onRefresh () {
      const res = await reqGetArticles(this.channel.id, +new Date())
      this.timestamp = res.data.data.pre_timestamp
      this.list = res.data.data.results
      this.isRefreshing = false
      this.$toast.success('刷新成功')
    },

    close (item) {
      this.$emit('show-more', item.art_id.toString())
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list {
  .meta {
    width: 100%;
    span {
      margin-right: 10px;
    }
    .right-icon {
      float: right;
      margin-top: 3px;
      margin-right: 3px;
    }
  }
}
</style>
