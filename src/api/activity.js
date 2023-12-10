import request from '@/utils/request'

/**
 * 修改发布状态
 * @param {*} params 
 * @returns 
 */

export function changepulStatus(id) {
    return request({
      url: '/activity/publishorunpublish',
      method: 'get',
      params: { id }
    })
  }


export function activityAdd(params) {
  return request({
    url: '/activity/add',
    method: 'post',
    data: params
  })
}

//删除活动
export function activityDelete(id) {
  return request({
    url: '/activity/delete',
    method: 'get',
    params: { id }
  })
}

//添加场次
export function addSession(data) {
  return request({
    url: '/activity/eventadd',
    method: 'post',
    data
  })  
}


