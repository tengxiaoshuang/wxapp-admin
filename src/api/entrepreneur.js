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
    url: '/v1/entrepreneur/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/entrepreneur/getListById?id='+id,
    method: 'get',
  })
}
export function audit(id) {
  return request({
    url: '/v1/entrepreneur/audit?id='+id,
    method: 'get',
  })
}
export function enterprisesCreate(data) {
  return request({
    url: '/v1/enterprises/create',
    method: 'post',
    data
  })
}
export function getEnterprisesById(id) {
  return request({
    url: '/v1/enterprises/getListById?id='+id,
    method: 'get',
  })
}
export function enterprisesUpdate(data) {
  return request({
    url: '/v1/enterprises/update',
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
