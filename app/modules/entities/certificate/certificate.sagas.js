import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CertificateActions from './certificate.reducer'
import { localDateToJsDate } from '../../../shared/util/date-transforms'

export function * getCertificate (api, action) {
  const { certificateId } = action
  // make the call to the api
  const apiCall = call(api.getCertificate, certificateId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(CertificateActions.certificateSuccess(response.data))
  } else {
    yield put(CertificateActions.certificateFailure(response.data))
  }
}

export function * getCertificates (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCertificates, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CertificateActions.certificateAllSuccess(response.data))
  } else {
    yield put(CertificateActions.certificateAllFailure(response.data))
  }
}

export function * updateCertificate (api, action) {
  const { certificate } = action
  // make the call to the api
  const idIsNotNull = !!certificate.id
  const apiCall = call(idIsNotNull ? api.updateCertificate : api.createCertificate, certificate)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(CertificateActions.certificateUpdateSuccess(response.data))
  } else {
    yield put(CertificateActions.certificateUpdateFailure(response.data))
  }
}

export function * deleteCertificate (api, action) {
  const { certificateId } = action
  // make the call to the api
  const apiCall = call(api.deleteCertificate, certificateId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CertificateActions.certificateDeleteSuccess())
  } else {
    yield put(CertificateActions.certificateDeleteFailure(response.data))
  }
}
function mapDateFields (data) {
  if (data.validityEndDate) {
    data.validityEndDate = localDateToJsDate(data.validityEndDate)
  }
  return data
}
