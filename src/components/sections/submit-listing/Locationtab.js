import React, { useState, useEffect, Fragment } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMapEvents,
  useMap,
} from "react-leaflet";

function Locationtab(props) {
  const [currentPos, setCurrentPos] = useState({ lat: "", lng: "" });

  function MyComponent() {
    const map = useMapEvents({
      click: (e) => {
        setCurrentPos(e.latlng);
        props.getlatlngdata(e.latlng);
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
    props.getAddressdata(e.target.value);
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
          center={props.center}
        >
          {props.changecenter && <ChangeView center={props.center} zoom={10} />}
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <MyComponent />
          {currentPos && (
            <CircleMarker
              center={currentPos}
              radius={5}
              pathOptions={{ color: "blue" }}
            >
              {/*<Popup position={this.state.currentPos}>
                            Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                        </Popup>*/}
            </CircleMarker>
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

export default Locationtab;
