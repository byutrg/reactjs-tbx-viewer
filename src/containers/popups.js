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

class MassCheckBox extends Component {
  constructor(props) {
    super(props)
    this.refs = React.createRef()

    this.state = {
      identifier: `language-filter__${props.checkBoxId}`
    }
  }

  render = () => (
    <div
      id={this.state.identifier}
      className="language-checkbox"
      onClick={() => this.props.handleClick.call(this.props.parent)}
      >
      <label
        id={`${this.state.identifier}_label`}
        key={this.state.identifier}
        className="language-checkbox__label"
        >

      <span ref="checkbox" className={`checkbox ${this.props.id === "checkAll" && "checkbox--checked"}`}>
        <span className="check"></span>
      </span>
        <span className="language-checkbox__label____content"
          >{this.props.children}</span>
      </label>
    </div>
  )
}

class LanguageCheckBox extends Component {
  constructor(props) {
    super(props)

    props.registrationHandler.call(props.parent, this)
    this.refs = React.createRef()
    this.state = {
      identifier: `language-filter__l${props.rawKey}`
    }
  }

  componentDidMount() {
    this.toggleChecked()
  }

  toggleChecked = () => {
    // this.state.checked = !this.state.checked
    this.props.termBlockRef.hidden ?
      this.refs.checkbox.classList.remove("checkbox--checked") :
      this.refs.checkbox.classList.toggle("checkbox--checked") 
  }

  check = () => {
    this.props.action(this.props.termBlockRef, this.props.rawKey, false)
    this.refs.checkbox.classList.add("checkbox--checked")
  }

  uncheck = () => {
    this.props.action(this.props.termBlockRef, this.props.rawKey, true)
    this.refs.checkbox.classList.remove("checkbox--checked")
  }
  
  handleClick = (e) => {
    this.props.action(this.props.termBlockRef, this.props.rawKey)
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



export class LanguageFilterPopup extends Component {
  constructor(props) {
    super(props)

    this.refs = React.createRef()
    let languageCheckboxes = props.languages
      .sort((a, b) => {
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
          termBlockRef={props.termBlockRefs[`lb${key}`]}
          parent={this}
          registrationHandler={this.registerChildFunctions}
          checked=''
          rawKey={key}
          langKey={lang}
          regionKey={region}
          action={props.action}
          />)})

    this.state = {
      languageCheckboxFunctions: {},
      languageCheckboxes: languageCheckboxes
    }
  }

  registerChildFunctions = (languageCheckbox) => {
    let languageCheckboxFunctions = this.state.languageCheckboxFunctions
    languageCheckboxFunctions[languageCheckbox.props.rawKey] = {
          check: languageCheckbox.check,
          uncheck: languageCheckbox.uncheck
    }
    
    this.setState({
      languageCheckboxFunctions: languageCheckboxFunctions
    })
  }

  checkAll = () => Object.getOwnPropertyNames(this.state.languageCheckboxFunctions).forEach(
    key => this.state.languageCheckboxFunctions[key].check.call(this.state.languageCheckboxes[key])
  )

  uncheckAll = () => Object.getOwnPropertyNames(this.state.languageCheckboxFunctions).forEach(
    key => this.state.languageCheckboxFunctions[key].uncheck.call(this.state.languageCheckboxes[key])
  )

  render = () => (
    <Backdrop
      self={this.props.self}
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
            className="popup__content__checkboxContainer x-small">
            <div className="popup__content__checkAllContainer">
              <MassCheckBox
                id="uncheckAll"
                parent={this}
                handleClick={this.uncheckAll}>
                  Uncheck all</MassCheckBox>
              <MassCheckBox
                id="checkAll"
                parent={this}
                handleClick={this.checkAll}>
                  Check all</MassCheckBox>
            </div>
            { this.state.languageCheckboxes }
        </div>
      </div>
    </div>
  </Backdrop>
)
}


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
