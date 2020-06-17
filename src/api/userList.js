import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/v1/admin_user/login',
//     method: 'post',
//     data
//   })
// }

export function getList(params) {
  return request({
    url: '/v1/user/list',
    method: 'get',
    params: params
  })
}
export function getUserById(id) {
  return request({
    url: '/v1/user/getUserById?id='+id,
    method: 'get',
  })
}
export function updateUser(data) {
  return request({
    url: '/v1/user/updateUser',
    method: 'post',
    data
  })
}

export function delUser(id) {
  return request({
    url: '/v1/user/del?id='+id,
    method: 'get',
  })
}

// export const getList = (params) => request.get(`/v1/user/list`, {params: params});
