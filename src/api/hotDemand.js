import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/hotDemand/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/hotDemand/getListById?id='+id,
    method: 'get',
  })
}
export function updateById(data) {
  return request({
    url: '/v1/hotDemand/update',
    method: 'post',
    data
  })
}
export function createhotDemand(data) {
  return request({
    url: '/v1/hotDemand/create',
    method: 'post',
    data
  })
}
export function delById(id) {
  return request({
    url: '/v1/hotDemand/del?id='+id,
    method: 'get',
  })
}
export function getToken() {
  return request({
    url: '/v1/upload/getuploadtoken',
    method: 'get',
  })
}
