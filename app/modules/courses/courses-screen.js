import React, { Component } from 'react';
import { connect } from 'react-redux'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {courseDetailScreen, myCoursesEntityScreen} from "../../navigation/layouts";
import { Navigation } from 'react-native-navigation'
import styles from './courses-screen.style'
import CourseActions from '../entities/course/course.reducer'
import AlertMessage from '../../shared/components/alert-message/alert-message'
import RoundedButton from "../../shared/components/rounded-button/rounded-button";

class CoursesScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)

    this.state = {
      page: 0,
      sort: 'id,asc',
      size:20,
      loading: true,
      done: false,
      dataObjects: []
    }
  }

  navigationButtonPressed ({ buttonId }) {
    courseDetailScreen({ courseId: null})
  }


  renderRow({ item}) {

    return (
      <TouchableOpacity onPress={courseDetailScreen.bind(this,{courseId: item.id})}>
        <View style={styles.row}>
          <Text style={styles.label}>{item.title}</Text>
          <Text style={styles.boldLabel}>Czas: {item.duration}</Text>
          <Text style={styles.boldLabel}>Początek: {item.courseStartDate}  Koniec: {item.courseEndDate}</Text>
        </View>
      </TouchableOpacity>
    )
  }


  readerEmpty =() =>
    <AlertMessage title='Nie znaleziono kursów' show={!this.props.fetching}/>

  onScreenWorth = 20

  fetchCourses = () => {
    this.props.getAllCourses({page: this.state.page, sort: this.state.sort, size: this.state.size})
  }

  handleLoadMore = () => {
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
    if(newProps.courses) {
      this.setState({
        done: newProps.courses.length < this.state.size,
        dataObjects: this.state.loading ? [...this.state.dataObjects, ...newProps.courses] : newProps.courses,
        loading: false
      })
    }
  }

  componentWillMount () {
    this.fetchCourses();
  }


    render() {
        return (
          <View style={styles.container} testID='coursesScreen'>
            <RoundedButton text='Moje kursy' onPress={myCoursesEntityScreen.bind(this)}/>
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
        );
    }
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
    fetching: state.courses.fetchingAll,
    error: state.courses.errorAll
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getAllCourses: (options) => dispatch (CourseActions.courseAllRequest(options))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen);
