import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCertificate, getCertificates, updateCertificate, deleteCertificate } from '../../../../../app/modules/entities/certificate/certificate.sagas'
import CertificateActions from '../../../../../app/modules/entities/certificate/certificate.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCertificate(1)
  const step = stepper(getCertificate(FixtureAPI, { certificateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CertificateActions.certificateSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getCertificate(FixtureAPI, { certificateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CertificateActions.certificateFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCertificates()
  const step = stepper(getCertificates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CertificateActions.certificateAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getCertificates(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CertificateActions.certificateAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCertificate({ id: 1 })
  const step = stepper(updateCertificate(FixtureAPI, { certificate: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CertificateActions.certificateUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateCertificate(FixtureAPI, { certificate: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CertificateActions.certificateUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCertificate({ id: 1 })
  const step = stepper(deleteCertificate(FixtureAPI, { certificateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CertificateActions.certificateDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteCertificate(FixtureAPI, { certificateId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CertificateActions.certificateDeleteFailure()))
})
