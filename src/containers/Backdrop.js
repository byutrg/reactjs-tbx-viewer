import React, {Component} from 'react'

class Backdrop extends Component {
  constructor(props) {
    super(props)

    if (props.self) {
      let classes = props.self.refs.contentWindow.className.split(" ")
      classes.push('blur')
      props.self.refs.contentWindow.className = classes.join(" ")
    }
  }

  closePopup = (e) => {
    let classes = this.props.self.refs.contentWindow.className.split(" ")
    this.props.self.refs.contentWindow.className = classes
                                              .map(x => (x !== "blur") ? x : '')
                                              .join(" ")
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
