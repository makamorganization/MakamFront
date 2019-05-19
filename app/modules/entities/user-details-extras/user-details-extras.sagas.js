import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import UserDetailsExtraActions from './user-details-extras.reducer'

export function * getUserDetailsExtra (api, action) {
  const { userDetailsExtraId } = action
  // make the call to the api
  const apiCall = call(api.getUserDetailsExtra, userDetailsExtraId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailsExtraActions.userDetailsExtraSuccess(response.data))
  } else {
    yield put(UserDetailsExtraActions.userDetailsExtraFailure(response.data))
  }
}

export function * getUserDetailsExtras (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserDetailsExtras, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailsExtraActions.userDetailsExtraAllSuccess(response.data))
  } else {
    yield put(UserDetailsExtraActions.userDetailsExtraAllFailure(response.data))
  }
}

export function * updateUserDetailsExtra (api, action) {
  const { userDetailsExtra } = action
  // make the call to the api
  const idIsNotNull = !!userDetailsExtra.id
  const apiCall = call(idIsNotNull ? api.updateUserDetailsExtra : api.createUserDetailsExtra, userDetailsExtra)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailsExtraActions.userDetailsExtraUpdateSuccess(response.data))
  } else {
    yield put(UserDetailsExtraActions.userDetailsExtraUpdateFailure(response.data))
  }
}

export function * deleteUserDetailsExtra (api, action) {
  const { userDetailsExtraId } = action
  // make the call to the api
  const apiCall = call(api.deleteUserDetailsExtra, userDetailsExtraId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserDetailsExtraActions.userDetailsExtraDeleteSuccess())
  } else {
    yield put(UserDetailsExtraActions.userDetailsExtraDeleteFailure(response.data))
  }
}
