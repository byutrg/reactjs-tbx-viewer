import React, {Component} from 'react'

import {HeaderData, HeaderDataButtonBlock} from '../containers/headerData.js'

class Header extends Component {
  render = () => (
    <div
      className="header"
    >
      <HeaderData
        dcName="Dialect"
        dcValue={(this.props.self.state.TBX) ? this.props.self.state.TBX.dialect : ''}
        />
      <HeaderData
        dcName="Style"
        dcValue={(this.props.self.state.TBX) ? this.props.self.state.TBX.style : ''}
        />
      <HeaderData
        dcName="Version"
        dcValue={(this.props.self.state.TBX) ? this.props.self.state.TBX.version : ''}
        />
      <HeaderDataButtonBlock
        self={this.props.self}
        />
    </div>
  )
}

export default Header
