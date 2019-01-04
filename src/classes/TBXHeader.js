import $ from 'jquery'

class TBXHeader {
  constructor(tbxHeader) {
    let $tbxHeader = $(tbxHeader)

    this._metadata = {
      publicationStmt: $tbxHeader.find("publicationStmt p").text(),
      sourceDesc: $tbxHeader.find("sourceDesc p").text(),
      title: $tbxHeader.find("titleStmt title").text(),
      titleNote: $tbxHeader.find("titleStmt note").text(),
    }
  }

  get metadata() { return this._metadata }
}

export default TBXHeader
