import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCourseParticipant, getCourseParticipants, updateCourseParticipant, deleteCourseParticipant } from '../../../../../app/modules/entities/course-participant/course-participant.sagas'
import CourseParticipantActions from '../../../../../app/modules/entities/course-participant/course-participant.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCourseParticipant(1)
  const step = stepper(getCourseParticipant(FixtureAPI, { courseParticipantId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getCourseParticipant(FixtureAPI, { courseParticipantId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCourseParticipants()
  const step = stepper(getCourseParticipants(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getCourseParticipants(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCourseParticipant({ id: 1 })
  const step = stepper(updateCourseParticipant(FixtureAPI, { courseParticipant: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateCourseParticipant(FixtureAPI, { courseParticipant: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCourseParticipant({ id: 1 })
  const step = stepper(deleteCourseParticipant(FixtureAPI, { courseParticipantId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteCourseParticipant(FixtureAPI, { courseParticipantId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseParticipantActions.courseParticipantDeleteFailure()))
})
