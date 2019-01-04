import React, {Component} from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import {SchemaPopup, HeaderInfoPopup, YesNoPopup} from '../containers/popups'

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
  popup = () => {
    if (this.props.type === "schema") {
      let content = (
        <List component='ul'>
        { this.props.self.state.TBX.schemas.map((x,index) => (
          <ListItem key={"schema_"+index}>
            <ListItemText>{x}</ListItemText>
          </ListItem>
          ))
        }
        </List>
      )
      console.log(content)

      this.props.self.popup(
        <SchemaPopup
          self={this.props.self}
          >
            {
              content ? content :
              'No schemas are associated with this file.'
            }
        </SchemaPopup>
      )
    }
    else if (this.props.type === "tbxHeader") {
      let content = (this.props.self.state.TBX.tbxHeader.metadata) ? (  ////CONTENT IS STILL NOT OUTPUTING 'no header ...' when values are empty
        <List component='ul'>
        {
          Object.keys(this.props.self.state.TBX.tbxHeader.metadata)
          .map((key,index) => (
            this.props.self.state.TBX.tbxHeader.metadata[key] &&
              <ListItem key={"headerItem_"+index}>
                <ListItemText>
                  <strong className="metadata-item__key">{key}</strong>
                  <span className="metadata-item__value">
                    {this.props.self.state.TBX.tbxHeader.metadata[key]}
                  </span>
                </ListItemText>
              </ListItem>
            ))
          }
        </List>
      ) : 'No header info is associated with this file.'

      this.props.self.popup(
        <HeaderInfoPopup
          self={this.props.self}
          >
          { content  }
        </HeaderInfoPopup>
      )
    }
    else if (this.props.type === "new") {
      this.props.self.popup(
        <YesNoPopup
          self={this.props.self}
          yes="Yes"
          no="No"
          action={ () => {
            let reload = window.location.reload
            reload.apply(window.location)
          } }
          >
          Are you sure you want to close this file and open a new one?
        </YesNoPopup>
      )
    }
  }

  render = ()  => (
    <button
      variant = 'contained'
      className = "header-data__button"
      type = { this.props.type }
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
      type = "schema"
      >
      <span style={{color: 'black'}}>Schema(s)</span>
    </HeaderDataButton>
    <HeaderDataButton
      self = {props.self}
      type = "tbxHeader"
      >
      <span style={{color: 'black'}}>Header Info</span>
    </HeaderDataButton>
    <HeaderDataButton
      self = {props.self}
      type = "new"
      >
      <span style={{color: 'black'}}>New File</span>
    </HeaderDataButton>
  </div>
)
