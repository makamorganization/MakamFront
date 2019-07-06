import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    height: 80,
    backgroundColor: Colors.steel,
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
    color: Colors.banner
  },
  listContent: {
    marginTop: Metrics.baseMargin
  }
})
