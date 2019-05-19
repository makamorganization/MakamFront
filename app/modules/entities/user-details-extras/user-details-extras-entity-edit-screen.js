import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import UserDetailsExtraActions from './user-details-extras.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { userDetailsExtraEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './user-details-extras-entity-edit-screen-style'

let Form = t.form.Form

class UserDetailsExtraEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        numberOfPoints: t.maybe(t.Number),
        numberOfBeingLateInRow: t.maybe(t.Number),
        numberOfCoursesFinished: t.maybe(t.Number),
        numberOfBeingLateTotal: t.maybe(t.Number),
        numberOfCoursesTotalOmited: t.maybe(t.Number),
        numberOfCoursesOmitedInRow: t.maybe(t.Number)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          numberOfPoints: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numberOfBeingLateInRow').refs.input.focus(),
            testID: 'numberOfPointsInput'
          },
          numberOfBeingLateInRow: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numberOfCoursesFinished').refs.input.focus(),
            testID: 'numberOfBeingLateInRowInput'
          },
          numberOfCoursesFinished: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numberOfBeingLateTotal').refs.input.focus(),
            testID: 'numberOfCoursesFinishedInput'
          },
          numberOfBeingLateTotal: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numberOfCoursesTotalOmited').refs.input.focus(),
            testID: 'numberOfBeingLateTotalInput'
          },
          numberOfCoursesTotalOmited: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('numberOfCoursesOmitedInRow').refs.input.focus(),
            testID: 'numberOfCoursesTotalOmitedInput'
          },
          numberOfCoursesOmitedInRow: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'numberOfCoursesOmitedInRowInput'
          }
        }
      },
      success: false,
      userDetailsExtra: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getUserDetailsExtra(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.userDetailsExtra && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.userDetailsExtra)
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
        this.props.getAllUserDetailsExtras({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.userDetailsExtra.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: userDetailsExtraEntityDetailScreen.bind(this, { entityId })
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
      numberOfPoints: value.numberOfPoints || null,
      numberOfBeingLateInRow: value.numberOfBeingLateInRow || null,
      numberOfCoursesFinished: value.numberOfCoursesFinished || null,
      numberOfBeingLateTotal: value.numberOfBeingLateTotal || null,
      numberOfCoursesTotalOmited: value.numberOfCoursesTotalOmited || null,
      numberOfCoursesOmitedInRow: value.numberOfCoursesOmitedInRow || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      numberOfPoints: value.numberOfPoints || null,
      numberOfBeingLateInRow: value.numberOfBeingLateInRow || null,
      numberOfCoursesFinished: value.numberOfCoursesFinished || null,
      numberOfBeingLateTotal: value.numberOfBeingLateTotal || null,
      numberOfCoursesTotalOmited: value.numberOfCoursesTotalOmited || null,
      numberOfCoursesOmitedInRow: value.numberOfCoursesOmitedInRow || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const userDetailsExtra = this.refs.form.getValue()
    if (userDetailsExtra) { // if validation fails, value will be null
      this.props.updateUserDetailsExtra(this.formValueToEntity(userDetailsExtra))
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
    userDetailsExtra: state.userDetailsExtras.userDetailsExtra,
    fetching: state.userDetailsExtras.fetchingOne,
    updating: state.userDetailsExtras.updating,
    error: state.userDetailsExtras.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetailsExtra: (id) => dispatch(UserDetailsExtraActions.userDetailsExtraRequest(id)),
    getAllUserDetailsExtras: (options) => dispatch(UserDetailsExtraActions.userDetailsExtraAllRequest(options)),
    updateUserDetailsExtra: (userDetailsExtra) => dispatch(UserDetailsExtraActions.userDetailsExtraUpdateRequest(userDetailsExtra))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsExtraEntityEditScreen)
