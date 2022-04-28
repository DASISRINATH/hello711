import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap} from "react-leaflet";
import AddLayouts from "./AddLayouts";
import AddLines from "./AddLines";
import AddImage from "./AddImage";
import DrawControlComponent from "./DrawControlComponent";
import 'leaflet/dist/leaflet.css';
const Content = ()=>{
  const [handleDrawControl, setHandleDrawControl] = useState(false);
  const [handleEditControl, setHandleEditControl] = useState(false);
  const [map,setMap] = useState(false);

  useEffect(() => {
    // document.querySelector("markercluster-map").leafletElement.invalidateSize()
    // console.log(window.innerWidth);
    setTimeout(() => {
      setMap(true);
    },250)
  },[])
  return(
    <div className="listing-map-wrapper">
      <div style={{position:"absolute", right:"2vw", zIndex:"1000", justifyContent:"center",top:"3vh"}}>
        <button className="map-button" onClick={()=>setHandleDrawControl(!handleDrawControl)}>
          {handleDrawControl ? "Done" : "Add Features"}
        </button>
        <button className="map-button" style={{marginTop:"10px"}} onClick={()=>setHandleEditControl(!handleEditControl)}>
          {handleEditControl ? "Done" : "Edit Features"}
        </button>
      </div>
      {map && (
        <div className="listing-map">
        <MapContainer className="markercluster-map map" center={[17.361,78.745]} zoom={9}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <AddLayouts position="topleft"/>
          <AddLines position="topleft"/>
          {(handleDrawControl || handleEditControl) && 
            <DrawControlComponent
              drawControlOnMap={handleDrawControl} 
              editControlOnMap={handleEditControl} 
            />
          }
          <AddImage/>
        </MapContainer>
      </div>
      )}
    </div>
  )
}
export default Content;