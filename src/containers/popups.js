import React from 'react'

import Blur from '../containers/Blur'

export const ErrorPopup = (props) => (
  <Blur
    self={props.self}
    clickToClose={true}
    >
    <div
      className="popup popup--yesno"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
          Something went wrong!
        </p>
        <p className="popup__content____message popup__content____message--large">{props.children}</p>
        <div className="popup__content____buttonblock popup__content____buttonblock--single">
          <button
            variant = 'contained'
            className = "metadata__button"
            onClick = { props.action }
            >
            {props.buttonText}
          </button>
        </div>
      </div>
    </div>
  </Blur>
)

export const YesNoPopup = (props) => (
  <Blur
    self={props.self}
    clickToClose={true}
    >
    <div
      className="popup popup--yesno"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
           Are you certain?
        </p>
        <p className="popup__content____message popup__content____message--large">{props.children}</p>
        <div className="popup__content____buttonblock">
          <button
            variant = 'contained'
            className = "metadata__button"
            onClick = { props.action }
            >
            {props.yes}
          </button>
          <button
            variant = 'contained'
            className = "metadata__button"
            onClick = { ()=> props.self.popup() }
            >
              {props.no}
          </button>
        </div>
      </div>
    </div>
  </Blur>
)

export const SchemaPopup = (props) => (
  <Blur
    self={props.self}
    clickToClose={true}
    >
    <div
      className="popup"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
           Schemas
        </p>
        {props.children}
      </div>
    </div>
  </Blur>
)

export const HeaderInfoPopup = (props) => (
  <Blur
    self={props.self}
    clickToClose={true}
    >
    <div
      className="popup"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
           Header Info
        </p>
        {props.children}
      </div>
    </div>
  </Blur>
)
