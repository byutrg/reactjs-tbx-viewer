import React, {Component} from 'react'

import ConceptEntryBlock from '../containers/ConceptEntryBlock'
import Header from "../containers/Header"
// import MainWindow from '../containers/MainWindow'
import TermBlock from '../containers/TermBlock'

import TBX from '../classes/TBX'

import styles from '../styled/styles'

class Viewer extends Component {

  refresh() {
    this.refs.termBlock.addTermsByLang(this.state.TBX.getTermsByLang())
    this.forceUpdate()
  }

  constructor(props) {
    super(props)


    let tbxFile = (typeof(this.props.location.state) !== 'undefined') ?
      new TBX(this.props.location.state.filename, this.refresh, this) :
      this.props.history.push({
        pathname: "/"
      })

    this.state = {
      'TBX': tbxFile,
      conceptEntry: null
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
        </div>
  )}

  loadConceptEntry(conceptIndex) {
    let conceptEntry = this.state.TBX.conceptEntries[conceptIndex]

    this.refs.conceptEntryBlock.loadConceptEntry(conceptEntry)
  }
}

export default Viewer
