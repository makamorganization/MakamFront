import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import UserDetailActions from './user-details.reducer'
import UserDetailsExtrasActions from '../user-details-extras/user-details-extras.reducer'
import AchievementDictionaryActions from '../achievement-dictionary/achievement-dictionary.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { userDetailEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './user-details-entity-edit-screen-style'

let Form = t.form.Form

class UserDetailEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        studentCardNumber: t.maybe(t.Number),
        name: t.maybe(t.String),
        surname: t.maybe(t.String),
        telephoneNumber: t.maybe(t.String),
        studyYear: t.maybe(t.Number),
        faculty: t.maybe(t.String),
        fieldOfStudy: t.maybe(t.String),
        userDetailsExtrasId: this.getUserDetailsExtras(),
        achievementDictionaries: t.list(this.getAchievementDictionaries())
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          userDetailsExtrasId: {
            testID: 'userDetailsExtrasIdInput',
            label: 'UserDetailsExtras'
          },
          achievementDictionaryId: {
            testID: 'achievementDictionaryIdInput',
            label: 'AchievementDictionary'
          },
          studentCardNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('name').refs.input.focus(),
            testID: 'studentCardNumberInput'
          },
          name: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('surname').refs.input.focus(),
            testID: 'nameInput'
          },
          surname: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('telephoneNumber').refs.input.focus(),
            testID: 'surnameInput'
          },
          telephoneNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('studyYear').refs.input.focus(),
            testID: 'telephoneNumberInput'
          },
          studyYear: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('faculty').refs.input.focus(),
            testID: 'studyYearInput'
          },
          faculty: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('fieldOfStudy').refs.input.focus(),
            testID: 'facultyInput'
          },
          fieldOfStudy: {
            testID: 'fieldOfStudyInput'
          }
        }
      },
      success: false,
      userDetail: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getUserDetail(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllUserDetailsExtras()
    this.props.getAllAchievementDictionaries()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.userDetail && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.userDetail)
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
        this.props.getAllUserDetails({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.userDetail.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: userDetailEntityDetailScreen.bind(this, { entityId })
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
      studentCardNumber: value.studentCardNumber || null,
      name: value.name || null,
      surname: value.surname || null,
      telephoneNumber: value.telephoneNumber || null,
      studyYear: value.studyYear || null,
      faculty: value.faculty || null,
      fieldOfStudy: value.fieldOfStudy || null,
      userDetailsExtrasId: value.userDetailsExtrasId || null,
      achievementDictionaries: [].concat(value.achievementDictionaries.map((achievementDictionary) => { return achievementDictionary.id }))
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      studentCardNumber: value.studentCardNumber || null,
      name: value.name || null,
      surname: value.surname || null,
      telephoneNumber: value.telephoneNumber || null,
      studyYear: value.studyYear || null,
      faculty: value.faculty || null,
      fieldOfStudy: value.fieldOfStudy || null,
      userDetailsExtrasId: value.userDetailsExtrasId || null,
      achievementDictionaries: [].concat(value.achievementDictionaries.map((achievementDictionary) => { return { id: achievementDictionary } }))
    }
    return entity
  }

  getUserDetailsExtras = () => {
    const userDetailsExtras = {}
    this.props.userDetailsExtras.forEach(userDetailsExtras => {
      userDetailsExtras[userDetailsExtras.id] = userDetailsExtras.id ? userDetailsExtras.id.toString() : userDetailsExtras.id.toString()
    })
    return t.maybe(t.enums(userDetailsExtras))
  }
  getAchievementDictionaries = () => {
    const achievementDictionaries = {}
    this.props.achievementDictionaries.forEach(achievementDictionary => {
      achievementDictionaries[achievementDictionary.id] = achievementDictionary.id ? achievementDictionary.id.toString() : achievementDictionary.id.toString()
    })
    return t.maybe(t.enums(achievementDictionaries))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const userDetail = this.refs.form.getValue()
    if (userDetail) { // if validation fails, value will be null
      this.props.updateUserDetail(this.formValueToEntity(userDetail))
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
    userDetailsExtras: state.userDetailsExtras.userDetailsExtras || [],
    achievementDictionaries: state.achievementDictionaries.achievementDictionaries || [],
    userDetail: state.userDetails.userDetail,
    fetching: state.userDetails.fetchingOne,
    updating: state.userDetails.updating,
    error: state.userDetails.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserDetailsExtras: (options) => dispatch(UserDetailsExtrasActions.userDetailsExtrasAllRequest(options)),
    getAllAchievementDictionaries: (options) => dispatch(AchievementDictionaryActions.achievementDictionaryAllRequest(options)),
    getUserDetail: (id) => dispatch(UserDetailActions.userDetailRequest(id)),
    getAllUserDetails: (options) => dispatch(UserDetailActions.userDetailAllRequest(options)),
    updateUserDetail: (userDetail) => dispatch(UserDetailActions.userDetailUpdateRequest(userDetail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailEntityEditScreen)
