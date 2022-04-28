import axios from "axios";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function AddLayouts(){
  const map = useMap();
  const fetchData = async (landId) => {
    var postData = {
      map_layout_id: landId
    };
    await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
      .then(response=>{
        const url = window.location.pathname+"/"+response.data[0].id;
        window.open(url, "_blank");
      })
      .catch(err=>alert("No such layout present in our database"))
  };
  useEffect(()=>{
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
              <td>Area</td>
              <td>${properties.area}</td>
            </tr>
            <tr>
            <tr>
              <td>Location</td>
              <td>${properties.location}</td>
            </tr>
              <td colspan=2 style="text-align:center">
                <button class="btn-custom" id="view-more" type="button">
                  View More
                </button>
              </td>
            </tr>
          </tbody>
        </table>`
      );
      marker.openPopup();
      var buttonSubmit = L.DomUtil.get('view-more');
      L.DomEvent.addListener(buttonSubmit, 'click', function(e){
        fetchData(properties.layoutId);
      });
    }
    async function fetchAllLands(){
      let res = await axios.get("https://webgis-web-app.herokuapp.com/layout/getAllLayouts");
      console.log(res);
      let lands = res.data.features || [];
      if(lands.length){
        let projects = lands.filter((feat)=>{
          if(feat.properties.category==="Flats" || feat.properties.category==="Plots") return true;
        })
        if(projects.length){
          L.geoJSON(projects, {
            layerName: "Projects",
            style : (feature) =>{
              return {
                fillColor: feature.properties.color,
                fillOpacity: 0.8,
                color:feature.properties.color,
                opacity:1,
                weight: 2,
              };
            },
            onEachFeature : (feature, layer)=>{
              layer.on('click', layerClickHandler);
              layer.addTo(map);
            }
          })
        }else{
          alert("No layouts to show");
        }
      }
    }
    fetchAllLands();
    return ()=>null;
  },[]);
  return null; 
}