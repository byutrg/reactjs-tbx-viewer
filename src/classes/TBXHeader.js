import $ from 'jquery'

class TBXHeader {
  constructor(tbxHeader) {
    let $tbxHeader = $(tbxHeader)

    this._metadata = {
      publicationStmt: $tbxHeader.find("publicationStmt p").text() || null,
      sourceDesc: $tbxHeader.find("sourceDesc p").text() || null,
      title: $tbxHeader.find("titleStmt title").text() || null,
      titleNote: $tbxHeader.find("titleStmt note").text() || null,
    }
  }

  get metadata() {
    let hasHeaderInfo = false
      Object.keys(this._metadata).forEach((key) => {
        if (this._metadata[key]) { hasHeaderInfo = true }
    })
    return (hasHeaderInfo) ? this._metadata : null
  }
}

export default TBXHeader
