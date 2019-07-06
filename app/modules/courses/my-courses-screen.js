import React, { Component } from 'react';
import { connect } from 'react-redux'
import {courseDetailScreen} from "../../navigation/layouts";
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import styles from "./courses-screen.style";
import CourseActions from '../entities/course/course.reducer'
import { Navigation } from 'react-native-navigation'
import AlertMessage from "../../shared/components/alert-message/alert-message";

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

  navigationButtonPressed ({buttonId}) {
    courseDetailScreen({courseId: null})
  }


  renderRow({item}) {
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

  readerEmpty = () => {
   console.log(this.props);
    return <AlertMessage title='Nie znaleziono kursów' show={!this.props.fetching}/>
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
      page: this.state.page + 1
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
