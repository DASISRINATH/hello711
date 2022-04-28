import { useState } from "react";
import Modal from "react-responsive-modal";
import axios from "axios";
import L from "leaflet";
import "react-responsive-modal/styles.css";
import "../modal/css/styles.css";
import { useMap } from "react-leaflet";

export default function LayoutDataFormModal({show, setShow, coordinates, setCoordinates}){
  const map=useMap();
  const [layoutData, setLayoutData] = useState({
    title:"",
    layoutId:"",
    category:"Feature",
    featureType:"Upcoming",
    name:"example",
    area:100,
    total:10,
    available:10,
    booked:10,
    mandal:"admin",
    location:"admin",
    color:"#ff5722"
  });

  const handleClose = () => {
    setShow(false);
    setCoordinates([]);
    setLayoutData({
      title:"",
      layoutId:"",
      category:"Feature",
      featureType:"Upcoming",
      name:"feature",
      area:100,
      total:10,
      available:10,
      booked:10,
      mandal:"admin",
      location:"admin",
      color:"#ff5722"
    });
  }

  let generateUniqueId = function () {
    let id = Date.now();
    return id;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let generatedLayoutId = generateUniqueId().toString();
    let dataInGeoJSON = {
      type:"Feature",
      properties: {
        ...layoutData,
        layoutId: generatedLayoutId,
        userId: "607858b9e9f43b3a50e8419b",
        area:parseFloat(layoutData.area),
      },
      geometry: {
        type:"Polygon",
        coordinates: coordinates
      },
    };
    console.log(dataInGeoJSON);
    let layer = L.geoJSON(dataInGeoJSON, {
      style: (feature)=>{
        return {
          fillColor: feature.properties.color,
          fillOpacity: 0.8,
          color:feature.properties.color,
          opacity: 1,
          weight: 2,
        };
      },
      pmIgnore: false,
      layerName: dataInGeoJSON.properties.category,
    }).addTo(map);
    await axios.post("https://webgis-web-app.herokuapp.com/layout/create", dataInGeoJSON)
      .then((res)=>res.data)
      .then((data)=>{
        if(data.status){
          console.log(data);
          setShow(false);
          setCoordinates([]);
          setLayoutData({
            title:"",
            layoutId:"",
            category:"Feature",
            featureType:"Upcoming",
            name:"example",
            area:100,
            total:10,
            available:10,
            booked:10,
            mandal:"admin",
            location:"admin",
            color:"#ff5722"
          });
          window.location.reload();
        }
      })
      .catch(err=>{console.log(err)});
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let layoutDataCopy = {...layoutData};
    layoutDataCopy[name] = e.target.value;
    setLayoutData(layoutDataCopy);
  }
  if(show){
    return(
      <Modal open={show} onClose={handleClose} center classNames={{overlay:'custom-overlay'}}>
        <form onSubmit={handleSubmit}>
          <h4 style={{fontWeight:"normal"}} className="text-center">Enter Layout Details</h4>
          <div className="w-100">
            <div className="input-group mb-2">
              <div id="basic-addon1">
                Title
              </div>
              <div className="w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter the title of your layout"
                  aria-label="title"
                  name="title"
                  value={layoutData.title}
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>
            <div className="container px-0 mb-2">
              <div className="row">
                <div className="input-group col-lg-6">
                  <div id="basic-addon1">
                    Layout Category : 
                  </div>
                  <div className="w-100">
                    <select
                      name="category"
                      defaultValue=""
                      id="category"
                      onChange={handleChange}
                      required
                      value={layoutData.category}
                      className="form-control"
                    >
                      <option value="Feature">Feature</option>
                      {/* <option value="Flats">Flats</option>
                      <option value="Plots">Plots</option> */}
                    </select>
                  </div>
                </div>
                <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Feature Type : 
                  </div>
                  <div className="w-100">
                    <select
                      name="featureType"
                      defaultValue=""
                      id="featureType"
                      onChange={handleChange}
                      required
                      disabled={layoutData.category!=="Feature"}
                      value={layoutData.featureType}
                      className="form-control"
                    >
                      <option value="">Select Feature Type</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Popular">Popular</option>
                      <option value="Red Zones">Red Zones</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="input-group mb-2">
              <div id="basic-addon1">
                Project Name/Organization Name : 
              </div>
              <div className="w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please enter the name of your project"
                  aria-label="name"
                  name="name"
                  value={layoutData.name}
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  disabled={layoutData.category==="Feature"}
                  required 
                />
              </div>
            </div>
            <div className="container px-0 mb-2">
              <div className="row">
                <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Project Area(acres) :  
                  </div>
                  <div className="w-100">
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Please enter the name of your project"
                    aria-label="area"
                    name="area"
                    value={layoutData.area}
                    aria-describedby="basic-addon1"
                    onChange={handleChange}
                    disabled={layoutData.category==="Feature"}
                    required 
                  />
                  </div>
                </div>
                <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Total No. of Plots/Flats 
                  </div>
                  <div className="w-100">
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Please enter the name of your project"
                      aria-label="total"
                      name="total"
                      value={layoutData.total}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      disabled={layoutData.category==="Feature"}
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container px-0 mb-2">
              <div className="row">
                <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Available :  
                  </div>
                  <div className="w-100">
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Please enter the name of your project"
                      aria-label="available"
                      name="available"
                      value={layoutData.available}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      disabled={layoutData.category==="Feature"}
                      required 
                    />
                  </div>
                </div>
                <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Booked :  
                  </div>
                  <div className="w-100">
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Please enter the name of your project"
                      aria-label="booked"
                      name="booked"
                      value={layoutData.booked}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      disabled={layoutData.category==="Feature"}
                      required 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="container px-0 mb-2">
              <div className="row">
              <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Mandal/Town :  
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter the mandal of your project"
                      aria-label="mandal"
                      name="mandal"
                      value={layoutData.mandal}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      disabled={layoutData.category==="Feature"}
                      required 
                    />
                  </div>
                </div>
                <div className="input-group col-lg">
                  <div id="basic-addon1">
                    Village/Location: 
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter the location of your project"
                      aria-label="location"
                      name="location"
                      value={layoutData.location}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      disabled={layoutData.category==="Feature"}
                      required 
                    />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="w-50">
              <div className="input-group mb-2">
                <div id="basic-addon1">
                  Color : 
                </div>
                <div className="w-100">
                <input
                  type="color"
                  className="form-control"
                  placeholder="Please enter the plot color"
                  aria-label="color"
                  name="color"
                  value={layoutData.color}
                  aria-describedby="basic-addon1"
                  onChange={handleChange}
                  required
                />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="btn-custom" type="submit" style={{marginRight:"3px"}}>Save</button>
            <button type="button" onClick={handleClose} className="btn-custom">Cancel</button>
          </div>
        </form>
      </Modal>
    )
  }
}