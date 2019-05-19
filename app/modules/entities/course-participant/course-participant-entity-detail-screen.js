import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { courseParticipantEntityEditScreen } from '../../../navigation/layouts'

import CourseParticipantActions from './course-participant.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './course-participant-entity-detail-screen-style'

class CourseParticipantEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      courseParticipant: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCourseParticipant(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.courseParticipant) {
      this.setState({ courseParticipant: newProps.courseParticipant })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCourseParticipants()
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
      'Delete CourseParticipant?',
      'Are you sure you want to delete the CourseParticipant?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCourseParticipant(this.props.data.entityId)
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
        <Text>ID: {this.state.courseParticipant.id}</Text>
        <Text testID='isUserPresent'>IsUserPresent: {this.state.courseParticipant.isUserPresent}</Text>
        <Text testID='isUserLate'>IsUserLate: {this.state.courseParticipant.isUserLate}</Text>
        <Text testID='canCancelCourseAttendance'>CanCancelCourseAttendance: {this.state.courseParticipant.canCancelCourseAttendance}</Text>
        <RoundedButton text='Edit' onPress={courseParticipantEntityEditScreen.bind(this, { entityId: this.state.courseParticipant.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseParticipant: state.courseParticipants.courseParticipant,
    deleting: state.courseParticipants.deleting,
    errorDeleting: state.courseParticipants.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourseParticipant: (id) => dispatch(CourseParticipantActions.courseParticipantRequest(id)),
    getAllCourseParticipants: (options) => dispatch(CourseParticipantActions.courseParticipantAllRequest(options)),
    deleteCourseParticipant: (id) => dispatch(CourseParticipantActions.courseParticipantDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseParticipantEntityDetailScreen)
