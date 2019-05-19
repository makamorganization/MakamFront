import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import AchievementDictionaryActions from './achievement-dictionary.reducer'
import { Navigation } from 'react-native-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { achievementDictionaryEntityDetailScreen } from '../../../navigation/layouts'

import t from 'tcomb-form-native'

import styles from './achievement-dictionary-entity-edit-screen-style'

let Form = t.form.Form

class AchievementDictionaryEntityEditScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      updating: props.data.entityId !== null && props.data.entityId !== undefined,
      formModel: t.struct({
        id: t.maybe(t.Number),
        key: t.maybe(t.String),
        value: t.maybe(t.String),
        enabled: t.maybe(t.Boolean),
        description: t.maybe(t.String)
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
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('enabled').refs.input.focus(),
            testID: 'valueInput'
          },
          enabled: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('description').refs.input.focus(),
            testID: 'enabledInput'
          },
          description: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitForm(),
            testID: 'descriptionInput'
          }
        }
      },
      success: false,
      achievementDictionary: {}
    }

    this.submitForm = this.submitForm.bind(this)
    this.formChange = this.formChange.bind(this)
  }

  componentWillMount () {
    if (this.props.data.entityId) {
      this.props.getAchievementDictionary(this.props.data.entityId)
    } else {
      this.setState({ formValue: { id: null } })
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.achievementDictionary && !newProps.updating && !this.state.requesting && this.state.updating) {
      this.setState({
        formValue: this.entityToFormValue(newProps.achievementDictionary)
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
        this.props.getAllAchievementDictionaries({ page: 0, sort: 'id,asc', size: 20 })
        const entityId = newProps.achievementDictionary.id
        const alertOptions = [{ text: 'OK' }]
        if (!this.state.formValue.id) {
          alertOptions.push({
            text: 'View',
            onPress: achievementDictionaryEntityDetailScreen.bind(this, { entityId })
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
      enabled: value.enabled || null,
      description: value.description || null
    }
  }
  formValueToEntity = (value) => {
    const entity = {
      id: value.id || null,
      key: value.key || null,
      value: value.value || null,
      enabled: value.enabled || null,
      description: value.description || null
    }
    return entity
  }

  submitForm () {
    this.setState({
      success: false,
      requesting: true
    })
    // call getValue() to get the values of the form
    const achievementDictionary = this.refs.form.getValue()
    if (achievementDictionary) { // if validation fails, value will be null
      this.props.updateAchievementDictionary(this.formValueToEntity(achievementDictionary))
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
    achievementDictionary: state.achievementDictionaries.achievementDictionary,
    fetching: state.achievementDictionaries.fetchingOne,
    updating: state.achievementDictionaries.updating,
    error: state.achievementDictionaries.errorUpdating
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAchievementDictionary: (id) => dispatch(AchievementDictionaryActions.achievementDictionaryRequest(id)),
    getAllAchievementDictionaries: (options) => dispatch(AchievementDictionaryActions.achievementDictionaryAllRequest(options)),
    updateAchievementDictionary: (achievementDictionary) => dispatch(AchievementDictionaryActions.achievementDictionaryUpdateRequest(achievementDictionary))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievementDictionaryEntityEditScreen)
