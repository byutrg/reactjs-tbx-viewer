import React, {Component} from 'react'

import styles from '../styled/styles'

class Blur extends Component {
  render() {
    return (
      <div
        style={styles.blur}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Blur
