import React, { Component, useRef, useState, useEffect, useContext } from "react";
import { ItemsContext } from "./../../../context/ItemsContext";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
//import { Search } from '@material-ui/icons';

const options =[
    { value: 'itm_loca7b66748e03d457e976ca63a50e1bde0', label: 'Hyderabad', lat: "17.385000", lng: "78.486702" },
    { value: 'itm_loc32db8931aaf39e3dfb5c388799109d5b', label: 'Bengaluru', lat: "12.971600", lng: "77.594597", },
    { value: 'itm_loc247387cc3640d1a88f3d9342d216dc13', label: 'Chennai', lat: "13.082700", lng: "80.270699",},
  ]

const typeOptions = [
  {value: "/properties", label: "Buy"},
  // {value: "/rent", label: "Rent"}
]

function Search(){

  const {selectLocation} = useContext(ItemsContext);

  const [location, setLocation] = useState("itm_loca7b66748e03d457e976ca63a50e1bde0");
  const [type,setType] = useState("/properties");


  const saveLocationInfo = (e) =>{
    setLocation(e.value);
  }

  const saveTypeInfo = (e) =>{
    setType(e.value);
  }

  return (
    <>
       <div className="row" >
           <div className="col-lg-5 col-md-6 col-sm-12">
               <div style={{marginBottom: "20px"}} className="form-group acr-custom-select">
               <Select
                 placeholder="Select Location"
                 value={options.find(obj => obj.value === location)}
                 options={options}
                 onChange={saveLocationInfo}
               />
               </div>
           </div>
           <div className="col-lg-5 col-md-6 col-sm-12">
               <div style={{marginBottom: "20px"}} className="form-group acr-custom-select">
               <Select
                 placeholder="Select Type"
                 value={typeOptions.find(obj => obj.value === type)}
                 options={typeOptions}
                 onChange={saveTypeInfo}
               />
               </div>
           </div>
           
           <div className="col-lg-2 col-md-12 col-sm-12">
               <div style={{marginBottom: "20px"}} className="form-group">
                   <Link to={type} className="btn-custom secondary btn-block" onClick={()=> selectLocation(location)}>Search</Link>
                   {/* <Link to={{pathname: "/properties", state: { locationId:this.state.location, lat:this.state.lat, lng:this.state.lng}}} className="btn-custom secondary btn-block">Search</Link> */}
               </div>
           </div>
       </div>
    </>
  );
};

export default Search;
