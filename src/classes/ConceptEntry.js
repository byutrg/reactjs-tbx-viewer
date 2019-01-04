import $ from "jquery"

import TBXLevel from './TBXLevel'
import LangSec from './LangSec'

class ConceptEntry extends TBXLevel {
  constructor(conceptEntry, conceptIndex) {
    super(conceptEntry, 'langSec *, langSet *', conceptIndex)

    this._id = $(conceptEntry).attr("id") || ''
    this._langSecs = $(conceptEntry).find("langSec, langSet").map((index, langSec) => {
      return new LangSec(langSec, {langIndex: index, conceptIndex: conceptIndex})
    })

  }

  get id()        { return this._id }

  get langSecs()  { return this._langSecs }

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
