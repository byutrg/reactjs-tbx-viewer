import React, {Component} from 'react'
import MuiThemeProvider from '@material-ui/styles/MuiThemeProvider'

import Start from "../containers/Start"
import Viewer from "../containers/Viewer"

const MainWindow = (props) => (
      <MuiThemeProvider>
        <div>
          {props.children}
        </div>
      </MuiThemeProvider>
)
export default MainWindow
