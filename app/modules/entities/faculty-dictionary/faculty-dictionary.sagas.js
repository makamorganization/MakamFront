import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import FacultyDictionaryActions from './faculty-dictionary.reducer'

export function * getFacultyDictionary (api, action) {
  const { facultyDictionaryId } = action
  // make the call to the api
  const apiCall = call(api.getFacultyDictionary, facultyDictionaryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FacultyDictionaryActions.facultyDictionarySuccess(response.data))
  } else {
    yield put(FacultyDictionaryActions.facultyDictionaryFailure(response.data))
  }
}

export function * getFacultyDictionaries (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getFacultyDictionaries, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FacultyDictionaryActions.facultyDictionaryAllSuccess(response.data))
  } else {
    yield put(FacultyDictionaryActions.facultyDictionaryAllFailure(response.data))
  }
}

export function * updateFacultyDictionary (api, action) {
  const { facultyDictionary } = action
  // make the call to the api
  const idIsNotNull = !!facultyDictionary.id
  const apiCall = call(idIsNotNull ? api.updateFacultyDictionary : api.createFacultyDictionary, facultyDictionary)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FacultyDictionaryActions.facultyDictionaryUpdateSuccess(response.data))
  } else {
    yield put(FacultyDictionaryActions.facultyDictionaryUpdateFailure(response.data))
  }
}

export function * deleteFacultyDictionary (api, action) {
  const { facultyDictionaryId } = action
  // make the call to the api
  const apiCall = call(api.deleteFacultyDictionary, facultyDictionaryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FacultyDictionaryActions.facultyDictionaryDeleteSuccess())
  } else {
    yield put(FacultyDictionaryActions.facultyDictionaryDeleteFailure(response.data))
  }
}
