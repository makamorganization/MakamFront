import React, { Component } from 'react';
import styles from './calendar-screen.styles'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import CourseActions from '../entities/course/course.reducer'
import {Calendar,CalendarList,Agenda} from 'react-native-calendars'
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
      items:[],
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
      <View style={styles.container}>
        <Text>
          {item.courseTitle}
        {item.courseDescription}
        </Text>
      </View>
    )
  }

  fetchCourses = () => {
    this.props.getMyCourses()
  }

  componentWillReceiveProps(newProps) {

    //TODO POPRAWIC BO POKAZUJE ZE WSTAWIAM ARRAY A POWIENIEN BYC NIBY OBJECT, POMIMO WARNINGU WYSWIETLA SIE
    if (newProps.myCourses) {
      this.setState({
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.myCourses] : newProps.myCourses,
        loading : false
      },function(){
        let itemsArray ={};
        this.state.dataObjects.forEach((course) => {
          itemsArray[course.courseStartDate] = [{courseTitle: course.title},{courseDescription: course.description}];
        })
        this.setState({
          items: itemsArray,
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
            minDate={new Date().getDate()}
            items={this.state.items}
            renderItem={this.renderItem.bind(this)}
            selected={new Date()}
            renderEmptyData = {() => {return (<View />);}}
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
