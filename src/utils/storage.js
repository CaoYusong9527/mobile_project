// 封装一个存储模块

// 设置token--->获取token--->删除token

const tokenKey = 'hm-mobile'

export const setToken = (tokenObj) => {
  localStorage.setItem(tokenKey, JSON.stringify(tokenObj))
}

export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKey)) || {}
}

export const removeToken = () => {
  localStorage.removeItem(tokenKey)
}
