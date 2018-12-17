import React, {Component} from 'react'

class Blur extends Component {
  closePopup = (e) => {
    this.props.self.popup('')
  }

  render() {
    return (
      <div
        className="blur"
        onClick={ this.props.clickToClose && this.closePopup }
      >
        {this.props.children}
      </div>
    )
  }
}

export default Blur
