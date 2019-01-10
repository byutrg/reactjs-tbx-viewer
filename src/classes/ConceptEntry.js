import $ from "jquery"

import TBXLevel from './TBXLevel'
import LangSec from './LangSec'

class ConceptEntry extends TBXLevel {
  constructor({conceptEntry = null, conceptIndex = null} = {}) {
    if (conceptEntry) {
      super({
        element: conceptEntry,
        excludedLevelString: 'langSec *, langSet *',
        ownIndex: conceptIndex})

      this._id = $(conceptEntry).attr("id") || -1
      this._langSecs = $(conceptEntry).find("langSec, langSet").map((index, langSec) => {
        return new LangSec({
          langSec: langSec,
          indices: {langIndex: index, conceptIndex: conceptIndex}
        })
      })

      // super.cache()
    } else {
      super()
    }

  }

  get id()        { return this._id }

  get langSecs()  { return this._langSecs }

  // cache() {
  //   let identifier = `${super.elementName}_${super.ownIndex}_${super.parentIndex}`
  //   sessionStorage.setItem(identifier, JSON.stringify({
  //     id: this.id
  //   }))
  // }
  //
  // loadFromSession(ownIndex) {
  //   if (ownIndex === 'udefined') {
  //     console.log("something wrong")
  //   }
  //   super.loadFromSession('conceptEntry', ownIndex)
  //
  //   this._id = $(this.element).attr("id") || -1
  //   this._langSecs = $(this.element).find("langSec, langSet").map((index, langSec) => {
  //     return new LangSec({
  //       langSec: langSec,
  //       indices: {langIndex: index, conceptIndex: this.ownIndex}
  //     })
  //   })
  // }

  getTermSecs()     {
    let termSecs = []
    this.langSecs.get().forEach((langSec) => {
      langSec.termSecs.get().forEach((termSec) => {
        termSecs.push(termSec)
      })
    })
    return termSecs
  }

  getLangSecByCode(langCode) {
    for (let langSec of this._langSecs) {
      if (langSec.langCode === langCode) {
        return langSec
      }
    }

    return null
  }
}

export default ConceptEntry
