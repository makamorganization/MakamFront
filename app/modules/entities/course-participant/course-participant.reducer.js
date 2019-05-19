import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  courseParticipantRequest: ['courseParticipantId'],
  courseParticipantAllRequest: ['options'],
  courseParticipantUpdateRequest: ['courseParticipant'],
  courseParticipantDeleteRequest: ['courseParticipantId'],

  courseParticipantSuccess: ['courseParticipant'],
  courseParticipantAllSuccess: ['courseParticipants'],
  courseParticipantUpdateSuccess: ['courseParticipant'],
  courseParticipantDeleteSuccess: [],

  courseParticipantFailure: ['error'],
  courseParticipantAllFailure: ['error'],
  courseParticipantUpdateFailure: ['error'],
  courseParticipantDeleteFailure: ['error']
})

export const CourseParticipantTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  courseParticipant: null,
  courseParticipants: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    courseParticipant: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    courseParticipants: null
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { courseParticipant } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    courseParticipant
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { courseParticipants } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    courseParticipants
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { courseParticipant } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    courseParticipant
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    courseParticipant: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    courseParticipant: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    courseParticipants: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    courseParticipant: state.courseParticipant
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    courseParticipant: state.courseParticipant
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COURSE_PARTICIPANT_REQUEST]: request,
  [Types.COURSE_PARTICIPANT_ALL_REQUEST]: allRequest,
  [Types.COURSE_PARTICIPANT_UPDATE_REQUEST]: updateRequest,
  [Types.COURSE_PARTICIPANT_DELETE_REQUEST]: deleteRequest,

  [Types.COURSE_PARTICIPANT_SUCCESS]: success,
  [Types.COURSE_PARTICIPANT_ALL_SUCCESS]: allSuccess,
  [Types.COURSE_PARTICIPANT_UPDATE_SUCCESS]: updateSuccess,
  [Types.COURSE_PARTICIPANT_DELETE_SUCCESS]: deleteSuccess,

  [Types.COURSE_PARTICIPANT_FAILURE]: failure,
  [Types.COURSE_PARTICIPANT_ALL_FAILURE]: allFailure,
  [Types.COURSE_PARTICIPANT_UPDATE_FAILURE]: updateFailure,
  [Types.COURSE_PARTICIPANT_DELETE_FAILURE]: deleteFailure
})
