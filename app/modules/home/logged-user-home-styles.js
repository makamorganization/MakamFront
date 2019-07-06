import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.transparent
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  linearGradient: {
    height: Metrics.screenHeight - 80
  },
  iconsWrapper: {
      flexWrap: 'wrap',
      alignSelf: 'center'
  },
  icon: {
    alignContent: 'stretch',
    borderWidth: 3,
    borderColor: Colors.darkBrown,
    backgroundColor: Colors.cloud,
    borderRadius: 10,
    height: 120,
    width: 150,
    margin: 10,
    alignContent: 'center'
  },
  fontawesome: {
    fontFamily: 'fa-solid-900',
    fontSize: 100,
    alignSelf: 'center',
    color: Colors.coal
  }
})