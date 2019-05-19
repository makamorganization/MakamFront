import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import FieldOfStudyDictionaryActions from './field-of-study-dictionary.reducer'

export function * getFieldOfStudyDictionary (api, action) {
  const { fieldOfStudyDictionaryId } = action
  // make the call to the api
  const apiCall = call(api.getFieldOfStudyDictionary, fieldOfStudyDictionaryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionarySuccess(response.data))
  } else {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryFailure(response.data))
  }
}

export function * getFieldOfStudyDictionaries (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getFieldOfStudyDictionaries, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryAllSuccess(response.data))
  } else {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryAllFailure(response.data))
  }
}

export function * updateFieldOfStudyDictionary (api, action) {
  const { fieldOfStudyDictionary } = action
  // make the call to the api
  const idIsNotNull = !!fieldOfStudyDictionary.id
  const apiCall = call(idIsNotNull ? api.updateFieldOfStudyDictionary : api.createFieldOfStudyDictionary, fieldOfStudyDictionary)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryUpdateSuccess(response.data))
  } else {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryUpdateFailure(response.data))
  }
}

export function * deleteFieldOfStudyDictionary (api, action) {
  const { fieldOfStudyDictionaryId } = action
  // make the call to the api
  const apiCall = call(api.deleteFieldOfStudyDictionary, fieldOfStudyDictionaryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryDeleteSuccess())
  } else {
    yield put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryDeleteFailure(response.data))
  }
}
