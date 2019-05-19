import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CourseParticipantActions from './course-participant.reducer'
import CourseActions from '../course/course.reducer'
import UserDetailsActions from '../user-details/user-details.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { courseParticipantEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './course-participant-entity-edit-screen-style'

let Form = t.form.Form

class CourseParticipantEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        isUserPresent: t.maybe(t.Boolean),
        isUserLate: t.maybe(t.Boolean),
        canCancelCourseAttendance: t.maybe(t.Boolean),
        courseId: this.getCourses(),
        userDetailsId: this.getUserDetails()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          courseId: {
            testID: 'courseIdInput',
            label: 'Course'
          },
          userDetailsId: {
            testID: 'userDetailsIdInput',
            label: 'User'
          },
          isUserPresent: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('isUserLate').refs.input.focus(),
            testID: 'isUserPresentInput'
          },
          isUserLate: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('canCancelCourseAttendance').refs.input.focus(),
            testID: 'isUserLateInput'
          },
          canCancelCourseAttendance: {
            testID: 'canCancelCourseAttendanceInput'
          }
        }
      },
      success: false,
      courseParticipant: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCourseParticipant(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllCourses()
    this.props.getAllUserDetails()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.courseParticipant && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.courseParticipant)
      })
    }

    // Did the update attempt complete?
    if (!newProps.updating && this.state.requesting) {
      if (newProps.error) {
        Alert.alert('Error', 'Something went wrong updating the entity', [{ text: 'OK' }])
        this.setState({
          success: false,
          requesting: false
        })
      } else {
        this.props.getAllCourseParticipants({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.courseParticipant.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: courseParticipantEntityDetailScreen.bind(this, { entityId })
          })
        }
        this.setState({
          success: true,
          requesting: false,
          formValue: { id: null }
        })
        Navigation.pop(this.props.componentId)
        Alert.alert('Success', 'Entity saved successfully', alertOptions)
      }
    }
  }

  // convenience methods for customizing the mapping of the entity to/from the form value
  entityToFormValue = (value) => {
    if (!value) {
      return {}
    }
    return {
      id: value.id || null,
      isUserPresent: value.isUserPresent || null,
      isUserLate: value.isUserLate || null,
      canCancelCourseAttendance: value.canCancelCourseAttendance || null,
      courseId: value.courseId || null,
      userDetailsId: value.userDetailsId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      isUserPresent: value.isUserPresent || null,
      isUserLate: value.isUserLate || null,
      canCancelCourseAttendance: value.canCancelCourseAttendance || null,
      courseId: value.courseId || null,
      userDetailsId: value.userDetailsId || null
    }
    return entity
  }

  getCourses = () => {
    const courses = {}
    this.props.courses.forEach(course => {
      courses[course.id] = course.id ? course.id.toString() : course.id.toString()
    })
    return t.maybe(t.enums(courses))
  }
  getUserDetails = () => {
    const userDetails = {}
    this.props.userDetails.forEach(userDetails => {
      userDetails[userDetails.id] = userDetails.id ? userDetails.id.toString() : userDetails.id.toString()
    })
    return t.maybe(t.enums(userDetails))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const courseParticipant = this.refs.form.getValue()
    if (courseParticipant) { // if validation fails, value will be null
      this.props.updateCourseParticipant(this.formValueToEntity(courseParticipant))
    }
  }

  formChange (newValue) {
    this.setState({
      formValue: newValue
    })
  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container} testID='entityScrollView'>
          <Form
            ref='form'
            type={this.state.formModel}
            options={this.state.formOptions}
            value={this.state.formValue}
            onChange={this.formChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitForm} underlayColor='#99d9f4' testID='submitButton'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses || [],
    userDetails: state.userDetails.userDetails || [],
    courseParticipant: state.courseParticipants.courseParticipant,
    fetching: state.courseParticipants.fetchingOne,
    updating: state.courseParticipants.updating,
    error: state.courseParticipants.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCourses: (options) => dispatch(CourseActions.courseAllRequest(options)),
    getAllUserDetails: (options) => dispatch(UserDetailsActions.userDetailsAllRequest(options)),
    getCourseParticipant: (id) => dispatch(CourseParticipantActions.courseParticipantRequest(id)),
    getAllCourseParticipants: (options) => dispatch(CourseParticipantActions.courseParticipantAllRequest(options)),
    updateCourseParticipant: (courseParticipant) => dispatch(CourseParticipantActions.courseParticipantUpdateRequest(courseParticipant))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseParticipantEntityEditScreen)
