import React from 'react'
import { Alert, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { certificateEntityEditScreen } from '../../../navigation/layouts'
import { jsDateToLocalDate } from '../../../shared/util/date-transforms'

import CertificateActions from './certificate.reducer'
import RoundedButton from '../../../shared/components/rounded-button/rounded-button'
import styles from './certificate-entity-detail-screen-style'

class CertificateEntityDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      entityId: props.data.entityId,
      certificate: {},
      deleting: false
    }
  }

  componentWillMount () {
    this.props.getCertificate(this.props.data.entityId)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.certificate) {
      this.setState({ certificate: newProps.certificate })
    }

    if (this.state.deleting && newProps.deleting === false) {
      if (!newProps.errorDeleting) {
        this.props.getAllCertificates()
        Navigation.pop(this.props.componentId)
      } else {
        Alert.alert('Error', 'Something went wrong deleting the entity', [{ text: 'OK' }])
        this.setState({
          success: false,
          requesting: false
        })
      }
    }
  }

  confirmDelete = () => {
    Alert.alert(
      'Delete Certificate?',
      'Are you sure you want to delete the Certificate?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.setState({ deleting: true }, () => {
              this.props.deleteCertificate(this.props.data.entityId)
            })
          }
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>ID: {this.state.certificate.id}</Text>
        <Text testID='title'>Title: {this.state.certificate.title}</Text>
        <Text testID='path'>Path: {this.state.certificate.path}</Text>
        <Text testID='validityEndDate'>ValidityEndDate: {jsDateToLocalDate(this.state.certificate.validityEndDate)}</Text>
        <Text testID='signature'>Signature: {this.state.certificate.signature}</Text>
        <RoundedButton text='Edit' onPress={certificateEntityEditScreen.bind(this, { entityId: this.state.certificate.id })} />
        <RoundedButton text='Delete' onPress={this.confirmDelete} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    certificate: state.certificates.certificate,
    deleting: state.certificates.deleting,
    errorDeleting: state.certificates.errorDeleting
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCertificate: (id) => dispatch(CertificateActions.certificateRequest(id)),
    getAllCertificates: (options) => dispatch(CertificateActions.certificateAllRequest(options)),
    deleteCertificate: (id) => dispatch(CertificateActions.certificateDeleteRequest(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificateEntityDetailScreen)
