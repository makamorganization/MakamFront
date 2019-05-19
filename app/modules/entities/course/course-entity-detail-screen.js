import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { courseEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import CourseActions from './course.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './course-entity-detail-screen-style'

class CourseEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      course: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCourse(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.course) {
      this.setState({ course: newProps.course })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCourses()
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
      'Delete Course?',
      'Are you sure you want to delete the Course?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCourse(this.props.data.entityId)
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
        <Text>ID: {this.state.course.id}</Text>
        <Text testID='title'>Title: {this.state.course.title}</Text>
        <Text testID='description'>Description: {this.state.course.description}</Text>
        <Text testID='courseStartDate'>CourseStartDate: {jsDateToLocalDate(this.state.course.courseStartDate)}</Text>
        <Text testID='courseEndDate'>CourseEndDate: {jsDateToLocalDate(this.state.course.courseEndDate)}</Text>
        <Text testID='registerStartDate'>RegisterStartDate: {jsDateToLocalDate(this.state.course.registerStartDate)}</Text>
        <Text testID='registerEndDate'>RegisterEndDate: {jsDateToLocalDate(this.state.course.registerEndDate)}</Text>
        <Text testID='duration'>Duration: {this.state.course.duration}</Text>
        <Text testID='maximumNumberOfParticipants'>MaximumNumberOfParticipants: {this.state.course.maximumNumberOfParticipants}</Text>
        <Text testID='minimalNumberOfParticipants'>MinimalNumberOfParticipants: {this.state.course.minimalNumberOfParticipants}</Text>
        <Text testID='lecturerName'>LecturerName: {this.state.course.lecturerName}</Text>
        <Text testID='lecturerSurname'>LecturerSurname: {this.state.course.lecturerSurname}</Text>
        <Text testID='pointPerCourse'>PointPerCourse: {this.state.course.pointPerCourse}</Text>
        <Text testID='isVisibleInApp'>IsVisibleInApp: {this.state.course.isVisibleInApp}</Text>
        <RoundedButton text='Edit' onPress={courseEntityEditScreen.bind(this, { entityId: this.state.course.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    course: state.courses.course,
    deleting: state.courses.deleting,
    errorDeleting: state.courses.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (id) => dispatch(CourseActions.courseRequest(id)),
    getAllCourses: (options) => dispatch(CourseActions.courseAllRequest(options)),
    deleteCourse: (id) => dispatch(CourseActions.courseDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEntityDetailScreen)
