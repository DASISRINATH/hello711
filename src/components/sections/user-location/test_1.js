import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

// import Header from "components/Header";
import cities from "./cities.json";
// import ExternalInfo from "components/ExternalInfo";

// const markerIcon = new L.Icon({
//     iconUrl: require("resources/images/marker.png"),
//     iconSize: [40, 40],
//     iconAnchor: [17, 46], //[left/right, top/bottom]
//     popupAnchor: [0, -46], //[left/right, top/bottom]
// });

const MarkersMap = () => {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();

    return (
        <>
            {/* <Header title="React Leaflet Map Example" /> */}

            {/* <ExternalInfo page="leafletMarker" /> */}

            <div className="row">
                <div className="col text-center">
                    <h2>React-leaflet - Adding Markers to react leaflet</h2>
                    <p>Loading basic map using layer from maptiler</p>
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            {/* <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            /> */}


                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {cities.map((city, idx) => (
                                <Marker
                                    position={[city.lat, city.lng]}
                                    // icon={markerIcon}
                                    key={idx}
                                >
                                    <Popup>
                                        <b>
                                            {city.city}, {city.country}
                                        </b>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MarkersMap;
