import React, { createContext, useState, useEffect } from "react";
//import API_URL from "./../baseAxios";
import locations from "./../data/location.json";


export const LocationContext = createContext({})

export default function SelectcityContext({ children }) {
	const [locationName, setLocationName] = useState('Hyderabad');
    const [selectedLocation, setSelectedLocation] = useState('itm_loca7b66748e03d457e976ca63a50e1bde0');
    const [center, setCenter] = useState({ lat: 17.385000, lng: 78.486702 });
    const [zoomLevel, setZommLevel] = useState(11);
    const [offset, setOffset] = useState(0)
    const [items, setItems] = useState([])
    const [s, setS] = useState(false);

	const checkCenterZoom = () =>{
		setOffset(0);
		setItems([]);
		const found = locations.find(city=>city.id===selectedLocation);
		setCenter({ lat: found.lat, lng: found.lng });
		setZommLevel(11);  
        setS(true);
	}

	const updateItemState = () =>{
		setOffset(0);
		setItems([]);
        setS(true);
	}

	return (
		<LocationContext.Provider
			value={{
				locationName,
				setLocationName,
				selectedLocation,
                setSelectedLocation,
                center,
                setCenter,
                zoomLevel,
                setZommLevel,
				updateItemState,
				offset, 
				setOffset,
				items, 
				setItems,
				checkCenterZoom,     
				s,
				setS 
			}}
		>
			{children}
		</LocationContext.Provider>
	)
}