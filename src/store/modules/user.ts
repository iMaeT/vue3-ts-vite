import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { resetRouter } from '@/router'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginApi, logoutApi, getInfo } from '@/api/user'
import {
  fetchGradeList,
  fetchSemesterList,
  fetchNationList,
  fetchExamYearList,
  fetchSemesterExamYear
} from '@/api/public'
import tokenKeys from '@/api/token'
import { App } from 'vue-demi'
const { resKey, resCheck } = tokenKeys

interface FormModule {
  userName: string,
  passWord: string
}

// interface UserState {
//   token: string // 令牌
//   id: number // 用户id
//   name: string // 名字
//   gender: number // 性别 （男（1）女（0）） 默认1
//   schoolId: number // 学校id
// }

@Module({ dynamic: true, namespaced: true, store, name: 'user' })
class User extends VuexModule {
  public token: string | undefined = getToken() // 令牌
  public id: number | null = null // 用户id
  public name: string = '' // 名字
  public gender: number | null = null // 性别 （男（1）女（0）） 默认1
  public schoolId: number | null = null// 学校id

  private resetState(): void {
    this.token = getToken()
    this.id = null
    this.name = ''
    this.schoolId = null
    this.gender = null
  }

  @Mutation
  private SET_TOKEN(token: string): void {
    this.token = token
  }
  @Mutation
  private SET_ID(id: number): void {
    this.id = id
  }
  @Mutation
  private SET_NAME(name: string): void {
    this.name = name || ''
  }
  @Mutation
  private SET_GENDER(gender: number): void {
    switch (
      gender // 默认1
    ) {
      case 0:
        this.gender = 0
        break
      case 1:
      default:
        this.gender = 1
    }
  }
  @Mutation
  private SET_SCHOOLID(schoolId: number): void {
    this.schoolId = schoolId
  }

  @Action
  // 用户登录
  public login(userInfo: FormModule): Promise<unknown> {
    return new Promise((resolve, reject) => {
      loginApi({ data: userInfo }).then(response => {
        const { data } = response.data // data:为服务器返回数据的data
        // 判断是否从响应头信息拿token (若从响应头获取token,key为全小写)
        const token = resCheck ? response.headers[resKey.toLocaleLowerCase()] : data.token
        if (!token) {
          reject('登录失败，请重试！')
        } else {
          this.SET_TOKEN(token) // 保存token状态
          setToken(token) // 写入cookie
          resolve(data)
        }
      }).catch(error => {
        // login failed
        reject(error)
      })
    })
  }
  // 获取用户信息
  @Action
  public getUserInfo(token?: string): Promise<unknown> {
    if (token) {
      this.SET_TOKEN(token) // 保存token状态
      setToken(token) // 写入cookie
    }
    return new Promise((resolve, reject) => {
      getInfo({}).then(response => {
        const { data } = response.data
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { user, avatar, permissions: roles } = data
        const { id, name, gender, schoolId } = user
        this.SET_ID(id)
        this.SET_NAME(name)
        this.SET_GENDER(gender)
        this.SET_SCHOOLID(schoolId)

        resolve(data)
      }).catch(err => reject(err))
    })
  }
  // 用户注销
  @Action
  public logout():Promise<unknown> {
    return new Promise((resolve, reject) => {
      logoutApi({}).then(() => {
        removeToken() // 必须先 remove  token
        resetRouter() // 重置路由
        this.resetState() // 重置 user 状态
        resolve(null)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // 删除 token
  @Action
  public resetToken(): Promise<unknown>{
    return new Promise(resolve => {
      removeToken() // 必须先 remove  token
      resetRouter() // 重置路由
      this.resetState() // 重置 user 状态
      resolve(null)
    })
  }
}

export const UserStore = getModule<User>(User)
