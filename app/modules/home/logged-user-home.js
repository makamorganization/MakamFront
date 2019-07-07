import React, { Component } from 'react';
import styles from './logged-user-home-styles'
import { Text, View, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { calendarScreen, rankScreen, changePasswordScreen, certificatesScreen, coursesScreen, settingsScreen } from "../../navigation/layouts"

export default class LoggedUserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <LinearGradient colors={['#F0B0A5', '#EFE0A1']} style={styles.linearGradient}>
            <View style={styles.iconsWrapper}>
                <View style={styles.iconsBlock}>
                    <TouchableOpacity style={styles.icon} onPress={calendarScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf073;</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.icon} onPress={coursesScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf2b5;</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconsBlock}>
                    <TouchableOpacity style={styles.icon} onPress={rankScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf091;</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={certificatesScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf573;</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconsBlock}>
                    <TouchableOpacity style={styles.icon} onPress={calendarScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf1fa;</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={calendarScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf518;</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.iconsBlock}>
                    <TouchableOpacity style={styles.icon} onPress={changePasswordScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf362;</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={settingsScreen.bind(this)}>
                        <Text style={styles.fontawesome}>&#xf7d9;</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient> 
    );
  }
}
