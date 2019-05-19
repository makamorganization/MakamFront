import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getFieldOfStudyDictionary, getFieldOfStudyDictionaries, updateFieldOfStudyDictionary, deleteFieldOfStudyDictionary } from '../../../../../app/modules/entities/field-of-study-dictionary/field-of-study-dictionary.sagas'
import FieldOfStudyDictionaryActions from '../../../../../app/modules/entities/field-of-study-dictionary/field-of-study-dictionary.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getFieldOfStudyDictionary(1)
  const step = stepper(getFieldOfStudyDictionary(FixtureAPI, { fieldOfStudyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionarySuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getFieldOfStudyDictionary(FixtureAPI, { fieldOfStudyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getFieldOfStudyDictionaries()
  const step = stepper(getFieldOfStudyDictionaries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getFieldOfStudyDictionaries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateFieldOfStudyDictionary({ id: 1 })
  const step = stepper(updateFieldOfStudyDictionary(FixtureAPI, { fieldOfStudyDictionary: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateFieldOfStudyDictionary(FixtureAPI, { fieldOfStudyDictionary: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteFieldOfStudyDictionary({ id: 1 })
  const step = stepper(deleteFieldOfStudyDictionary(FixtureAPI, { fieldOfStudyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteFieldOfStudyDictionary(FixtureAPI, { fieldOfStudyDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryDeleteFailure()))
})
