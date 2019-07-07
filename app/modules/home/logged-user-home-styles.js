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
      alignSelf: 'center',
      flex: 1
  },
  iconsBlock: {
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1
  },
  icon: {
    alignContent: 'stretch',
    borderWidth: 3,
    borderColor: Colors.darkBrown,
    backgroundColor: Colors.cloud,
    borderRadius: 10,
    flex: 1,
    margin: 10,
    alignContent: 'center'
  },
  fontawesome: {
    fontFamily: 'fa-solid-900',
    fontSize: Metrics.screenHeight / 6.3,
    alignSelf: 'center',
    color: Colors.coal
  }
})