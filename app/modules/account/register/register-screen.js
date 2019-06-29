import React from 'react'
import { Alert, ScrollView, Text, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FacultyDictionaryActions from '../../entities/faculty-dictionary/faculty-dictionary.reducer'
import FieldOfFacultyDictionaryActions from '../../entities/field-of-study-dictionary/field-of-study-dictionary.reducer'
import { Navigation } from 'react-native-navigation'
import t from 'tcomb-form-native'

import RegisterActions from '../register/register.reducer'
// Styles
import styles from './register-screen.styles'

let Form = t.form.Form

class RegisterScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      currentFacultyId: 0,
      accountModel: t.struct({
        login: t.String,
        firstName: t.String,
        lastName: t.String,
        facultyId: this.getFacultyDictionaries(),
        fieldOfStudyId: this.getFieldOfStudyDictionariesForFaculty(),
        studentCardNumber:t.String,
        studyYear:t.Number,
        telephoneNumber:t.String,
        password: t.String,
        confirmPassword: t.String,
        email: t.String,
      }),
      accountValue: { login: null, firstName: null, lastName: null, facultyId: null, fieldOfStudyId: null, studentCardNumber: null, studyYear: null, telephoneNumber: null, password: null, confirmPassword: null, email: null, langKey: 'pl' },
      options: {
        fields: {
          login : {
            label: 'Login',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('firstName').refs.input.focus()
          },
          firstName: {
            label: 'Imie',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lastName').refs.input.focus()
          },
          lastName: {
            label: 'Nazwisko',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('facultyId').refs.input.focus()
          },
          facultyId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('fieldOfStudyId').refs.input.focus()
          },
          fieldOfStudyId: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('studentCardNumber').refs.input.focus()
          },
          studentCardNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('studyYear').refs.input.focus()
          },
          studyYear: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('telephoneNumber').refs.input.focus()
          },
          telephoneNumber: {
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          email: {
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitUpdate()
          },
          langKey: {
            hidden: true
          }
        }
      },
      success: false
    }
    this.submitUpdate = this.submitUpdate.bind(this)
    this.accountChange = this.accountChange.bind(this)
  }

  getFacultyDictionaries = () => {
    const facultyDictionaries = {}
    this.props.facultyDictionaries.forEach(facultyDictionary => {
      facultyDictionaries[facultyDictionary.id] = facultyDictionary.id ? facultyDictionary.value.toString() : facultyDictionary.value.toString()
    })
    return t.enums(facultyDictionaries)
  }

  getFieldOfStudyDictionariesForFaculty = () => {
    const fieldOfStudyDictionariesForFaculty = {}
    this.props.fieldOfStudyDictionariesForFaculty.forEach(fieldOfFaculty => {
      fieldOfStudyDictionariesForFaculty[fieldOfFaculty.id] = fieldOfFaculty.id ? fieldOfFaculty.value.toString() : fieldOfFaculty.value.toString()
    })


    return t.enums(fieldOfStudyDictionariesForFaculty)
  }


  submitUpdate () {
    this.setState({
      success: false
    })
    // call getValue() to get the values of the form
    const value = this.refs.form.getValue()
    if (value) { // if validation fails, value will be null
      if (value.password !== value.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }])
        return
      }
      this.props.register(value)
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the register attempt complete?
    if (newProps.fetching) {
      if (newProps.error) {
        Alert.alert('Error', (newProps.error && newProps.error.title) ? newProps.error.title : '', [{ text: 'OK' }])
      } else {
        this.setState({
          success: true
        })
        Navigation.popToRoot(this.props.componentId)
        Alert.alert('Registration Successful', 'Please check your email', [{ text: 'OK' }])
      }
    }
  }


  componentWillMount(){
    this.props.getAllFacultyDictionaries()
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.currentFacultyId !== prevState.currentFacultyId) {
      this.setNewFaculties();
    }

    if(this.props.fieldOfStudyDictionariesForFaculty !== prevProps.fieldOfStudyDictionariesForFaculty){
      this.setNewStruct();
    }
  }


  setNewStruct() {
    const fieldOfStudyDictionariesForFaculty = {}
    this.props.fieldOfStudyDictionariesForFaculty.forEach(fieldOfFaculty => {
      fieldOfStudyDictionariesForFaculty[fieldOfFaculty.id] = fieldOfFaculty.id ? fieldOfFaculty.value.toString() : fieldOfFaculty.value.toString()
    })

    console.log(fieldOfStudyDictionariesForFaculty);
    this.setState({
      accountModel: t.struct({
        login: t.String,
        firstName: t.String,
        lastName: t.String,
        facultyId: this.getFacultyDictionaries(),
        fieldOfStudyId: t.enums(fieldOfStudyDictionariesForFaculty),
        studentCardNumber:t.String,
        studyYear:t.Number,
        telephoneNumber:t.String,
        password: t.String,
        confirmPassword: t.String,
        email: t.String,
      }),options: {
        fields: {
          login : {
            label: 'Login',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('firstName').refs.input.focus()
          },
          firstName: {
            label: 'Imie',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('lastName').refs.input.focus()
          },
          lastName: {
            label: 'Nazwisko',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('facultyId').refs.input.focus()
          },
          facultyId: {
            label: 'Wydział',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('fieldOfStudyId').refs.input.focus()
          },
          fieldOfStudyId: {
            label: 'Kierunek',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('studentCardNumber').refs.input.focus()
          },
          studentCardNumber: {
            label: 'Numer indeksu',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('studyYear').refs.input.focus()
          },
          studyYear: {
            label: 'Rok studiów',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('telephoneNumber').refs.input.focus()
          },
          telephoneNumber: {
            label: 'Numer telefonu',
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('password').refs.input.focus()
          },
          password: {
            label: 'Hasło',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('confirmPassword').refs.input.focus()
          },
          confirmPassword: {
            label: 'Powtórz hasło',
            secureTextEntry: true,
            returnKeyType: 'next',
            onSubmitEditing: () => this.refs.form.getComponent('email').refs.input.focus()
          },
          email: {
            label: 'E-mail',
            returnKeyType: 'done',
            onSubmitEditing: () => this.submitUpdate()
          },
          langKey: {
            hidden: true
          }
        }
      }


    });
  }

  setNewFaculties() {
    this.props.getFieldOfStudyDictionariesForFaculty(this.state.currentFacultyId)
  }

  accountChange (newValue) {
    if(newValue.facultyId != '' && newValue.facultyId !== this.state.currentFacultyId) {
      this.setState({
        currentFacultyId: newValue.facultyId
      }, function(){
        this.setNewFaculties();
      })
    }
    this.setState({
      accountValue: newValue,
    })

  }

  render () {
    return (
      <KeyboardAwareScrollView>
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            type={this.state.accountModel}
            options={this.state.options}
            value={this.state.accountValue}
            onChange={this.accountChange}
          />
          <TouchableHighlight style={styles.button} onPress={this.submitUpdate} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
        </ScrollView>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    facultyDictionaries: state.facultyDictionaries.facultyDictionaries || [],
    fieldOfStudyDictionariesForFaculty: state.fieldOfStudyDictionariesForFaculty.fieldOfStudyDictionariesForFaculty || [],
    fetching: state.register.fetching,
    error: state.register.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFacultyDictionaries: (options) => dispatch(FacultyDictionaryActions.facultyDictionaryAllRequest(options)),
    getFieldOfStudyDictionariesForFaculty: (facultyId) => dispatch(FieldOfFacultyDictionaryActions.fieldOfStudyDictionaryForFacultyRequest(facultyId)),
    register: (account) => dispatch(RegisterActions.registerRequest(account))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
