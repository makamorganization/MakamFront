import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { facultyDictionaryEntityEditScreen } from '../../../navigation/layouts'

import FacultyDictionaryActions from './faculty-dictionary.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './faculty-dictionary-entity-detail-screen-style'

class FacultyDictionaryEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      facultyDictionary: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getFacultyDictionary(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.facultyDictionary) {
      this.setState({ facultyDictionary: newProps.facultyDictionary })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllFacultyDictionaries()
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
      'Delete FacultyDictionary?',
      'Are you sure you want to delete the FacultyDictionary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteFacultyDictionary(this.props.data.entityId)
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
        <Text>ID: {this.state.facultyDictionary.id}</Text>
        <Text testID='key'>Key: {this.state.facultyDictionary.key}</Text>
        <Text testID='value'>Value: {this.state.facultyDictionary.value}</Text>
        <RoundedButton text='Edit' onPress={facultyDictionaryEntityEditScreen.bind(this, { entityId: this.state.facultyDictionary.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    facultyDictionary: state.facultyDictionaries.facultyDictionary,
    deleting: state.facultyDictionaries.deleting,
    errorDeleting: state.facultyDictionaries.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFacultyDictionary: (id) => dispatch(FacultyDictionaryActions.facultyDictionaryRequest(id)),
    getAllFacultyDictionaries: (options) => dispatch(FacultyDictionaryActions.facultyDictionaryAllRequest(options)),
    deleteFacultyDictionary: (id) => dispatch(FacultyDictionaryActions.facultyDictionaryDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyDictionaryEntityDetailScreen)
