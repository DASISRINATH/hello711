import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

// import Header from "components/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import useGeoLocation from "./../../hooks/useGeoLocation";
import useGeoLocation from "../../../hooks/useGeoLocation";
// import ExternalInfo from "components/ExternalInfo";

const markerIcon = new L.Icon({
  iconUrl: require("../../../../src/assets/img/demo/risee.png"),
  iconSize: [40, 40],
  iconAnchor: [17, 46], //[left/right, top/bottom]
  popupAnchor: [0, -46], //[left/right, top/bottom]
});

const MarkersMap = () => {
  const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const location = useGeoLocation();

  const showMyLocation = () => {
    alert(location.coordinates.lat)

    if (location.loaded && !location.error) {
      // map.flyTo(
      //   [location.coordinates.lat, location.coordinates.lng],
      //   ZOOM_LEVEL,
      //   { animate: true }
      setMap([48.864716, 2.349014], 10, { animate: true });

      alert(map)


    } else {
      alert(location.error.message);
    }


  };

  return (
    <>
      {/* <Header title="React Leaflet Map Example" />

      <ExternalInfo page="leafletCurrentLocation" /> */}

      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Get user location</h2>
          <p>Get user location and highlight it with a marker</p>
          <div className="col">
            <MapContainer
              className="markercluster-map map"
              // center={[38.907, -77.04]}
              center={[
                17.361,
                78.475
              ]}
              zoom={12}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {/* 
              {location.loaded && !location.error && (
                <Marker
                  icon={markerIcon}
                  position={[
                    location.coordinates.lat,
                    location.coordinates.lng,
                  ]}
                ></Marker>


              )} */}

              {/* <Marker
                icon={markerIcon}
                position={[
                  10,
                  50,
                ]}
              ></Marker> */}

            </MapContainer>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <button className="btn btn-primary" onClick={showMyLocation}>
            {/* Locate Me <FontAwesomeIcon icon="globe" /> */}
            Locate Me
          </button>
        </div>
      </div>
    </>
  );
};

export default MarkersMap;
