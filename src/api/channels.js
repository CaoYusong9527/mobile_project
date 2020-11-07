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

/**
 * 获取所有的频道信息
 */
export const reqGetAllChannels = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}

/**
 * 设置用户频道(重置式)
 * @param {*} channels
 * - id 频道id
 * - seq 顺序序号
 */
export const reqSetChannels = (channels) => {
  return http({
    method: 'put',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
