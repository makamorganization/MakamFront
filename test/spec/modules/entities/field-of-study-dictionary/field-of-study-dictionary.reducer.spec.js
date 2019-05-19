import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/field-of-study-dictionary/field-of-study-dictionary.reducer'

test('attempt retrieving a single fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.fieldOfStudyDictionary).toBe(null)
})

test('attempt retrieving a list of fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.fieldOfStudyDictionaries).toBe(null)
})

test('attempt updating a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionarySuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.fieldOfStudyDictionary).toEqual({ id: 1 })
})

test('success retrieving a list of fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.fieldOfStudyDictionaries).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.fieldOfStudyDictionary).toEqual({ id: 1 })
})
test('success deleting a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.fieldOfStudyDictionary).toEqual(null)
})

test('failure retrieving a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.fieldOfStudyDictionary).toEqual(null)
})

test('failure retrieving a list of fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.fieldOfStudyDictionaries).toEqual(null)
})

test('failure updating a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.fieldOfStudyDictionary).toEqual(INITIAL_STATE.fieldOfStudyDictionary)
})
test('failure deleting a fieldOfStudyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.fieldOfStudyDictionaryDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.fieldOfStudyDictionary).toEqual(INITIAL_STATE.fieldOfStudyDictionary)
})
