import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fieldOfStudyDictionaryRequest: ['fieldOfStudyDictionaryId'],
  fieldOfStudyDictionaryForFacultyRequest: ['facultyId'],
  fieldOfStudyDictionaryAllRequest: ['options'],
  fieldOfStudyDictionaryUpdateRequest: ['fieldOfStudyDictionary'],
  fieldOfStudyDictionaryDeleteRequest: ['fieldOfStudyDictionaryId'],

  fieldOfStudyDictionarySuccess: ['fieldOfStudyDictionary'],
  fieldOfStudyDictionaryForFacultySuccess: ['fieldOfStudyDictionariesForFaculty'],
  fieldOfStudyDictionaryAllSuccess: ['fieldOfStudyDictionaries'],
  fieldOfStudyDictionaryUpdateSuccess: ['fieldOfStudyDictionary'],
  fieldOfStudyDictionaryDeleteSuccess: [],

  fieldOfStudyDictionaryFailure: ['error'],
  fieldOfStudyDictionaryAllFailure: ['error'],
  fieldOfStudyDictionaryUpdateFailure: ['error'],
  fieldOfStudyDictionaryDeleteFailure: ['error']
})

export const FieldOfStudyDictionaryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  fieldOfStudyDictionary: null,
  fieldOfStudyDictionaries: null,
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
    fieldOfStudyDictionary: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    fieldOfStudyDictionaries: null
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
  const { fieldOfStudyDictionary } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    fieldOfStudyDictionary
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { fieldOfStudyDictionaries } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    fieldOfStudyDictionaries
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { fieldOfStudyDictionary } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    fieldOfStudyDictionary
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    fieldOfStudyDictionary: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    fieldOfStudyDictionary: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    fieldOfStudyDictionaries: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    fieldOfStudyDictionary: state.fieldOfStudyDictionary
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    fieldOfStudyDictionary: state.fieldOfStudyDictionary
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FIELD_OF_STUDY_DICTIONARY_REQUEST]: request,
  [Types.FIELD_OF_STUDY_DICTIONARY_ALL_REQUEST]: allRequest,
  [Types.FIELD_OF_STUDY_DICTIONARY_UPDATE_REQUEST]: updateRequest,
  [Types.FIELD_OF_STUDY_DICTIONARY_DELETE_REQUEST]: deleteRequest,

  [Types.FIELD_OF_STUDY_DICTIONARY_SUCCESS]: success,
  [Types.FIELD_OF_STUDY_DICTIONARY_ALL_SUCCESS]: allSuccess,
  [Types.FIELD_OF_STUDY_DICTIONARY_UPDATE_SUCCESS]: updateSuccess,
  [Types.FIELD_OF_STUDY_DICTIONARY_DELETE_SUCCESS]: deleteSuccess,

  [Types.FIELD_OF_STUDY_DICTIONARY_FAILURE]: failure,
  [Types.FIELD_OF_STUDY_DICTIONARY_ALL_FAILURE]: allFailure,
  [Types.FIELD_OF_STUDY_DICTIONARY_UPDATE_FAILURE]: updateFailure,
  [Types.FIELD_OF_STUDY_DICTIONARY_DELETE_FAILURE]: deleteFailure
})
