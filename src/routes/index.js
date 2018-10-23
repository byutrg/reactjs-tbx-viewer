import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Viewer from "../containers/Viewer"

class Router extends Component {
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route path='/' component={Viewer} />
        </Switch>
      </HashRouter>
    )
  }
}

export default Router
