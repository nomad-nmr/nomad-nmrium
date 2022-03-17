import React from 'react'

import classes from './ControlBar.module.css'

const ControlBar = props => {
  const { saving, loading } = props
  console.log(classes)
  return (
    <div className={classes.Container}>
      <div className={classes.SelectContainer}>
        <select value={props.datasetId} onChange={props.changeHandler}>
          <option value='1'>NMR1</option>
          <option value='2'>NMR2</option>
          <option value='3'>NRM3</option>
        </select>
      </div>

      <button onClick={() => props.saveDataHandler()}>Save</button>
    </div>
  )
}

export default ControlBar
