import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, Image, BackHandler } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { loginScreen, registerScreen, forgotPasswordScreen, changePasswordScreen, settingsScreen, entitiesScreen, calendarScreen, coursesScreen, rankScreen, certificatesScreen } from '../layouts'
import { connect } from 'react-redux'

import styles from './drawer-content.styles'
import { Images } from '../../shared/themes'
import DrawerButton from './drawer-button'
import LoginActions from '../../modules/login/login.reducer'
import { isLoggedIn } from '../../shared/reducers/account.reducer'

class DrawerContent extends Component {
  constructor (context, props) {
    super(context, props)
    Navigation.events().bindComponent(this)
  }

  hideSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    })
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.hideSideMenu()
    })
  }

  handlePressLogin = () => {
    this.hideSideMenu()
    loginScreen()
  }

  handlePressRegister = () => {
    this.hideSideMenu()
    registerScreen()
  }

  handlePressForgotPassword = () => {
    this.hideSideMenu()
    forgotPasswordScreen()
  }

  handlePressSettings = () => {
    this.hideSideMenu()
    settingsScreen()
  }

  handlePressChangePassword = () => {
    this.hideSideMenu()
    changePasswordScreen()
  }

  handlePressEntities = () => {
    this.hideSideMenu()
    entitiesScreen()
  }

  handlePressLogout = () => {
    this.hideSideMenu()
    this.props.logout()
  }

  handlePressCalendar = () => {
    this.hideSideMenu()
    calendarScreen()
  }

  handlePressCourses = () => {
    this.hideSideMenu()
    coursesScreen()
  }

  handlePressRank = () => {
    this.hideSideMenu()
    rankScreen()
  }

  handlePressCertificates = () => {
    this.hideSideMenu()
    certificatesScreen()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Image testID='makamLogo' source={Images.makamIcon} style={styles.logo} />
        {!this.props.loggedIn && (<DrawerButton testID='loginDrawerButton' text='Login' onPress={this.handlePressLogin} />)}
        {!this.props.loggedIn && (<DrawerButton testID='registerDrawerButton' text='Register' onPress={this.handlePressRegister} />)}
        {!this.props.loggedIn && (<DrawerButton testID='forgotPasswordDrawerButton' text='Forgot Password' onPress={this.handlePressForgotPassword} />)}

        {/* {this.props.loggedIn && (<DrawerButton testID='entitiesDrawerButton' text='Entities' onPress={this.handlePressEntities} />)} */}
        {this.props.loggedIn && (<DrawerButton testID='CalendarDrawerButton' text='Kalendarz' onPress={this.handlePressCalendar} />)}
        {this.props.loggedIn && (<DrawerButton testID='CoursesDrawerButton' text='Kursy' onPress={this.handlePressCourses} />)}
        {this.props.loggedIn && (<DrawerButton testID='RankDrawerButton' text='Ranking' onPress={this.handlePressRank} />)}
        {this.props.loggedIn && (<DrawerButton testID='CertificatesDrawerButton' text='Certyfikaty' onPress={this.handlePressCertificates} />)}
        {this.props.loggedIn && (<DrawerButton testID='settingsDrawerButton' text='Settings' onPress={this.handlePressSettings} />)}
        {this.props.loggedIn && (<DrawerButton testID='changePasswordDrawerButton' text='Change Password' onPress={this.handlePressChangePassword} />)}
        {this.props.loggedIn && (<DrawerButton testID='logoutDrawerButton' text='Logout' onPress={this.handlePressLogout} />)}
      </ScrollView>
    )
  }
}

DrawerContent.contextTypes = {
  drawer: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(LoginActions.logoutRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
