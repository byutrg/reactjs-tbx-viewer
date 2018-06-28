import React from 'react'
import $ from 'jquery'

class TBXLevel {
  constructor(element, excludedLevelString = '', ownIndex = -1, parentIndex = -1) {
    this._element = element
    this._excludedLevelString = excludedLevelString
    this._ownIndex = ownIndex
    this._parentIndex = parentIndex

    this._metadata = this.parseMetaData()
  }

  get ownIndex()            { return this._ownIndex }
  get parentIndex()         { return this._parentIndex }
  get element()             { return this._element  }
  get excludedLevelString() {return this._excludedLevelString }
  get metadata()            { return this._metadata }

  getDatCat(dc) {
    //check if _metadata contains the dc.  Use hasOwnProperty via call in case of a datcat named "hasOwnProperty" got put into _metadata
    let hasOwn = {}.hasOwnProperty
    if (hasOwn.call(this._metadata, dc)) {
      return this._metadata.dc
    }
  }

  parseMetaData() {
    let $element = $(this.element)

    let metadata = {}

    let datcats = $element.find('*[type]').not(this.excludedLevelString)
                    .each((index, elt) => {
                      let $elt = $(elt)

                      let attributes = {}

                      $.each($elt[0].attributes, (index, attr) => {
                          if (attr.name !== 'type') { attributes[attr.name] = attr.value }
                        })

                      metadata[$elt.attr('type')] = {
                        'attributes': attributes,
                        'content': $elt.text()
                      }
                    })
      return metadata
  }
}

export default TBXLevel
