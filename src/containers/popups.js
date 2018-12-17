import React, {Component} from 'react'

import Blur from '../containers/Blur'

export const SchemaPopup = (props) => (
  <Blur
    self={props.self}
    clickToClose={true}
    >
    <div
      className="popup"
      onClick={(e) => {e.stopPropagation()}}
      >
      <div
        className="popup__content"
        >
        <p className="card-title card-title__popup">
           Schemas
        </p>
        {props.children}
      </div>
    </div>
  </Blur>
)

export const HeaderInfoPopup = () => (
  <Blur>
    <div>
      <textArea/>
    </div>
  </Blur>
)
