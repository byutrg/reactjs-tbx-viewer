import React, {Component} from 'react'

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

export const HeaderDataButton = (props) => (
  <button
    variant = 'contained'
    style = {styles.headerData_button}
    >
    {props.children}
  </button>
)


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
