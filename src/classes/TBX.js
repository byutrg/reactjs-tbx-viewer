import React from 'react'
import $ from 'jquery'

import TBXHeader from './TBXHeader'
import ConceptEntry from './ConceptEntry'

class TBX {
    constructor({file = null, self, callback, errorCallback} = {}) {
      this._file = file
      this._callback = callback
      this._errorCallback = errorCallback
      this._self = self

      this._dialect = ''
      this._style = ''
      this._version = ''

      this._schemas = []

      this._tbxLevel = {}
      this._conceptEntries = []

      if (sessionStorage.getItem('TBX')) {
        this.loadFromSession()
      } else {
        let myPromise = new Promise((resolve, reject) => {
          var reader = new FileReader()
          reader.onload = (e) => resolve(this._contents = reader.result)
          reader.readAsText(this.file)
        })

        myPromise.then(() => {
          this.process()
          this.cache()
          this.finalize()
        })
      }
    }

    loadFromSession() {
      this._contents = sessionStorage.getItem('TBX')

      this.process()
      this.finalize()
    }

    cache() {
      sessionStorage.setItem('TBX', this._contents)
    }

    finalize() {
      if (this.error && this._errorCallback) {
        this._errorCallback.call(this.self,
          "The uploaded file does not appear to be well-formed XML and is not parseable.")
      }
      else {
        if (this._callback) {
          this._callback.call(this.self, this.getTermsByLang())
        }
      }
    }

    set file      (file)          { this._file = file               }
    get file      ()              { return this._file               }

    set self      (self)          { this._self = self               }
    get self      ()              { return this._self               }

    set contents  (contents)      { this._contents = contents       }
    get contents  ()              {  return this._contents          }

    set dialect   (dialect)       { this._dialect = dialect         }
    get dialect   ()              { return this._dialect            }

    set style     (style)         { this._style = style             }
    get style     ()              { return this._style              }

    set version   (version)       { this._version = version         }
    get version   ()              { return this._version            }

    set schemas   (schemas)       { this._schemas = schemas         }
    get schemas   ()              { return this._schemas            }

    set tbxHeader (tbxHeader)     { this._tbxHeader = tbxHeader     }
    get tbxHeader ()              { return this._tbxHeader          }

    set tbxLevel  (tbxLevel)      { this._tbxLevel = tbxLevel       }
    get tbxLevel  ()              { return this._tbxLevel           }

    set conceptEntries (cEntries) { this._conceptEntries = cEntries }
    get conceptEntries ()         { return this._conceptEntries     }

    addSchemas(schemas) {
        this._schemas.push(...schemas)
    }

    addConceptEntry(conceptEntry) { this.conceptEntries.push(conceptEntry) }

    getConceptEntryByIndex(index) {
        return this.conceptEntries()[index]
    }

    getTermsByLang() {
      let langSecs = this.getLangSecs()
      let termsByLang = {}
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

    setSchemas() {
        let schemas = []

        if (this.style === 'dca') {
            switch(this.dialect) {
                case 'TBX-Core':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Core_dialect/master/Schemas/TBXcoreStructV03_TBX-Core_integrated.rng",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Core_dialect/master/Schemas/TBX-Core.sch"
                    ]
                    break
                case 'TBX-Min':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Min_dialect/master/DCA/TBXcoreStructV03_TBX-Min_integrated.rng",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Min_dialect/master/DCA/TBX-Min_DCA.sch"
                    ]
                    break
                case 'TBX-Basic':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Basic_dialect/master/DCA/TBXcoreStructV03_TBX-Basic_integrated.rng",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Basic_dialect/master/DCA/TBX-Basic_DCA.sch"
                    ]
                    break
                case 'TBX-Linguist':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Linguist_dialect/master/DCA/TBXcoreStructV03_TBX-Linguist_integrated.rng",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Linguist_dialect/master/DCA/TBX-Linguist_DCA.sch"
                    ]
                    break
                default: break
            }
        } else {
            switch(this.dialect) {
                case 'TBX-Min':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Min_dialect/master/DCT/TBX-Min.nvdl",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Min_dialect/master/DCT/TBX-Min_DCT.sch"
                    ]
                    break
                case 'TBX-Basic':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Basic_dialect/master/DCT/TBX-Basic.nvdl",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Basic_dialect/master/DCT/TBX-Basic_DCT.sch"
                    ]
                    break
                case 'TBX-Linguist':
                    schemas = [
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Linguist_dialect/master/DCT/TBX-Linguist.nvdl",
                        "https://raw.githubusercontent.com/LTAC-Global/TBX-Linguist_dialect/master/DCT/TBX-Linguist_DCT.sch"
                    ]
                    break
                default: break
            }
        }

        this.addSchemas(schemas)
    }

    process() {
        let xmlDoc
        try {
          xmlDoc = $.parseXML(this.contents)
        }
        catch(err) {
          this.error = true
          return
        }
        let $tbx = $(xmlDoc)

        this.dialect = $tbx.find("tbx, martif").attr('type') || $tbx.find("TBX").attr("dialect") || <span className="error">Undeclared</span>

        let isOldMin = (this.dialect === "TBX-Min")
        let version = (isOldMin || $tbx.find("martif").length > 0) ? 'v2 (2008)' : ($tbx.find("tbx").length > 0) ? 'v3 (2019)' : 'na'
        if (version === 'na') {
          this.style = <span className="error">NA</span>
          this.version = <span className="error">NOT TBX</span>
        }
        else {
          this.style = (isOldMin) ? 'dct' : $tbx.find("tbx").attr('style') || 'dca'
          this.version = version
        }


        this.setSchemas()

        this.tbxHeader = new TBXHeader($tbx.find("tbxHeader"))

        this.conceptEntries = $tbx.find("conceptEntry, termEntry").map(
            (index, conceptEntry) => {
                return new ConceptEntry({
                  conceptEntry: conceptEntry,
                  conceptIndex: index})
            }
        )
    }
}

export default TBX
