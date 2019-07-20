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
      disableSignUp: props.data.disableSignUp,
      course: {},
      signingOutFromCourse: false,
      signingUpForCourse: false
    }
    console.log(props);
  }

  componentWillMount(){
    this.props.getCourse(this.props.data.courseId)
  }


  componentWillReceiveProps(newProps) {
    if (newProps.course) {
      this.setState({course: newProps.course})
    }

    if (this.state.signingUpForCourse && newProps.signingUpForCourse === false) {
      if (!newProps.errorSigningUpForCourse) {
        this.props.getCourses()
        Alert.alert('Sukces', 'Udało się zapisać do kursu', [{text: 'OK'}])
        Navigation.pop(this.props.componentId);
      } else {
        Alert.alert('Błąd', 'Nie udało się zapisać na kurs', [{text: 'OK'}])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }

      if (this.state.signingOutFromCourse && newProps.signingOutFromCourse === false) {
        if (!newProps.errorSigningOutFromCourse) {
          this.props.getMyCourses()
          Alert.alert('Sukces', 'Udało się wypisać z kursu', [{text: 'OK'}])
          Navigation.pop(this.props.componentId);
        } else {
          Alert.alert('Błąd', 'Nie udało się wypisać z kursu', [{text: 'OK'}])
          this.setState({
            success: false,
            requesting: false
          })
        }
      }



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
              signingOutFromCourse: true}, () => {
              this.props.signOutFromCourse(this.props.data.courseId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }


  parsDat(item){
    var startDate = new Date(item).toLocaleDateString("pl");
    var startTime = new Date(item).toLocaleTimeString("pl").substr(0,5);

    return startDate +" " +startTime;
  }


  render() {
    var startDate = this.parsDat(this.state.course.courseStartDate);
    var endDate  = this.parsDat(this.state.course.courseEndDate);
    var startRegisterDate  = this.parsDat(this.state.course.registerStartDate);
    var endRegisterDate  = this.parsDat(this.state.course.registerEndDate);

    let button;

    if(this.state.disableSignUp == true) {
      button = <TouchableOpacity style={styles.button} onPress={this.signOutFromCourse}>
        <Text style={styles.buttonText}>Wypisz się</Text>
      </TouchableOpacity>;
    } else {
      button = <TouchableOpacity style={styles.button} onPress={this.signUpForCourse}>
        <Text style={styles.buttonText}>Zapisz się</Text>
      </TouchableOpacity>;
    }



    return (
      <LinearGradient colors={['#F0B0A5', '#EFE0A1']} style={styles.linearGradient}>
        <ScrollView style={styles.container}>
          <Text testID='title' style={styles.text}>Tytuł: {this.state.course.title}</Text>
          <Text testID='description' style={styles.text}>Opis: {this.state.course.description}</Text>
          <Text testID='courseStartDate' style={styles.text}>Początek: {startDate}</Text>
          <Text testID='courseEndDate' style={styles.text}>Koniec: {endDate}</Text>
          <Text testID='registerStartDate' style={styles.text}>Początek rejestracji: {startRegisterDate}</Text>
          <Text testID='registerEndDate' style={styles.text}>Koniec rejestracji: {endRegisterDate}</Text>
          <Text testID='duration' style={styles.text}>Czas trwania: {this.state.course.duration}</Text>
          <Text testID='maximumNumberOfParticipants' style={styles.text}>Maksymalna liczba uczestników: {this.state.course.maximumNumberOfParticipants}</Text>
          <Text testID='minimalNumberOfParticipants' style={styles.text}>Minimalna liczba uczestników: {this.state.course.minimalNumberOfParticipants}</Text>
          <Text testID='lecturerName' style={styles.text}>Prowadzący: {this.state.course.lecturerName} {this.state.course.lecturerSurname}</Text>
          <Text testID='pointPerCourse' style={styles.text}>Punkty za ukończenie kursu: {this.state.course.pointPerCourse}</Text>
          {button}
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
    getCourses: (options) => dispatch(CourseActions.courseAllRequest(options)),
    getMyCourses: (options) => dispatch (CourseActions.myCoursesAllRequest(options)),
    signUpForCourse: (id) => dispatch(CourseActions.signUpForCourse(id)),
    signOutFromCourse: (id)=> dispatch(CourseActions.signOutFromCourse(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailScreen)
