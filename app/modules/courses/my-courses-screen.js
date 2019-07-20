import React, { Component } from 'react';
import { connect } from 'react-redux'
import {courseDetailScreen} from "../../navigation/layouts";
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import styles from "./courses-screen.style";
import CourseActions from '../entities/course/course.reducer'
import { Navigation } from 'react-native-navigation'
import AlertMessage from "../../shared/components/alert-message/alert-message";
import LinearGradient from 'react-native-linear-gradient'

class MyCoursesScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      page: 0,
      sort: 'id.asc',
      size:20,
      loading:true,
      done: false,
      dataObjects:[]
    }
  }

  navigationButtonPressed ({buttonId, disableSignUp}) {
    courseDetailScreen({courseId: null, disableSignUp: true})
  }


  renderRow({item}) {

    var startDate = new Date(item.courseStartDate).toLocaleDateString("pl");
    var startTime = new Date(item.courseStartDate).toLocaleTimeString("pl").substr(0,5);

    var endDate = new Date(item.courseEndDate).toLocaleDateString("pl");
    var endTime = new Date(item.courseEndDate).toLocaleTimeString("pl").substr(0,5);

    return (
      <TouchableOpacity onPress={courseDetailScreen.bind(this,{courseId: item.id, disableSignUp: true})}>
        <View style={styles.row}>
          <Text style={styles.label}>{item.title}</Text>
          <Text style={styles.boldLabel}>Czas: {item.duration}</Text>
          <Text style={styles.boldLabel}>Początek: {startDate} {startTime}  Koniec: {endDate} {endTime}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  readerEmpty = () => {
    return <AlertMessage title='Nie znaleziono kursów' show={!this.props.fetching} />
  }

  onScreenWorth = 20


  fetchCourses = () => {
    this.props.getMyCourses({page: this.state.page, sort:this.state.sort, size: this.state.size})
  }

  handleLoadMore= () =>{
    if (this.state.done || this.props.fetching) {
      return
    }

    this.setState({
      page: this.state.page + 1,
      loading: true
    })
    this.fetchCourses()
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
    if(newProps.myCourses) {
      this.setState({
        done: newProps.myCourses.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.myCourses] : newProps.myCourses,
        loading: false
      })
    }
  }

  componentWillMount(){
    this.fetchCourses()
  }

  render() {
    return(
      <LinearGradient colors={['#F0B0A5', '#EFE0A1']} style={styles.linearGradient}>
        <View style={styles.container} testId='myCoursesScreen'>
          <FlatList
            data={this.state.dataObjects}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={this.onScreenWorth}
            onEndReached={this.handleLoadMore}
            onEndThreshold={100}
            ListEmptyComponent={this.readerEmpty}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </LinearGradient>
    )
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
    getMyCourses: (options) => dispatch (CourseActions.myCoursesAllRequest(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCoursesScreen);
