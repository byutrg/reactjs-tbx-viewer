import React, {Component} from 'react'

import Blur from '../containers/Blur'
import styles from '../styled/styles'

export const SchemaPopup = (props) => (
  <Blur
    self={props.self}
    clickToClose={true}
    >
    <div
      style={styles.popup}
      >
      <div
        style={styles.popup__content}
        >
        <p style={{...styles.cardTitle, ...styles.cardTitle._popup}}>
           Schemas
        </p>
        {props.children}
      </div>
    </div>
  </Blur>
)

export const HeaderInfoPopup = () => (
  <Blur>
    <div>
      <textArea/>
    </div>
  </Blur>
)
