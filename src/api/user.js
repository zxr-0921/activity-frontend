import request from '@/utils/request'
/**
 * 登录
 * @param {} data 登录参数
 * @returns 是否成功登录
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户信息
 * @param {*} token token
 * @returns 用户信息
 */
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
/**
 * 退出登录
 * @returns 是否成功退出登录
 */
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
/**
 * 更新用户信息
 * @returns 是否成功更新用户信息
 */
export function updated() {
  return request({
    url: '/user/updated',
    method: 'post'
  })
}

/**
 * 根据id删除用户
 * @param {} id 
 * @returns 
 */
export function deleteById(id) {
  return request({
    url: '/user/admin/deleteById',
    method: 'delete',
    params: { id }
  })}


  /**
   * 管理员更新用户信息
   */
  export function editUser(data) {
    return request({
      url: '/user/admin/update',
      method: 'put',
      data
    })
}

/**
 * 添加用户
 */

export function addUser(data) {
  return request({
    url: '/user/admin/add',
    method: 'put',
    data
  })
}

/**
 * 修改权限
 */
export function updateRole(data) {
  return request({
    url: '/user/admin/updateRole',
    method: 'put',
    data
  })}

/**
 * 账号启用禁用
 */
export function updateStatus(status,id) {
  console.log('status'+status)
  console.log('data'+id)
  return request({
    url: '/user/admin/status/'+status+'/'+id,
    method: 'get',
  })}