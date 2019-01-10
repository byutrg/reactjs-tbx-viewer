import $ from 'jquery'

class TBXLevel {
  constructor({element = null, excludedLevelString = '', ownIndex = -1, parentIndex = -1} = {}) {
    if (element) {
      this._element = element
      this._excludedLevelString = excludedLevelString
      this._ownIndex = ownIndex
      this._parentIndex = parentIndex

      this._metadata = this.parseMetaData()
      // this.cache()
    }
  }

  get ownIndex()            { return this._ownIndex }
  get parentIndex()         { return this._parentIndex }
  get element()             { return this._element  }
  get elementName()         { return $(this._element).prop('tagName')}
  get elementString()       { return $(this._element).prop('outerHTML') }
  get excludedLevelString() { return this._excludedLevelString }
  get metadata()            { return this._metadata }
  get metadataString()      { return JSON.stringify(this._metadata) }

  // loadFromSession(elementName, ownIndex, parentIndex = -1) {
  //   let identifier = `level_${elementName}_${ownIndex}_${parentIndex}`
  //   let itemObject = JSON.parse(sessionStorage.getItem(identifier))
  //   this._element = itemObject.element
  //   this._metadataString = itemObject.metadata
  // }
  //
  // cache() {
  //   let identifier = `level_${this.elementName}_${this.ownIndex}_${this.parentIndex}`
  //   sessionStorage.setItem(`${identifier}`, JSON.stringify({
  //     element: this.elementString,
  //     metadata: this.metadataString}))
  // }

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

    $element.find('*[type]').not(this.excludedLevelString)
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
