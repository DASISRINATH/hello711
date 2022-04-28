import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, CircleMarker, Popup, Circle } from 'react-leaflet';
import "./listingmap.css";
require('leaflet/dist/leaflet.css');
require('react-leaflet-markercluster/dist/styles.min.css');

const Listingmap = ({lat,lng}) => {
    const [position,setPosition] = useState([lat,lng]);
    return (
        <div className="myMap">
            
            <MapContainer style={{width: "100%",height: "100%"}} center={position} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle 
                  center={{lat: lat, lng: lng}}
                  fillColor="blue" 
                  radius={200}/>
            </MapContainer>
        </div>
    )
}

export default Listingmap
