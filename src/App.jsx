import { useState, useEffect, useCallback } from 'react'
import NMRium from 'nmrium'
import axios from 'axios'
import { SpinnerDotted } from 'spinners-react'

import ControlBar from './ControlBar/ControlBar'

import classes from './App.module.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ spectra: [] })
  const [value, setValue] = useState(1)
  const [changedData, setChangedData] = useState()

  useEffect(() => {
    fetchData(value)
  }, [value])

  //fetch json nmrium file from backend.
  const fetchData = async value => {
    setLoading(true)

    try {
      const { data: response } = await axios.get('http://localhost:3001/' + value)
      setData(response)
      console.log(response.spectra)
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
      await axios.post('http://localhost:3001/save', newData)
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
  const changeHandler = useCallback(dataUpdate => {
    console.log(dataUpdate)
    setChangedData(dataUpdate.data)
  }, [])

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
