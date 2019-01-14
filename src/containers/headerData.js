import React, {Component} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { toast } from 'react-toastify'

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

class SchemaContent extends Component {
  handleCopy = (text) => {
    if (!toast.isActive(text)) {
      toast.info("Schema location copied to clipboard...", {
        toastId: text,
        autoClose: 2000
       })
    }
  }

  render = () => (
    this.props.self.state.TBX.schemas.length > 0 ?
    <List component='ul'>
      { this.props.self.state.TBX.schemas.map((x,index) => (
        <ListItem key={"schema_"+index}>
          <CopyToClipboard
            text={x}
            onCopy={this.handleCopy}
            >
            <ListItemText
              className="metadata-item__blink"
              >{x}</ListItemText>
          </CopyToClipboard>
        </ListItem>
        ))
      }
    </List> :
    <p
      className="popup__content____message">
      There are no schemas associated with this file.
    </p>
  )
}

class HeaderInfoContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasHeaderInfo: props.self.state.TBX.tbxHeader.metadata ? true : false
    }
  }

  render = () => (
    this.state.hasHeaderInfo ?
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
    </List> :
    <p
      className="popup__content____message"
      >
      No header information is associated with this file.
    </p>
  )
}

class YesNoContent extends Component {
  render = () => (
    <YesNoPopup
      self={this.props.self}
      yes="Yes"
      no="No"
      yesAction={ () => {
        sessionStorage.clear()
        let reload = window.location.reload
        reload.apply(window.location)
      } }
      noAction={ this.props.self.popup }
      >
      Are you sure you want to close this file and open a new one?
    </YesNoPopup>
  )
}

class HeaderDataButton extends Component {
  popup = () => {
    if (this.props.type === "schema") {
      this.props.self.popup(
        <SchemaPopup
          self={this.props.self}
          >
            <SchemaContent
              self={this.props.self}
              />
        </SchemaPopup>
      )
    }
    else if (this.props.type === "tbxHeader") {
      this.props.self.popup(
        <HeaderInfoPopup
          self={this.props.self}
          >
          <HeaderInfoContent
            self={this.props.self}
            />
        </HeaderInfoPopup>
      )
    }
    else if (this.props.type === "new") {
      this.props.self.popup(
        <YesNoContent
          self = {this.props.self}
          />
      )
    }
  }

  render = ()  => (
    <button
      variant = 'contained'
      className = "metadata__button"
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
