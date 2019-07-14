import { AppState, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { Images } from '../shared/themes'
// import { StorybookUIRoot } from '../../storybook'

import createStore from '../shared/reducers'
import Colors from '../shared/themes/colors'
import '../config/reactotron-config'
import AccountActions from '../shared/reducers/account.reducer'

import LoginScreen from '../modules/login/login-screen'
import LaunchScreen from '../modules/home/launch-screen'
import DrawerContent from './drawer/drawer-content'
import SettingsScreen from '../modules/account/settings/settings-screen'
import RegisterScreen from '../modules/account/register/register-screen'
import ForgotPasswordScreen from '../modules/account/password-reset/forgot-password-screen'
import ChangePasswordScreen from '../modules/account/password/change-password-screen'
import EntitiesScreen from '../modules/entities/entities-screen'
import CourseEntityScreen from '../modules/entities/course/course-entity-screen'
import MyCoursesEntityScreen from '../modules/courses/my-courses-screen'
import CourseEntityDetailScreen from '../modules/entities/course/course-entity-detail-screen'
import CourseEntityEditScreen from '../modules/entities/course/course-entity-edit-screen'
import CourseDetailScreen from '../modules/courses/course-detail-screen'
import UserDetailEntityScreen from '../modules/entities/user-details/user-details-entity-screen'
import UserDetailEntityDetailScreen from '../modules/entities/user-details/user-details-entity-detail-screen'
import UserDetailEntityEditScreen from '../modules/entities/user-details/user-details-entity-edit-screen'
import UserDetailsExtraEntityScreen from '../modules/entities/user-details-extras/user-details-extras-entity-screen'
import UserDetailsExtraEntityDetailScreen from '../modules/entities/user-details-extras/user-details-extras-entity-detail-screen'
import UserDetailsExtraEntityEditScreen from '../modules/entities/user-details-extras/user-details-extras-entity-edit-screen'
import CourseParticipantEntityScreen from '../modules/entities/course-participant/course-participant-entity-screen'
import CourseParticipantEntityDetailScreen from '../modules/entities/course-participant/course-participant-entity-detail-screen'
import CourseParticipantEntityEditScreen from '../modules/entities/course-participant/course-participant-entity-edit-screen'
import CertificateEntityScreen from '../modules/entities/certificate/certificate-entity-screen'
import CertificateEntityDetailScreen from '../modules/entities/certificate/certificate-entity-detail-screen'
import CertificateEntityEditScreen from '../modules/entities/certificate/certificate-entity-edit-screen'
import AchievementDictionaryEntityScreen from '../modules/entities/achievement-dictionary/achievement-dictionary-entity-screen'
import AchievementDictionaryEntityDetailScreen from '../modules/entities/achievement-dictionary/achievement-dictionary-entity-detail-screen'
import AchievementDictionaryEntityEditScreen from '../modules/entities/achievement-dictionary/achievement-dictionary-entity-edit-screen'
import FacultyDictionaryEntityScreen from '../modules/entities/faculty-dictionary/faculty-dictionary-entity-screen'
import FacultyDictionaryEntityDetailScreen from '../modules/entities/faculty-dictionary/faculty-dictionary-entity-detail-screen'
import FacultyDictionaryEntityEditScreen from '../modules/entities/faculty-dictionary/faculty-dictionary-entity-edit-screen'
import FieldOfStudyDictionaryEntityScreen from '../modules/entities/field-of-study-dictionary/field-of-study-dictionary-entity-screen'
import FieldOfStudyDictionaryEntityDetailScreen from '../modules/entities/field-of-study-dictionary/field-of-study-dictionary-entity-detail-screen'
import FieldOfStudyDictionaryEntityEditScreen from '../modules/entities/field-of-study-dictionary/field-of-study-dictionary-entity-edit-screen'
import CalendarScreen from '../modules/calendar/calendar-screen'
import CertificatesScreen from '../modules/certificates/certificates-screen'
import CoursesScreen from '../modules/courses/courses-screen'
import RankScreen from '../modules/rank/rank-screen'
// ignite-jhipster-navigation-import-needle

export const LOGIN_SCREEN = 'nav.LoginScreen'
export const REGISTER_SCREEN = 'nav.RegisterScreen'
export const FORGOT_PASSWORD_SCREEN = 'nav.ForgotPasswordScreen'
export const CHANGE_PASSWORD_SCREEN = 'nav.ChangePasswordScreen'
export const SETTINGS_SCREEN = 'nav.SettingsScreen'
export const LAUNCH_SCREEN = 'nav.LaunchScreen'
export const DRAWER_CONTENT = 'nav.DrawerContent'
export const ENTITIES_SCREEN = 'nav.EntitiesScreen'
export const COURSE_ENTITY_SCREEN = 'Nav.CourseEntityScreen'
export const MY_COURSES_ENTITY_SCREEN = 'Nav.MyCoursesEntityScreen'
export const COURSE_ENTITY_DETAIL_SCREEN = 'Nav.CourseEntityDetailScreen'
export const COURSE_ENTITY_EDIT_SCREEN = 'Nav.CourseEntityEditScreen'
export const COURSE_DETAIL_SCREEN = 'Nav.CourseDetailScreen'
export const USER_DETAIL_ENTITY_SCREEN = 'Nav.UserDetailEntityScreen'
export const USER_DETAIL_ENTITY_DETAIL_SCREEN = 'Nav.UserDetailEntityDetailScreen'
export const USER_DETAIL_ENTITY_EDIT_SCREEN = 'Nav.UserDetailEntityEditScreen'
export const USER_DETAILS_EXTRA_ENTITY_SCREEN = 'Nav.UserDetailsExtraEntityScreen'
export const USER_DETAILS_EXTRA_ENTITY_DETAIL_SCREEN = 'Nav.UserDetailsExtraEntityDetailScreen'
export const USER_DETAILS_EXTRA_ENTITY_EDIT_SCREEN = 'Nav.UserDetailsExtraEntityEditScreen'
export const COURSE_PARTICIPANT_ENTITY_SCREEN = 'Nav.CourseParticipantEntityScreen'
export const COURSE_PARTICIPANT_ENTITY_DETAIL_SCREEN = 'Nav.CourseParticipantEntityDetailScreen'
export const COURSE_PARTICIPANT_ENTITY_EDIT_SCREEN = 'Nav.CourseParticipantEntityEditScreen'
export const CERTIFICATE_ENTITY_SCREEN = 'Nav.CertificateEntityScreen'
export const CERTIFICATE_ENTITY_DETAIL_SCREEN = 'Nav.CertificateEntityDetailScreen'
export const CERTIFICATE_ENTITY_EDIT_SCREEN = 'Nav.CertificateEntityEditScreen'
export const ACHIEVEMENT_DICTIONARY_ENTITY_SCREEN = 'Nav.AchievementDictionaryEntityScreen'
export const ACHIEVEMENT_DICTIONARY_ENTITY_DETAIL_SCREEN = 'Nav.AchievementDictionaryEntityDetailScreen'
export const ACHIEVEMENT_DICTIONARY_ENTITY_EDIT_SCREEN = 'Nav.AchievementDictionaryEntityEditScreen'
export const FACULTY_DICTIONARY_ENTITY_SCREEN = 'Nav.FacultyDictionaryEntityScreen'
export const FACULTY_DICTIONARY_ENTITY_DETAIL_SCREEN = 'Nav.FacultyDictionaryEntityDetailScreen'
export const FACULTY_DICTIONARY_ENTITY_EDIT_SCREEN = 'Nav.FacultyDictionaryEntityEditScreen'
export const FIELD_OF_STUDY_DICTIONARY_ENTITY_SCREEN = 'Nav.FieldOfStudyDictionaryEntityScreen'
export const FIELD_OF_STUDY_DICTIONARY_ENTITY_DETAIL_SCREEN = 'Nav.FieldOfStudyDictionaryEntityDetailScreen'
export const FIELD_OF_STUDY_DICTIONARY_ENTITY_EDIT_SCREEN = 'Nav.FieldOfStudyDictionaryEntityEditScreen'
export const CALENDAR_SCREEN = 'nav.CalendarScreen'
export const CERTIFICATES_SCREEN = 'nav.CertificatesScreen'
export const COURSES_SCREEN = 'nav.CoursesScreen'
export const RANK_SCREEN = 'nav.RankScreen'
// ignite-jhipster-navigation-declaration-needle

const store = createStore()

export const appStack = {
  root: {
    sideMenu: {
      left: {
        component: {
          name: DRAWER_CONTENT
        }
      },
      center: {
        stack: {
          id: 'center',
          children: [{
            component: {
              name: LAUNCH_SCREEN,
              options: {
                topBar: {
                  title: {
                    text: 'Witaj!',
                    color: Colors.snow
                  },
                  leftButtons: [
                    {
                      id: 'menuButton',
                      icon: Images.menuIcon,
                      testID: 'menuButton'
                    }
                  ]
                }
              }
            }
          }]
        }
      }
    }
  }
}

let lastAppState = 'active'
function handleAppStateChange (nextAppState) {
  if (lastAppState.match(/inactive|background/) && nextAppState === 'active') {
    refreshAccount(store)
  }
  lastAppState = nextAppState
}

function refreshAccount () {
  store.dispatch(AccountActions.accountRequest())
}
// for deep linking
function handleOpenURL (event) {
  console.tron.log(event.url)
  let splitUrl = event.url.split('/') // ['https:', '', 'domain', 'route', 'params']
  let importantParameters = splitUrl.splice(3) // ['route', 'params']
  if (importantParameters.length === 0) {
    console.tron.log('Sending to home page')
    return null
  }
  if (importantParameters.length === 1) {
    switch (importantParameters[0]) {
      case 'register':
        console.tron.log(`Sending to Register Page`)
        registerScreen()
        break
      default:
        console.tron.warn(`Unhandled deep link: ${event.url}`)
      // default code block
    }
  }
}

export function registerScreensAndStartApp () {
  Navigation.registerComponentWithRedux(LOGIN_SCREEN, () => LoginScreen, Provider, store)
  Navigation.registerComponentWithRedux(REGISTER_SCREEN, () => RegisterScreen, Provider, store)
  Navigation.registerComponentWithRedux(FORGOT_PASSWORD_SCREEN, () => ForgotPasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(CHANGE_PASSWORD_SCREEN, () => ChangePasswordScreen, Provider, store)
  Navigation.registerComponentWithRedux(SETTINGS_SCREEN, () => SettingsScreen, Provider, store)
  Navigation.registerComponentWithRedux(DRAWER_CONTENT, () => DrawerContent, Provider, store)
  Navigation.registerComponentWithRedux(LAUNCH_SCREEN, () => LaunchScreen, Provider, store)
  Navigation.registerComponentWithRedux(ENTITIES_SCREEN, () => EntitiesScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_ENTITY_SCREEN, () => CourseEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(MY_COURSES_ENTITY_SCREEN, () => MyCoursesEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_ENTITY_DETAIL_SCREEN, () => CourseEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_ENTITY_EDIT_SCREEN, () => CourseEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_DETAIL_SCREEN, () => CourseDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(USER_DETAIL_ENTITY_SCREEN, () => UserDetailEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(USER_DETAIL_ENTITY_DETAIL_SCREEN, () => UserDetailEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(USER_DETAIL_ENTITY_EDIT_SCREEN, () => UserDetailEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(USER_DETAILS_EXTRA_ENTITY_SCREEN, () => UserDetailsExtraEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(USER_DETAILS_EXTRA_ENTITY_DETAIL_SCREEN, () => UserDetailsExtraEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(USER_DETAILS_EXTRA_ENTITY_EDIT_SCREEN, () => UserDetailsExtraEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_PARTICIPANT_ENTITY_SCREEN, () => CourseParticipantEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_PARTICIPANT_ENTITY_DETAIL_SCREEN, () => CourseParticipantEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSE_PARTICIPANT_ENTITY_EDIT_SCREEN, () => CourseParticipantEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CERTIFICATE_ENTITY_SCREEN, () => CertificateEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(CERTIFICATE_ENTITY_DETAIL_SCREEN, () => CertificateEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(CERTIFICATE_ENTITY_EDIT_SCREEN, () => CertificateEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(ACHIEVEMENT_DICTIONARY_ENTITY_SCREEN, () => AchievementDictionaryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(ACHIEVEMENT_DICTIONARY_ENTITY_DETAIL_SCREEN, () => AchievementDictionaryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(ACHIEVEMENT_DICTIONARY_ENTITY_EDIT_SCREEN, () => AchievementDictionaryEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(FACULTY_DICTIONARY_ENTITY_SCREEN, () => FacultyDictionaryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(FACULTY_DICTIONARY_ENTITY_DETAIL_SCREEN, () => FacultyDictionaryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(FACULTY_DICTIONARY_ENTITY_EDIT_SCREEN, () => FacultyDictionaryEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(FIELD_OF_STUDY_DICTIONARY_ENTITY_SCREEN, () => FieldOfStudyDictionaryEntityScreen, Provider, store)
  Navigation.registerComponentWithRedux(FIELD_OF_STUDY_DICTIONARY_ENTITY_DETAIL_SCREEN, () => FieldOfStudyDictionaryEntityDetailScreen, Provider, store)
  Navigation.registerComponentWithRedux(FIELD_OF_STUDY_DICTIONARY_ENTITY_EDIT_SCREEN, () => FieldOfStudyDictionaryEntityEditScreen, Provider, store)
  Navigation.registerComponentWithRedux(CALENDAR_SCREEN, () => CalendarScreen, Provider, store)
  Navigation.registerComponentWithRedux(CERTIFICATES_SCREEN, () => CertificatesScreen, Provider, store)
  Navigation.registerComponentWithRedux(COURSES_SCREEN, () => CoursesScreen, Provider, store)
  Navigation.registerComponentWithRedux(RANK_SCREEN, () => RankScreen, Provider, store)
  // ignite-jhipster-navigation-registration-needle

  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        topBar: {
          title: {
            color: Colors.snow
          }
        },
        backButton: {
          showTitle: false,
          testID: 'backButton',
          icon: Images.chevronLeftIcon,
          color: Colors.snow,
          iconColor: Colors.snow
        },
        background: {
          color: Colors.background
        }
      },
      sideMenu: {
        left: {
          enabled: false
        }
      }
    })

    Navigation.setRoot(appStack)

    // handle app state and deep links
    AppState.addEventListener('change', handleAppStateChange)
    Linking.addEventListener('url', handleOpenURL)
  })
}

export const loginScreen = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: LOGIN_SCREEN,
        options: {
          topBar: {
            visible: false,
            drawBehind: true
          }
        }
      }
    }]
  }
})

export const registerScreen = () => Navigation.push('center', {
  component: {
    name: REGISTER_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Zarejestruj się',
          color: Colors.snow
        }
      }
    }
  }
})

export const forgotPasswordScreen = () => Navigation.push('center', {
  component: {
    name: FORGOT_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Zapomniane hasło',
          color: Colors.snow
        }
      }
    }
  }
})

export const changePasswordScreen = () => Navigation.push('center', {
  component: {
    name: CHANGE_PASSWORD_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Zmiana hasła',
          color: Colors.snow
        }
      }
    }
  }
})

export const settingsScreen = () => Navigation.push('center', {
  component: {
    name: SETTINGS_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Ustawienia',
          color: Colors.snow
        }
      }
    }
  }
})

export const entitiesScreen = () => Navigation.push('center', {
  component: {
    name: ENTITIES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Entities',
          color: Colors.snow
        }
      }
    }
  }
})

export const courseEntityScreen = () => Navigation.push('center', {
  component: {
    name: COURSE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Courses',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const myCoursesEntityScreen = () => Navigation.push('center',{
  component: {
    name: MY_COURSES_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Moje kursy',
          color: Colors.snow
        }
      }
    }
  }
})

export const courseEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: COURSE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Courses',
          color: Colors.snow
        }
      }
    }
  }
})

export const courseDetailScreen = (data) => Navigation.push('center',{
  component: {
    name: COURSE_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Kursy',
          color: Colors.snow
        }
      }
    }
  }
})

export const courseEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: COURSE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Courses',
          color: Colors.snow
        }
      }
    }
  }
})

export const userDetailEntityScreen = () => Navigation.push('center', {
  component: {
    name: USER_DETAIL_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'UserDetails',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const userDetailEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: USER_DETAIL_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'UserDetails',
          color: Colors.snow
        }
      }
    }
  }
})

export const userDetailEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: USER_DETAIL_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'UserDetails',
          color: Colors.snow
        }
      }
    }
  }
})

export const userDetailsExtraEntityScreen = () => Navigation.push('center', {
  component: {
    name: USER_DETAILS_EXTRA_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'UserDetailsExtras',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const userDetailsExtraEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: USER_DETAILS_EXTRA_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'UserDetailsExtras',
          color: Colors.snow
        }
      }
    }
  }
})

export const userDetailsExtraEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: USER_DETAILS_EXTRA_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'UserDetailsExtras',
          color: Colors.snow
        }
      }
    }
  }
})

export const courseParticipantEntityScreen = () => Navigation.push('center', {
  component: {
    name: COURSE_PARTICIPANT_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'CourseParticipants',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const courseParticipantEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: COURSE_PARTICIPANT_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CourseParticipants',
          color: Colors.snow
        }
      }
    }
  }
})

export const courseParticipantEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: COURSE_PARTICIPANT_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'CourseParticipants',
          color: Colors.snow
        }
      }
    }
  }
})

export const certificateEntityScreen = () => Navigation.push('center', {
  component: {
    name: CERTIFICATE_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Certificates',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const certificateEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: CERTIFICATE_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Certificates',
          color: Colors.snow
        }
      }
    }
  }
})

export const certificateEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: CERTIFICATE_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'Certificates',
          color: Colors.snow
        }
      }
    }
  }
})

export const achievementDictionaryEntityScreen = () => Navigation.push('center', {
  component: {
    name: ACHIEVEMENT_DICTIONARY_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'AchievementDictionaries',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const achievementDictionaryEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: ACHIEVEMENT_DICTIONARY_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'AchievementDictionaries',
          color: Colors.snow
        }
      }
    }
  }
})

export const achievementDictionaryEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: ACHIEVEMENT_DICTIONARY_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'AchievementDictionaries',
          color: Colors.snow
        }
      }
    }
  }
})

export const facultyDictionaryEntityScreen = () => Navigation.push('center', {
  component: {
    name: FACULTY_DICTIONARY_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'FacultyDictionaries',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const facultyDictionaryEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: FACULTY_DICTIONARY_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'FacultyDictionaries',
          color: Colors.snow
        }
      }
    }
  }
})

export const facultyDictionaryEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: FACULTY_DICTIONARY_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'FacultyDictionaries',
          color: Colors.snow
        }
      }
    }
  }
})

export const fieldOfStudyDictionaryEntityScreen = () => Navigation.push('center', {
  component: {
    name: FIELD_OF_STUDY_DICTIONARY_ENTITY_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'FieldOfStudyDictionaries',
          color: Colors.snow
        },
        rightButtons: [
          {
            id: 'createButton',
            text: 'Create',
            color: Colors.snow
          }
        ]
      }
    }
  }
})

export const fieldOfStudyDictionaryEntityEditScreen = (data) => Navigation.push('center', {
  component: {
    name: FIELD_OF_STUDY_DICTIONARY_ENTITY_EDIT_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'FieldOfStudyDictionaries',
          color: Colors.snow
        }
      }
    }
  }
})

export const fieldOfStudyDictionaryEntityDetailScreen = (data) => Navigation.push('center', {
  component: {
    name: FIELD_OF_STUDY_DICTIONARY_ENTITY_DETAIL_SCREEN,
    passProps: {
      data
    },
    options: {
      topBar: {
        title: {
          text: 'FieldOfStudyDictionaries',
          color: Colors.snow
        }
      }
    }
  }
})

export const calendarScreen = () => Navigation.push('center', {
  component: {
    name: CALENDAR_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Kalendarz',
          color: Colors.snow
        }
      }
    }
  }
})

export const coursesScreen = () => Navigation.push('center', {
  component: {
    name: COURSES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Kursy',
          color: Colors.snow
        }
      }
    }
  }
})

export const rankScreen = () => Navigation.push('center', {
  component: {
    name: RANK_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Ranking',
          color: Colors.snow
        }
      }
    }
  }
})

export const certificatesScreen = () => Navigation.push('center', {
  component: {
    name: CERTIFICATES_SCREEN,
    options: {
      topBar: {
        title: {
          text: 'Certyfikaty',
          color: Colors.snow
        }
      }
    }
  }
})
// ignite-jhipster-navigation-method-needle
