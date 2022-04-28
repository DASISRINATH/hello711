import { useLeafletContext } from "@react-leaflet/core";
import axios from "axios";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useTranslation } from 'react-i18next';
import "leaflet-easybutton";
import "leaflet-easybutton/src/easy-button.css"
import "./listingmap.css";

export default function CustomControl(props){
  const map = useMap();
  const context = useLeafletContext();
  const [popular, setPopular] = useState(true);
  const [lines, setLines] = useState(true);
  const [upcoming, setUpcoming] = useState(true);
  const [red, setRed] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingRed, setLoadingRed] = useState(false);
  const [loadingLines, setLoadingLines] = useState(false);
  const {t} = useTranslation(['listings']);
  

  // function addControlPlaceholders(map) {
  //   var corners = map._controlCorners,
  //       l = 'leaflet-',
  //       container = map._controlContainer;

  //   function createCorner(vSide, hSide) {
  //       var className = l + vSide + ' ' + l + hSide;

  //       corners[vSide + hSide] = L.DomUtil.create('div', className, container);
  //   }

  //   createCorner('verticalcenter', 'left');
  //   createCorner('verticalcenter', 'right');
  // }
  // addControlPlaceholders(map);

  // // Change the position of the Zoom Control to a newly created placeholder.
  // map.zoomControl.setPosition('verticalcenterright');

  // // You can also put other controls in the same placeholder.
  // L.control.scale({position: 'verticalcenterright'}).addTo(map);

  const layerClickHandler = (e)=>{
    var marker = e.target, properties = e.target.feature.properties;
    if(marker.hasOwnProperty("_popup")){
      marker.unbindPopup();
    }
    marker.bindPopup(
      `<p class=text-center>${properties.title}</p>`
    );
    marker.openPopup();
  }

  const lineClickHandler = (e)=>{
    var marker = e.target, properties=e.target.feature.properties;
    if(marker.hasOwnProperty('_popup')){
      marker.unbindPopup();
    }
    marker.bindPopup(
      `<table>
        <tr>
          <td>Name</td>
          <td>${properties.name}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>${properties.description}</td>
        </tr>
      </table>`
    );
    marker.openPopup();
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
          onEachFeature: (feature, layer)=>{
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
  async function fetchLines(){
    setLoadingLines(true);
    let res = await axios.get("https://webgis-web-app.herokuapp.com/line/getAllLines");
    let lines = res.data.features || [];
    console.log(lines);
    if(lines.length){
      L.geoJSON(lines,{
        layerName:"Lines",
        style : (feature) => {
          return{
            color: feature.properties.color,
            opacity: feature.properties.opacity,
            weight: 3
          };
        },
        onEachFeature: (feature, layer)=>{
          layer.on('click', lineClickHandler);
          layer.addTo(map);
          setLoadingLines(false);
        }
      })
      setLines(false);
    }else{
      alert("No highways present");
      setLoadingLines(false);
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
          onEachFeature: (feature, layer)=>{
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
    setLoadingRed(true);
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
          onEachFeature: (feature, layer)=>{
            layer.on('click', layerClickHandler);
            layer.addTo(map);
            setLoadingRed(false);
          }
        })
        setRed(false);
      }else{
        alert("No red zones present");
        setLoadingRed(false);
      }
    }
  }
  function removeLines(){
    Object.values(map._layers)
      .filter((feat)=>{
        if(feat.layerName==="Lines" || feat.options.layerName==="Lines")return true
      })
      .forEach((layer)=>{
        map.removeLayer(layer);
      })
      setLines(true);
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

  L.Control.Popular = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingPopular ? "Loading..." : t('listings:map.popular');
      button.className = popular ? "map-button" : "map-button-selected";
      button.style.marginTop = props.listlayout ? "8%" : "60px";
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
      button.textContent = loadingUpcoming ? "Loading..." : t('listings:map.upcoming');
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
      button.textContent = loadingRed ? "Loading..." : t('listings:map.red_zones');
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
  L.Control.Lines = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingLines ? "Loading..." : t('listings:map.highways');
      button.className = lines ? "map-button" : "map-button-selected";
      L.DomEvent.on(button, 'click', function(e){
        if(lines){
          fetchLines();
        }else{
          removeLines();
        }
      })
      return button;
    }
  })

  L.control.lines = function(opts){
    return new L.Control.Lines(opts);
  }

  useEffect(()=>{
    const container = context.layerContainer || context.map;
    const popular = L.control.popular({position:props.position});
    const upcoming=L.control.upcoming({position:props.position});
    const red = L.control.red({position:props.position});
    const lines = L.control.lines({position:props.position});
    container.addControl(popular);
    container.addControl(upcoming);
    container.addControl(red);
    container.addControl(lines);
    return ()=>{
      container.removeControl(popular);
      container.removeControl(upcoming);
      container.removeControl(red);
      container.removeControl(lines);
    }
  })

  return null;
}