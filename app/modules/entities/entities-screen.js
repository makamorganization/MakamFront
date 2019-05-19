import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
/*eslint-disable */
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import {
  courseEntityScreen,
  userDetailEntityScreen,
  userDetailsExtraEntityScreen,
  courseParticipantEntityScreen,
  certificateEntityScreen,
  achievementDictionaryEntityScreen,
  facultyDictionaryEntityScreen,
  fieldOfStudyDictionaryEntityScreen,
  // ignite-jhipster-entity-screen-import-needle
} from '../../navigation/layouts'
/* eslint-enable */

import styles from './entities-screen.styles'

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        <RoundedButton text='Course' onPress={courseEntityScreen} testID='courseEntityScreenButton' />
        <RoundedButton text='UserDetail' onPress={userDetailEntityScreen} testID='userDetailEntityScreenButton' />
        <RoundedButton text='UserDetailsExtra' onPress={userDetailsExtraEntityScreen} testID='userDetailsExtraEntityScreenButton' />
        <RoundedButton text='CourseParticipant' onPress={courseParticipantEntityScreen} testID='courseParticipantEntityScreenButton' />
        <RoundedButton text='Certificate' onPress={certificateEntityScreen} testID='certificateEntityScreenButton' />
        <RoundedButton text='AchievementDictionary' onPress={achievementDictionaryEntityScreen} testID='achievementDictionaryEntityScreenButton' />
        <RoundedButton text='FacultyDictionary' onPress={facultyDictionaryEntityScreen} testID='facultyDictionaryEntityScreenButton' />
        <RoundedButton text='FieldOfStudyDictionary' onPress={fieldOfStudyDictionaryEntityScreen} testID='fieldOfStudyDictionaryEntityScreenButton' />
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
