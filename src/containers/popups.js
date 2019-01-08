import React, {Component} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import $ from 'jquery'

import Languages from '../data/isoLangCodesKeyed'

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
