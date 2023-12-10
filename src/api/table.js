import request from '@/utils/request'
/**
 * 分页查询用户列表
 * @param {} params 
 * @returns 
 */
export function getUserList(params) {
  return request({
    url: '/user/admin/getAllPage',
    method: 'get',
    params
  })
}
/**
 * 分页查询活动列表
 * @param {*} params 
 * @returns 
 */
export function getActiveList(params) {
  console.log('传过来的参数', params);
  return request({
    url: '/activity/all',
    method: 'get',
    params
  });
}
