import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import CertificateActions from './certificate.reducer'
import UserDetailsActions from '../user-details/user-details.reducer'
import CourseActions from '../course/course.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'
import { certificateEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './certificate-entity-edit-screen-style'

let Form = t.form.Form

class CertificateEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        title: t.maybe(t.String),
        path: t.maybe(t.String),
        validityEndDate: t.maybe(t.Date),
        signature: t.maybe(t.String),
        userDetailsId: this.getUserDetails(),
        courseId: this.getCourses()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userDetailsId: {
            testID: 'userDetailsIdInput',
            label: 'UserDetails'
          },
          courseId: {
            testID: 'courseIdInput',
            label: 'Course'
          },
          title: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('path').refs.input.focus(),
            testID: 'titleInput'
          },
          path: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('validityEndDate').refs.input.focus(),
            testID: 'pathInput'
          },
          validityEndDate: {
            mode: 'date',
            config: {
              format: date => jsDateToLocalDate(date)
            },
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('signature').refs.input.focus(),
            testID: 'validityEndDateInput'
          },
          signature: {
            testID: 'signatureInput'
          }
        }
      },
      success: false,
      certificate: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getCertificate(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllUserDetails()
    this.props.getAllCourses()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.certificate && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.certificate)
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
        this.props.getAllCertificates({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.certificate.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: certificateEntityDetailScreen.bind(this, { entityId })
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
      path: value.path || null,
      validityEndDate: value.validityEndDate || null,
      signature: value.signature || null,
      userDetailsId: value.userDetailsId || null,
      courseId: value.courseId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      title: value.title || null,
      path: value.path || null,
      validityEndDate: value.validityEndDate || null,
      signature: value.signature || null,
      userDetailsId: value.userDetailsId || null,
      courseId: value.courseId || null
    }
    return entity
  }

  getUserDetails = () => {
    const userDetails = {}
    this.props.userDetails.forEach(userDetails => {
      userDetails[userDetails.id] = userDetails.id ? userDetails.id.toString() : userDetails.id.toString()
    })
    return t.maybe(t.enums(userDetails))
  }
  getCourses = () => {
    const courses = {}
    this.props.courses.forEach(course => {
      courses[course.id] = course.id ? course.id.toString() : course.id.toString()
    })
    return t.maybe(t.enums(courses))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const certificate = this.refs.form.getValue()
    if (certificate) { // if validation fails, value will be null
      this.props.updateCertificate(this.formValueToEntity(certificate))
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
    userDetails: state.userDetails.userDetails || [],
    courses: state.courses.courses || [],
    certificate: state.certificates.certificate,
    fetching: state.certificates.fetchingOne,
    updating: state.certificates.updating,
    error: state.certificates.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserDetails: (options) => dispatch(UserDetailsActions.userDetailsAllRequest(options)),
    getAllCourses: (options) => dispatch(CourseActions.courseAllRequest(options)),
    getCertificate: (id) => dispatch(CertificateActions.certificateRequest(id)),
    getAllCertificates: (options) => dispatch(CertificateActions.certificateAllRequest(options)),
    updateCertificate: (certificate) => dispatch(CertificateActions.certificateUpdateRequest(certificate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificateEntityEditScreen)
