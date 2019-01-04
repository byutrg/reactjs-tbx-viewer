import $ from 'jquery'

import TBXLevel from './TBXLevel'

class TermSec extends TBXLevel {

  //term is a str, metadata should be a dictionary of the form:
  // {
  //   [datcatname]: {
  //         content: value,
  //         atts: {
  //           attName: attVal
  //         }
  //       }
  // }
  constructor (termSec, indices = null){
    super(termSec, '', indices.termIndex, indices.langIndex)

    this._conceptIndex = indices.conceptIndex
    this._langIndex = indices.langIndex
    this._term = $(termSec).find('term').text() || ''
  }

  get conceptIndex()  { return this._conceptIndex }
  get langIndex()     { return this._langIndex }
  get term()          { return this._term }
}

export default TermSec
