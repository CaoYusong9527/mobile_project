<template>
  <div class="home">
    -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list @show-more="handleShowmore" :channel="item"></article-list>
      </van-tab>
    </van-tabs>

    <van-popup v-model="showMore" :style="{ width: '60%' }">
      <more-action @dislike="dislike"></more-action>
    </van-popup>
  </div>
</template>

<script>
import { reqDislikeArticle } from '@/api/article.js'
import { reqGetChannels } from '@/api/channels.js'
import ArticleList from './articleList'
import MoreAction from './moreAction'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      showMore: false,
      articleId: null
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const res = await reqGetChannels()
        this.channels = res.data.data.channels
      } catch (e) {
        console.log(e)
      }
    },
    handleShowmore (articleId) {
      this.showMore = true
      this.articleId = articleId
    },
    async dislike () {
      await reqDislikeArticle(this.articleId)
      this.showMore = false
      this.$eventBus.$emit('del-article', {
        channelId: this.channels[this.active].id,
        articleId: this.articleId
      })
    }
  },
  components: {
    ArticleList,
    MoreAction
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  padding-top: 46px;
  box-sizing: border-box;
  overflow: hidden;
  .van-tabs {
    height: 100%;
    padding-top: 50px;
  }
}
</style>

<style lang="scss">

.home {

  .van-tabs__wrap {
    position:fixed;
    top: 46px;
    left: 0px;

    right: 30px;
  }
  .van-tabs__content {
    height: 100%;
    overflow: auto;
    .van-tab__pane {
      padding-bottom: 100px;
    }
  }
  .van-tabs__line {
    background-color: #3196fa;
  }
}
</style>
