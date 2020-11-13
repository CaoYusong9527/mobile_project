<template>
  <div class="home">
    -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <article-list @show-more="handleShowmore" :channel="item"></article-list>
      </van-tab>
    </van-tabs>
<!-- 频道列表开关 通过定位 -->
<div class="bar-btn" @click="showChannelEdit = true">
  <van-icon name="wap-nav"/>
</div>
    <van-popup v-model="showMore" :style="{ width: '60%' }">
      <more-action @dislike="dislike" @report="report"></more-action>
    </van-popup>
    <van-action-sheet v-model="showChannelEdit" title="标题">
 <channel-edit :active="active" @update-curchannel="updateCurrentChannel"  @update-active="updateActive"></channel-edit>
</van-action-sheet>
  </div>

</template>

<script>
import { reqDislikeArticle, reqReportArticle } from '@/api/article.js'
import { reqGetChannels } from '@/api/channels.js'
import ArticleList from './articleList'
import MoreAction from './moreAction'
import ChannelEdit from './channelEdit.vue'
import { mapActions } from 'vuex'
export default {
  name: 'HomeIndex',

  data () {
    return {
      active: 0,
      channels: [],
      showMore: false,
      articleId: null,
      showChannelEdit: false
    }
  },
  created () {
    this.loadChannels()
    this.getChannelsAsync()
  },
  methods: {
    ...mapActions(['getChannelsAsync']),
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
      // this.$refs.refMoreActions.isReport = false
    },
    async dislike () {
      await reqDislikeArticle(this.articleId)

      this.showMore = false
      this.$eventBus.$emit('del-article', {
        channelId: this.channels[this.active].id,
        articleId: this.articleId
      })
    },
    async report (typeId) {
      await reqReportArticle(this.articleId, typeId)
      this.showMore = false

      this.$eventBus.$emit('del-article', {
        articleId: this.articleId,
        channelId: this.channels[this.active].id
      })
    },
    updateCurrentChannel (index) {
      // 更新高亮的栏目
      this.active = index
      // 关闭弹框
      this.showChannelEdit = false
    },
    updateActive (active) {
      this.active = active
    }
  },
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
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
// 频道管理的开关按钮
.bar-btn {
  position: fixed;
  right: 5px;
  top: 57px;
  display: flex;
  align-items: center;
  background-color: #fff;
  opacity: 0.8;
  z-index:1;
  .van-icon-wap-nav{
    font-size: 20px;
  }
}
</style>
