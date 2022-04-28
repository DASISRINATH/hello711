import React, { useState, useRef, useEffect, useContext} from "react";
import { LocationContext } from "./../../../context/LocationContext";
import L from "leaflet";
import { Link } from "react-router-dom";
import { MapContainer, LayersControl,FeatureGroup,TileLayer,LayerGroup,CircleMarker, Popup,GeoJSON,useMap, useMapEvents } from "react-leaflet";
import DemoImg from "./test_1.jpg";
import Hyderabad from "../../../data/hyderabad-data.json";
import MapDataModal from "./Mapdatamodal.js";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Button from "@material-ui/core/Button";
// import { MarkerCluster } from "leaflet";

require('leaflet/dist/leaflet.css');
require('react-leaflet-markercluster/dist/styles.min.css');

const customMarker = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});

const Rentmap = ({markerD, login, changeCenter, isHover}) => {
  const {center,zoomLevel} = useContext(LocationContext);
  const markerData = markerD;
  // const stateMap = useSelector(state => state.map)
  const lat = center.lat;
  const lng = center.lng;
  //const zoomLevel = zoomLevel;

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
        console.log(z);
        if(z>9 && z>prevZ){
          login(z);
        }else if(z<=9){
          prevZ=9;
        }
      }
    });
    return null;
  }

  return (
    <div className="listing-map">
      {/* {markerData.map((item, i) => (
                // <li> {item.lat, item.lng}</li>
                <li> {item.lat !== "0.000000" ? item.lat : 0} ,
                    {item.lng !== "0.000000" ? item.lng : 0}
                </li>
            ))} */}
            
      <MapContainer className="markercluster-map map" center={[lat,lng]} zoom={zoomLevel} z-index={0} zoomDelta={0.25} zoomSnap={0.25} wheelPxPerZoomLevel={240}>
        {/* {changeCenter ? <ChangeView center={[lat,lng]} zoom={zoomLevel}/> : null} */}
        <ChangeView center={[lat,lng]} zoom={zoomLevel}/>
        <LayersControl position="topright">
          <ZoomLevel />
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay name="Hyderabad">
              <GeoJSON key='hyderabad-data' data={Hyderabad}/>
          </LayersControl.Overlay>
          
        </LayersControl>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
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
            pathOptions = {isHover===item.id ? {color:"green"} : {color:'blue'}}
          >
            <Popup>
              <div className="mapboxgl-popup mapboxgl-popup-anchor-top">
                <div className="mapboxgl-popup-tip" />
                <img  
                  src={
                    item.default_photo.img_path === ""
                      ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                      : process.env.REACT_APP_BASE_URL+"/uploads/" +
                        item.default_photo.img_path
                  } alt={item.title}  className="rounded mx-auto d-block" style={{height:'150px'}}/>

                <div className="acr-listing-popup-body">
                  <h5><Link to={"/"+window.location.pathname.split('/')[1]+"/"+item.id} title={item.title} target="_blank">{item.title}</Link></h5>
                  <span className="listing-price">Rs.{item.price}</span>
                  {/* <p>
                    <i className="fas fa-map-signs" />
                    {item.address}
                  </p> */}
                  {/*
                  <div className="location-popup-meta">
                    <span>
                      <i className="fas fa-bed" />
                      {item.title}
                    </span>
                    <span>
                      <i className="fas fa-bath" />
                      {item.title}
                    </span>
                    <span>
                      <i className="fas fa-ruler-combined" />
                      {item.title}
                    </span>
                  </div>
                  */}
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

export default Rentmap;
