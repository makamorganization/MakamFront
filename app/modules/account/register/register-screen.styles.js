import { StyleSheet } from 'react-native'

import { ApplicationStyles, Colors, Metrics } from '../../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: Colors.customButton,
    borderColor: Colors.customButton,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  linearGradient: {
    height: Metrics.screenHeight - 80
  }
})
