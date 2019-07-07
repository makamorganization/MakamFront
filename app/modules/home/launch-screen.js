import React from 'react'
import { ScrollView, Image, View } from 'react-native'
import { Navigation } from 'react-native-navigation'

import { Images } from '../../shared/themes'
import styles from './home-screen.styles'
import { isLoggedIn } from '../../shared/reducers/account.reducer'
import { connect } from 'react-redux'
import LoggedUserHome from './logged-user-home'
import NotLoggedUserHome from './not-logged-user-home'

class LaunchScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
  }
  componentDidAppear () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          enabled: true,
          visible: false
        }
      }
    })
  }
  showSideMenu () {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true
        }
      }
    })
  }

  navigationButtonPressed ({ buttonId }) {
    this.showSideMenu()
  }

  render () {
    return (
      <View style={styles.mainContainer} testID='launchScreen'>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
        {this.props.loggedIn ? 
          <LoggedUserHome />
          :
          <NotLoggedUserHome />  
        }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: isLoggedIn(state.account)
  }
}

export default connect(mapStateToProps)(LaunchScreen);
