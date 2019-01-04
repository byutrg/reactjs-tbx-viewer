import $ from 'jquery'

import TBXLevel from './TBXLevel'
import TermSec from './TermSec'

class LangSec extends TBXLevel {
  constructor(langSec, indices = null) {
    super(langSec, 'termSec *, tig *, ntig *', indices.langIndex, indices.conceptIndex)

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
    this._xmlLang = $(langSec).attr('xml:lang') || ''
    this._termSecs = $(langSec).find('termSec, tig, ntig').map((index, termSec) => {
      return new TermSec(termSec, { termIndex: index, langIndex: indices.langIndex, conceptIndex: indices.conceptIndex})
    })
  }

  get langCode()    { return this._langCode   }
  get regionCode()  { return this._regionCode }
  get xmlLang()     { return this._xmlLang    }
  get termSecs()    { return this._termSecs   }

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
}

export default LangSec
