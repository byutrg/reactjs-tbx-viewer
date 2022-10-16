import React, {Component} from 'react'

// import ConceptCard from '../containers/ConceptCard'
import LangCard from '../containers/LangCard'

class ConceptEntryBlock extends Component {
  constructor(props) {
    super(props)

    this.state = {
      conceptEntry:
        <div className='concept-entry-block__contents--empty'>No concept entry selected yet.</div>
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
                className="indented__double"
              >
                <strong className="metadata-item__key">{attName}</strong>
                <div className="metadata-item__value indented">
                  {
                    (value.attributes[attName].includes("http")) ?
                      <a target="_blank" rel="noopener noreferrer" href={value.attributes[attName]}>{value.attributes[attName]}</a> :
                      <span>{value.attributes[attName]}</span>
                  }
                </div>
              </div>
            )
        }}

      content.push(
        <div
          key={`c${conceptEntry.ownIndex}-${key}`}
          className="metadata-item"
          >
        <strong className="metadata-item__key">{key}</strong>
        <span className="metadata-item__value">{value.content}</span>
        {attributes}
        </div>
      )
    }

      let langCards = conceptEntry.langSecs.get().map(langSec => (
        <LangCard
          key={`langCard-${langSec.langCode}-${langSec.regionCode}`}
          self= {this.props.self}
          langSec= {langSec}
          />
      ))

      this.setState ({
            'conceptEntry':
              <div className="concept-entry-block__contents">
                <div
                  className="concept-card"
                >
                  <p className="card-title">ConceptEntry</p>
                  {content || "<p>No concept entry data to display.</p>"}
                </div>
                {langCards}
                <br />
              </div>
        })
  }

  render = (props) => {


    return (
      <div
        className="concept-entry-block"
      >
        { this.state.conceptEntry }
      </div>
    )
  }
}

export default ConceptEntryBlock
