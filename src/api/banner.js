import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/banner/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/banner/getListById?id='+id,
    method: 'get',
  })
}
export function updateById(data) {
  return request({
    url: '/v1/banner/update',
    method: 'post',
    data
  })
}
export function createBanner(data) {
  return request({
    url: '/v1/banner/create',
    method: 'post',
    data
  })
}
export function delById(id) {
  return request({
    url: '/v1/banner/del?id='+id,
    method: 'get',
  })
}
export function getToken() {
  return request({
    url: '/v1/upload/getuploadtoken',
    method: 'get',
  })
}
