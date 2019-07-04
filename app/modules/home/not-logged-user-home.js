import React, { Component } from 'react';
import styles from './not-logged-user-home-styles'
import { Images } from '../../shared/themes'
import { Text, Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

export default class NotLoggedUserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <LinearGradient colors={['#F0B0A5', '#EFE0A1']} style={styles.linearGradient}>
            <View style={styles.centered}>
                <Image source={Images.makamIcon} style={styles.logo} />
            </View>

            <View style={styles.section} >
                <Image source={Images.ready} />
                <Text style={styles.sectionText}>
                    {'NIEZALOGOWANY'}
                </Text>
            </View>
        </LinearGradient>
     
    );
  }
}
