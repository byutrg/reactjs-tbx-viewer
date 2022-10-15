import React, {Component} from 'react'
import $ from 'jquery'

import Languages from '../data/isoLangCodesKeyed'
import Regions from '../data/regionCodesKeyed'

class LangCard extends Component {
  constructor(props) {
    super(props)
    this.refs = React.createRef();
  }

  loadLangContent() {
    let hasOwn = {}.hasOwnProperty
    let content = []
    let langSec = this.props.langSec
    for (let key in langSec.metadata) {
      if (!hasOwn.call(langSec.metadata, key)) { return }
      let value = langSec.metadata[key]
      content.push(
        <div
          key={`l${langSec.ownIndex}-${key}`}
          className="metadata-item__container"
          >
        <strong className="metadata-item__key">{key}</strong>
        <p className="metadata-item__value indented">
          {(value.content.includes('http')) ? <a target="_blank" rel="noopener noreferrer" href={value.content}>{value.content}</a> : value.content}
        </p>
        </div>
      )
    }
    langSec.termSecs.get().forEach(termSec => {
      content.push(
        <p
          key={`l${langSec.ownIndex}t${termSec.ownIndex}-term`}
          className="term">{termSec.term}</p>
      )

      for (let key in termSec.metadata) {
        if (!hasOwn.call(termSec.metadata, key)) { return }
        let value = termSec.metadata[key]

        content.push(
          <div
            key={`l${langSec.ownIndex}t${termSec.ownIndex}-${key}`}
            className="metadata-item indented"
            >
          <strong className="metadata-item__key">{key}</strong>
          <span className="metadata-item__value indented">
            {(value.content.includes('http')) ? <a target="_blank" rel="noopener noreferrer" href={value.content}>{value.content}</a> : value.content}
          </span>
          </div>
        )


      }
    })

    return (<div>{content}</div>)
  }

  componentDidMount = () => {
    let isVisible = $(`#term-block__lang-block--${this.props.langSec.xmlLang}`).hidden

    this.refs.langCard.hidden = isVisible
  }

  render() {
    return (
      (this.props.langSec) ?
        <div
          ref="langCard"
          id={`lang-card_${this.props.langSec.langCode}`}
          className="lang-card"
        >
          <p className="card-title">
            {Languages[this.props.langSec.langCode]}
            {(this.props.langSec.regionCode) ? <span> - {Regions[this.props.langSec.regionCode]}</span> : ''}
          </p>
          {this.loadLangContent()}
        </div> :
        ''
    )
  }
}

export default LangCard
