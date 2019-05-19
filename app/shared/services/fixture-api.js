export default {
  // Functions return fixtures

  // entity fixtures

  updateCourse: (course) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCourse.json')
    }
  },
  getCourses: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCourses.json')
    }
  },
  getCourse: (courseId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCourse.json')
    }
  },
  deleteCourse: (courseId) => {
    return {
      ok: true
    }
  },

  updateUserDetail: (userDetail) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateUserDetail.json')
    }
  },
  getUserDetails: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getUserDetails.json')
    }
  },
  getUserDetail: (userDetailId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getUserDetail.json')
    }
  },
  deleteUserDetail: (userDetailId) => {
    return {
      ok: true
    }
  },

  updateUserDetailsExtra: (userDetailsExtra) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateUserDetailsExtra.json')
    }
  },
  getUserDetailsExtras: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getUserDetailsExtras.json')
    }
  },
  getUserDetailsExtra: (userDetailsExtraId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getUserDetailsExtra.json')
    }
  },
  deleteUserDetailsExtra: (userDetailsExtraId) => {
    return {
      ok: true
    }
  },

  updateCourseParticipant: (courseParticipant) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCourseParticipant.json')
    }
  },
  getCourseParticipants: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCourseParticipants.json')
    }
  },
  getCourseParticipant: (courseParticipantId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCourseParticipant.json')
    }
  },
  deleteCourseParticipant: (courseParticipantId) => {
    return {
      ok: true
    }
  },

  updateCertificate: (certificate) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateCertificate.json')
    }
  },
  getCertificates: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCertificates.json')
    }
  },
  getCertificate: (certificateId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getCertificate.json')
    }
  },
  deleteCertificate: (certificateId) => {
    return {
      ok: true
    }
  },

  updateAchievementDictionary: (achievementDictionary) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateAchievementDictionary.json')
    }
  },
  getAchievementDictionaries: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getAchievementDictionaries.json')
    }
  },
  getAchievementDictionary: (achievementDictionaryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getAchievementDictionary.json')
    }
  },
  deleteAchievementDictionary: (achievementDictionaryId) => {
    return {
      ok: true
    }
  },

  updateFacultyDictionary: (facultyDictionary) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateFacultyDictionary.json')
    }
  },
  getFacultyDictionaries: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getFacultyDictionaries.json')
    }
  },
  getFacultyDictionary: (facultyDictionaryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getFacultyDictionary.json')
    }
  },
  deleteFacultyDictionary: (facultyDictionaryId) => {
    return {
      ok: true
    }
  },

  updateFieldOfStudyDictionary: (fieldOfStudyDictionary) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/updateFieldOfStudyDictionary.json')
    }
  },
  getFieldOfStudyDictionaries: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getFieldOfStudyDictionaries.json')
    }
  },
  getFieldOfStudyDictionary: (fieldOfStudyDictionaryId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/getFieldOfStudyDictionary.json')
    }
  },
  deleteFieldOfStudyDictionary: (fieldOfStudyDictionaryId) => {
    return {
      ok: true
    }
  },
  // ignite-jhipster-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/updateUser.json')
    }
  },
  getUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/getUsers.json')
    }
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/getUser.json')
    }
  },
  deleteUser: (userId) => {
    return {
      ok: true
    }
  },
  // auth fixtures
  setAuthToken: () => {

  },
  removeAuthToken: () => {

  },
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      }
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      }
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Invalid email'
      }
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      data: require('../fixtures/get-account.json')
    }
  },
  updateAccount: () => {
    return {
      ok: true
    }
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true
      }
    } else {
      return {
        ok: false,
        data: 'Password error'
      }
    }
  }
}
