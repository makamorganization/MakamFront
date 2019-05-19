import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getAchievementDictionary, getAchievementDictionaries, updateAchievementDictionary, deleteAchievementDictionary } from '../../../../../app/modules/entities/achievement-dictionary/achievement-dictionary.sagas'
import AchievementDictionaryActions from '../../../../../app/modules/entities/achievement-dictionary/achievement-dictionary.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getAchievementDictionary(1)
  const step = stepper(getAchievementDictionary(FixtureAPI, { achievementDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionarySuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getAchievementDictionary(FixtureAPI, { achievementDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getAchievementDictionaries()
  const step = stepper(getAchievementDictionaries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getAchievementDictionaries(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateAchievementDictionary({ id: 1 })
  const step = stepper(updateAchievementDictionary(FixtureAPI, { achievementDictionary: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateAchievementDictionary(FixtureAPI, { achievementDictionary: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteAchievementDictionary({ id: 1 })
  const step = stepper(deleteAchievementDictionary(FixtureAPI, { achievementDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteAchievementDictionary(FixtureAPI, { achievementDictionaryId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AchievementDictionaryActions.achievementDictionaryDeleteFailure()))
})
