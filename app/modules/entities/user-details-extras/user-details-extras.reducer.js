import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userDetailsExtraRequest: ['userDetailsExtraId'],
  userDetailsExtraAllRequest: ['options'],
  userDetailsExtraUpdateRequest: ['userDetailsExtra'],
  userDetailsExtraDeleteRequest: ['userDetailsExtraId'],

  userDetailsExtraSuccess: ['userDetailsExtra'],
  userDetailsExtraAllSuccess: ['userDetailsExtras'],
  userDetailsExtraUpdateSuccess: ['userDetailsExtra'],
  userDetailsExtraDeleteSuccess: [],

  userDetailsExtraFailure: ['error'],
  userDetailsExtraAllFailure: ['error'],
  userDetailsExtraUpdateFailure: ['error'],
  userDetailsExtraDeleteFailure: ['error']
})

export const UserDetailsExtraTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  userDetailsExtra: null,
  userDetailsExtras: null,
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
    userDetailsExtra: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    userDetailsExtras: null
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
  const { userDetailsExtra } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userDetailsExtra
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userDetailsExtras } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    userDetailsExtras
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { userDetailsExtra } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    userDetailsExtra
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userDetailsExtra: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userDetailsExtra: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userDetailsExtras: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    userDetailsExtra: state.userDetailsExtra
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userDetailsExtra: state.userDetailsExtra
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_DETAILS_EXTRA_REQUEST]: request,
  [Types.USER_DETAILS_EXTRA_ALL_REQUEST]: allRequest,
  [Types.USER_DETAILS_EXTRA_UPDATE_REQUEST]: updateRequest,
  [Types.USER_DETAILS_EXTRA_DELETE_REQUEST]: deleteRequest,

  [Types.USER_DETAILS_EXTRA_SUCCESS]: success,
  [Types.USER_DETAILS_EXTRA_ALL_SUCCESS]: allSuccess,
  [Types.USER_DETAILS_EXTRA_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_DETAILS_EXTRA_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_DETAILS_EXTRA_FAILURE]: failure,
  [Types.USER_DETAILS_EXTRA_ALL_FAILURE]: allFailure,
  [Types.USER_DETAILS_EXTRA_UPDATE_FAILURE]: updateFailure,
  [Types.USER_DETAILS_EXTRA_DELETE_FAILURE]: deleteFailure
})
