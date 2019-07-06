import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CourseActions from './course.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function * getCourse (api, action) {
  const { courseId } = action
  // make the call to the api
  const apiCall = call(api.getCourse, courseId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(CourseActions.courseSuccess(response.data))
  } else {
    yield put(CourseActions.courseFailure(response.data))
  }
}

export function * getCourses (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCourses, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CourseActions.courseAllSuccess(response.data))
  } else {
    yield put(CourseActions.courseAllFailure(response.data))
  }
}

export function * getMyCourses (api, action) {
  const { options } = action
  const apiCall = call(api.getMyCourses, options)
  const response = yield call(callApi, apiCall)


  if (response.ok) {
    yield put(CourseActions.myCoursesAllSuccess(response.data))
  } else{
    yield put(CourseActions.myCoursesAllFailure(response.data))
  }
}

export function * signUpForCourse (api, action) {
  const {courseId} = action
  const apiCall = call(api.signUpForCourse, courseId)
  const response = yield call(callApi, apiCall)

  if(response.ok) {
    yield put(CourseActions.signUpForCourseSuccess())
  } else {
    yield put(CourseActions.signUpForCourseFailure(response.data))
  }
}

export function * signOutFromCourse (api, action) {
  const {courseId} = action
  const apiCall = call(api.signOutFromCourse, courseId)
  const response = yield call(callApi, apiCall)

  if (response.ok) {
    yield put(CourseActions.signOutFromCourseSuccess())
  } else {
    yield put(CourseActions.signOutFromCourseFailure(response.data))
  }

}

export function * updateCourse (api, action) {
  const { course } = action
  // make the call to the api
  const idIsNotNull = !!course.id
  const apiCall = call(idIsNotNull ? api.updateCourse : api.createCourse, course)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(CourseActions.courseUpdateSuccess(response.data))
  } else {
    yield put(CourseActions.courseUpdateFailure(response.data))
  }
}

export function * deleteCourse (api, action) {
  const { courseId } = action
  // make the call to the api
  const apiCall = call(api.deleteCourse, courseId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CourseActions.courseDeleteSuccess())
  } else {
    yield put(CourseActions.courseDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.courseStartDate) {
    data.courseStartDate = localDateToJsDate(data.courseStartDate)
  }
  if (data.courseEndDate) {
    data.courseEndDate = localDateToJsDate(data.courseEndDate)
  }
  if (data.registerStartDate) {
    data.registerStartDate = localDateToJsDate(data.registerStartDate)
  }
  if (data.registerEndDate) {
    data.registerEndDate = localDateToJsDate(data.registerEndDate)
  }
  return data
}
