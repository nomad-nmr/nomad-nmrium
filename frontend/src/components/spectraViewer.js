// import React, { useState, useEffect} from 'react';
// import { fetchData } from '../services/spectra_service';

// export default class spectraViewer extends React.Component {


//   render(){
//     const [loading, setLoading] = useState(true);
// const [data, setData] = useState();
// const [value, setValue] = useState(1);

//  const fetchData = async () =>{
//   setLoading(true);
//   try {
//     const {data: response} = await axios.get('http://localhost:3001/'+value);
//     setData(response);
//     console.log(response.spectra);
//   } catch (error) {
//     console.error(error.message);
//   }
//   setLoading(false);
// }

// const onChange = (e) => {

//   setValue(e.target.value);
//   fetchData();
//  // this.forceUpdate();
// }

// const saveData = async () => {
//   try {
//     await axios.post('http://localhost:3001/save',data);
//   } catch (error) {
//     console.error(error.message);
//   }

// }

// const changeHandler = useCallback((dataUpdate) => {
//   console.log(dataUpdate);
//   //console.log(dataUpdate.data.length);
//   const objCount = dataUpdate.data.length;
//   for (var x = 0; x < objCount; x++) {
//     const updatedSpectra = dataUpdate.data[x];
//     console.log(updatedSpectra);
//     console.log(this.data);
//     //setData(data.spectra[x] = updatedSpectra);
//   }

// }, []);

//   return (
//     <div>
//     <p>
//     <button onClick={() => saveData()}>Save</button>
//       </p>
//   <select value={value} onChange={onChange}>
//   <option value="1">NMR1</option>
//   <option value="2">NMR2</option>
//  <option value="3">NRM3</option>
//   </select>
//   {loading && <div>Loading</div>}
//   {!loading && (
//     <div>
//       <h2>NMRIUM</h2>
//       <NMRium data = {data} onDataChange = {changeHandler}/>
//     </div>
//   )}
//   </div>
//   );
// }
// }
