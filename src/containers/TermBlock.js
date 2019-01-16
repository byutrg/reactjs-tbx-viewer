import React, {Component} from 'react'
import Input from '@material-ui/core/Input'
import $ from 'jquery'

import Languages from '../data/isoLangCodesKeyed'

import {LanguageFilterPopup} from '../containers/popups'

class TermBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      termsByLang: {},
      termDict: {},
      langDict: {},
      highlightedTermRef: ''
    }
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
      termsByLang: termsByLang,
      langRefs: Object.keys(termsByLang).map(key => `l${key}`),
      termDict: termDict,
      langDict: langDict,
      languageFilterPopup:     <LanguageFilterPopup
                                  self={this.props.self}
                                  languages={Object.keys(termsByLang)}
                                  action={this.handleLanguageCheckChanged}
                                />
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
        this.uncollapse(langRef)
      } else {
        this.collapse(langRef)
      }
  }

  collapse(langRef) {
    console.log(langRef)
    this.refs[langRef].style.display = 'none'
    this.refs[langRef+'_arrow'].style.borderTop = '5px solid transparent'
    this.refs[langRef+'_arrow'].style.borderRight = '5px solid #D8D8D8'
    this.refs[langRef+'_arrow'].style.borderLeft = ''
    this.refs[langRef+'_arrow'].style.borderBottom = '5px solid transparent'
  }

  uncollapse(langRef) {
    this.refs[langRef].style.display = 'block'
    this.refs[langRef+'_arrow'].style.borderTop = '5px solid #D8D8D8'
    this.refs[langRef+'_arrow'].style.borderRight = '5px solid transparent'
    this.refs[langRef+'_arrow'].style.borderLeft = '5px solid transparent'
    this.refs[langRef+'_arrow'].style.borderBottom = ''
  }

  handleLanguageCheckChanged(value, isVisible = null) {
    if (isVisible === null) {
      isVisible = $(`#term-block__lang-block--${value}`)[0].hidden
    }

    $(`#term-block__lang-block--${value}`)[0].hidden = !isVisible

    if ($(`#lang-card_${value}`)[0]) {
      $(`#lang-card_${value}`)[0].hidden = !isVisible
    }
  }

  handleCollapseButtonClicked() {
    this.state.langRefs.forEach(langRef => this.collapse(langRef))

  }

  handleUncollapseButtonClicked() {
    this.state.langRefs.forEach(langRef => this.uncollapse(langRef))
  }

  popup() {
    this.props.self.popup(
      this.state.languageFilterPopup
    )
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

            return (a === b) ? 0 :
                    (a > b) ? 1 :
                    -1
          })

          langBlocks.push(
            <div key={`l${key}`} id={`term-block__lang-block--${key}`} className="term-block__lang-block">
              <strong onClick={e => this.collapseLangBlock(`l${key}`)}>{Languages[key]}</strong>
              <div ref={`l${key}_arrow`} className="collapse-arrow-down"/>
              <div className="term-block__list-line"/>
              <div ref={`l${key}`}>
              {
                termsByLang[key].map(termSec => {
                    let ref = `c${termSec.conceptIndex}l${termSec.langIndex}t${termSec.ownIndex}`

                    return (
                      <p
                        className="term-block__list-item"
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
          <p className="term-block__title">Terms</p>
          <Input
            placeholder="Search"
            type="search"
            ref="termSearch"
            className="term-block__search"
            onChange={e => this.search(e.target.value)}
           />
          <button
            ref="collapseButton"
            className="term-block__top-buttons term-block__uncollapse-button"
            onClick={(e) => this.handleUncollapseButtonClicked.call(this)}
            >
            <span></span>
          </button>
          <button
            ref="collapseButton"
            className="term-block__top-buttons term-block__collapse-button"
            onClick={(e) => this.handleCollapseButtonClicked.call(this)}
            >
            <span></span>
          </button>

          <div
            className="term-block__list-container"
            >
            <div
              className="term-block__list-container____list"
            >
              {langBlocks}
            </div>
            <button
              className="term-block__lang-button"
              onClick={() => {this.popup()}}
            >Languages</button>
          </div>
        </div>
      )
  }
}

export default TermBlock
