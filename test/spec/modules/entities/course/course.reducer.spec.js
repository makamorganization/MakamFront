import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/course/course.reducer'

test('attempt retrieving a single course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.course).toBe(null)
})

test('attempt retrieving a list of course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.courses).toBe(null)
})

test('attempt updating a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.course).toEqual({ id: 1 })
})

test('success retrieving a list of course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.courses).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.course).toEqual({ id: 1 })
})
test('success deleting a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.course).toEqual(null)
})

test('failure retrieving a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.course).toEqual(null)
})

test('failure retrieving a list of course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.courses).toEqual(null)
})

test('failure updating a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.course).toEqual(INITIAL_STATE.course)
})
test('failure deleting a course', () => {
  const state = reducer(INITIAL_STATE, Actions.courseDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.course).toEqual(INITIAL_STATE.course)
})
