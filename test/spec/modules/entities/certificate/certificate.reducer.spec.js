import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/certificate/certificate.reducer'

test('attempt retrieving a single certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.certificate).toBe(null)
})

test('attempt retrieving a list of certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.certificates).toBe(null)
})

test('attempt updating a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.certificate).toEqual({ id: 1 })
})

test('success retrieving a list of certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.certificates).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.certificate).toEqual({ id: 1 })
})
test('success deleting a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.certificate).toEqual(null)
})

test('failure retrieving a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.certificate).toEqual(null)
})

test('failure retrieving a list of certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.certificates).toEqual(null)
})

test('failure updating a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.certificate).toEqual(INITIAL_STATE.certificate)
})
test('failure deleting a certificate', () => {
  const state = reducer(INITIAL_STATE, Actions.certificateDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.certificate).toEqual(INITIAL_STATE.certificate)
})
