import React from 'react'
import {TouchableOpacity,Alert, ScrollView, Text, View} from 'react-native'
import {connect} from 'react-redux'
import { courseDetailScreen } from "../../navigation/layouts";
import { Navigation } from 'react-native-navigation'
import {jsDateToLocalDate} from "../../shared/util/date-transforms";

import CourseActions from '../entities/course/course.reducer'
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import styles from './course-detail-screen-style'
import LinearGradient from 'react-native-linear-gradient'

class CourseDetailScreen extends React.Component {
  constructor(props){
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      courseId: props.data.courseId,
      course: {},
      isSignOutDisabled: false,
    }
  }

  componentWillMount(){
    this.props.getCourse(this.props.data.courseId)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.course) {
      this.setState({course: newProps.course})
    }


    //TODO zaimplementowac poprawne sprawdzanie czy udalo sie porpawnie wypisac/zapisac na kurs
    // console.log(newProps);
    // if(!newProps.course && !newProps.errorSigningUpForCourse) {
    //    Navigation.pop(this.props.componentId)
    // } else {
    //   Alert.alert('Błąd', 'Nie udało się zapisać na kurs', [{ text: 'OK' }])
    //   this.setState({
    //     success: false,
    //     requesting: false
    //   })
    // }
    //
    //
    // if(!newProps.course && !newProps.errorSigningOutFromCourse) {
    //   Alert.alert('Suckes', 'Udało się wypisać z kursu', [{ text: 'OK' }])
    // } else {
    //   Alert.alert('Błąd', 'Nie udało się wypisać z kursu', [{ text: 'OK' }])
    //   this.setState({
    //     success: false,
    //     requesting: false
    //   })
    // }


  }


  signUpForCourse = () => {
    Alert.alert(
      'Zapisać się?',
      'Czy potwierdzasz zapis na ten kurs?',
      [
        { text: 'Nie', style: 'cancel' },
        {
          text: 'Tak',
          onPress: () => {
            this.setState({ signingUpForCourse: true }, () => {
              this.props.signUpForCourse(this.props.data.courseId)
            })
            this.props.getMyCourses()
            Alert.alert('Sukces', 'Udało się zapisać do kursu', [{ text: 'OK' }])
            Navigation.pop(this.props.componentId);
          }
        }
      ],
      { cancelable: false }
    )
  }



  signOutFromCourse = () => {
    Alert.alert(
      'Wypisać się?',
      'Czy na pewno chcesz się wypisać?',
      [
        { text: 'Nie', style: 'cancel' },
        {
          text: 'Tak',
          onPress: () => {
            this.setState({
              signingOutFromCourse: true,
              isSignOutDisabled: true }, () => {
              this.props.signOutFromCourse(this.props.data.courseId)
            })
            this.props.getMyCourses()
            Alert.alert('Sukces', 'Udało się wypisać z kursu', [{ text: 'OK' }])
          }
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <LinearGradient colors={['#F0B0A5', '#EFE0A1']} style={styles.linearGradient}>
        <ScrollView style={styles.container}>
          <Text testID='title' style={styles.text}>Tytuł: {this.state.course.title}</Text>
          <Text testID='description' style={styles.text}>Opis: {this.state.course.description}</Text>
          <Text testID='courseStartDate' style={styles.text}>Początek: {jsDateToLocalDate(this.state.course.courseStartDate)}</Text>
          <Text testID='courseEndDate' style={styles.text}>Koniec: {jsDateToLocalDate(this.state.course.courseEndDate)}</Text>
          <Text testID='registerStartDate' style={styles.text}>Początek rejestracji: {jsDateToLocalDate(this.state.course.registerStartDate)}</Text>
          <Text testID='registerEndDate' style={styles.text}>Koniec rejestracji: {jsDateToLocalDate(this.state.course.registerEndDate)}</Text>
          <Text testID='duration' style={styles.text}>Czas trwania: {this.state.course.duration}</Text>
          <Text testID='maximumNumberOfParticipants' style={styles.text}>Maksymalna liczba uczestników: {this.state.course.maximumNumberOfParticipants}</Text>
          <Text testID='minimalNumberOfParticipants' style={styles.text}>Minimalna liczba uczestników: {this.state.course.minimalNumberOfParticipants}</Text>
          <Text testID='lecturerName' style={styles.text}>Prowadzący: {this.state.course.lecturerName} {this.state.course.lecturerSurname}</Text>
          <Text testID='pointPerCourse' style={styles.text}>Punkty za ukończenie kursu: {this.state.course.pointPerCourse}</Text>
          <TouchableOpacity style={styles.button} onPress={this.signUpForCourse}>
            <Text style={styles.buttonText}>Zapisz się</Text>
          </TouchableOpacity>

          <TouchableOpacity style={this.state.isSignOutDisabled ?styles.disabled : styles.button} disabled={this.state.isSignOutDisabled} onPress={this.signOutFromCourse}>
            <Text style={styles.buttonText}>Wypisz się</Text>
          </TouchableOpacity>

        </ScrollView>
      </LinearGradient>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    course: state.courses.course,
    signingUpForCourse: state.courses.signingUpForCourse,
    signingOutFromCourse: state.courses.signingOutFromCourse,
    errorSigningUpForCourse: state.courses.errorSigningUpForCourse,
    errorSigningOutFromCourse: state.courses.errorSigningOutFromCourse,
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (id) => dispatch(CourseActions.courseRequest(id)),
    getMyCourses: (options) => dispatch (CourseActions.myCoursesAllRequest(options)),
    signUpForCourse: (id) => dispatch(CourseActions.signUpForCourse(id)),
    signOutFromCourse: (id)=> dispatch(CourseActions.signOutFromCourse(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailScreen)
