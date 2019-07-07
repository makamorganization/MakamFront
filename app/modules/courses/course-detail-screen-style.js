import { StyleSheet } from 'react-native'

import {ApplicationStyles, Colors, Fonts, Metrics} from '../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: 20
  },
  button: {
    marginTop: 20,
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.customButton,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  disabled: {
    marginTop: 20,
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.charcoal,
    justifyContent: 'center'
  },
  linearGradient: {
    height: Metrics.screenHeight
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.coal
  }
})
