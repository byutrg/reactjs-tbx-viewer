import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {withRouter} from 'react-router-dom'

import Blur from '../containers/Blur'

import styles from '../styled/styles'

import Button from '@material-ui/core/Button'

class UploadHeader extends Component {
  render() {
    return (
      <div
        style={styles.uploadHeader}
      >
        <h1
            style={styles.uploadHeader.h1}
        >TBX</h1>
        <p
            style={styles.uploadHeader.p}
            >Viewer</p>
      </div>
    )
  }
}

class FileUploader extends Component {
  upload = (file) => {
    this.props.callback.call(this.props.self, file.target.files[0])
  }

  render() {
    return (
      <Blur>
          <UploadHeader/>
          <input
              type="file"
              style={{display:'none'}}
              onChange={this.upload}
              accept=".tbx, .tbxm, .xml"
              id="contained-button-file"
              />
          <label style={styles.uploadButton.label} htmlFor="contained-button-file">
              <Button
                component='span'
                style={styles.uploadButton}
                variant="contained"
              >
                Select TBX File to Upload
              </Button>
          </label>

      </Blur>
    )
  }
}
export default withRouter(FileUploader)
