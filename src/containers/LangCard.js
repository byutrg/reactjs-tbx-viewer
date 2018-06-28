import React, {Component} from 'react'

import styles from '../styled/styles'

class LangCard extends Component {
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
          style={styles.metadataItem.container}
          >
        <strong style={styles.metadataItem.key}>{key}</strong>
        <p style={styles.metadataItem.value}>{value.content}</p>
        </div>
      )
    }
    langSec.termSecs.get().forEach(termSec => {
      content.push(
        <p
          key={`l${langSec.ownIndex}t${termSec.ownIndex}-term`}
          style={styles.term}>{termSec.term}</p>
      )

      for (let key in termSec.metadata) {
        if (!hasOwn.call(termSec.metadata, key)) { return }
        let value = termSec.metadata[key]

        content.push(
          <div
            key={`l${langSec.ownIndex}t${termSec.ownIndex}-${key}`}
            style={[styles.metadataItem, styles.indented]}
            >
          <strong style={styles.metadataItem.key}>{key}</strong>
          <span style={styles.metadataItem.value}>{value.content}</span>
          </div>
        )


      }
    })

    return (<div>{content}</div>)
  }

  render() {
    return (
      (this.props.langSec) ?
        <div
          style={styles.langCard}
        >
          <p style={styles.cardTitle}>{this.props.langSec.langCode}</p>
          {this.loadLangContent()}
        </div> :
        ''
    )
  }
}

export default LangCard
