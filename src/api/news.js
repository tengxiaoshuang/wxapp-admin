import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/news/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/news/getListById?id='+id,
    method: 'get',
  })
}
export function updateById(data) {
  return request({
    url: '/v1/news/update',
    method: 'post',
    data
  })
}
export function createNews(data) {
  return request({
    url: '/v1/news/create',
    method: 'post',
    data
  })
}
export function delById(id) {
  return request({
    url: '/v1/news/del?id='+id,
    method: 'get',
  })
}
export function getToken() {
  return request({
    url: '/v1/upload/getuploadtoken',
    method: 'get',
  })
}
