import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  achievementDictionaryRequest: ['achievementDictionaryId'],
  achievementDictionaryAllRequest: ['options'],
  achievementDictionaryUpdateRequest: ['achievementDictionary'],
  achievementDictionaryDeleteRequest: ['achievementDictionaryId'],

  achievementDictionarySuccess: ['achievementDictionary'],
  achievementDictionaryAllSuccess: ['achievementDictionaries'],
  achievementDictionaryUpdateSuccess: ['achievementDictionary'],
  achievementDictionaryDeleteSuccess: [],

  achievementDictionaryFailure: ['error'],
  achievementDictionaryAllFailure: ['error'],
  achievementDictionaryUpdateFailure: ['error'],
  achievementDictionaryDeleteFailure: ['error']
})

export const AchievementDictionaryTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  achievementDictionary: null,
  achievementDictionaries: null,
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
    achievementDictionary: null
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    achievementDictionaries: null
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
  const { achievementDictionary } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    achievementDictionary
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { achievementDictionaries } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    achievementDictionaries
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { achievementDictionary } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    achievementDictionary
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    achievementDictionary: null
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    achievementDictionary: null
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    achievementDictionaries: null
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    achievementDictionary: state.achievementDictionary
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    achievementDictionary: state.achievementDictionary
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACHIEVEMENT_DICTIONARY_REQUEST]: request,
  [Types.ACHIEVEMENT_DICTIONARY_ALL_REQUEST]: allRequest,
  [Types.ACHIEVEMENT_DICTIONARY_UPDATE_REQUEST]: updateRequest,
  [Types.ACHIEVEMENT_DICTIONARY_DELETE_REQUEST]: deleteRequest,

  [Types.ACHIEVEMENT_DICTIONARY_SUCCESS]: success,
  [Types.ACHIEVEMENT_DICTIONARY_ALL_SUCCESS]: allSuccess,
  [Types.ACHIEVEMENT_DICTIONARY_UPDATE_SUCCESS]: updateSuccess,
  [Types.ACHIEVEMENT_DICTIONARY_DELETE_SUCCESS]: deleteSuccess,

  [Types.ACHIEVEMENT_DICTIONARY_FAILURE]: failure,
  [Types.ACHIEVEMENT_DICTIONARY_ALL_FAILURE]: allFailure,
  [Types.ACHIEVEMENT_DICTIONARY_UPDATE_FAILURE]: updateFailure,
  [Types.ACHIEVEMENT_DICTIONARY_DELETE_FAILURE]: deleteFailure
})
