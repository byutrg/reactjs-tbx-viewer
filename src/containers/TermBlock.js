import React, {Component} from 'react'
import Input from '@material-ui/core/Input'
import $ from 'jquery'

import styles from '../styled/styles'

class TermBlock extends Component {
  //
  // constructor(props) {
  //   super(props)
  //
  //   this._mainWindow = props.mainWindow
  // }
  //
  // get mainWindow()  { return this._mainWindow }
  state = {
    termsByLang: [],
    termDict: {},
    langDict: {},
    highlightedTermRef: ''
  }

  addTermsByLang(termsByLang) {
    let termDict = {}
    let langDict = {}
    let hasOwn = {}.hasOwnProperty
    for (let key in termsByLang) {
      if (!hasOwn.call(termsByLang, key)) { return }
      langDict[key] = {
        ownRef: `l${key}`,
        refs: []
      }

      termsByLang[key].forEach(termSec => {
        let ref = `c${termSec.conceptIndex}l${termSec.langIndex}t${termSec.ownIndex}`
        langDict[key].refs.push(ref)
        termDict[ref] = termSec.term
      })
    }

    this.setState({
      'termsByLang': termsByLang,
      'termDict': termDict,
      'langDict': langDict
    })
  }

  handleClick(ref, termSec) {
    if (this.state.highlightedTermRef !== '') {
      this.refs[this.state.highlightedTermRef].style.fontWeight = "normal"
    }
    this.refs[ref].style.fontWeight = "bold"
    this.setState({
      highlightedTermRef: ref
    })

    this.props.callback.call(this.props.self, termSec.conceptIndex)
  }

  search(content) {
    for (let key in this.state.termDict) {
      (!this.state.termDict[key].toLowerCase().includes(content)) ?
        this.refs[key].style.display = 'none' :
        this.refs[key].style.display = 'inline'
    }
  }

  collapseLangBlock(lang) {
    let hasOwn = {}.hasOwnProperty
    let langObj = this.state.langDict[lang]
    let langRef = langObj.ownRef

    langObj.refs.forEach(ref => {
      this.refs[ref].style.display = (this.refs[ref].style.display === 'none') ?
                  'inline' : 'none'
    })
  }

  render() {
    let termsByLang = this.state.termsByLang

    let hasOwn = {}.hasOwnProperty

    let langBlocks = []

    for (let key in termsByLang) {
        if (hasOwn.call(termsByLang, key)) {
          termsByLang[key].sort((termSecA, termSecB) => {
            let a = termSecA.term.toLowerCase()
            let b = termSecB.term.toLowerCase()

            return (a > b) ? 1 : -1
          })

          langBlocks.push(
            <div key={`l${key}`} ref={`l${key}`} style={styles.termBlockLangBlock}>
              <strong onClick={e => this.collapseLangBlock(e.target.innerText)}>{key}</strong>
              {
                termsByLang[key].map(termSec => {
                    let ref = `c${termSec.conceptIndex}l${termSec.langIndex}t${termSec.ownIndex}`

                    return (
                      <p
                        style={styles.termBlockListItem}
                        key={ref}
                        onClick={(e) => this.handleClick(ref, termSec)}
                        >
                        <span ref={ref}>{termSec.term}</span>
                      </p>
                    )
                  }
                )
              }
            </div>
          )
        }
      }

      return (
        <div
          style={styles.termBlock}
          >
          <p style={styles.termBlockTitle}>Terms</p>
          <Input
            placeholder="Search"
            type="search"
            ref="termSearch"
            style={styles.termBlockSearch}
            onChange={e => this.search(e.target.value)}
           />
          <div
            style={styles.termBlockListContainer}
            >
            <div
              style={styles.termBlockList}
            >
              {langBlocks}
            </div>
            <button
              style={styles.termBlockLangButton}
            >Languages</button>
          </div>
        </div>
      )
  }
}

export default TermBlock
