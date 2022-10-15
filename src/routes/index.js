import React, {Component} from 'react'
import {HashRouter, Route, Routes} from 'react-router-dom'

import Viewer from "../containers/Viewer"

class Router extends Component {
  render(){
    return(
      <HashRouter>
        <Routes>
          <Route path='/' element={<Viewer />} />
        </Routes>
      </HashRouter>
    )
  }
}

export default Router
