import React from 'react'
import {TouchableOpacity,Alert, ScrollView, Text, View} from 'react-native'
import {connect} from 'react-redux'
import { courseDetailScreen } from "../../navigation/layouts";
import { Navigation } from 'react-native-navigation'
import {jsDateToLocalDate} from "../../shared/util/date-transforms";

import CourseActions from '../entities/course/course.reducer'
import RoundedButton from '../../shared/components/rounded-button/rounded-button'
import styles from './course-detail-screen-style'

class CourseDetailScreen extends React.Component {
  constructor(props){
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      courseId: props.data.courseId,
      course: {}
    }
  }

  componentWillMount(){
    this.props.getCourse(this.props.data.courseId)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.course) {
      this.setState({course: newProps.course})
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text testID='title'>Title: {this.state.course.title}</Text>
    <Text testID='description'>Description: {this.state.course.description}</Text>
    <Text testID='courseStartDate'>CourseStartDate: {jsDateToLocalDate(this.state.course.courseStartDate)}</Text>
    <Text testID='courseEndDate'>CourseEndDate: {jsDateToLocalDate(this.state.course.courseEndDate)}</Text>
    <Text testID='registerStartDate'>RegisterStartDate: {jsDateToLocalDate(this.state.course.registerStartDate)}</Text>
    <Text testID='registerEndDate'>RegisterEndDate: {jsDateToLocalDate(this.state.course.registerEndDate)}</Text>
    <Text testID='duration'>Duration: {this.state.course.duration}</Text>
    <Text testID='maximumNumberOfParticipants'>MaximumNumberOfParticipants: {this.state.course.maximumNumberOfParticipants}</Text>
    <Text testID='minimalNumberOfParticipants'>MinimalNumberOfParticipants: {this.state.course.minimalNumberOfParticipants}</Text>
    <Text testID='lecturerName'>LecturerName: {this.state.course.lecturerName}</Text>
    <Text testID='lecturerSurname'>LecturerSurname: {this.state.course.lecturerSurname}</Text>
    <Text testID='pointPerCourse'>PointPerCourse: {this.state.course.pointPerCourse}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Zapisz się</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Wypisz się</Text>
        </TouchableOpacity>


      </ScrollView>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    course: state.courses.course
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getCourse: (id) => dispatch(CourseActions.courseRequest(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailScreen)
