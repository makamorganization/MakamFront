import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/achievement-dictionary/achievement-dictionary.reducer'

test('attempt retrieving a single achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.achievementDictionary).toBe(null)
})

test('attempt retrieving a list of achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.achievementDictionaries).toBe(null)
})

test('attempt updating a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionarySuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.achievementDictionary).toEqual({ id: 1 })
})

test('success retrieving a list of achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.achievementDictionaries).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.achievementDictionary).toEqual({ id: 1 })
})
test('success deleting a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.achievementDictionary).toEqual(null)
})

test('failure retrieving a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.achievementDictionary).toEqual(null)
})

test('failure retrieving a list of achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.achievementDictionaries).toEqual(null)
})

test('failure updating a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.achievementDictionary).toEqual(INITIAL_STATE.achievementDictionary)
})
test('failure deleting a achievementDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.achievementDictionaryDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.achievementDictionary).toEqual(INITIAL_STATE.achievementDictionary)
})
