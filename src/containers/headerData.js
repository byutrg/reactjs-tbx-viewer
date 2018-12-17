import React, {Component} from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Blur from '../containers/Blur'
import {SchemaPopup, HeaderInfoPopup} from '../containers/popups'

export const HeaderData = (props) => (
  <div
    className = "header-data__block"
  >
    <strong
      className = "header-data__dc-name"
    >{props.dcName}</strong>
    <p
      className = "header-data__dc-value"
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
      className = "header-data__button"
      onClick = { this.popup }
      >
      {this.props.children}
    </button>
  )
}


export const HeaderDataButtonBlock = (props) => (
  <div
    className = "header-data__button-block"
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
