import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes'
import Dimensions from 'Dimensions';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo * 1.2,
    width: Metrics.images.logo * 1.2,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  linearGradient: {
    height: Metrics.screenHeight - 80
  },
  button: {
    height: 45,
    backgroundColor: Colors.customButton,
    borderColor: Colors.customButton,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
})