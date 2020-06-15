import request from '@/utils/request'


export function getList(params) {
  return request({
    url: '/v1/service/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/service/getListById?id='+id,
    method: 'get',
  })
}
export function audit(id) {
  return request({
    url: '/v1/service/audit?id='+id,
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
