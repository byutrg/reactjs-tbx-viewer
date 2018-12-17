import React, {Component} from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Blur from '../containers/Blur'
import {SchemaPopup, HeaderInfoPopup} from '../containers/popups'
import styles from '../styled/styles'

export const HeaderData = (props) => (
  <div
    style = {styles.headerData_block}
  >
    <strong
      style = {styles.headerData_dcName}
    >{props.dcName}</strong>
    <p
      style = {styles.headerData_dcValue}
    >{props.dcValue}</p>
  </div>
)

class HeaderDataButton extends Component {
  popup = () => (
    this.props.self.popup(
      <SchemaPopup
        self={this.props.self}
        >
        <List component='ul'>
          { this.props.self.state.TBX.schemas ?
            this.props.self.state.TBX.schemas.map((x) => (
              <ListItem>
                <ListItemText>{x}</ListItemText>
              </ListItem>
            )) :
            'No schemas are associated with this file.'
          }
        </List>
      </SchemaPopup>
    )
  )

  render = ()  => (
    <button
      variant = 'contained'
      style = {styles.headerData_button}
      onClick = { this.popup }
      >
      {this.props.children}
    </button>
  )
}


export const HeaderDataButtonBlock = (props) => (
  <div
    style = {styles.headerData_buttonBlock}
    >
    <HeaderDataButton
      self = {props.self}
      >
      <span style={{color: 'black'}}>Schema(s)</span>
    </HeaderDataButton>
    <HeaderDataButton
      self = {props.self}
      >
      <span style={{color: 'black'}}>Header Info</span>
    </HeaderDataButton>
  </div>
)
