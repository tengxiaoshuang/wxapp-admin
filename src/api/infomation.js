import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v1/infomation/list',
    method: 'get',
    params: params
  })
}
export function getListById(id) {
  return request({
    url: '/v1/infomation/getListById?id='+id,
    method: 'get',
  })
}
export function updateById(data) {
  return request({
    url: '/v1/infomation/update',
    method: 'post',
    data
  })
}
export function createinfomation(data) {
  return request({
    url: '/v1/infomation/create',
    method: 'post',
    data
  })
}
export function delById(id) {
  return request({
    url: '/v1/infomation/del?id='+id,
    method: 'get',
  })
}
export function getToken() {
  return request({
    url: '/v1/upload/getuploadtoken',
    method: 'get',
  })
}
