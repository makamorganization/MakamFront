import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import FacultyDictionaryActions from './faculty-dictionary.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { facultyDictionaryEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './faculty-dictionary-entity-edit-screen-style'

let Form = t.form.Form

class FacultyDictionaryEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        key: t.maybe(t.String),
        value: t.maybe(t.String)
      }),
      formValue: { id: null },
      formOptions: {
        fields: {
          id: {
            hidden: true
          },
          key: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('value').refs.input.focus(),
            testID: 'keyInput'
          },
          value: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'valueInput'
          }
        }
      },
      success: false,
      facultyDictionary: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getFacultyDictionary(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.facultyDictionary && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.facultyDictionary)
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
        this.props.getAllFacultyDictionaries({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.facultyDictionary.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: facultyDictionaryEntityDetailScreen.bind(this, { entityId })
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
      value: value.value || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      key: value.key || null,
      value: value.value || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const facultyDictionary = this.refs.form.getValue()
    if (facultyDictionary) { // if validation fails, value will be null
      this.props.updateFacultyDictionary(this.formValueToEntity(facultyDictionary))
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
    facultyDictionary: state.facultyDictionaries.facultyDictionary,
    fetching: state.facultyDictionaries.fetchingOne,
    updating: state.facultyDictionaries.updating,
    error: state.facultyDictionaries.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFacultyDictionary: (id) => dispatch(FacultyDictionaryActions.facultyDictionaryRequest(id)),
    getAllFacultyDictionaries: (options) => dispatch(FacultyDictionaryActions.facultyDictionaryAllRequest(options)),
    updateFacultyDictionary: (facultyDictionary) => dispatch(FacultyDictionaryActions.facultyDictionaryUpdateRequest(facultyDictionary))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyDictionaryEntityEditScreen)
