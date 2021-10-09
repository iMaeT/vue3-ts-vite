import { fetch } from '@/axios-config/axios'

import type { PropsData } from './types'

const accountBaseUrl = '/api/account/'
const userBaseUrl = '/api/base/'

// 登录
export const login = ({ data }: PropsData) =>  {
  return fetch({
    url: `${accountBaseUrl}login`,
    method: 'post',
    data
  })
}

// 获取用户信息
export const getInfo = ({ params }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}login/user`,
    method: 'get',
    params
  })
}

// 退出登录

export const logout = ({ data }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}logout`,
    method: 'post',
    data
  })
}

// 修改密码
export const setPassword = ({ data }: PropsData) => {
  return fetch({
    url: `${accountBaseUrl}password`,
    method: 'put',
    data
  })
}

// 修改用户信息
export const setInfo = ({ data }: PropsData) => {
  return fetch({
    url: `${userBaseUrl}user`,
    method: 'put',
    data
  })
}
