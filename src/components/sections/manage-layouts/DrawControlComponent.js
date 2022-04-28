import { FeatureGroup } from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import LayoutDataFormModal from "./LayoutDataFormModal";
import LineDataFormModal from "./LineDataFormModal";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import axios from "axios";

export default function DrawControlComponent({drawControlOnMap, editControlOnMap}){
  const map = useMap();
  const [show, setShow] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [shape, setShape] = useState("");

  useEffect(()=>{
    if(drawControlOnMap){
      let fGroup = new FeatureGroup();
      map.addLayer(fGroup);

        // add leaflet-geoman draw control with some options to the map
      map.pm.addControls({
        position: "topleft",
        drawMarker: false,
        drawCircleMarker: false,
        drawPolyline: true,
        drawControls: true,
        drawCircle: false,
        continueDrawing: true,

        // drawRectangleCopy:true,
        editControls: false, //disable the edit mode
      });
      map.pm.enableDraw("Rectangle", {
        snapMiddle: true,
        templineStyle: { weight: 0.5, color: "brown" },
        hintlineStyle: { weight: 0.5, color: "brown" },
        finishOn: "dblclick",
        snappable: true,
        snapDistance: 5,
      });

      map.pm.enableDraw("Polygon", {
        snapMiddle: true,
        templineStyle: { weight: 0.5, color: "brown" },
        hintlineStyle: { weight: 0.5, color: "brown" },
        finishOn: "dblclick",
        snappable: true,
        snapDistance: 2,
      });

      map.pm.enableDraw("Line",{
        snappable : true,
        snapMiddle: true,
        finishOn: "dblclick",
        snapDistance: "20"
      });

      //set the layer group to draw on
      map.pm.setGlobalOptions({
        layerGroup: fGroup,
      });
      map.pm.Toolbar.changeControlOrder(["drawPolygon", "drawRectangle", "drawLine"]);

      //handle the draw plot
      //to get the coords after draw the polygon --> e.layer._latlngs
      map.on("pm:create", (e) => {
        console.log("map", map);
        console.log("geojson format", e.layer.toGeoJSON());

        let coordsWithLatLng = e.layer._latlngs;
        let plotCoordinates = [];
        if(e.layer.pm._shape==="Line"){
          coordsWithLatLng.forEach((item)=>{
            let coord = [item.lng, item.lat];
            plotCoordinates.push(coord);
          });
          setCoordinates(plotCoordinates);
          setShape("LineString");
        }else{
          coordsWithLatLng[0].forEach((item) => {
            let coord = [item.lng, item.lat];
            plotCoordinates.push(coord);
          });
          plotCoordinates.push([
            coordsWithLatLng[0][0].lng,
            coordsWithLatLng[0][0].lat,
          ]);
          setCoordinates([plotCoordinates]);
          setShape("Polygon");
        }
        //remove the onfly feature
        console.log(plotCoordinates);
        map.removeLayer(e.layer);
        map.pm.removeControls();
        //open the add form modal
        setShow(true);
      });
    }else if(editControlOnMap){
      map.pm.disableDraw();
      map.pm.removeControls();
      if (map.pm.globalOptions.layerGroup)
        map.removeLayer(map.pm.globalOptions.layerGroup);

      let layersPlot = Object.values(map._layers).filter((lay) => lay.feature);
      // if (layer) {
      if (layersPlot.length) {
        // add leaflet-geoman edit control with some options to the map
        map.pm.addControls({
          position: "topleft",
          drawControls: false,
          // editMode:true,
          cutPolygon: false,
          dragMode: false,
          removalMode: false,
          editControls: true,
        });

        // map.pm.enableGlobalEditMode();
        for (var i = layersPlot.length - 1; i >= 0; i--) {
          let layer = layersPlot[i];

          //after finish edit plot
          layer.on("pm:update", async (e) => {
            if(e.layer.feature.geometry.type==="Polygon"){
              let featureInGeoJsonFormat = e.layer.feature;
              let coordsWithLatLng = e.layer._latlngs;
              let plotCoordinates = [];
              coordsWithLatLng[0].forEach((item) => {
                let coord = [item.lng, item.lat];
                plotCoordinates.push(coord);
              });
              plotCoordinates.push([
                coordsWithLatLng[0][0].lng,
                coordsWithLatLng[0][0].lat,
              ]);
              let data ={
                geometry: {
                  type: "Polygon",
                  coordinates: [plotCoordinates],
                },
              };
              await axios
                .patch(`https://webgis-web-app.herokuapp.com/layout/editlayout/${featureInGeoJsonFormat.properties.layoutId}`,data)
                  .then((res) => res.data)
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((err) => console.log(err));
            }else if(e.layer.feature.geometry.type==="LineString"){
              let featureInGeoJsonFormat = e.layer.feature;
              let coordsWithLatLng = e.layer._latlngs;
              let plotCoordinates = [];
              coordsWithLatLng.forEach((item)=>{
                let coord = [item.lng, item.lat];
                plotCoordinates.push(coord);
              })
              let data = {
                geometry:{
                  type:"LineString",
                  coordinates:plotCoordinates,
                },
              };
              await axios
                .patch(`https://webgis-web-app.herokuapp.com/line/editline/${featureInGeoJsonFormat.properties.polyLineId}`,data)
                  .then(res=>res.data)
                  .then((data)=>{
                    console.log(data);
                  })
                  .catch(err=>console.log(err));
            }
          });
        }
      } else alert("There is no layer existing to edit");
    }
  },[]);
  if(show && shape==="Polygon"){
    return (
      <LayoutDataFormModal 
        show = {show}
        setShow={setShow}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
    )
  }else if(show && shape==="LineString"){
    return (
      <LineDataFormModal
      show = {show}
      setShow={setShow}
      coordinates={coordinates}
      setCoordinates={setCoordinates}
      />
    )
  }else{
    return null;
  }
}