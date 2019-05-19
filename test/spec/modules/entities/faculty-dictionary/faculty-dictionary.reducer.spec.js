import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/faculty-dictionary/faculty-dictionary.reducer'

test('attempt retrieving a single facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.facultyDictionary).toBe(null)
})

test('attempt retrieving a list of facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.facultyDictionaries).toBe(null)
})

test('attempt updating a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionarySuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.facultyDictionary).toEqual({ id: 1 })
})

test('success retrieving a list of facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.facultyDictionaries).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.facultyDictionary).toEqual({ id: 1 })
})
test('success deleting a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.facultyDictionary).toEqual(null)
})

test('failure retrieving a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.facultyDictionary).toEqual(null)
})

test('failure retrieving a list of facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.facultyDictionaries).toEqual(null)
})

test('failure updating a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.facultyDictionary).toEqual(INITIAL_STATE.facultyDictionary)
})
test('failure deleting a facultyDictionary', () => {
  const state = reducer(INITIAL_STATE, Actions.facultyDictionaryDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.facultyDictionary).toEqual(INITIAL_STATE.facultyDictionary)
})
