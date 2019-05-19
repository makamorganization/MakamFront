import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  certificateRequest: ['certificateId'],
  certificateAllRequest: ['options'],
  certificateUpdateRequest: ['certificate'],
  certificateDeleteRequest: ['certificateId'],

  certificateSuccess: ['certificate'],
  certificateAllSuccess: ['certificates'],
  certificateUpdateSuccess: ['certificate'],
  certificateDeleteSuccess: [],

  certificateFailure: ['error'],
  certificateAllFailure: ['error'],
  certificateUpdateFailure: ['error'],
  certificateDeleteFailure: ['error']
})

export const CertificateTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  certificate: null,
  certificates: null,
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
    certificate: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    certificates: null
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
  const { certificate } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    certificate
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { certificates } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    certificates
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { certificate } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    certificate
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    certificate: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    certificate: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    certificates: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    certificate: state.certificate
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    certificate: state.certificate
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CERTIFICATE_REQUEST]: request,
  [Types.CERTIFICATE_ALL_REQUEST]: allRequest,
  [Types.CERTIFICATE_UPDATE_REQUEST]: updateRequest,
  [Types.CERTIFICATE_DELETE_REQUEST]: deleteRequest,

  [Types.CERTIFICATE_SUCCESS]: success,
  [Types.CERTIFICATE_ALL_SUCCESS]: allSuccess,
  [Types.CERTIFICATE_UPDATE_SUCCESS]: updateSuccess,
  [Types.CERTIFICATE_DELETE_SUCCESS]: deleteSuccess,

  [Types.CERTIFICATE_FAILURE]: failure,
  [Types.CERTIFICATE_ALL_FAILURE]: allFailure,
  [Types.CERTIFICATE_UPDATE_FAILURE]: updateFailure,
  [Types.CERTIFICATE_DELETE_FAILURE]: deleteFailure
})
