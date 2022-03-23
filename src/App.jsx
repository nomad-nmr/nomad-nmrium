import { useState, useEffect, useCallback } from 'react'
import NMRium from 'nmrium'
import axios from '../axios-instance'
import { SpinnerDotted } from 'spinners-react'

import ControlBar from './ControlBar/ControlBar'

import classes from './App.module.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ spectra: [] })
  const [value, setValue] = useState(1)
  const [changedData, setChangedData] = useState()

  const expIds = new URLSearchParams(window.location.search).get('expIds')

  useEffect(() => {
    fetchData(expIds ? expIds.split(',') : [])
  }, [])

  //fetch json nmrium file from backend.
  const fetchData = async exps => {
    setLoading(true)
    try {
      const { data: response } = await axios.get(
        '/data/nmrium/?' + new URLSearchParams({ exps }).toString()
      )
      setData(response)
    } catch (error) {
      console.error(error.message)
    }
    setLoading(false)
  }

  //Save current spectra /save endpoint (needs to pass experiment id in header)
  const saveData = async () => {
    setLoading(true)
    try {
      const newData = updateData()
      console.log(newData)
      await axios.put('/data/nmrium', newData)
    } catch (error) {
      console.error(error.message)
    }
    setLoading(false)
  }

  //returns updated spectra
  const updateData = () => {
    const objCount = changedData.length
    for (var x = 0; x < objCount; x++) {
      const updatedSpectra = changedData[x]
      data.spectra[x] = updatedSpectra
    }
    return data
  }

  //On dropdown list change, update id value and fetch spectra
  const onChange = e => {
    setValue(e.target.value)
    fetchData(e.target.value)
  }

  //onDataChange handles nmrium callback by updating new data
  const changeHandler = dataUpdate => {
    console.log(dataUpdate)
    setChangedData(dataUpdate.data)
  }

  return (
    <div>
      <ControlBar changeHandler={onChange} datasetId={value} saveDataHandler={saveData} />
      <div className={classes.NMRiumContainer}>
        <NMRium data={data} onDataChange={changeHandler} />
      </div>
      {loading && (
        <div className={classes.Overlay}>
          <SpinnerDotted size={150} color='#c7401e' />
        </div>
      )}
    </div>
  )
}

export default App
