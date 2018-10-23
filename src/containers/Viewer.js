import React, {Component} from 'react'

import ConceptEntryBlock from '../containers/ConceptEntryBlock'
import Header from "../containers/Header"
// import MainWindow from '../containers/MainWindow'
import TermBlock from '../containers/TermBlock'
import FileUploader from '../containers/FileUploader'

import TBX from '../classes/TBX'

import styles from '../styled/styles'

class Viewer extends Component {

  refresh() {
    this.refs.termBlock.addTermsByLang(this.state.TBX.getTermsByLang())
    this.forceUpdate()
  }

  promptFileUpload() {
    if (!this.state.fileUploaded) {
      return(
        <FileUploader
          self={this}
          callback={this.loadFile}
          />
      )
    }
  }

  loadFile(filename) {
    let tbxFile = new TBX(filename, this.refresh, this)

    this.setState({
      'TBX': tbxFile,
      fileUploaded: true
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      'TBX': null,
      conceptEntry: null,
      fileUploaded: false
    }
  }

  render() {
    return (
        <div
          style={styles.mainWindow}
          >
          <Header self={this} ref="header"/>
          <TermBlock
            self={this}
            callback={this.loadConceptEntry}
            ref="termBlock"
          />
          <ConceptEntryBlock self={this} ref="conceptEntryBlock"/>
          { this.promptFileUpload() }
        </div>
  )}

  loadConceptEntry(conceptIndex) {
    let conceptEntry = this.state.TBX.conceptEntries[conceptIndex]

    this.refs.conceptEntryBlock.loadConceptEntry(conceptEntry)
  }
}

export default Viewer
