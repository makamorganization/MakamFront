import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { fieldOfStudyDictionaryEntityEditScreen } from '../../../navigation/layouts'

import FieldOfStudyDictionaryActions from './field-of-study-dictionary.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './field-of-study-dictionary-entity-detail-screen-style'

class FieldOfStudyDictionaryEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      fieldOfStudyDictionary: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getFieldOfStudyDictionary(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.fieldOfStudyDictionary) {
      this.setState({ fieldOfStudyDictionary: newProps.fieldOfStudyDictionary })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllFieldOfStudyDictionaries()
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
      'Delete FieldOfStudyDictionary?',
      'Are you sure you want to delete the FieldOfStudyDictionary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteFieldOfStudyDictionary(this.props.data.entityId)
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
        <Text>ID: {this.state.fieldOfStudyDictionary.id}</Text>
        <Text testID='key'>Key: {this.state.fieldOfStudyDictionary.key}</Text>
        <Text testID='value'>Value: {this.state.fieldOfStudyDictionary.value}</Text>
        <RoundedButton text='Edit' onPress={fieldOfStudyDictionaryEntityEditScreen.bind(this, { entityId: this.state.fieldOfStudyDictionary.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fieldOfStudyDictionary: state.fieldOfStudyDictionaries.fieldOfStudyDictionary,
    deleting: state.fieldOfStudyDictionaries.deleting,
    errorDeleting: state.fieldOfStudyDictionaries.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFieldOfStudyDictionary: (id) => dispatch(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryRequest(id)),
    getAllFieldOfStudyDictionaries: (options) => dispatch(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryAllRequest(options)),
    deleteFieldOfStudyDictionary: (id) => dispatch(FieldOfStudyDictionaryActions.fieldOfStudyDictionaryDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldOfStudyDictionaryEntityDetailScreen)
