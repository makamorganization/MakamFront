import React, { Component } from 'react';
import styles from './calendar-screen.styles'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import CourseActions from '../entities/course/course.reducer'
import {Calendar,CalendarList,Agenda} from 'react-native-calendars'
import AlertMessage from '../../shared/components/alert-message/alert-message'
import {Navigation} from "react-native-navigation/lib/dist/index";
import {LocaleConfig} from 'react-native-calendars';

class CalendarScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      loading:true,
      done: false,
      dataObjects:[],
      items:{},
    }

    LocaleConfig.locales['pl'] = {
      monthNames: ['Styczeń', 'Luty','Marzec', 'Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
      monthNamesShort: ['Sty','Lut','Mar','Kwie','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'],
      dayNames: ['Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota','Niedziela'],
      dayNamesShort: ['Pon','Wto','Śro','Czw','Pią','Sob','Nie'],
      today: 'Dzisiaj'
    };
    LocaleConfig.defaultLocale = 'pl';
  }



  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <Text>
          {item.courseTitle}
          {item.courseDescription}
          {item.time}
        </Text>
      </View>
    )
  }

  fetchCourses = () => {
    this.props.getMyCourses()
  }




  renderEmptyData() {
    return <AlertMessage title='Nie znaleziono kursów w danym dniu'/>
  }

  parsTime(startDate, endDate) {
    var startTime = startDate.getHours();
    var endTime = endDate.getHours();
    if(startDate.getMinutes() < 10) {
      startTime = startTime + ":0" + startDate.getMinutes();
    } else {
      startDate = startTime + ":" + startDate.getMinutes();
    }

    if (endDate.getMinutes() < 10) {
      endTime = endTime + ":0" + endDate.getMinutes();
    } else {
      endTime = endDate + ":" + endDate.getMinutes();
    }

    return startTime + " - " + endTime;
  }

  parsMonth(startDate) {
    var month = startDate.getMonth() +1;
    if (month < 10) {
      return"0" + month;
    } else {
      return month;
    }
  }

  componentWillReceiveProps(newProps) {

    if (newProps.myCourses) {
      this.setState({
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.myCourses] : newProps.myCourses,
        loading : false
      },function(){
        let itemsObject ={};
        this.state.dataObjects.forEach((course) => {
          var startDate = new Date(course.courseStartDate);
          var endDate = new Date(course.courseEndDate);
          var startDateFormatted = startDate.getFullYear() + "-" + this.parsMonth(startDate) + "-" + startDate.getDate();
          itemsObject[startDateFormatted] = [{time: this.parsTime(startDate,endDate)},{courseTitle: course.title}, {courseDescription: course.description}];
        })
        this.setState({
          items: itemsObject,
        },function(){
          console.log(this.state.items);
        })
      })
    }
  }

  componentWillMount(){
    this.fetchCourses()
  }


    render() {
        return (
            <Agenda
            items={this.state.items}
            renderItem={this.renderItem.bind(this)}
            selected={new Date()}
            renderEmptyData={this.renderEmptyData.bind(this)}
            rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}

            />
        );
    }
}


const mapStateToProps = (state) => {
  return {
    myCourses: state.myCourses.myCourses,
    fetching: state.myCourses.fetchingMyCourses,
    error: state.myCourses.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMyCourses: () => dispatch(CourseActions.myCoursesAllRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
