import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  facultyDictionaryRequest: ['facultyDictionaryId'],
  facultyDictionaryAllRequest: ['options'],
  facultyDictionaryUpdateRequest: ['facultyDictionary'],
  facultyDictionaryDeleteRequest: ['facultyDictionaryId'],

  facultyDictionarySuccess: ['facultyDictionary'],
  facultyDictionaryAllSuccess: ['facultyDictionaries'],
  facultyDictionaryUpdateSuccess: ['facultyDictionary'],
  facultyDictionaryDeleteSuccess: [],

  facultyDictionaryFailure: ['error'],
  facultyDictionaryAllFailure: ['error'],
  facultyDictionaryUpdateFailure: ['error'],
  facultyDictionaryDeleteFailure: ['error']
})

export const FacultyDictionaryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  facultyDictionary: null,
  facultyDictionaries: null,
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
    facultyDictionary: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: false,
    facultyDictionaries: null
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
  const { facultyDictionary } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    facultyDictionary
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { facultyDictionaries } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    facultyDictionaries
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { facultyDictionary } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    facultyDictionary
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    facultyDictionary: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    facultyDictionary: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    facultyDictionaries: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    facultyDictionary: state.facultyDictionary
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    facultyDictionary: state.facultyDictionary
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FACULTY_DICTIONARY_REQUEST]: request,
  [Types.FACULTY_DICTIONARY_ALL_REQUEST]: allRequest,
  [Types.FACULTY_DICTIONARY_UPDATE_REQUEST]: updateRequest,
  [Types.FACULTY_DICTIONARY_DELETE_REQUEST]: deleteRequest,

  [Types.FACULTY_DICTIONARY_SUCCESS]: success,
  [Types.FACULTY_DICTIONARY_ALL_SUCCESS]: allSuccess,
  [Types.FACULTY_DICTIONARY_UPDATE_SUCCESS]: updateSuccess,
  [Types.FACULTY_DICTIONARY_DELETE_SUCCESS]: deleteSuccess,

  [Types.FACULTY_DICTIONARY_FAILURE]: failure,
  [Types.FACULTY_DICTIONARY_ALL_FAILURE]: allFailure,
  [Types.FACULTY_DICTIONARY_UPDATE_FAILURE]: updateFailure,
  [Types.FACULTY_DICTIONARY_DELETE_FAILURE]: deleteFailure
})
