import http from '@/utils/request.js'
/**
 * 用户登录注册
 * @param {*} mobile
 * @param {*} code
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
 * 获取用户信息
 */
export const reqGetProfile = () => {
  return http({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
