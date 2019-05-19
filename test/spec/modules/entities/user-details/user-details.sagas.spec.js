import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getUserDetail, getUserDetails, updateUserDetail, deleteUserDetail } from '../../../../../app/modules/entities/user-details/user-details.sagas'
import UserDetailActions from '../../../../../app/modules/entities/user-details/user-details.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getUserDetail(1)
  const step = stepper(getUserDetail(FixtureAPI, { userDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailActions.userDetailSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getUserDetail(FixtureAPI, { userDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailActions.userDetailFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getUserDetails()
  const step = stepper(getUserDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailActions.userDetailAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getUserDetails(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailActions.userDetailAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateUserDetail({ id: 1 })
  const step = stepper(updateUserDetail(FixtureAPI, { userDetail: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailActions.userDetailUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateUserDetail(FixtureAPI, { userDetail: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailActions.userDetailUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteUserDetail({ id: 1 })
  const step = stepper(deleteUserDetail(FixtureAPI, { userDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailActions.userDetailDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteUserDetail(FixtureAPI, { userDetailId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailActions.userDetailDeleteFailure()))
})
