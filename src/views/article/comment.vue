<template>
  <div class="article-comments">
    <!-- 评论列表 -->
<!-- 评论列表 -->
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="(item, index) in list"
    :key="index"
  >
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px;"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
    <div slot="label">
      <p style="color: #363636;">{{item.content}}</p>
      <p>
        <span style="margin-right: 10px;">{{ item.pubdate | relative }}</span>515
        <van-button @click="clickShowReply(item)" size="mini" type="default">回复</van-button>
      </p>
    </div>
    <van-icon  @click="toggleCommentLike(item)" slot="right-icon" :name="item.is_liking ? 'like' : 'like-o'" />
  </van-cell>
</van-list>
<!-- 评论列表 -->
    <!-- 评论列表 -->

    <!-- 发布评论 -->
   <!-- 发布评论 -->
<van-cell-group class="publish-wrap">
  <van-field
    clearable
    placeholder="请输入评论内容"
    v-model.trim="content"
  >
    <van-button @click="addComment" slot="button" size="mini" type="info">发布</van-button>
  </van-field>
</van-cell-group>
<!-- /发布评论 -->
    <!-- /发布评论 -->
    <van-popup  v-model="isShowReply" round position="bottom" :style="{ height: '85%' }">
  <comment-reply :comment="currentComment" :article-id="articleId"></comment-reply>
</van-popup>
  </div>
</template>

<script>
import { reqAddComment, reqGetComments, reqAddCommentLike, reqDeleteCommentLike } from '@/api/comment.js'
import CommentReply from './commentReply.vue'
export default {
  name: 'ArticleComment',
  components: {
    CommentReply
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      content: '', // 评论内容
      isShowReply: false,
      currentComment: {} // 表示当前的回复组件, 回复的是哪个评论
    }
  },

  methods: {
    async addComment () {
      if (this.content === '') return
      // 发送请求
      const res = await reqAddComment(this.articleId, this.content)
      // console.log(res.data.data.new_obj)
      // 操作成功, 更新视图, 最新的评论, 应该出现在评论的最上方
      // 从接口的返回值中, 会有一个new_obj数据, 就表示新发布的评论对象
      this.list.unshift(res.data.data.new_obj)
      console.log(this.list)
      // 清空评论区
      this.content = ''
      // 添加提示
      this.$toast.success('发布评论成功')
    },
    async onLoad () {
      // 获取评论数据
      const res = await reqGetComments(this.articleId, this.offset)
      const arr = res.data.data.results
      // 将数据添加到list中
      this.list = [...this.list, ...arr]
      // 加载状态结束
      this.loading = false
      // 判断数据是否加载完成
      if (arr.length === 0) {
        this.finished = true
      }
      // 更新offset
      this.offset = res.data.data.last_id
    },
    async toggleCommentLike (comment) {
      try {
        const commentId = comment.com_id.toString()
        if (comment.is_liking) {
          // 点赞状态, 点击按钮时, 应该要取消点赞
          await reqDeleteCommentLike(commentId)
          this.$toast.success('取消点赞成功')
        } else {
          // 非点赞状态, 点击按钮时, 应该要点赞
          await reqAddCommentLike(commentId)
          this.$toast.success('点赞成功')
        }
        // 数据回显
        comment.is_liking = !comment.is_liking
      } catch (e) {
        console.log(e)
        this.$toast.fail('操作失败')
      }
    },
    clickShowReply (item) {
      this.isShowReply = true
      this.currentComment = item
    }
  }
}
</script>

<style scoped lang='scss'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
