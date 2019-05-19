import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/user-details/user-details.reducer'

test('attempt retrieving a single userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.userDetail).toBe(null)
})

test('attempt retrieving a list of userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.userDetails).toBe(null)
})

test('attempt updating a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.userDetail).toEqual({ id: 1 })
})

test('success retrieving a list of userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.userDetails).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.userDetail).toEqual({ id: 1 })
})
test('success deleting a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.userDetail).toEqual(null)
})

test('failure retrieving a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.userDetail).toEqual(null)
})

test('failure retrieving a list of userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.userDetails).toEqual(null)
})

test('failure updating a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.userDetail).toEqual(INITIAL_STATE.userDetail)
})
test('failure deleting a userDetail', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.userDetail).toEqual(INITIAL_STATE.userDetail)
})
