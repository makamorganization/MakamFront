import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import UserDetailActions from './user-details.reducer'

export function * getUserDetail (api, action) {
  const { userDetailId } = action
  // make the call to the api
  const apiCall = call(api.getUserDetail, userDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailActions.userDetailSuccess(response.data))
  } else {
    yield put(UserDetailActions.userDetailFailure(response.data))
  }
}

export function * getUserDetails (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserDetails, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailActions.userDetailAllSuccess(response.data))
  } else {
    yield put(UserDetailActions.userDetailAllFailure(response.data))
  }
}

export function * updateUserDetail (api, action) {
  const { userDetail } = action
  // make the call to the api
  const idIsNotNull = !!userDetail.id
  const apiCall = call(idIsNotNull ? api.updateUserDetail : api.createUserDetail, userDetail)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailActions.userDetailUpdateSuccess(response.data))
  } else {
    yield put(UserDetailActions.userDetailUpdateFailure(response.data))
  }
}

export function * deleteUserDetail (api, action) {
  const { userDetailId } = action
  // make the call to the api
  const apiCall = call(api.deleteUserDetail, userDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailActions.userDetailDeleteSuccess())
  } else {
    yield put(UserDetailActions.userDetailDeleteFailure(response.data))
  }
}
