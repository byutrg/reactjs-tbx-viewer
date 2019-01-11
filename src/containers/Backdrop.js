import React, {Component} from 'react'

class Backdrop extends Component {
  closePopup = (e) => {
    this.props.self.popup()
  }

  render() {
    return (
      <div
        className="backdrop"
        onClick={ this.props.clickToClose && this.closePopup }
      >
        {this.props.children}
      </div>
    )
  }
}

export default Backdrop
