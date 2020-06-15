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
    url: '/v1/industry/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/industry/getListById?id='+id,
    method: 'get',
  })
}
export function audit(id) {
  return request({
    url: '/v1/industry/audit?id='+id,
    method: 'get',
  })
}
export function delUser(id) {
  return request({
    url: '/v1/user/del?id='+id,
    method: 'get',
  })
}

// export const getList = (params) => request.get(`/v1/user/list`, {params: params});
