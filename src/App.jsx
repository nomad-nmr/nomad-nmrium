import { useState, useEffect, useCallback, useMemo } from 'react'
import NMRium from 'nmrium'
import axios from '../axios-instance'
import { SpinnerDotted } from 'spinners-react'

import ControlBar from './ControlBar/ControlBar'

import classes from './App.module.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ spectra: [] })
  const [changedData, setChangedData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  const expIds = new URLSearchParams(window.location.search).get('expIds')
  const authToken = new URLSearchParams(window.location.search).get('token')

  useEffect(() => {
    fetchData(expIds ? expIds.split(',') : [])
  }, [])

  //fetch json nmrium file from backend.
  const fetchData = async exps => {
    setLoading(true)
    try {
      const { data: response } = await axios.get(
        '/data/nmrium/?' + new URLSearchParams({ exps }).toString(),
        {
          headers: { Authorization: 'Bearer ' + authToken }
        }
      )
      setData(response)
      console.log(response)
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error.message)
    }
    setLoading(false)
  }

  //Save current spectra /save endpoint (needs to pass experiment id in header)
  const saveData = async () => {
    setLoading(true)

    try {
      await axios.put('/data/nmrium', changedData, {
        headers: { Authorization: 'Bearer ' + authToken }
      })
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error.message)
    }
    setLoading(false)
  }

  //Handler for updating state after change inside of NMRium component
  const changeHandler = useCallback(dataUpdate => {
    console.log(dataUpdate)
    //const newData = {spectra: [...dataUpdate.data]}

    if (dataUpdate.data.length > 0) {
      const newSpectra = dataUpdate.data.map(i => ({ ...i }))

      //setting data to originalData to enable correct ppm scale referencing after reload of spectra
      //and removing originalData to reduce size of saved .nmrium file
      const newData = {
        spectra: newSpectra.map(j => {
          if (j.originalData) {
            j.data = j.originalData
            delete j.originalData
            delete j.originalInfo
          }
          return j
        })
      }
      console.log(newData)
      setChangedData(newData)
    }
  }, [])

  const nmriumPreferences = {
    general: {
      hideGeneralSettings: true
    },
    panels: {
      hideStructuresPanel: true,
      hideSummaryPanel: true,
      hideExperimentalFeatures: true
    },
    toolBarButtons: { hideImport: true }
  }

  const errorMessageEl = <div className={classes.Error}>{errorMessage}</div>

  return (
    <div>
      <ControlBar saveDataHandler={saveData} />
      <div className={classes.NMRiumContainer}>
        {data.spectra.length !== 0 && !errorMessage ? (
          <NMRium
            data={data}
            onDataChange={changeHandler}
            emptyText=''
            preferences={nmriumPreferences}
            workspace='default'
          />
        ) : null}
        {errorMessage && errorMessageEl}
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
