import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  row: {
    flex: 1,
    height: 80,
    backgroundColor: Colors.cloud,
    borderColor: Colors.darkBrown,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: Metrics.smallMargin,
    justifyContent: 'center'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.panther,
    textAlign: 'left',
    marginBottom: Metrics.smallMargin
  },
  label: {
    fontSize: 20,
    fontWeight:'normal',
    textAlign: 'center',
    color: Colors.charcoal
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  linearGradient: {
    height: Metrics.screenHeight
  }
})
