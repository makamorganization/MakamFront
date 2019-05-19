import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userDetailRequest: ['userDetailId'],
  userDetailAllRequest: ['options'],
  userDetailUpdateRequest: ['userDetail'],
  userDetailDeleteRequest: ['userDetailId'],

  userDetailSuccess: ['userDetail'],
  userDetailAllSuccess: ['userDetails'],
  userDetailUpdateSuccess: ['userDetail'],
  userDetailDeleteSuccess: [],

  userDetailFailure: ['error'],
  userDetailAllFailure: ['error'],
  userDetailUpdateFailure: ['error'],
  userDetailDeleteFailure: ['error']
})

export const UserDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  userDetail: null,
  userDetails: null,
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
    userDetail: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    userDetails: null
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
  const { userDetail } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userDetail
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userDetails } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    userDetails
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { userDetail } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    userDetail
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userDetail: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userDetail: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userDetails: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    userDetail: state.userDetail
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userDetail: state.userDetail
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_DETAIL_REQUEST]: request,
  [Types.USER_DETAIL_ALL_REQUEST]: allRequest,
  [Types.USER_DETAIL_UPDATE_REQUEST]: updateRequest,
  [Types.USER_DETAIL_DELETE_REQUEST]: deleteRequest,

  [Types.USER_DETAIL_SUCCESS]: success,
  [Types.USER_DETAIL_ALL_SUCCESS]: allSuccess,
  [Types.USER_DETAIL_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_DETAIL_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_DETAIL_FAILURE]: failure,
  [Types.USER_DETAIL_ALL_FAILURE]: allFailure,
  [Types.USER_DETAIL_UPDATE_FAILURE]: updateFailure,
  [Types.USER_DETAIL_DELETE_FAILURE]: deleteFailure
})
