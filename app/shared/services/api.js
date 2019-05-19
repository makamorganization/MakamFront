// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/authenticate', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) => api.post('api/account/reset-password/init', data, { headers: { 'Content-Type': 'text/plain', 'Accept': 'application/json, text/plain, */*' } })

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.post('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', { currentPassword, newPassword }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' } })

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (user) => api.post('api/users', user)
  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  const getCourse = (courseId) => api.get('api/courses/' + courseId)
  const getCourses = (options) => api.get('api/courses', options)
  const createCourse = (course) => api.post('api/courses', course)
  const updateCourse = (course) => api.put('api/courses', course)
  const deleteCourse = (courseId) => api.delete('api/courses/' + courseId)

  const getUserDetail = (userDetailId) => api.get('api/user-details/' + userDetailId)
  const getUserDetails = (options) => api.get('api/user-details', options)
  const createUserDetail = (userDetail) => api.post('api/user-details', userDetail)
  const updateUserDetail = (userDetail) => api.put('api/user-details', userDetail)
  const deleteUserDetail = (userDetailId) => api.delete('api/user-details/' + userDetailId)

  const getUserDetailsExtra = (userDetailsExtraId) => api.get('api/user-details-extras/' + userDetailsExtraId)
  const getUserDetailsExtras = (options) => api.get('api/user-details-extras', options)
  const createUserDetailsExtra = (userDetailsExtra) => api.post('api/user-details-extras', userDetailsExtra)
  const updateUserDetailsExtra = (userDetailsExtra) => api.put('api/user-details-extras', userDetailsExtra)
  const deleteUserDetailsExtra = (userDetailsExtraId) => api.delete('api/user-details-extras/' + userDetailsExtraId)

  const getCourseParticipant = (courseParticipantId) => api.get('api/course-participants/' + courseParticipantId)
  const getCourseParticipants = (options) => api.get('api/course-participants', options)
  const createCourseParticipant = (courseParticipant) => api.post('api/course-participants', courseParticipant)
  const updateCourseParticipant = (courseParticipant) => api.put('api/course-participants', courseParticipant)
  const deleteCourseParticipant = (courseParticipantId) => api.delete('api/course-participants/' + courseParticipantId)

  const getCertificate = (certificateId) => api.get('api/certificates/' + certificateId)
  const getCertificates = (options) => api.get('api/certificates', options)
  const createCertificate = (certificate) => api.post('api/certificates', certificate)
  const updateCertificate = (certificate) => api.put('api/certificates', certificate)
  const deleteCertificate = (certificateId) => api.delete('api/certificates/' + certificateId)

  const getAchievementDictionary = (achievementDictionaryId) => api.get('api/achievement-dictionaries/' + achievementDictionaryId)
  const getAchievementDictionaries = (options) => api.get('api/achievement-dictionaries', options)
  const createAchievementDictionary = (achievementDictionary) => api.post('api/achievement-dictionaries', achievementDictionary)
  const updateAchievementDictionary = (achievementDictionary) => api.put('api/achievement-dictionaries', achievementDictionary)
  const deleteAchievementDictionary = (achievementDictionaryId) => api.delete('api/achievement-dictionaries/' + achievementDictionaryId)

  const getFacultyDictionary = (facultyDictionaryId) => api.get('api/faculty-dictionaries/' + facultyDictionaryId)
  const getFacultyDictionaries = (options) => api.get('api/faculty-dictionaries', options)
  const createFacultyDictionary = (facultyDictionary) => api.post('api/faculty-dictionaries', facultyDictionary)
  const updateFacultyDictionary = (facultyDictionary) => api.put('api/faculty-dictionaries', facultyDictionary)
  const deleteFacultyDictionary = (facultyDictionaryId) => api.delete('api/faculty-dictionaries/' + facultyDictionaryId)

  const getFieldOfStudyDictionary = (fieldOfStudyDictionaryId) => api.get('api/field-of-study-dictionaries/' + fieldOfStudyDictionaryId)
  const getFieldOfStudyDictionaries = (options) => api.get('api/field-of-study-dictionaries', options)
  const createFieldOfStudyDictionary = (fieldOfStudyDictionary) => api.post('api/field-of-study-dictionaries', fieldOfStudyDictionary)
  const updateFieldOfStudyDictionary = (fieldOfStudyDictionary) => api.put('api/field-of-study-dictionaries', fieldOfStudyDictionary)
  const deleteFieldOfStudyDictionary = (fieldOfStudyDictionaryId) => api.delete('api/field-of-study-dictionaries/' + fieldOfStudyDictionaryId)
  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getUsers,
    getUser,
    deleteUser,

    createCourse,
    updateCourse,
    getCourses,
    getCourse,
    deleteCourse,

    createUserDetail,
    updateUserDetail,
    getUserDetails,
    getUserDetail,
    deleteUserDetail,

    createUserDetailsExtra,
    updateUserDetailsExtra,
    getUserDetailsExtras,
    getUserDetailsExtra,
    deleteUserDetailsExtra,

    createCourseParticipant,
    updateCourseParticipant,
    getCourseParticipants,
    getCourseParticipant,
    deleteCourseParticipant,

    createCertificate,
    updateCertificate,
    getCertificates,
    getCertificate,
    deleteCertificate,

    createAchievementDictionary,
    updateAchievementDictionary,
    getAchievementDictionaries,
    getAchievementDictionary,
    deleteAchievementDictionary,

    createFacultyDictionary,
    updateFacultyDictionary,
    getFacultyDictionaries,
    getFacultyDictionary,
    deleteFacultyDictionary,

    createFieldOfStudyDictionary,
    updateFieldOfStudyDictionary,
    getFieldOfStudyDictionaries,
    getFieldOfStudyDictionary,
    deleteFieldOfStudyDictionary,
    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
