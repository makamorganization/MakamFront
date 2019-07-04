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
    height: Metrics.images.logo * 1.2,
    width: Metrics.images.logo * 1.2,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 100,
    borderRadius: 0
  }
})