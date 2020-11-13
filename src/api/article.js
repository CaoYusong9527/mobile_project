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
/**
 * 举报文章
 * @param {*} articleId 文章编号
 * @param {*} type 举报类型编号
 */
export const reqReportArticle = (articleId, type) => {
  return http({
    method: 'post',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type
    }
  })
}

/**
 * 根据文章编号来获取文章详情
 * @param {*} id 文章编号
 */
export const reqGetArticleDetail = id => {
  return http({
    method: 'GET',
    url: '/app/v1_0/articles/' + id
  })
}

/**
 * 取消点赞
 * @param {*} id 文章编号
 */
export const reqDeleteLike = id => {
  return http({
    method: 'delete',
    url: '/app/v1_0/article/likings/' + id
  })
}

/**
 * 添加点赞
 * @param {*} id 文章编号
 */
export const reqAddLike = id => {
  return http({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: id
    }
  })
}

/**
 * 取消不喜欢
 * @param {*} id 文章编号
 */
export const reqDeleteDisLike = id => {
  return http({
    method: 'delete',
    url: '/app/v1_0/article/dislikes/' + id
  })
}

/**
 * 添加不喜欢
 * @param {*} id 文章编号
 */
export const reqAddDisLike = id => {
  return http({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: id
    }
  })
}
