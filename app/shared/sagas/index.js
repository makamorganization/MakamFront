import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'
import FixtureAPI from '../services/fixture-api'
import DebugConfig from '../../config/debug-config'

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer'
import { LoginTypes } from '../../modules/login/login.reducer'
import { AccountTypes } from '../../shared/reducers/account.reducer'
import { RegisterTypes } from '../../modules/account/register/register.reducer'
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer'
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer'
import { UserTypes } from '../../shared/reducers/user.reducer'
import { CourseTypes } from '../../modules/entities/course/course.reducer'
import { UserDetailTypes } from '../../modules/entities/user-details/user-details.reducer'
import { UserDetailsExtraTypes } from '../../modules/entities/user-details-extras/user-details-extras.reducer'
import { CourseParticipantTypes } from '../../modules/entities/course-participant/course-participant.reducer'
import { CertificateTypes } from '../../modules/entities/certificate/certificate.reducer'
import { AchievementDictionaryTypes } from '../../modules/entities/achievement-dictionary/achievement-dictionary.reducer'
import { FacultyDictionaryTypes } from '../../modules/entities/faculty-dictionary/faculty-dictionary.reducer'
import { FieldOfStudyDictionaryTypes } from '../../modules/entities/field-of-study-dictionary/field-of-study-dictionary.reducer'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga'
import { login, logout, loginLoad } from '../../modules/login/login.sagas'
import { register } from '../../modules/account/register/register.sagas'
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas'
import { changePassword } from '../../modules/account/password/change-password.sagas'
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas'
import { getUser, getUsers, updateUser, deleteUser } from '../../shared/sagas/user.sagas'
import { getCourse, getCourses, getMyCourses, updateCourse, deleteCourse } from '../../modules/entities/course/course.sagas'
import { getUserDetail, getUserDetails, updateUserDetail, deleteUserDetail } from '../../modules/entities/user-details/user-details.sagas'
import { getUserDetailsExtra, getUserDetailsExtras, updateUserDetailsExtra, deleteUserDetailsExtra } from '../../modules/entities/user-details-extras/user-details-extras.sagas'
import { getCourseParticipant, getCourseParticipants, updateCourseParticipant, deleteCourseParticipant } from '../../modules/entities/course-participant/course-participant.sagas'
import { getCertificate, getCertificates, updateCertificate, deleteCertificate } from '../../modules/entities/certificate/certificate.sagas'
import { getAchievementDictionary, getAchievementDictionaries, updateAchievementDictionary, deleteAchievementDictionary } from '../../modules/entities/achievement-dictionary/achievement-dictionary.sagas'
import { getFacultyDictionary, getFacultyDictionaries, updateFacultyDictionary, deleteFacultyDictionary } from '../../modules/entities/faculty-dictionary/faculty-dictionary.sagas'
import { getFieldOfStudyDictionary, getFieldOfStudyDictionaries, getFieldOfStudyDictionariesForFaculty, updateFieldOfStudyDictionary, deleteFieldOfStudyDictionary } from '../../modules/entities/field-of-study-dictionary/field-of-study-dictionary.sagas'
// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),

    takeLatest(CourseTypes.COURSE_REQUEST, getCourse, api),
    takeLatest(CourseTypes.COURSE_ALL_REQUEST, getCourses, api),
    takeLatest(CourseTypes.MY_COURSES_ALL_REQUEST,getMyCourses,api),
    takeLatest(CourseTypes.COURSE_UPDATE_REQUEST, updateCourse, api),
    takeLatest(CourseTypes.COURSE_DELETE_REQUEST, deleteCourse, api),

    takeLatest(UserDetailTypes.USER_DETAIL_REQUEST, getUserDetail, api),
    takeLatest(UserDetailTypes.USER_DETAIL_ALL_REQUEST, getUserDetails, api),
    takeLatest(UserDetailTypes.USER_DETAIL_UPDATE_REQUEST, updateUserDetail, api),
    takeLatest(UserDetailTypes.USER_DETAIL_DELETE_REQUEST, deleteUserDetail, api),

    takeLatest(UserDetailsExtraTypes.USER_DETAILS_EXTRA_REQUEST, getUserDetailsExtra, api),
    takeLatest(UserDetailsExtraTypes.USER_DETAILS_EXTRA_ALL_REQUEST, getUserDetailsExtras, api),
    takeLatest(UserDetailsExtraTypes.USER_DETAILS_EXTRA_UPDATE_REQUEST, updateUserDetailsExtra, api),
    takeLatest(UserDetailsExtraTypes.USER_DETAILS_EXTRA_DELETE_REQUEST, deleteUserDetailsExtra, api),

    takeLatest(CourseParticipantTypes.COURSE_PARTICIPANT_REQUEST, getCourseParticipant, api),
    takeLatest(CourseParticipantTypes.COURSE_PARTICIPANT_ALL_REQUEST, getCourseParticipants, api),
    takeLatest(CourseParticipantTypes.COURSE_PARTICIPANT_UPDATE_REQUEST, updateCourseParticipant, api),
    takeLatest(CourseParticipantTypes.COURSE_PARTICIPANT_DELETE_REQUEST, deleteCourseParticipant, api),

    takeLatest(CertificateTypes.CERTIFICATE_REQUEST, getCertificate, api),
    takeLatest(CertificateTypes.CERTIFICATE_ALL_REQUEST, getCertificates, api),
    takeLatest(CertificateTypes.CERTIFICATE_UPDATE_REQUEST, updateCertificate, api),
    takeLatest(CertificateTypes.CERTIFICATE_DELETE_REQUEST, deleteCertificate, api),

    takeLatest(AchievementDictionaryTypes.ACHIEVEMENT_DICTIONARY_REQUEST, getAchievementDictionary, api),
    takeLatest(AchievementDictionaryTypes.ACHIEVEMENT_DICTIONARY_ALL_REQUEST, getAchievementDictionaries, api),
    takeLatest(AchievementDictionaryTypes.ACHIEVEMENT_DICTIONARY_UPDATE_REQUEST, updateAchievementDictionary, api),
    takeLatest(AchievementDictionaryTypes.ACHIEVEMENT_DICTIONARY_DELETE_REQUEST, deleteAchievementDictionary, api),

    takeLatest(FacultyDictionaryTypes.FACULTY_DICTIONARY_REQUEST, getFacultyDictionary, api),
    takeLatest(FacultyDictionaryTypes.FACULTY_DICTIONARY_ALL_REQUEST, getFacultyDictionaries, api),
    takeLatest(FacultyDictionaryTypes.FACULTY_DICTIONARY_UPDATE_REQUEST, updateFacultyDictionary, api),
    takeLatest(FacultyDictionaryTypes.FACULTY_DICTIONARY_DELETE_REQUEST, deleteFacultyDictionary, api),

    takeLatest(FieldOfStudyDictionaryTypes.FIELD_OF_STUDY_DICTIONARY_REQUEST, getFieldOfStudyDictionary, api),
    takeLatest(FieldOfStudyDictionaryTypes.FIELD_OF_STUDY_DICTIONARY_ALL_REQUEST, getFieldOfStudyDictionaries, api),
    takeLatest(FieldOfStudyDictionaryTypes.FIELD_OF_STUDY_DICTIONARY_FOR_FACULTY_REQUEST, getFieldOfStudyDictionariesForFaculty,api),
    takeLatest(FieldOfStudyDictionaryTypes.FIELD_OF_STUDY_DICTIONARY_UPDATE_REQUEST, updateFieldOfStudyDictionary, api),
    takeLatest(FieldOfStudyDictionaryTypes.FIELD_OF_STUDY_DICTIONARY_DELETE_REQUEST, deleteFieldOfStudyDictionary, api),
    // ignite-jhipster-saga-redux-connect-needle

    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, deleteUser, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api)
  ])
}
