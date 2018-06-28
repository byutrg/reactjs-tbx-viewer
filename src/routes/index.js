import React, {Component} from 'react'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Start from "../containers/Start"
import Viewer from "../containers/Viewer"

class Router extends Component {
  render(){
    return(
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Start} />
          <Route path='/viewer' component={Viewer} />
        </Switch>
      </HashRouter>
    )
  }
}

export default Router
