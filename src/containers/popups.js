import React, {Component} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import $ from 'jquery'


import Languages from '../data/isoLangCodesKeyed'

import Backdrop from '../containers/Backdrop'

export const ImportantUpdatesPopup = (props) => (
  <Backdrop
    self={props.self}
    >
    <div
      className="popup popup--yesno"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
          Important Information
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
  </Backdrop>
)

export const ErrorPopup = (props) => (
  <Backdrop
    self={props.self}
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
  </Backdrop>
)

export const YesNoPopup = (props) => (
  <Backdrop
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
  </Backdrop>
)

class LanguageCheckBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      identifier: `language-filter__l${this.props.langKey}`,
      visible: !$(`#term-block__lang-block--${props.langKey}`)[0].hidden
    }
  }

  componentDidMount() {
    console.log(this.state.visible)
    if (this.state.visible) {
      $(`#${this.state.identifier}`).find('input')[0].checked = true
    }
  }

  render = () => (
    <FormControlLabel
      id={this.state.identifier}
      key={this.state.identifier}
      control={
        <input type="checkbox"
          onChange={this.props.action}
          value={this.props.langKey}
        />
      }
      label={Languages[this.props.langKey]}
      />
  )
}



export const LanguageFilterPopup = (props) => (
  <Backdrop
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
          Language Filter
        </p>
        <div
          className="indented--double"
          >
          { props.languages.map(key => (
              <LanguageCheckBox
                langKey={key}
                action={props.action}
                />
            ))
          }
        </div>
      </div>
    </div>
  </Backdrop>
)


export const SchemaPopup = (props) => (
  <Backdrop
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
  </Backdrop>
)

export const HeaderInfoPopup = (props) => (
  <Backdrop
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
  </Backdrop>
)
