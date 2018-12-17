import React, {Component} from 'react'
import Input from '@material-ui/core/Input'
import $ from 'jquery'

import Languages from '../data/isoLangCodesKeyed'

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

  collapseLangBlock(langRef) {
    if (this.refs[langRef].style.display === 'none') {
        this.refs[langRef].style.display = 'block'
        this.refs[langRef+'_arrow'].style.borderTop = '5px solid #D8D8D8'
        this.refs[langRef+'_arrow'].style.borderRight = '5px solid transparent'
        this.refs[langRef+'_arrow'].style.borderLeft = '5px solid transparent'
        this.refs[langRef+'_arrow'].style.borderBottom = ''
      } else {
        this.refs[langRef].style.display = 'none'
        this.refs[langRef+'_arrow'].style.borderTop = '5px solid transparent'
        this.refs[langRef+'_arrow'].style.borderRight = '5px solid #D8D8D8'
        this.refs[langRef+'_arrow'].style.borderLeft = ''
        this.refs[langRef+'_arrow'].style.borderBottom = '5px solid transparent'
      }
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
            <div key={`l${key}`} className="term-block-lang-block">
              <strong onClick={e => this.collapseLangBlock(`l${key}`)}>{Languages[key]}</strong>
              <div ref={`l${key}_arrow`} className="collapse-arrow-down"/>
              <div className="term-block-list-line"/>
              <div ref={`l${key}`}>
              {
                termsByLang[key].map(termSec => {
                    let ref = `c${termSec.conceptIndex}l${termSec.langIndex}t${termSec.ownIndex}`

                    return (
                      <p
                        className="term-block-list-item"
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
            </div>
          )
        }
      }

      return (
        <div
          className="term-block"
          >
          <p className="term-block-title">Terms</p>
          <Input
            placeholder="Search"
            type="search"
            ref="termSearch"
            className="term-block-search"
            onChange={e => this.search(e.target.value)}
           />
          <div
            className="term-block-list-container"
            >
            <div
              className="term-block-list"
            >
              {langBlocks}
            </div>
            <button
              className="term-block-lang-button"
            >Languages</button>
          </div>
        </div>
      )
  }
}

export default TermBlock
