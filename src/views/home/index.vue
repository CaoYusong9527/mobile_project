<template>
  <div class="home">
    <van-tabs>
         <van-tab v-for="item in channels" :key="item.id" :title="item.name">
           <div class="scroll-wrapper">
             <article-list :channel="item"></article-list>
           </div>

    </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reqGetChannels } from '@/api/channels.js'
import ArticleList from './articleList.vue'
export default {
  name: 'HomeIndex',

  data () {
    return {
      channels: []
    }
  },
  components: {
    ArticleList
  },
  methods: {
    async loadChannels () {
      const result = await reqGetChannels()
      this.channels = result.data.data.channels
    }
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  padding-top: 46px;
  box-sizing: border-box;
  overflow: hidden;//不希望整个页面的滚动条出来

  .van-tabs {
    height: 100%;
    padding-top: 50px;
    // 导航部分
    .van-tabs__wrap {
      position:fixed;
      top: 46px;
      left: 0px;
      right: 30px;//为了预留将来编辑小图标额
    }
    // 内容部分
    .van-tabs__content {
      height: 100%;
      overflow: scroll;
      .van-tab__pane {
        padding-bottom: 100px;
      }
    }
  }
}
</style>
