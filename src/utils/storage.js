// 封装一个存储模块
const tokenKey = 'hm-mobile-70-token'
// 1. 设置 token
export const setToken = (tokenObj) => {
  localStorage.setItem(tokenKey, JSON.stringify(tokenObj))
}

// 2. 获取 token
export const getToken = () => {
  return JSON.parse(localStorage.getItem(tokenKey)) || {}
}

// 3. 删除 token
export const removeToken = () => {
  localStorage.removeItem(tokenKey)
}
