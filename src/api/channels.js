// 存放所有与频道相关的请求 (获取, 添加, 删除...)
import http from '@/utils/request.js'

/**
 * 获取用户频道信息
 */
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
