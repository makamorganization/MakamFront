import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/user-details-extras/user-details-extras.reducer'

test('attempt retrieving a single userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.userDetailsExtra).toBe(null)
})

test('attempt retrieving a list of userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.userDetailsExtras).toBe(null)
})

test('attempt updating a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.userDetailsExtra).toEqual({ id: 1 })
})

test('success retrieving a list of userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.userDetailsExtras).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.userDetailsExtra).toEqual({ id: 1 })
})
test('success deleting a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.userDetailsExtra).toEqual(null)
})

test('failure retrieving a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.userDetailsExtra).toEqual(null)
})

test('failure retrieving a list of userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.userDetailsExtras).toEqual(null)
})

test('failure updating a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.userDetailsExtra).toEqual(INITIAL_STATE.userDetailsExtra)
})
test('failure deleting a userDetailsExtra', () => {
  const state = reducer(INITIAL_STATE, Actions.userDetailsExtraDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.userDetailsExtra).toEqual(INITIAL_STATE.userDetailsExtra)
})
