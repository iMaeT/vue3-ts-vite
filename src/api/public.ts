import { fetch } from '@/axios-config/axios'

const baseUrl = '/api/base'

// 获取学校年级
export const fetchGradeList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/school/grade`,
    method: 'get',
    params
  })
}

// 列学校已毕业年级
export const fetchGraduatedGradeList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/school/grade/graduated`,
    method: 'get',
    params
  })
}

// 列学校当前学年
export const fetchExamYearList = () => {
  return fetch({
    url: `${baseUrl}/school/current-exam-year`,
    method: 'get'
  })
}

// 根据id查找学生
export const fetchStudent = ({ id }: PropsData) => {
  return fetch({
    url: `${baseUrl}/student/${id}`,
    method: 'get'
  })
}

// 列学生
export const fetchStudentList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/student`,
    method: 'get',
    params
  })
}

// 列学生信息
export const fetchStudentInfoList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/student/info`,
    method: 'get',
    params
  })
}

// 列学校教师
export const fetchSchoolTeacherList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/teacher`,
    method: 'get',
    params
  })
}

// 列学校学期
export const fetchSemesterList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/school/semester`,
    method: 'get',
    params
  })
}

// 学校当前学年学期
export const fetchSemesterExamYear = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/school/current-exam-year-semester`,
    method: 'get',
    params
  })
}

// 列民族
export const fetchNationList = () => {
  return fetch({
    url: `${baseUrl}/user/nation`,
    method: 'get'
  })
}
