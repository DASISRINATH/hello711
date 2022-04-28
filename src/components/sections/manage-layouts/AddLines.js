import L from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import "../listings/listingmap.css";
import ConfirmModal from "./ConfirmModal";

const AddLines = (props)=>{
  const map = useMap();
  const context = useLeafletContext();
  const [lines, setLines] = useState(true);
  const [show, setShow] = useState(false);
  const [ID, setID] = useState('');
  const [category, setCategory] = useState('');
  const [loadingLines, setLoadingLines] = useState(false);
  function layerClickHandler(e){
    var marker = e.target, properties=e.target.feature.properties;
    if(marker.hasOwnProperty('_popup')){
      marker.unbindPopup();
    }
    marker.bindPopup(
      `<table>
        <thead>
          <th>Property</th>
          <th>Value</th>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>${properties.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>${properties.description}</td>
          </tr>
          <tr>
            <td colspan=2 style="text-align:center">
              <button class="btn-custom" id="view-more" type="button">
                Delete Highway
              </button>
            </td>
          </tr>
        </tbody>
      </table>`
    );
    marker.openPopup();
    var buttonSubmit = L.DomUtil.get('view-more');
    L.DomEvent.addListener(buttonSubmit,'click',function(e){
      setShow(true);
      setID(properties.polyLineId);
      setCategory("Lines");
    })
  }
  async function AddLines(){
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
        onEachFeature: (feature,layer)=>{
          layer.on('click', layerClickHandler);
          layer.addTo(map);
          setLoadingLines(false);
        }
      })
      setLines(false);
    }
  }
  function removeLines(){
    Object.values(map._layers)
      .filter((feat)=>{
        if(feat.layerName==="Lines" || feat.options.layerName==="Lines") return true;
      })
      .forEach((layer)=>{
        map.removeLayer(layer);
      })
      setLines(true);
  }
  L.Control.Lines = L.Control.extend({
    onAdd: function(map){
      var button = L.DomUtil.create("button");
      button.textContent = loadingLines ? "Loading..." : "Highways";
      button.className = lines ? "map-button" : "map-button-selected";
      L.DomEvent.on(button, 'click', function(e){
        if(lines){
          AddLines();
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
    const lines = L.control.lines({position:props.position});
    container.addControl(lines);
    return ()=>{
      container.removeControl(lines);
    };
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

export default AddLines;