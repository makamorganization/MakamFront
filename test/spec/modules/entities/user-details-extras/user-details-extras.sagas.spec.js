import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getUserDetailsExtra, getUserDetailsExtras, updateUserDetailsExtra, deleteUserDetailsExtra } from '../../../../../app/modules/entities/user-details-extras/user-details-extras.sagas'
import UserDetailsExtraActions from '../../../../../app/modules/entities/user-details-extras/user-details-extras.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getUserDetailsExtra(1)
  const step = stepper(getUserDetailsExtra(FixtureAPI, { userDetailsExtraId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getUserDetailsExtra(FixtureAPI, { userDetailsExtraId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getUserDetailsExtras()
  const step = stepper(getUserDetailsExtras(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getUserDetailsExtras(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateUserDetailsExtra({ id: 1 })
  const step = stepper(updateUserDetailsExtra(FixtureAPI, { userDetailsExtra: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateUserDetailsExtra(FixtureAPI, { userDetailsExtra: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteUserDetailsExtra({ id: 1 })
  const step = stepper(deleteUserDetailsExtra(FixtureAPI, { userDetailsExtraId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteUserDetailsExtra(FixtureAPI, { userDetailsExtraId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(UserDetailsExtraActions.userDetailsExtraDeleteFailure()))
})
