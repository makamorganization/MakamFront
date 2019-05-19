import { put } from 'redux-saga/effects'

import FixtureAPI from '../../../../../app/shared/services/fixture-api'
import { getCourse, getCourses, updateCourse, deleteCourse } from '../../../../../app/modules/entities/course/course.sagas'
import CourseActions from '../../../../../app/modules/entities/course/course.reducer'

const stepper = (fn) => (mock) => fn.next(mock).value

test('get success path', () => {
  const response = FixtureAPI.getCourse(1)
  const step = stepper(getCourse(FixtureAPI, { courseId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseActions.courseSuccess({ id: 1 })))
})

test('get failure path', () => {
  const response = { ok: false }
  const step = stepper(getCourse(FixtureAPI, { courseId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseActions.courseFailure()))
})

test('getAll success path', () => {
  const response = FixtureAPI.getCourses()
  const step = stepper(getCourses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseActions.courseAllSuccess([{ id: 1 }, { id: 2 }])))
})

test('getAll failure path', () => {
  const response = { ok: false }
  const step = stepper(getCourses(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseActions.courseAllFailure()))
})

test('update success path', () => {
  const response = FixtureAPI.updateCourse({ id: 1 })
  const step = stepper(updateCourse(FixtureAPI, { course: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseActions.courseUpdateSuccess({ id: 1 })))
})

test('update failure path', () => {
  const response = { ok: false }
  const step = stepper(updateCourse(FixtureAPI, { course: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseActions.courseUpdateFailure()))
})

test('delete success path', () => {
  const response = FixtureAPI.deleteCourse({ id: 1 })
  const step = stepper(deleteCourse(FixtureAPI, { courseId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CourseActions.courseDeleteSuccess({ id: 1 })))
})

test('delete failure path', () => {
  const response = { ok: false }
  const step = stepper(deleteCourse(FixtureAPI, { courseId: { id: 1 } }))
  // Step 1: Hit the api
  step()
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CourseActions.courseDeleteFailure()))
})
