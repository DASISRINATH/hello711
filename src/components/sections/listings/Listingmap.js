import React, { useState, useRef, useEffect, useContext} from "react";
import { ItemsContext } from "./../../../context/ItemsContext";
import L from "leaflet";
import { Link } from "react-router-dom";
import { MapContainer, LayersControl,FeatureGroup,TileLayer,LayerGroup,CircleMarker, Popup,GeoJSON,useMap, useMapEvents, Tooltip} from "react-leaflet";
import DemoImg from "./test_1.jpg";
import Hyderabad from "../../../data/hyderabad-data.json";
import MapDataModal from "./Mapdatamodal.js";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Button from "@material-ui/core/Button";
import AddLayouts from "./AddLayouts";
import CustomControl from "./CustomControl";
import axios from "axios";
// import { MarkerCluster } from "leaflet";

require('leaflet/dist/leaflet.css');
require('react-leaflet-markercluster/dist/styles.min.css');

const customMarker = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});

const Listingmap = ({markerD, login, changeCenter, isHover,listlayout, changeSize}) => {
  const {center,zoomLevel} = useContext(ItemsContext);
  const markerData = markerD;
  const lat = center.lat;
  const lng = center.lng;

  function ChangeView({center, zoom}){
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  function ZoomLevel(){
    const map1 = useMap();
    let prevZ = map1.getZoom();
    const map = useMapEvents({
      zoom(){
        const z = map.getZoom();
        if(z>9 && z>prevZ){
          login(z);
        }else if(z<=10){
          prevZ=10;
        }
      }
    });
    return null;
  }

  return (
    <div className={`${!listlayout ? "map-mg-top" : ""} listing-map`}>
      {/* {markerData.map((item, i) => (
                // <li> {item.lat, item.lng}</li>
                <li> {item.lat !== "0.000000" ? item.lat : 0} ,
                    {item.lng !== "0.000000" ? item.lng : 0}
                </li>
            ))} */}
            
      <MapContainer className="markercluster-map map" center={[lat,lng]} zoom={zoomLevel} z-index={0} zoomDelta={0.25} zoomSnap={0.25} wheelPxPerZoomLevel={240} zoomControl={false}>
        {changeCenter ? <ChangeView center={[lat,lng]} zoom={zoomLevel}/> : null}
        <CustomControl  position="topright" listlayout={listlayout}/>
        <ZoomLevel />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
        {window.location.pathname.split('/')[1]==="projects" && <AddLayouts/>}
        <MarkerClusterGroup showCoverageOnHover={false} disableClusteringAtZoom={9} spiderfyOnMaxZoom={false}>
        {markerData.map((item, i) => (
          <CircleMarker
            key={i}
            center={[
              item.lat !== "0.000000" ? item.lat : 10,
              item.lng !== "0.000000" ? item.lng : 20,
            ]}
            radius={isHover===item.id ? 6 : 4}
            weight={isHover===item.id ? 3 : 2}
            pathOptions = {item.category.cat_name==="Residential" ? {color:"blue"} : {color:"green"}}
          >
            <Tooltip direction="top" className="marker-tooltip">
              <div>
                {(item.posted_time_ago.slice(3,5)) === "ou" ?
                (<span className="tooltip-new">New</span>):
                (item.posted_time_ago.slice(3,5)) === "Ho"?
                (<span className="tooltip-new">New</span>):
                (item.posted_time_ago.slice(3,5)) === "in"?
                (<span className="tooltip-new">New</span>):
                (item.posted_time_ago.slice(3,5)) === "Mi"?
                (<span className="tooltip-new">New</span>):null}
              </div>
              <div className="tooltip-price my-0">
                {/* <span>Rs.{item.item_price}</span> */}
                {(item.category.cat_name==="Plots" || item.category.cat_name==="Projects") &&  item.price_SqYard !== "0" ?
                 <span>
                   {'Rs.'+item.price_SqYard}
                   <span>{"/ Sq. Yd"}</span>
                 </span> : <span>{"Rs."+item.price}</span>
                }
              </div>
            </Tooltip>
            <Popup>
                  <div style={{position:"absolute", top:"10px", left:"10px"}}>
                    {(item.posted_time_ago.slice(3,5)) === "ou" ?
                    (<span className="listing-badge new">New</span>):
                    (item.posted_time_ago.slice(3,5)) === "Ho"?
                    (<span className="listing-badge new">New</span>):
                    (item.posted_time_ago.slice(3,5)) === "in"?
                    (<span className="listing-badge new">New</span>):
                    (item.posted_time_ago.slice(3,5)) === "Mi"?
                    (<span className="listing-badge new">New</span>):null}
                    {item.is_premium==="1" && <span className="listing-badge">Premium</span>}
                    {item.is_verified==="1" && <span className="listing-badge">Verified</span>}
                  </div>
                  <img  
                    src={
                      item.default_photo.img_path === ""
                        ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                        : process.env.REACT_APP_BASE_URL+"/uploads/" +
                          item.default_photo.img_path
                    } 
                    alt={item.title}
                    className="rounded mx-auto d-block"
                    style={{height:'120px',width:'100%'}}
                  />
                <div className="acr-listing-popup-body">
                  <h5><Link to={"/"+window.location.pathname.split('/')[1]+"/"+item.id} title={item.title} target="_blank">{item.title}</Link></h5>
                  <span className="listing-price" style={{width:"fit-content", display:"inline"}}>Rs.{item.item_price}{window.location.pathname.split('/')[1]==="rent" && " / Month"}</span>
                  {item.price_SqYard!=="0" && <span style={{marginLeft:"10px"}}>{item.price_SqYard} / Sq.Yd</span>}
                  <div style={{fontSize:"11px", marginTop:"4px"}}>
                    <span>{new Intl.NumberFormat().format(item.area)}</span>
                    <span>{item.area_type !== '' ? <span style={{ textTransform: 'capitalize' }}> {item.area_type.toLowerCase()}</span> : <span style={{ textTransform: 'capitalize' }}> Acres</span>}</span>
                    <span style={{fontWeight:"800", margin:"0 5px", borderRadius:"100%"}}>&#183;</span>
                    <span>{item.category.cat_name==="Plots" ? "Land" : item.category.cat_name}</span>
                  </div>
                </div>
            </Popup>
          </CircleMarker>
        ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Listingmap;
