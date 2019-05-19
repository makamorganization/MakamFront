import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { userDetailsExtraEntityEditScreen } from '../../../navigation/layouts'

import UserDetailsExtraActions from './user-details-extras.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './user-details-extras-entity-detail-screen-style'

class UserDetailsExtraEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      userDetailsExtra: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getUserDetailsExtra(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.userDetailsExtra) {
      this.setState({ userDetailsExtra: newProps.userDetailsExtra })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllUserDetailsExtras()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete UserDetailsExtra?',
      'Are you sure you want to delete the UserDetailsExtra?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteUserDetailsExtra(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.userDetailsExtra.id}</Text>
        <Text testID='numberOfPoints'>NumberOfPoints: {this.state.userDetailsExtra.numberOfPoints}</Text>
        <Text testID='numberOfBeingLateInRow'>NumberOfBeingLateInRow: {this.state.userDetailsExtra.numberOfBeingLateInRow}</Text>
        <Text testID='numberOfCoursesFinished'>NumberOfCoursesFinished: {this.state.userDetailsExtra.numberOfCoursesFinished}</Text>
        <Text testID='numberOfBeingLateTotal'>NumberOfBeingLateTotal: {this.state.userDetailsExtra.numberOfBeingLateTotal}</Text>
        <Text testID='numberOfCoursesTotalOmited'>NumberOfCoursesTotalOmited: {this.state.userDetailsExtra.numberOfCoursesTotalOmited}</Text>
        <Text testID='numberOfCoursesOmitedInRow'>NumberOfCoursesOmitedInRow: {this.state.userDetailsExtra.numberOfCoursesOmitedInRow}</Text>
        <RoundedButton text='Edit' onPress={userDetailsExtraEntityEditScreen.bind(this, { entityId: this.state.userDetailsExtra.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userDetailsExtra: state.userDetailsExtras.userDetailsExtra,
    deleting: state.userDetailsExtras.deleting,
    errorDeleting: state.userDetailsExtras.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetailsExtra: (id) => dispatch(UserDetailsExtraActions.userDetailsExtraRequest(id)),
    getAllUserDetailsExtras: (options) => dispatch(UserDetailsExtraActions.userDetailsExtraAllRequest(options)),
    deleteUserDetailsExtra: (id) => dispatch(UserDetailsExtraActions.userDetailsExtraDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsExtraEntityDetailScreen)
