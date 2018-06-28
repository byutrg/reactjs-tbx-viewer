import React from 'react'
import $ from 'jquery'

import TBXHeader from './TBXHeader'
import ConceptEntry from './ConceptEntry'
import LangSec from './LangSec'
import TermSec from './TermSec'

class TBX {
    constructor(file, callback, self) {
      this._file = file
      this._callback = callback

      this._dialect = ''
      this._style = ''
      this._version = ''

      this._tbxLevel = {}
      this._conceptEntries = []

      let myPromise = new Promise((resolve, reject) => {
        var reader = new FileReader()
        reader.onload = (e) => resolve(this._contents = reader.result)
        reader.readAsText(this.file)
      })

      myPromise.then(() => {
        this.process()
        callback.call(self)
      })
    }

    set file      (file)          { this._file = file               }
    get file      ()              { return this._file               }

    set callback  (callback)      { this._callback = callback       }
    get callback  ()              { return this._callback           }

    set contents  (contents)      { this._contents = contents       }
    get contents  ()              {  return this._contents          }

    set dialect   (dialect)       { this._dialect = dialect         }
    get dialect   ()              { return this._dialect            }

    set style     (style)         { this._style = style             }
    get style     ()              { return this._style              }

    set version   (version)       { this._version = version         }
    get version   ()              { return this._version            }

    set tbxHeader (tbxHeader)     { this._tbxHeader = tbxHeader     }
    get tbxHeader ()              { return this._tbxHeader          }

    set tbxLevel  (tbxLevel)      { this._tbxLevel = tbxLevel       }
    get tbxLevel  ()              { return this._tbxLevel           }

    set conceptEntries (cEntries) { this._conceptEntries = cEntries }
    get conceptEntries ()         { return this._conceptEntries     }

    addConceptEntry(conceptEntry) { this.conceptEntries.push(conceptEntry) }

    getConceptEntryByIndex(index) {
        return this.conceptEntries()[index]
    }

    getTermsByLang() {
      let langSecs = this.getLangSecs()
      let termsByLang = {}
      let termSecs = []
      langSecs.forEach(langSec => {
        termsByLang[langSec.langCode] = termsByLang[langSec.langCode] || []

        let push = [].push
        push.apply(termsByLang[langSec.langCode], langSec.termSecs.get())
      })

      return termsByLang
    }

    getLangSecs() {
      let langSecs = []
      this.conceptEntries.get().forEach(conceptEntry => {
        conceptEntry.langSecs.get().forEach(langSec => langSecs.push(langSec))
      })
      return langSecs
    }

    getTermSecs()  {
      let termSecs = []
      this.conceptEntries.get().forEach(conceptEntry => {
        conceptEntry.getTermSecs().forEach(termSec => termSecs.push(termSec))
      })
      return termSecs
    }

    process() {
      let xmlDoc = $.parseXML(this.contents)
      let $tbx = $(xmlDoc)

      this.dialect = $tbx.find("tbx").attr('type')
      this.style = $tbx.find("tbx").attr('style')
      this.version = ($tbx.find('tbx') ? '2018' : '2008')

      this.tbxHeader = new TBXHeader($tbx.find("tbxHeader"))

      this.conceptEntries = $tbx.find("conceptEntry, termEntry").map(
        (index, conceptEntry) => {
          return new ConceptEntry(conceptEntry, index)
        }
      )
    }
}









  //
  //
  //
  // constructor(dialect, style, version, schemas, header, conceptEntries, back){
  //   this._dialect = dialect || ''
  //   this._style = style || 'dca'
  //   this._version = version || ''
  //   this._schemas = schemas || []
  //   this._header = header
  //   this._conceptEntries = conceptEntries || []
  //   this._back = back || null
  // }
  //
  // set dialect(dialect) { this._dialect = dialect }
  // get dialect() { return this._dialect }
  //
  // set style(style) { this._style = style }
  // get style() { return this._style }
  //
  // set version(version) { this._version = version }
  // get version() { return this._version }
  //
  // set schemas(schemas) { this._schemas = schemas }
  // get schemas() { return this._schemas }
  // addSchema(schema) {
  //   this._schemas.add(schema)
  // }
  //
  // set header(header) { this._header = header }
  // get header() { return this._header }
  //
  // set conceptEntries(conceptEntries) { this._conceptEntries = conceptEntries }
  // get conceptEntries() { return this._conceptEntries }
  //
  // addConceptEntry(conceptEntry) {
  //   this._conceptEntries.add(conceptEntry)
  // }
  // getConceptEntryById(id) {
  //   for (let conceptEntry of this._conceptEntries) {
  //     if (conceptEntry.id === id) {
  //       return conceptEntry
  //     }
  //   }
  //
  //   return null
  // }
  //

// }

export default TBX
