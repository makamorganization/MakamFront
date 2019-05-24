import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  courses: require('../../modules/entities/course/course.reducer').reducer,
  userDetails: require('../../modules/entities/user-details/user-details.reducer').reducer,
  userDetailsExtras: require('../../modules/entities/user-details-extras/user-details-extras.reducer').reducer,
  courseParticipants: require('../../modules/entities/course-participant/course-participant.reducer').reducer,
  certificates: require('../../modules/entities/certificate/certificate.reducer').reducer,
  achievementDictionaries: require('../../modules/entities/achievement-dictionary/achievement-dictionary.reducer').reducer,
  facultyDictionaries: require('../../modules/entities/faculty-dictionary/faculty-dictionary.reducer').reducer,
  fieldOfStudyDictionaries: require('../../modules/entities/field-of-study-dictionary/field-of-study-dictionary.reducer').reducer,
  fieldOfStudyDictionariesForFaculty: require('../../modules/entities/field-of-study-dictionary/field-of-study-dictionary.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
