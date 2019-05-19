import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CourseActions from './course.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { courseEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './course-entity-edit-screen-style'

let Form = t.form.Form

class CourseEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        title: t.maybe(t.String),
        description: t.maybe(t.String),
        courseStartDate: t.maybe(t.Date),
        courseEndDate: t.maybe(t.Date),
        registerStartDate: t.maybe(t.Date),
        registerEndDate: t.maybe(t.Date),
        duration: t.maybe(t.Number),
        maximumNumberOfParticipants: t.maybe(t.Number),
        minimalNumberOfParticipants: t.maybe(t.Number),
        lecturerName: t.maybe(t.String),
        lecturerSurname: t.maybe(t.String),
        pointPerCourse: t.maybe(t.Number),
        isVisibleInApp: t.maybe(t.Boolean)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          title: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('description').refs.input.focus(),
            testID: 'titleInput'
          },
          description: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('courseStartDate').refs.input.focus(),
            testID: 'descriptionInput'
          },
          courseStartDate: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('courseEndDate').refs.input.focus(),
            testID: 'courseStartDateInput'
          },
          courseEndDate: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('registerStartDate').refs.input.focus(),
            testID: 'courseEndDateInput'
          },
          registerStartDate: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('registerEndDate').refs.input.focus(),
            testID: 'registerStartDateInput'
          },
          registerEndDate: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('duration').refs.input.focus(),
            testID: 'registerEndDateInput'
          },
          duration: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('maximumNumberOfParticipants').refs.input.focus(),
            testID: 'durationInput'
          },
          maximumNumberOfParticipants: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('minimalNumberOfParticipants').refs.input.focus(),
            testID: 'maximumNumberOfParticipantsInput'
          },
          minimalNumberOfParticipants: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lecturerName').refs.input.focus(),
            testID: 'minimalNumberOfParticipantsInput'
          },
          lecturerName: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lecturerSurname').refs.input.focus(),
            testID: 'lecturerNameInput'
          },
          lecturerSurname: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('pointPerCourse').refs.input.focus(),
            testID: 'lecturerSurnameInput'
          },
          pointPerCourse: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('isVisibleInApp').refs.input.focus(),
            testID: 'pointPerCourseInput'
          },
          isVisibleInApp: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'isVisibleInAppInput'
          }
        }
      },
      success: false,
      course: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCourse(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.course && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.course)
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
        this.props.getAllCourses({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.course.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: courseEntityDetailScreen.bind(this, { entityId })
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
      title: value.title || null,
      description: value.description || null,
      courseStartDate: value.courseStartDate || null,
      courseEndDate: value.courseEndDate || null,
      registerStartDate: value.registerStartDate || null,
      registerEndDate: value.registerEndDate || null,
      duration: value.duration || null,
      maximumNumberOfParticipants: value.maximumNumberOfParticipants || null,
      minimalNumberOfParticipants: value.minimalNumberOfParticipants || null,
      lecturerName: value.lecturerName || null,
      lecturerSurname: value.lecturerSurname || null,
      pointPerCourse: value.pointPerCourse || null,
      isVisibleInApp: value.isVisibleInApp || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      title: value.title || null,
      description: value.description || null,
      courseStartDate: value.courseStartDate || null,
      courseEndDate: value.courseEndDate || null,
      registerStartDate: value.registerStartDate || null,
      registerEndDate: value.registerEndDate || null,
      duration: value.duration || null,
      maximumNumberOfParticipants: value.maximumNumberOfParticipants || null,
      minimalNumberOfParticipants: value.minimalNumberOfParticipants || null,
      lecturerName: value.lecturerName || null,
      lecturerSurname: value.lecturerSurname || null,
      pointPerCourse: value.pointPerCourse || null,
      isVisibleInApp: value.isVisibleInApp || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const course = this.refs.form.getValue()
    if (course) { // if validation fails, value will be null
      this.props.updateCourse(this.formValueToEntity(course))
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
    course: state.courses.course,
    fetching: state.courses.fetchingOne,
    updating: state.courses.updating,
    error: state.courses.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (id) => dispatch(CourseActions.courseRequest(id)),
    getAllCourses: (options) => dispatch(CourseActions.courseAllRequest(options)),
    updateCourse: (course) => dispatch(CourseActions.courseUpdateRequest(course))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEntityEditScreen)
