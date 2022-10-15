import React, {Component} from 'react'
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import $ from 'jquery'


import Languages from '../data/isoLangCodesKeyed'
import Regions from '../data/regionCodesKeyed.json'

import Backdrop from '../containers/Backdrop'

export const ImportantUpdatesPopup = (props) => (
  <Backdrop
    self={props.self}
    >
    <div
      className="popup popup--buttons"
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
      className="popup popup--buttons"
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

export const GeneralPopup = (props) => (
  <Backdrop
    self={props.self}
    clickToClose={props.clickToClose}
    >
    <div
      className="popup popup--buttons"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
          {props.title}
        </p>
        <p className="popup__content____message popup__content____message--large">
          {props.children}
        </p>
        <div className="popup__content____buttonblock popup__content____buttonblock--single">
          <button
            variant = 'contained'
            className = "metadata__button"
            onClick = { (e)=>(props.action.call(props.self)) }
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
      className="popup popup--buttons"
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
            onClick = { (e)=> props.yesAction.call(props.self) }
            >
            {props.yes}
          </button>
          <button
            variant = 'contained'
            className = "metadata__button"
            onClick = { (e)=> props.noAction.call(props.self) }
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
    this.refs = React.createRef()
    this.state = {
      identifier: `language-filter__l${props.rawKey}}`,
      visible: !$(`#term-block__lang-block--${props.rawKey}`).hidden
    }
  }

  componentDidMount() {
    this.toggleChecked()
  }

  toggleChecked = () => {
    let classes = this.refs.checkbox.className.split(" ")
    if (this.state.visible) {
      classes.push('checkbox--checked')
      this.refs.checkbox.className = classes.join(" ")
    } else {
      this.refs.checkbox.className = classes.map(x => (x !== "checkbox--checked") ? x : null)
                                                .join("")
    }

    this.setState({
      visible: !this.state.visible
    })
  }

  handleClick = (e) => {
    this.props.action(this.props.rawKey, this.state.visible)

    this.toggleChecked()
  }

  render = () => (
    <div
      id={this.state.identifier}
      className="language-checkbox"
      onClick={this.handleClick}
      >
      <label
        id={`${this.state.identifier}_label`}
        key={this.state.identifier}
        className="language-checkbox__label"
        >

      <span ref="checkbox" className="checkbox">
        <span className="check"></span>
      </span>
        <span className="language-checkbox__label____content"
          >{Languages[this.props.langKey]}
          {this.props.regionKey && " - " + Regions[this.props.regionKey]}
          </span>
      </label>
    </div>
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
          className="popup__content__checkboxContainer x-small"
          >
          { props.languages.sort((a, b) => {
                let [langA, regionA] = a.split('-')
                let [langB, regionB] = b.split('-')
                let fullA = Languages[langA] + Regions[regionA]
                let fullB = Languages[langB] + Regions[regionB]
                return (fullA === fullB) ? 0 : 
                  (fullA < fullB) ? -1 : 1
              })
              .map(key => {
                let [lang, region] = key.split('-')
                return (<LanguageCheckBox
                  key={`languageCheckBox_${key}`}
                  rawKey={key}
                  langKey={lang}
                  regionKey={region}
                  action={props.action}
                  />)})
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
