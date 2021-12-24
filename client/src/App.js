import React,{useState} from 'react';
import axios from 'axios';
import './index.css';
import PieChart from "./PieChart.js"
import BarGraph from './BarGraph';
function App(){
  const [loading,setloading]=useState(false);
  const [values,setvalues]=useState([]); 
  const [q,setq]=useState(''); 
  function findOcc(arr, key){
    let arr2 = [];
    arr.forEach((x)=>{
    if(arr2.some((val)=>{ return val[key] === x[key] })){
        arr2.forEach((k)=>{
        if(k[key] === x[key]){ 
           k["occurrence"]++;
        }
    })
    }else{
       let a = {};
       if(x[key]!==''){
        if(x[key]!==null){
          a[key] = x[key];
          a["occurrence"] = 1;
          arr2.push(a);
        }
       }
     }
    })
    return arr2
}
async function check(e){
      var querydata=e.target.value;
      setloading(true);
      let response=await axios.get(`http://localhost:8000/get/data/${querydata}`);
      var data_new=findOcc(response.data, querydata);
      setq(querydata);
      setvalues(data_new);
    setloading(false);
    }
  return (
    <div>
      <h1 id="heading">Data Visualization Dashboard</h1>
      <div id="filter-cont">
      <select onChange={check}>
        <option selected="true" disabled="disabled">Choose here...</option>
        <option value="region">Region</option>
        <option value="country">Country</option>
        <option value="sector">Sector</option>
        <option value="end_year">End Year</option>
      </select>
      </div>
      {loading?<h1>{loading}</h1>:<><div id="grp-cont"><BarGraph data={[values]} key_value={q}/><PieChart data={[values]} key_value={q}/></div></>}
     
    </div>
  )
};
export default App;