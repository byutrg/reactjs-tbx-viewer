import React, {Component} from 'react'

import styles from '../styled/styles'

class Blur extends Component {
  closePopup = () => {
    this.props.self.popup('')
  }

  render() {
    return (
      <div
        style={styles.blur}
        onClick={ this.props.clickToClose && this.closePopup }
      >
        {this.props.children}
      </div>
    )
  }
}

export default Blur
