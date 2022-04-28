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
  const { latitude, longitude, center } = useContext(submitContext);
  return (
    <Fragment>
      <div className="form-group submit-listing-map">
        <MapContainer
          style={{ borderRadius: "8px", overflow: "hidden" }}
          zoom={12}
          center={center}
        >
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {latitude && longitude && (
            <CircleMarker
              center={{ lat: latitude, lng: longitude }}
              radius={5}
              pathOptions={{ color: "blue" }}
            ></CircleMarker>
          )}
        </MapContainer>
      </div>
    </Fragment>
  );
}

export default Locationtab1;
