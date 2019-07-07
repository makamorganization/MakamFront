import React, { Component } from 'react';
import styles from './not-logged-user-home-styles'
import { Images } from '../../shared/themes'
import { Text, Image, View, TouchableHighlight } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { loginScreen, registerScreen } from "../../navigation/layouts"

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
                <TouchableHighlight style={styles.button} onPress={loginScreen.bind(this)} underlayColor='#2e528f'>
                    <Text style={styles.buttonText}>Logowanie</Text>
                </TouchableHighlight>
                
                <TouchableHighlight style={styles.button} onPress={registerScreen.bind(this)} underlayColor='#2e528f'>
                    <Text style={styles.buttonText}>Rejestracja</Text>
                </TouchableHighlight>
            </View>
        </LinearGradient>
    );
  }
}
