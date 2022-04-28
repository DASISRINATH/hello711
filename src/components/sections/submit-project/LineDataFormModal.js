import { useState } from "react";
import { useMap } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css"
import "../modal/css/styles.css"

export default function LineDataFormModal({show, setShow, coordinates, setCoordinates}){
  const [lineData, setLineData] = useState({
    name: "",
    description: "",
    length: 0,
    color: "#ff5722",
    polyLineId: "",
    opacity: "0.8",
    isShownForUsers: 0,
    polyLineType: "",
  });

  const map = useMap();
  function onEachFeature(feature, layer) {
    const { name, description, length, polyLineType, isShownForUsers } = feature.properties;
    console.log(layer);
    layer.type = polyLineType;
    layer.layerName = "Lines";
    // does this feature have a property named popupContent?
    if (feature.properties) {
      layer.bindPopup(
        `<table>
          <thead>
            <th>
              Property
            </th>
            <th>
              Description
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
              <td>${length}</td>
              </tr>
              <tr>
              <td><strong>Layer Type </strong></td>
              <td>${
                polyLineType == "POP"
                  ? "Popular land"
                  : polyLineType === "PRIV"
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
    setLineData({
      name: "",
      description: "",
      length: 0,
      color: "#ff5722",
      polyLineId: "",
      opacity: "0.8",
      isShownForUsers: 0,
      polyLineType: "",
    });
  };

  let generateUniqueId = function () {
    let id = Date.now();
    return id;
  };

  // const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let generatedpolyLineId = generateUniqueId().toString();

    let dataInGeoJson = {
      type: "Feature",
      properties: {
        ...lineData,
        polyLineId: generatedpolyLineId,
        userId:"607858b9e9f43b3a50e8419b",
        length: parseFloat(lineData.length),
      },
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    };
    let layer = L.geoJSON(dataInGeoJson, {
      style: (feature) => {
        return {
          color: feature.properties.color,
          opacity: feature.properties.opacity,
          weight: 2,
        };
      },
      tags: [dataInGeoJson.properties.polyLineType],
      onEachFeature: onEachFeature,
      pmIgnore: false,
      layerName: "Lines",
      
    });
    // layer.addTo(map);
    await axios
      .post("https://webgis-web-app.herokuapp.com/line/create", dataInGeoJson)
      .then((res) => res.data)
      .then((data) => {
        if (data.status) {
          console.log(data);
          setShow(false);
          setCoordinates([]);
          setLineData({
            name: "",
            description: "",
            length: 0,
            color: "#ff5722",
            polyLineId: "",
            opacity: "0.8",
            isShownForUsers: 0,
            polyLineType: "",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    console.log(map);
    let name = e.target.name;
    let landDataCopy = { ...lineData };
    landDataCopy[name] = e.target.value;
    setLineData(landDataCopy);
  };
  if(show){
    return(
      <Modal open={show} onClose={handleClose} center classNames={{overlay:'custom-overlay'}}>
        <form onSubmit={handleSubmit}>
                <h3>Add Line Data</h3>
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
                      value={lineData.name}
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
                      value={lineData.description}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Length
                      </span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Please enter the plot length"
                      aria-label="length"
                      name="length"
                      value={lineData.length}
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
                      value={lineData.color}
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
                      value={lineData.opacity}
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        Line Type
                      </span>
                    </div>
                    <select
                      name="polyLineType"
                      defaultValue=""
                      id="polyLineType"
                      onChange={handleChange}
                      required
                      value={lineData.polyLineType}
                      placeholder="Choose type of Lines"
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
                      value={lineData.isShownForUsers}
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