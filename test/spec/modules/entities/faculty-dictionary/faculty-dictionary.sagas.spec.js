import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getFacultyDictionary, getFacultyDictionaries, updateFacultyDictionary, deleteFacultyDictionary } from '../../../../../app/modules/entities/faculty-dictionary/faculty-dictionary.sagas'
import FacultyDictionaryActions from '../../../../../app/modules/entities/faculty-dictionary/faculty-dictionary.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getFacultyDictionary(1)
  const step = stepper(getFacultyDictionary(FixtureAPI, { facultyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionarySuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getFacultyDictionary(FixtureAPI, { facultyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getFacultyDictionaries()
  const step = stepper(getFacultyDictionaries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getFacultyDictionaries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateFacultyDictionary({ id: 1 })
  const step = stepper(updateFacultyDictionary(FixtureAPI, { facultyDictionary: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateFacultyDictionary(FixtureAPI, { facultyDictionary: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteFacultyDictionary({ id: 1 })
  const step = stepper(deleteFacultyDictionary(FixtureAPI, { facultyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteFacultyDictionary(FixtureAPI, { facultyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FacultyDictionaryActions.facultyDictionaryDeleteFailure()))
})
