import { useState, useEffect, useCallback } from 'react'
import './App.css'
import NMRium from 'nmrium';
import axios from 'axios';


function App() {

const [loading, setLoading] = useState(true);
const [data, setData] = useState();
const [value, setValue] = useState(1);
const [changedData, setChangedData] = useState();


 const fetchData = async (value) =>{
  setLoading(true);
  try {
    const {data: response} = await axios.get('http://localhost:3001/'+value);
    setData(response);
    console.log(response.spectra);
  } catch (error) {
    console.error(error.message);
  }
  setLoading(false);
}

const onChange = (e) => {
  console.log("changed")
  setValue(e.target.value);
  fetchData(e.target.value);
 // this.forceUpdate();
}

const saveData = async () => {
  try {
      const newData = updateData();
      console.log(newData);
        await axios.post('http://localhost:3001/save',newData);
  } catch (error) {
    console.error(error.message);
  }

}

const updateData = () => {
  const objCount = changedData.length;
  for (var x = 0; x < objCount; x++) {
    const updatedSpectra = changedData[x];
    data.spectra[x] = updatedSpectra;
  }
  return data;
}


const changeHandler = useCallback((dataUpdate) => {
  console.log(dataUpdate);
  //console.log(dataUpdate.data.length);
  setChangedData(dataUpdate.data);
  // const objCount = dataUpdate.data.length;
  // for (var x = 0; x < objCount; x++) {
  //   const updatedSpectra = dataUpdate.data[x];
  //   console.log(updatedSpectra);

  //   //setData(data);
  // }

}, []);

//console.log(value);

  useEffect(() => {
    //let mounted = true;
    //if(mounted){
    fetchData(value);
   // }
   // return () => mounted = false;
  }, [value]);


  return (
    <div>
   {/* <select value={value} onChange={onChange}>
   <option value="1">NMR1</option>
   <option value="2">NMR2</option>
   <option value="3">NRM3</option>
    </select> */}
        {/* <button value="1" onClick={onChange}>NMR1</button>
        <button value="2" onClick={onChange}>NMR2</button>
        <button value="3" onClick={onChange}>NMR3</button> */}
    {loading && <div>Loading</div>}
    {!loading && (
      
      <div>
        <button onClick={() => saveData()}>Save</button>
   
         <select value={value} onChange={onChange}>
         <option value="1">NMR1</option>
         <option value="2">NMR2</option>
         <option value="3">NRM3</option>
    </select>
        <h2>NMRIUM</h2>
        <NMRium data = {data} onDataChange = {changeHandler}/>
      </div>
    )}
    </div>
  )

  
}

export default App
