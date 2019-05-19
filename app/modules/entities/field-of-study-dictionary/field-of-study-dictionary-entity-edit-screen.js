import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import FieldOfStudyDictionaryActions from './field-of-study-dictionary.reducer'
import FacultyDictionaryActions from '../faculty-dictionary/faculty-dictionary.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { fieldOfStudyDictionaryEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './field-of-study-dictionary-entity-edit-screen-style'

let Form = t.form.Form

class FieldOfStudyDictionaryEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        key: t.maybe(t.String),
        value: t.maybe(t.String),
        facultyDictionaryId: this.getFacultyDictionaries()
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          facultyDictionaryId: {
            testID: 'facultyDictionaryIdInput',
            label: 'FacultyDictionary'
          },
          key: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('value').refs.input.focus(),
            testID: 'keyInput'
          },
          value: {
            testID: 'valueInput'
          }
        }
      },
      success: false,
      fieldOfStudyDictionary: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getFieldOfStudyDictionary(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
    this.props.getAllFacultyDictionaries()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fieldOfStudyDictionary && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.fieldOfStudyDictionary)
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
        this.props.getAllFieldOfStudyDictionaries({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.fieldOfStudyDictionary.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: fieldOfStudyDictionaryEntityDetailScreen.bind(this, { entityId })
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
      key: value.key || null,
      value: value.value || null,
      facultyDictionaryId: value.facultyDictionaryId || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      key: value.key || null,
      value: value.value || null,
      facultyDictionaryId: value.facultyDictionaryId || null
    }
    return entity
  }

  getFacultyDictionaries = () => {
    const facultyDictionaries = {}
    this.props.facultyDictionaries.forEach(facultyDictionary => {
      facultyDictionaries[facultyDictionary.id] = facultyDictionary.id ? facultyDictionary.id.toString() : facultyDictionary.id.toString()
    })
    return t.maybe(t.enums(facultyDictionaries))
  }
  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const fieldOfStudyDictionary = this.refs.form.getValue()
    if (fieldOfStudyDictionary) { // if validation fails, value will be null
      this.props.updateFieldOfStudyDictionary(this.formValueToEntity(fieldOfStudyDictionary))
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
    facultyDictionaries: state.facultyDictionaries.facultyDictionaries || [],
    fieldOfStudyDictionary: state.fieldOfStudyDictionaries.fieldOfStudyDictionary,
    fetching: state.fieldOfStudyDictionaries.fetchingOne,
    updating: state.fieldOfStudyDictionaries.updating,
    error: state.fieldOfStudyDictionaries.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFacultyDictionaries: (options) => dispatch(FacultyDictionaryActions.facultyDictionaryAllRequest(options)),
    getFieldOfStudyDictionary: (id) => dispatch(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryRequest(id)),
    getAllFieldOfStudyDictionaries: (options) => dispatch(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryAllRequest(options)),
    updateFieldOfStudyDictionary: (fieldOfStudyDictionary) => dispatch(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryUpdateRequest(fieldOfStudyDictionary))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldOfStudyDictionaryEntityEditScreen)
