import axios from "axios";
import { useLeafletContext } from "@react-leaflet/core";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import ConfirmModal from "./ConfirmModal";

export default function AddLayouts(props){
  const map = useMap();
  const context = useLeafletContext();
  const [show, setShow] = useState(false);
  const [ID, setID] = useState('');
  const [upcoming, setUpcoming] = useState(true);
  const [popular, setPopular] = useState(true);
  const [red, setRed] = useState(true);
  const [flat, setFlats] = useState(true);
  const [category, setCategory] = useState('');
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingRedZones, setLoadingRedZones] = useState(false);
  const [loadingFlats, setLoadingFlats] = useState(false);
  const [loadingHighways, setLoadingHighways] = useState(false);
  const layerClickHandler = (e)=>{
    var marker = e.target, properties = e.target.feature.properties;
    if (marker.hasOwnProperty('_popup')) {
      marker.unbindPopup();
    }
    marker.bindPopup(
      `<table>
        <thead>
          <th>Property</th>
          <th>Description</th>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>${properties.name}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>${properties.category}</td>
          </tr>
          <tr>
            <td>Feature Type</td>
            <td>${properties.featureType}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>${properties.area}</td>
          </tr>
          <tr>
          <tr>
            <td>Location</td>
            <td>${properties.location}</td>
          </tr>
          <tr>
            <td colspan=2 style="text-align:center">
              <button class="btn-custom" id="view-more" type="button">
                Delete Layout
              </button>
            </td>
          </tr>
        </tbody>
      </table>`
    );
    marker.openPopup();
    var buttonSubmit = L.DomUtil.get('view-more');
    L.DomEvent.addListener(buttonSubmit, 'click', function(e){
      setShow(true);
      setID(properties.layoutId);
      setCategory(properties.category);
    });
  }
  async function fetchPopular(){
    setLoadingPopular(true);
    let res = await axios.get("https://webgis-web-app.herokuapp.com/layout/getAllLayouts");
    let layouts = res.data.features || [];
    if(layouts.length){
      let popular = layouts.filter((feat) => {
        if(feat.properties.category === "Feature" && feat.properties.featureType==="Popular") return true;
      });
      console.log(popular);
      if(popular.length){
        L.geoJSON(popular,{
          layerName:"Popular",
          style : (feature) =>{
            return {
              fillColor: feature.properties.color,
              fillOpacity: 0.8,
              color:feature.properties.color,
              opacity:1,
              weight: 2,
            };
          },
          onEachFeature: (feature,layer)=>{
            layer.on('click', layerClickHandler);
            layer.addTo(map);
            setLoadingPopular(false);
          }
        })
        setPopular(false);
      }else{
        alert("No popular features present");
        setLoadingPopular(false);
      }
    }
  }
  async function fetchUpcoming(){
    setLoadingUpcoming(true);
    let res = await axios.get("https://webgis-web-app.herokuapp.com/layout/getAllLayouts");
    let layouts = res.data.features || [];
    if(layouts.length){
      let upcoming = layouts.filter((feat) => {
        if(feat.properties.category === "Feature" && feat.properties.featureType==="Upcoming") return true;
      });
      console.log(upcoming);
      if(upcoming.length){
        L.geoJSON(upcoming,{
          layerName:"Upcoming",
          style : (feature) =>{
            return {
              fillColor: feature.properties.color,
              fillOpacity: 0.8,
              color:feature.properties.color,
              opacity:1,
              weight: 2,
            };
          },
          onEachFeature: (feature,layer)=>{
            layer.on('click', layerClickHandler);
            layer.addTo(map);
            setLoadingUpcoming(false);
          }
        })
        setUpcoming(false);
      }else{
        alert("No upcoming features present");
        setLoadingUpcoming(false);
      }
    }
  }
  async function fetchRed(){
    setLoadingRedZones(true);
    let res = await axios.get("https://webgis-web-app.herokuapp.com/layout/getAllLayouts");
    let layouts = res.data.features || [];
    if(layouts.length){
      let red = layouts.filter((feat) => {
        if(feat.properties.category === "Feature" && feat.properties.featureType==="Red Zones") return true;
      });
      console.log(red);
      if(red.length){
        L.geoJSON(red,{
          layerName:"Red",
          style : (feature) =>{
            return {
              fillColor: feature.properties.color,
              fillOpacity: 0.8,
              color:feature.properties.color,
              opacity:1,
              weight: 2,
            };
          },
          onEachFeature: (feature,layer)=>{
            layer.on('click', layerClickHandler);
            layer.addTo(map);
            setLoadingRedZones(false);
          }
        })
        setRed(false);
      }else{
        alert("No red zones present");
        setLoadingRedZones(false);
      }
    }
  }
  async function fetchFlats(){
    setLoadingFlats(true);
    let res = await axios.get("https://webgis-web-app.herokuapp.com/layout/getAllLayouts");
    let layouts = res.data.features || [];
    if(layouts.length){
      let flats = layouts.filter((feat)=>{
        if(feat.properties.category==="Flats" || feat.properties.category==="Plots") return true;
      });
      console.log(flats);
      if(flats.length){
        L.geoJSON(flats,{
          layerName: "Flats",
          style: (feature)=>{
            return {
              fillColor: feature.properties.color,
              fillOpacity: 0.8,
              color:feature.properties.color,
              opacity: 1,
              weight: 2,
            };
          },
          onEachFeature: (feature,layer)=>{
            layer.on('click', layerClickHandler);
            layer.addTo(map);
            setLoadingFlats(false);
          }
        })
        setFlats(false);
      }else{
        alert("No flats/plots to show.");
        setLoadingFlats(false);
      }
    }
  }
  function removePopular(){
    Object.values(map._layers)
      .filter((feat) => {
          if(feat.layerName === "Popular"||feat.options.layerName==="Popular")return true
        })
      .forEach((layer) => {
        map.removeLayer(layer);
      });
    setPopular(true);
  }
  function removeUpcoming(){
    Object.values(map._layers)
      .filter((feat) => {
          if(feat.layerName === "Upcoming"||feat.options.layerName==="Upcoming")return true
        })
      .forEach((layer) => {
        map.removeLayer(layer);
      });
    setUpcoming(true);
  }
  function removeRed(){
    Object.values(map._layers)
      .filter((feat) => {
          if(feat.layerName === "Red"||feat.options.layerName==="Red")return true
        })
      .forEach((layer) => {
        map.removeLayer(layer);
      });
    setRed(true);
  }
  function removeFlats(){
    Object.values(map._layers)
      .filter((feat)=>{
        if(feat.layerName==="Flats" || feat.options.layerName==="Flats") return true
      })
      .forEach((layer)=>{
        map.removeLayer(layer);
      });
    setFlats(true);
  }
  L.Control.Popular = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingPopular ? "Loading..." : "Popular";
      button.className = popular ? "map-button" : "map-button-selected";
      L.DomEvent.on(button, 'click', function(e){
        if(popular){
          fetchPopular();
        }else{
          removePopular();
        }
      })
      return button;
    }
  })

  L.control.popular = function(opts){
    return new L.Control.Popular(opts);
  }
  L.Control.Upcoming = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingUpcoming ? "Loading..." : "Upcoming";
      button.className = upcoming ? "map-button" : "map-button-selected";
      L.DomEvent.on(button, 'click', function(e){
        if(upcoming){
          fetchUpcoming();
        }else{
          removeUpcoming();
        }
      })
      return button;
    }
  })

  L.control.upcoming = function(opts){
    return new L.Control.Upcoming(opts);
  }
  L.Control.Red = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingRedZones ? "Loading..." : "Red Zones";
      button.className = red ? "map-button" : "map-button-selected";
      L.DomEvent.on(button, 'click', function(e){
        if(red){
          fetchRed();
        }else{
          removeRed();
        }
      })
      return button;
    }
  })

  L.control.red = function(opts){
    return new L.Control.Red(opts);
  }

  L.Control.Flat = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingFlats ? "Loading..." : "Flats and Plots";
      button.className = flat ? "map-button" : "map-button-selected";
      L.DomEvent.on(button, 'click', function(e){
        if(flat){
          fetchFlats();
        }else{
          removeFlats();
        }
      })
      return button;
    }
  })
  L.control.flat = function(opts){
    return new L.Control.Flat(opts);
  }
  useEffect(()=>{
    const container = context.layerContainer || context.map;
    const popular = L.control.popular({position:props.position});
    const upcoming=L.control.upcoming({position:props.position});
    const red = L.control.red({position:props.position});
    const flat = L.control.flat({position: props.position});
    container.addControl(popular);
    container.addControl(upcoming);
    container.addControl(red);
    container.addControl(flat);
    return ()=>{
      container.removeControl(popular);
      container.removeControl(upcoming);
      container.removeControl(red);
      container.removeControl(flat);
    }
  });
  if(show){
    return(
      <ConfirmModal
        show={show}
        setShow={setShow}
        ID={ID}
        setID={setID}
        category={category}
        setCategory={setCategory}
      />
    )
  }else{
    return null;
  }
}