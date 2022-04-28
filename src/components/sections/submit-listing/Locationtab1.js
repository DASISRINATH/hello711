import React, { useState, useEffect, Fragment, useContext } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { submitContext } from "./../../../context/SubmitListContext";

function Locationtab1(props) {
  const {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    center,
    setCenter,
    city,
    setCity,
    s,
    setS,
    address,
    setAddress,
    selectCity,
    getlatlngdata,
    getAddressdata,
    setSValue,
  } = useContext(submitContext);
  const [currentPos, setCurrentPos] = useState({ lat: "", lng: "" });

  useEffect(() => {
    console.log(center);
  }, []);

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        setCurrentPos(e.latlng);
        getlatlngdata(e.latlng);
      },
    });
    return null;
  }
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  const onChange = (e) => {
    getAddressdata(e.target.value);
  };

  return (
    <Fragment>
      <div style={{ marginBottom: "0" }} className="col-md-12 form-group">
        <label>
          Select Location on Map
          <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
        </label>
      </div>
      <div className="col-md-12 form-group submit-listing-map">
        <MapContainer
          style={{ borderRadius: "8px", overflow: "hidden" }}
          zoom={10}
          center={{ lat: 17.385, lng: 78.486702 }}
        >
          {s && <ChangeView center={center} zoom={10} />}
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <MyComponent />
          {latitude && longitude && (
            <CircleMarker
              center={{ lat: latitude, lng: longitude }}
              radius={5}
              pathOptions={{ color: "blue" }}
            ></CircleMarker>
          )}
        </MapContainer>
      </div>
      <div className="col-md-12 form-group">
        <span className="acr-form-notice">
          Drag and drop the marker to identify your <b>Latitude</b> and{" "}
          <b>Longitude</b>{" "}
        </span>
      </div>
      {/*
                <div className="col-md-12 form-group">
                    <label>Region</label>
                    <select className="form-control" name="region">
                        <option value="Connecticut">Connecticut</option>
                        <option value="Washington DC">Washington DC</option>
                        <option value="Los Angelas">Los Angelas</option>
                        <option value="Missouri">Missouri</option>
                    </select>
                </div>
                */}
      {/* <div className="col-md-6 form-group">
                    <label>Longitude<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                    <input type="text" name="lng" id="lngVal" value={currentPos.lng} className="form-control" placeholder="Longitude" />
                </div>
                <div className="col-md-6 form-group">
                    <label>Latitude<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                    <input type="text" name="lat" id="latVal" value={currentPos.lat} className="form-control" placeholder="Latitude"  />
                </div> */}
    </Fragment>
  );
}

export default Locationtab1;
