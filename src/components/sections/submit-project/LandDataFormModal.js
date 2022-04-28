import { useState } from "react";
import { useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css"
import "../modal/css/styles.css"

export default function LandDataFormModal({show, setShow, lands, setLands, coordinates, setCoordinates, setLayoutId}){
  const [landData, setLandData] = useState({
    name: "",
    description: "",
    area: 0,
    color: "#ff5722",
    landId: "",
    opacity: "0.8",
    isShownForUsers: 0,
    landType: "",
  });

  const map = useMap();
  function onEachFeature(feature, layer) {
    const { name, description, area, landType, isShownForUsers } = feature.properties;
    console.log(layer);
    layer.type = landType;
    layer.layerName = "Lands";
    // does this feature have a property named popupContent?
    if (feature.properties) {
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
              <td>${name}</td>
            </tr>
            <tr>
              <td><strong>Description</strong></td>
              <td>${description}</td>
            </tr>
            <tr>
              <td><strong>Area</strong></td>
              <td>${area}</td>
              </tr>
              <tr>
              <td><strong>Layer Type </strong></td>
              <td>${
                landType == "POP"
                  ? "Popular land"
                  : landType === "PRIV"
                  ? "Private Land"
                  : "Investment Land"
              }</td>
            </tr>
            <tr>
              <td><strong>Showing for Users </strong></td>
              <td>${
                isShownForUsers == 0
                  ? "No"
                  : "Yes"
              }</td>
            </tr>
          </tbody>
        </table>`
      );
    }
    layer.addTo(map);
  }
  const handleClose = () => {
    setShow(false);

    setCoordinates([]);
    setLandData({
      name: "",
      description: "",
      area: 0,
      color: "#ff5722",
      landId: "",
      opacity: "0.8",
      isShownForUsers: 0,
      landType: "",
    });
  };

  let generateUniqueId = function () {
    let id = Date.now();
    return id;
  };

  // const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let generatedLandId = generateUniqueId().toString();

    let dataInGeoJson = {
      type: "Feature",
      properties: {
        ...landData,
        landId: generatedLandId,
        userId:"607858b9e9f43b3a50e8419b",
        area: parseFloat(landData.area),
      },
      geometry: {
        type: "Polygon",
        coordinates: coordinates,
      },
    };
    let layer = L.geoJSON(dataInGeoJson, {
      style: (feature) => {
        return {
          fillColor: feature.properties.color,
          fillOpacity: feature.properties.opacity,
          color: "white",
          opacity: 1,
          weight: 2,
        };
      },
      tags: [dataInGeoJson.properties.landType],
      onEachFeature: onEachFeature,
      pmIgnore: false,
      layerName: "Lands",
      
    });
    // layer.addTo(map);
    await axios
      .post("https://webgis-web-app.herokuapp.com/land/create", dataInGeoJson)
      .then((res) => res.data)
      .then((data) => {
        if (data.status) {
          console.log(data);
          setLayoutId(generatedLandId);
          setShow(false);
          setCoordinates([]);
          setLandData({
            name: "",
            description: "",
            area: 0,
            color: "#ff5722",
            landId: "",
            opacity: "0.8",
            isShownForUsers: 0,
            landType: "",
          });
          let landsCopy = [...lands];
          landsCopy.push(dataInGeoJson);
          setLands(landsCopy);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    console.log(map);
    let name = e.target.name;
    let landDataCopy = { ...landData };
    landDataCopy[name] = e.target.value;
    setLandData(landDataCopy);
  };
  if(show){
    return(
      <Modal open={show} onClose={handleClose} center classNames={{overlay:'custom-overlay'}}>
        <form onSubmit={handleSubmit}>
                <h3>Add Plot Data</h3>
                <div className="line-body-modal create-feat-container">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Name
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter the land name"
                      aria-label="name"
                      name="name"
                      value={landData.name}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Description
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please enter the plot description"
                      aria-label="description"
                      name="description"
                      value={landData.description}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Area
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Please enter the plot area"
                      aria-label="area"
                      name="area"
                      value={landData.area}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Color
                      </span>
                    </div>
                    <input
                      type="color"
                      className="form-control"
                      placeholder="Please enter the plot color"
                      aria-label="color"
                      name="color"
                      value={landData.color}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Opacity
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      className="form-control"
                      placeholder="Please enter the plot opacity"
                      aria-label="opacity"
                      name="opacity"
                      value={landData.opacity}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Lands Type
                      </span>
                    </div>
                    <select
                      name="landType"
                      defaultValue=""
                      id="landType"
                      onChange={handleChange}
                      required
                      value={landData.landType}
                      placeholder="Choose type of lands"
                    >
                      <option value="">Choose type of lands</option>
                      <option value="POP">Popular layer</option>
                      <option value="PRIV">Private layer</option>
                      <option value="INVEST">Investment layer</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Showing To Users
                      </span>
                    </div>
                    <select
                      name="isShownForUsers"
                      defaultValue="0"
                      id="isShownForUsers"
                      onChange={handleChange}
                      required
                      value={landData.isShownForUsers}
                      placeholder="Want to show it to iusers"
                    >
                      <option value="">Want to show it to iusers</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                </div>
                <div style={{float:'right'}}>
                  <button type="button" className="btn-custom"onClick={handleClose} style={{marginRight:"3px"}}>
                    Close
                  </button>
                  <button className="btn-custom" type="submit">
                    Save
                  </button>
                </div>
            </form>
      </Modal>
    )
  }else{
    return null;
  }
}