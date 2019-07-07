import { StyleSheet } from 'react-native'

import { Colors, Metrics } from '../../shared/themes'

export default StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: Colors.transparent
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.charcoal
  },
  textInput: {
    height: 50,
    width: Metrics.screenWidth * 0.8,
    backgroundColor: Colors.cloud,
    alignSelf: 'center',
    color: Colors.coal,
    borderWidth: 1,
    borderColor: Colors.coal,
    borderRadius: 10
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  loginButton: {
    height: 45,
    backgroundColor: Colors.customButton,
    borderColor: Colors.customButton,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  topLogo: {
    fontSize: 50,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'PermanentMarker-Regular',
    paddingBottom: 40
  },
  linearGradient: {
    height: Metrics.screenHeight
  }
})
