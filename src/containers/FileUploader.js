import React, {Component} from 'react'
import Backdrop from '../containers/Backdrop'

import Button from '@material-ui/core/Button'

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

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
    this.refs.backdrop.closePopup()
    this.props.callback.call(this.props.self, file.target.files[0])
  }

  render = () => (
    <Backdrop
      ref="backdrop"
      self={this.props.self}>
      <div
        className="file-uploader"
        >
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
      </div>
    </Backdrop>
  )
}
export default withRouter(FileUploader)
