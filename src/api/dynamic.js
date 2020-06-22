import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/dynamic/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/dynamic/getListById?id='+id,
    method: 'get',
  })
}
export function updateById(data) {
  return request({
    url: '/v1/dynamic/update',
    method: 'post',
    data
  })
}
export function createdynamic(data) {
  return request({
    url: '/v1/dynamic/create',
    method: 'post',
    data
  })
}
export function delById(id) {
  return request({
    url: '/v1/dynamic/del?id='+id,
    method: 'get',
  })
}
export function getToken() {
  return request({
    url: '/v1/upload/getuploadtoken',
    method: 'get',
  })
}
