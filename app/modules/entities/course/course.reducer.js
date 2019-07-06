import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  courseRequest: ['courseId'],
  courseAllRequest: ['options'],
  courseUpdateRequest: ['course'],
  courseDeleteRequest: ['courseId'],
  myCoursesAllRequest: ['options'],
  signUpForCourse: ['courseId'],
  signOutFromCourse: ['courseId'],


  courseSuccess: ['course'],
  courseAllSuccess: ['courses'],
  courseUpdateSuccess: ['course'],
  courseDeleteSuccess: [],
  myCoursesAllSuccess: ['myCourses'],
  signUpForCourseSuccess: [],
  signOutFromCourseSuccess: [],

  courseFailure: ['error'],
  courseAllFailure: ['error'],
  courseUpdateFailure: ['error'],
  courseDeleteFailure: ['error'],
  myCoursesAllFailure: ['error'],
  signUpForCourseFailure: ['error'],
  signOutFromCourseFailure: ['error']
})

export const CourseTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  fetchingMyCourses: null,
  updating: null,
  deleting: null,
  signingUpForCourse: null,
  signingOutFromCourse: null,
  course: null,
  courses: null,
  myCourses: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  errorSigningUpForCourse: null,
  errorSigningOutFromCourse: null,
  errorMyCourses: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    course: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    courses: null
  })


export const myCoursesAllRequest = (state) =>
  state.merge({
    fetchingMyCourses: true,
    myCourses: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })

export const signUpForCourse = (state) =>
  state.merge({
    signingUpForCourse: true
  })

export const signOutFromCourse = (state) =>
  state.merge({
    signingOutFromCourse: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { course } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    course
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { courses } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    courses
  })
}

export const myCoursesAllSuccess = (state,action) => {
  const { myCourses } = action
  return state.merge({
    fetchingMyCourses: false,
    errorAll: null,
    myCourses
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { course } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    course
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    course: null
  })
}

export const signUpForCourseSuccess = (state) => {
  return state.merge({
    signingUpForCourse: false,
    errorSigningUpForCourse: null,
  })
}

export const signOutFromCourseSuccess = (state) => {
  return state.merge({
    signingOutFromCourse: false,
    errorSingingOutFromCourse: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    course: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    courses: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    course: state.course
  })
}

export const myCoursesAllFailure = (state,action) => {
  const { errorMyCourses } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    courses: null
  })
}

// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    course: state.course
  })
}

export const signUpForCourseFailure = (state, action) => {
  const { error } = action
  return state.merge({
    signingUpForCourse: false,
    errorSigningUpForCourse: error,
  })
}

export const signOutFromCourseFailure = (state, action) => {
  const { error } = action
  return state.merge({
    signingOutFromCourse: false,
    errorSigningOutFromCourse: error
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COURSE_REQUEST]: request,
  [Types.COURSE_ALL_REQUEST]: allRequest,
  [Types.COURSE_UPDATE_REQUEST]: updateRequest,
  [Types.COURSE_DELETE_REQUEST]: deleteRequest,
  [Types.MY_COURSES_ALL_REQUEST]: myCoursesAllRequest,
  [Types.SIGN_UP_FOR_COURSE]: signUpForCourse,
  [Types.SIGN_OUT_FROM_COURSE]: signOutFromCourse,


  [Types.COURSE_SUCCESS]: success,
  [Types.COURSE_ALL_SUCCESS]: allSuccess,
  [Types.COURSE_UPDATE_SUCCESS]: updateSuccess,
  [Types.COURSE_DELETE_SUCCESS]: deleteSuccess,
  [Types.MY_COURSES_ALL_SUCCESS]: myCoursesAllSuccess,
  [Types.SIGN_UP_FOR_COURSE_SUCCESS]: signUpForCourseSuccess,
  [Types.SIGN_OUT_FROM_COURSE_SUCCESS]: signOutFromCourseSuccess,

  [Types.COURSE_FAILURE]: failure,
  [Types.COURSE_ALL_FAILURE]: allFailure,
  [Types.COURSE_UPDATE_FAILURE]: updateFailure,
  [Types.COURSE_DELETE_FAILURE]: deleteFailure,
  [Types.MY_COURSES_ALL_FAILURE]: myCoursesAllFailure,
  [Types.SIGN_UP_FOR_COURSE_FAILURE]: signUpForCourseFailure,
  [Types.SIGN_OUT_FROM_COURSE_FAILURE]: signOutFromCourseFailure
})
