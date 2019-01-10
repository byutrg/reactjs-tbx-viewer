import React, {Component} from 'react'
import { ToastContainer, toast } from 'react-toastify';

import ConceptEntryBlock from '../containers/ConceptEntryBlock'
import Header from "../containers/Header"
// import MainWindow from '../containers/MainWindow'
import TermBlock from '../containers/TermBlock'
import FileUploader from '../containers/FileUploader'
import { ErrorPopup } from '../containers/popups'

import TBX from '../classes/TBX'

class Viewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
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

  loadPage(termsByLang = []) {
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

  popup(content = "") {
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
        </div>
        <ToastContainer
          className="toast"
          />
        { this.state.popup }
      </div>
  )}
}

export default Viewer
