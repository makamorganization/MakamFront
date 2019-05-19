import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import AchievementDictionaryActions from './achievement-dictionary.reducer'

export function * getAchievementDictionary (api, action) {
  const { achievementDictionaryId } = action
  // make the call to the api
  const apiCall = call(api.getAchievementDictionary, achievementDictionaryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AchievementDictionaryActions.achievementDictionarySuccess(response.data))
  } else {
    yield put(AchievementDictionaryActions.achievementDictionaryFailure(response.data))
  }
}

export function * getAchievementDictionaries (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getAchievementDictionaries, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AchievementDictionaryActions.achievementDictionaryAllSuccess(response.data))
  } else {
    yield put(AchievementDictionaryActions.achievementDictionaryAllFailure(response.data))
  }
}

export function * updateAchievementDictionary (api, action) {
  const { achievementDictionary } = action
  // make the call to the api
  const idIsNotNull = !!achievementDictionary.id
  const apiCall = call(idIsNotNull ? api.updateAchievementDictionary : api.createAchievementDictionary, achievementDictionary)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AchievementDictionaryActions.achievementDictionaryUpdateSuccess(response.data))
  } else {
    yield put(AchievementDictionaryActions.achievementDictionaryUpdateFailure(response.data))
  }
}

export function * deleteAchievementDictionary (api, action) {
  const { achievementDictionaryId } = action
  // make the call to the api
  const apiCall = call(api.deleteAchievementDictionary, achievementDictionaryId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(AchievementDictionaryActions.achievementDictionaryDeleteSuccess())
  } else {
    yield put(AchievementDictionaryActions.achievementDictionaryDeleteFailure(response.data))
  }
}
