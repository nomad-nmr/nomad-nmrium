import { useState, useEffect, useCallback } from 'react'
import './App.css'
import NMRium from 'nmrium';
import axios from 'axios';

function App() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [value, setValue] = useState(1);
  const [changedData, setChangedData] = useState();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData(value);
  }, [value]);

  //fetch json nmrium file from backend.
  const fetchData = async (value) => {
    setLoading(true);
    try {
      const { data: response } = await axios.get('http://localhost:3001/' + value);
      setData(response);
      console.log(response.spectra);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  }

  //Save current spectra /save endpoint (needs to pass experiment id in header)
  const saveData = async () => {
    setSaving(true);
    try {
      const newData = updateData();
      console.log(newData);
      await axios.post('http://localhost:3001/save', newData);
    } catch (error) {
      console.error(error.message);
    }
    setSaving(false);
  }

  //returns updated spectra
  const updateData = () => {
    const objCount = changedData.length;
    for (var x = 0; x < objCount; x++) {
      const updatedSpectra = changedData[x];
      data.spectra[x] = updatedSpectra;
    }
    return data;
  }

  //On dropdown list change, update id value and fetch spectra
  const onChange = (e) => {
    setValue(e.target.value);
    fetchData(e.target.value);
  }

  //onDataChange handles nmrium callback by updating new data
  const changeHandler = useCallback((dataUpdate) => {
    console.log(dataUpdate);
    setChangedData(dataUpdate.data);
  }, []);

  return (
    <div>
      {loading && <div>Loading</div>}
      {!loading && (

        <div>
          <select value={value} onChange={onChange}>
            <option value="1">NMR1</option>
            <option value="2">NMR2</option>
            <option value="3">NRM3</option>
          </select>
          <button onClick={() => saveData()}>
            {saving && <div>Saving</div>}
            {!saving && <div>Save</div>}
          </button>

          <NMRium data={data} onDataChange={changeHandler} />
        </div>
      )}
    </div>
  )


}

export default App
