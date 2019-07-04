import React, { Component } from 'react';
import styles from './home-screen.styles'
import { Images } from '../../shared/themes'
import { Text, Image, View } from 'react-native'

export default class LoggedUserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View>
            <View style={styles.centered}>
                <Image source={Images.logoJhipster} style={styles.logo} />
            </View>

            <View style={styles.section} >
                <Image source={Images.ready} />
                <Text style={styles.sectionText}>
                    {'ZALOGOWANY'}
                </Text>
            </View>
        </View>   
    );
  }
}
