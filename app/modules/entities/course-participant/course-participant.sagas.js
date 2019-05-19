import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import CourseParticipantActions from './course-participant.reducer'

export function * getCourseParticipant (api, action) {
  const { courseParticipantId } = action
  // make the call to the api
  const apiCall = call(api.getCourseParticipant, courseParticipantId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CourseParticipantActions.courseParticipantSuccess(response.data))
  } else {
    yield put(CourseParticipantActions.courseParticipantFailure(response.data))
  }
}

export function * getCourseParticipants (api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getCourseParticipants, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CourseParticipantActions.courseParticipantAllSuccess(response.data))
  } else {
    yield put(CourseParticipantActions.courseParticipantAllFailure(response.data))
  }
}

export function * updateCourseParticipant (api, action) {
  const { courseParticipant } = action
  // make the call to the api
  const idIsNotNull = !!courseParticipant.id
  const apiCall = call(idIsNotNull ? api.updateCourseParticipant : api.createCourseParticipant, courseParticipant)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CourseParticipantActions.courseParticipantUpdateSuccess(response.data))
  } else {
    yield put(CourseParticipantActions.courseParticipantUpdateFailure(response.data))
  }
}

export function * deleteCourseParticipant (api, action) {
  const { courseParticipantId } = action
  // make the call to the api
  const apiCall = call(api.deleteCourseParticipant, courseParticipantId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(CourseParticipantActions.courseParticipantDeleteSuccess())
  } else {
    yield put(CourseParticipantActions.courseParticipantDeleteFailure(response.data))
  }
}
