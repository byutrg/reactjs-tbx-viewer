import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Blur from '../containers/Blur'

import Button from '@material-ui/core/Button'

class UploadHeader extends Component {
  render() {
    return (
      <div
        className="upload-header"
      >
        <h1
            className="upload-header__h1"
        >TBX</h1>
        <p
            className="upload-header__p"
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
            <label className="upload-button__label" htmlFor="contained-button-file">
              <Button
                component='span'
                className="upload-button"
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
