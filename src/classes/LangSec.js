import React from 'react'
import $ from 'jquery'

import TBXLevel from './TBXLevel'
import TermSec from './TermSec'

class LangSec extends TBXLevel {
  constructor(langSec, indices = null) {
    super(langSec, 'termSec *, tig *', indices.langIndex, indices.conceptIndex)

    this._conceptIndex = indices.conceptIndex
    this._langCode = $(langSec).attr('xml:lang') || ''
    this._termSecs = $(langSec).find('termSec, tig').map((index, termSec) => {
      return new TermSec(termSec, { termIndex: index, langIndex: indices.langIndex, conceptIndex: indices.conceptIndex})
    })
  }

  get langCode() { return this._langCode }
  get termSecs() { return this._termSecs }

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
