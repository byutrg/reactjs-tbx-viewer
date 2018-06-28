import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {withRouter} from 'react-router-dom'

import Button from '@material-ui/core/Button'

class FileUploader extends Component {
  upload = (file) => {
    this.props.history.push({
      pathname: '/viewer',
      state: {
        filename: file.target.files[0]
      }
    })
  }

  render() {
    return (
      <div>
          <Button
            variant="raised"
            label="Upload TBX file"
          >
            <input type="file" onChange={this.upload} accept=".tbx, .tbxm, .xml"/>
          </Button>
      </div>
    )
  }
}
export default withRouter(FileUploader)
