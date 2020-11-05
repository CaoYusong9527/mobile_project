// 这个文件封装所有和文章相关的请求
import http from '@/utils/request.js'

export const reqGetArticles = (channelId, timestamp) => {
  return http({
    method: 'get',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: 1
    }
  })
}

export const reqDislikeArticle = (articleId) => {
  return http({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
