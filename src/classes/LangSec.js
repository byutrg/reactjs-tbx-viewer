import $ from 'jquery'

import TBXLevel from './TBXLevel'
import TermSec from './TermSec'

class LangSec extends TBXLevel {
  constructor({langSec = null, indices = null}) {
    if (langSec) {
      super({
        element: langSec,
        excludedLevelString: 'termSec *, tig *, ntig *',
        ownIndex: indices.langIndex,
        parentIndex: indices.conceptIndex})

      this._conceptIndex = indices.conceptIndex

      let code = ''
      let region = ''
      if ($(langSec).attr('xml:lang').includes('-')) {
        code = $(langSec).attr('xml:lang').replace(/-.+/, '')
        region = $(langSec).attr('xml:lang').replace(/.+?-/, '')
      } else {
        code = $(langSec).attr('xml:lang')
      }

      this._langCode = code.toLowerCase()
      this._regionCode = region.toLowerCase()
      this._xmlLang = ($(langSec).attr('xml:lang') || '').toLowerCase()
      this._termSecs = $(langSec).find('termSec, tig, ntig').map((index, termSec) => {
        return new TermSec(termSec, { termIndex: index, langIndex: indices.langIndex, conceptIndex: indices.conceptIndex})
      })

      // super.cache()
    } else {
      super()
      this._langCode = ''
      this._regionCode = ''
      this._xmlLang = ''
      this._termSecs = []
    }
  }

  get langCode()      { return this._langCode   }
  get regionCode()    { return this._regionCode }
  get xmlLang()       { return this._xmlLang    }
  get termSecs()      { return this._termSecs   }
  get termSecsCount() { return (this._termSecs) ? this._termSecs.length : 0}

  // cache() {
  //   this._identifier = `${super.elementName}_${super.ownIndex}_${super.parentIndex}`
  //   sessionStorage.setItem(this._identifier, JSON.stringify({
  //     langCode: this.langCode,
  //     regionCode: this.regionCode,
  //     xmlLang: this.xmlLang,
  //     termSecsCount: this.termSecsCount
  //   }))
  // }
  //
  // loadFromSession(ownIndex, parentIndex) {
  //   super.loadFromSession('langSec', ownIndex, parentIndex)
  //
  //   let itemObject = JSON.parse(sessionStorage.getItem(this._identifier))
  //
  //   let count = parseInt(itemObject.langSecCount, 10)
  //   this._langSecs = [...Array(count).keys()].map(x => {
  //     let conceptEntry = new LangSec()
  //     conceptEntry.loadFromSession(x)
  //     return conceptEntry
  //   })
  // }

  addTermSec(termSec) {
    this._termSecs.add(termSec)
  }
  getTermSecByTerm(term) {
    for (let termSec of this._termSecs) {
      if (termSec.term === term) {
        return termSec
      }
    }
    return null
  }
  getLangCodeAndPossiblyRegion() {
    return [this.langCode, this.regionCode].join('-')
  }
}

export default LangSec
