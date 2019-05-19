import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { achievementDictionaryEntityEditScreen } from '../../../navigation/layouts'

import AchievementDictionaryActions from './achievement-dictionary.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './achievement-dictionary-entity-detail-screen-style'

class AchievementDictionaryEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      achievementDictionary: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getAchievementDictionary(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.achievementDictionary) {
      this.setState({ achievementDictionary: newProps.achievementDictionary })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllAchievementDictionaries()
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
      'Delete AchievementDictionary?',
      'Are you sure you want to delete the AchievementDictionary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteAchievementDictionary(this.props.data.entityId)
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
        <Text>ID: {this.state.achievementDictionary.id}</Text>
        <Text testID='key'>Key: {this.state.achievementDictionary.key}</Text>
        <Text testID='value'>Value: {this.state.achievementDictionary.value}</Text>
        <Text testID='enabled'>Enabled: {this.state.achievementDictionary.enabled}</Text>
        <Text testID='description'>Description: {this.state.achievementDictionary.description}</Text>
        <RoundedButton text='Edit' onPress={achievementDictionaryEntityEditScreen.bind(this, { entityId: this.state.achievementDictionary.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    achievementDictionary: state.achievementDictionaries.achievementDictionary,
    deleting: state.achievementDictionaries.deleting,
    errorDeleting: state.achievementDictionaries.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAchievementDictionary: (id) => dispatch(AchievementDictionaryActions.achievementDictionaryRequest(id)),
    getAllAchievementDictionaries: (options) => dispatch(AchievementDictionaryActions.achievementDictionaryAllRequest(options)),
    deleteAchievementDictionary: (id) => dispatch(AchievementDictionaryActions.achievementDictionaryDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AchievementDictionaryEntityDetailScreen)
