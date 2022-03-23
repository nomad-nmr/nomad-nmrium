import React from 'react'

import classes from './ControlBar.module.css'

const ControlBar = props => {
  return (
    <div className={classes.Container}>
      <button onClick={() => props.saveDataHandler()}>Save</button>
    </div>
  )
}

export default ControlBar
