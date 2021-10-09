import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { resetRouter } from '@/router'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/user'
import {
  fetchGradeList,
  fetchSemesterList,
  fetchNationList,
  fetchExamYearList,
  fetchSemesterExamYear
} from '@/api/public'
import tokenKeys from '@/api/token'

export interface UserState {
  token: string | undefined // 令牌
  id: number | null // 用户id
  name: string // 名字
  gender: number | null // 性别 （男（1）女（0）） 默认1
  schoolId: number | null // 学校id
  schoolName: string // 学校名称
  // grade: [] // 年级列表
  // semesterList: [] // 列学期
  // nationList: [] // 列民族
  examYear: number | null // 当前学年
  semester: number | null // 当前学期
}

@Module({ dynamic: true, namespaced: true, store, name: 'user' })
class User extends VuexModule implements UserState {
  public token = getToken(); // 令牌
  public id: number; // 用户id
  public name = '' // 名字
  public gender: number; // 性别 （男（1）女（0）） 默认1
  public schoolId: number;// 学校id
  public schoolName = '' // 学校名称
  // public grade = [] // 年级列表
  // public semesterList = [] // 列学期
  // public nationList: [] // 列民族
  public examYear: number // 当前学年
  public semester: number // 当前学期

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
  @Mutation
  private SET_SCHOOLNAME(name: string): void {
    this.schoolName = name
  }
  // @Mutation
  // private SET_GRADE(grade: any[]): void {
  //   this.grade = grade
  // }
  // @Mutation
  // private SET_SEMESTERLIST(semesterList: any[]): void {
  //   this.semesterList = semesterList
  // }
  @Mutation
  private SET_EXAMYEAR(examYear: number): void {
    this.examYear = examYear
  }
  @Mutation
  private SET_SEMESTER(semester: number): void {
    this.semester = semester
  }
}


const { resKey, resCheck } = tokenKeys

const state = {
  // token: getToken(), // 令牌
  // id: null, // 用户id
  // name: '', // 名字
  // code: '', // 证件号
  // codeType: '', // 证件类型
  // gender: 1, // 性别 （男（1）女（0）） 默认1
  // birthday: '', // 生日
  // schoolId: null, // 学校id
  // schoolName: '', // 学校名称
  // status: '', // 管理员、教师、学生
  // phone: '', // 电话
  // email: '', // 邮箱
  // address: '', // 住址
  // nation: '', // 民族
  // enable: null, // 是否有效 1有效 0无效
  // createTime: '', // 创建时间
  // description: '', // 备注
  // avatar: boy_avatar, // 头像
  // roles: [], // 权限
  // grade: [], // 年级列表
  // semesterList: [], // 列学期
  // nationList: [], // 列民族
  // examYear: null, // 当前学年
  // semester: null, // 当前学期
}
