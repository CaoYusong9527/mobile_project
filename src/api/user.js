/**
 * 这里封装用户相关的axios请求
 */
import http from '@/utils/request.js'

/**
 * 用户登录(注册) 从未登录过的用户, 后台会自动注册该账号(根据手机号注册的)
 * @param {*} mobile 手机号
 * @param {*} code 验证码 (暂时写死) 246810
 */
export const reqLogin = (mobile, code) => {
  return http({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户个人信息
 */
export const reqGetProfile = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}

/**
 * 关注用户
 * @param {*} userId 作者的id
 */
export const reqFollowUser = (userId) => {
  return http({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
/**
 * 取消关注用户
 * @param {*} userId 作者的id
 */
export const reqUnFollowUser = (userId) => {
  return http({
    method: 'delete',
    url: '/app/v1_0/user/followings/' + userId
  })
}

/**
 * 获取用户个人信息 (用于个人中心页的渲染数据)
 */
export const reqGetUserInfo = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
