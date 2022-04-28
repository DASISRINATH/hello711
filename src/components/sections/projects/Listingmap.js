import React, { useState, useRef, useEffect, useContext } from "react";
import { LocationContext } from "./../../../context/LocationContext";
import L from "leaflet";
import { Link } from "react-router-dom";
import { MapContainer, LayersControl,FeatureGroup,TileLayer,LayerGroup,CircleMarker,Popup,GeoJSON,useMap, useMapEvents} from "react-leaflet";
import DemoImg from "./test_1.jpg";
import Hyderabad from "../../../data/hyderabad-data.json";
import MapDataModal from "./Mapdatamodal.js";
import MarkerClusterGroup from 'react-leaflet-markercluster';

require('leaflet/dist/leaflet.css');
require('react-leaflet-markercluster/dist/styles.min.css');

const Listingmap = (props) => {
  const {center,zoomLevel} = useContext(LocationContext);
  const markerData = props.markerData;
  // const stateMap = useSelector(state => state.map)
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
        console.log(z);
        if(z>9 && z>prevZ){
          props.login(z);
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
        {/* {props.changeCenter && <ChangeView center={[lat,lng]} zoom={zoomLevel}/>} */}
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

          <LayersControl.Overlay name="Regional Ring Road">
              <GeoJSON key='hyderabad-data' data={Hyderabad} style={(feat)=>{
                return{
                  fillColor:feat.properties.color,
                  fillOpacity:feat.properties.opacity,
                  weight:0
                }
              }} onEachFeature={(feat,layer)=>{
                layer.bindPopup(
                  `<table>
                                  <thead>
                                  <th>
                                          Property
                                          </th>
                                          <th>
                                          Describtion
                                          </th>
                                          
                                          </thead>
                                          <tbody>
                                  
                                  <tr>
                                  <td><strong>Name</strong></td>
                                  <td>${feat.properties.name}</td>
                                      </tr>
                                      <tr>
                                          <td><strong>Description</strong></td>
                                          <td>${feat.properties.description}</td>
                                      </tr>
                                      <tr>
                                          <td><strong>Area</strong></td>
                                          <td>${feat.properties.area}</td>
                                          </tr>
                                          <tr>
                                          <td><strong>Layer Type </strong></td>
                                          <td>${
                                            feat.properties.landType == "POP"
                                              ? "Popular land"
                                              : feat.properties.landType === "PRIV"
                                              ? "Private Land"
                                              : "Investment Land"
                                          }</td>
                                          </tr>
                                          <tr>
                                  <td><strong>Showing for Users </strong></td>
                                        
                                          <td>${
                                            feat.properties.isShownForUsers == 0
                                              ? "No"
                                              : "Yes"
                                          }</td>
                                          </tr>
                                          </tbody>
                                          </table>`
                )
              }} />
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
              radius={props.isHover===item.id ? 6 : 4}
              weight={props.isHover===item.id ? 3 : 2}    
              pathOptions={props.isHover===item.id ? {color:"green"} : {color:'blue'}}
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
                    } alt={item.title}  className="rounded mx-auto d-block" style={{maxHeight:'240px'}}/>

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

export default Listingmap;
