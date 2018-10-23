import React, {Component} from 'react'
import $ from 'jquery'

// import ConceptCard from '../containers/ConceptCard'
import LangCard from '../containers/LangCard'

import styles from "../styled/styles"

class ConceptEntryBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conceptEntry:
        <div>No concept entry selected yet.</div>
    }
  }


  loadConceptEntry = (conceptEntry) => {
    let hasOwn = {}.hasOwnProperty
    let content = []

    for (let key in conceptEntry.metadata) {
      if (!hasOwn.call(conceptEntry.metadata, key)) { return }
      let value = conceptEntry.metadata[key]

      let attributes = []
      if (value.attributes) {
        for (let attName in value.attributes) {
          if (!hasOwn.call(value.attributes, attName)) { return }

          // let graphic = ''
          //
          // if ((key === "figure" || key === "xGraphic") && attName === "target") {
          //
          //     graphic = <iframe src={value.attributes[attName]}></iframe>
          //       // $.get(value.attributes[attName], data => graphic = data)
          //
          //     }


          attributes.push(
              <div
                key={key-attName}
                style={styles.indented.double}
              >
                <strong style={styles.metadataItem.key}>{attName}</strong>
                <div style={styles.metadataItem.value}>
                  {
                    (value.attributes[attName].includes("http")) ?
                      <a target="_blank" href={value.attributes[attName]}>{value.attributes[attName]}</a> :
                      <span>{value.attributes[attName]}</span>
                  }
                </div>
              </div>
            )
        }}




      content.push(
        <div
          key={`c${conceptEntry.ownIndex}-${key}`}
          style={styles.metadataItem}
          >
        <strong style={styles.metadataItem.key}>{key}</strong>
        <span style={styles.metadataItem.value}>{value.content}</span>
        {attributes}
        </div>
      )
      }

      let langCards = conceptEntry.langSecs.get().map(langSec => (
        <LangCard
          key={`langCard-${langSec.langCode}`}
          self= {this.props.self}
          langSec= {langSec}
          />
      ))

      this.setState ({
            'conceptEntry':
              <div style={styles.conceptEntryBlockContents}>
                <div
                  style={styles.conceptCard}
                >
                  <p style={styles.cardTitle}>ConceptEntry</p>
                  {content}
                </div>
                {langCards}
              </div>
        })
  }

  render = (props) => {


    return (
      <div
        style={styles.conceptEntryBlock}
      >
        { this.state.conceptEntry }
      </div>
    )
  }
}

export default ConceptEntryBlock
