import Actions, { reducer, INITIAL_STATE } from '../../../../../app/modules/entities/course-participant/course-participant.reducer'

test('attempt retrieving a single courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantRequest({ id: 1 }))

  expect(state.fetchingOne).toBe(true)
  expect(state.courseParticipant).toBe(null)
})

test('attempt retrieving a list of courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantAllRequest({ id: 1 }))

  expect(state.fetchingAll).toBe(true)
  expect(state.courseParticipants).toBe(null)
})

test('attempt updating a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantUpdateRequest({ id: 1 }))

  expect(state.updating).toBe(true)
})
test('attempt to deleting a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantDeleteRequest({ id: 1 }))

  expect(state.deleting).toBe(true)
})

test('success retrieving a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantSuccess({ id: 1 }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toBe(null)
  expect(state.courseParticipant).toEqual({ id: 1 })
})

test('success retrieving a list of courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantAllSuccess([{ id: 1 }, { id: 2 }]))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toBe(null)
  expect(state.courseParticipants).toEqual([{ id: 1 }, { id: 2 }])
})

test('success updating a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantUpdateSuccess({ id: 1 }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toBe(null)
  expect(state.courseParticipant).toEqual({ id: 1 })
})
test('success deleting a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantDeleteSuccess())

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toBe(null)
  expect(state.courseParticipant).toEqual(null)
})

test('failure retrieving a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantFailure({ error: 'Not found' }))

  expect(state.fetchingOne).toBe(false)
  expect(state.errorOne).toEqual({ error: 'Not found' })
  expect(state.courseParticipant).toEqual(null)
})

test('failure retrieving a list of courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantAllFailure({ error: 'Not found' }))

  expect(state.fetchingAll).toBe(false)
  expect(state.errorAll).toEqual({ error: 'Not found' })
  expect(state.courseParticipants).toEqual(null)
})

test('failure updating a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantUpdateFailure({ error: 'Not found' }))

  expect(state.updating).toBe(false)
  expect(state.errorUpdating).toEqual({ error: 'Not found' })
  expect(state.courseParticipant).toEqual(INITIAL_STATE.courseParticipant)
})
test('failure deleting a courseParticipant', () => {
  const state = reducer(INITIAL_STATE, Actions.courseParticipantDeleteFailure({ error: 'Not found' }))

  expect(state.deleting).toBe(false)
  expect(state.errorDeleting).toEqual({ error: 'Not found' })
  expect(state.courseParticipant).toEqual(INITIAL_STATE.courseParticipant)
})
