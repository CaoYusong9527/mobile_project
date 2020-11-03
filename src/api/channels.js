// 封装与频道相关的操作
import http from '@/utils/request'

/**
 * 获取用户频道
 */
export const reqGetChannels = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
