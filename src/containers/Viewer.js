import React, {Component} from 'react'
import { ToastContainer, toast } from 'react-toastify';

import ConceptEntryBlock from '../containers/ConceptEntryBlock'
import Header from "../containers/Header"
// import MainWindow from '../containers/MainWindow'
import TermBlock from '../containers/TermBlock'
import FileUploader from '../containers/FileUploader'
import { GeneralPopup, ErrorPopup } from '../containers/popups'

import TBX from '../classes/TBX'

class Viewer extends Component {
  constructor(props) {
    super(props)
    this.refs = React.createRef()
    this.state = {
      appVersion: "0.1-beta",
      conceptEntry: null,
      popup: ''
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('TBX')) {
      this.setState({
        TBX: new TBX({
            self: this,
            callback: this.loadPage,
            errorCallback: this.error
          })
        }
      )
    } else {
      this.promptFileUpload()
    }
  }

  displayPrivacyPolicy = (e) => {
    e.preventDefault()
    this.popup(
      <GeneralPopup
        self={this}
        title="Privacy Policy"
        buttonText="OK"
        clickToClose={true}
        action={this.popup}
        >
        The TBX Viewer runs entirely locally in your browser. As a result,
        LTAC Global does not store any information uploaded to the TBX Viewer.
        No terminology data or usage data is ever sent to the server.
      </GeneralPopup>
    )
  }

  loadPage = (termsByLang = []) => {
    this.refs.termBlock.addTermsByLang(termsByLang)
    this.forceUpdate()
    toast.dismiss()
  }

  promptFileUpload = () => {
    this.popup(
      <FileUploader
        self={this}
        callback={this.loadFile}
        />
    )
  }

  blur = () => {
    let classes = this.refs.contentWindow.className.split(" ")
    classes.push('blur')
    this.refs.contentWindow.className = classes.join(" ")
  }

  clearBlur = () => {
    let classes = this.refs.contentWindow.className.split(" ")
    this.refs.contentWindow.className = classes.map(x => (x !== "blur") ? x : null)
                                              .join(" ")
  }

  error(content = "", buttonText = "OK") {
    console.log(content)
    this.popup(
      <ErrorPopup
        self={this}
        buttonText={buttonText}
        action={()=> {
          sessionStorage.clear()
          let reload = window.location.reload
          reload.apply(window.location)
        }}
        >
        { content }
      </ErrorPopup>
    )
  }

  popup(content = null) {
    if (content) {
      this.blur()
    } else {
      this.clearBlur()
    }

    this.setState({
      popup: content
    })
  }

  loadFile(filename = null) {
    toast.info("Loading uploaded file...", {autoClose: false})
    let tbxFile = new TBX({
        file: filename,
        callback: this.loadPage,
        errorCallback: this.error,
        self: this
      })

    this.setState({
      TBX: tbxFile
    })
  }

  loadConceptEntry(conceptIndex) {
    let conceptEntry = this.state.TBX.conceptEntries[conceptIndex]

    this.refs.conceptEntryBlock.loadConceptEntry(conceptEntry)
  }

  render() {
    return (
      <div
        className="main-window">
        <div
          ref="contentWindow"
          className="content-window"
          >
          <Header self={this} ref="header"/>
          <TermBlock
            self={this}
            callback={this.loadConceptEntry}
            ref="termBlock"
          />
          <ConceptEntryBlock self={this} ref="conceptEntryBlock"/>
          <div
            className="footer">
            <span
              className="copyright">
              Copyright © 2019. LTAC Global / BYU TRG. All rights reserved.
            </span>
            <span className="privacy-policy">
              <a
                onClick={this.displayPrivacyPolicy}
                href="./"
                >Privacy Policy</a>
            </span>
            <span className="app-version">
              TBX Viewer: v{this.state.appVersion}
            </span>
          </div>
        </div>
        <ToastContainer
          className="toast"
          />
        { this.state.popup }
      </div>
  )}
}

export default Viewer
