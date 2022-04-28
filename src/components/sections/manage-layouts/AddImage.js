import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import { useRef } from "react";
import "leaflet-imageoverlay-rotated";

export default function AddImageToMap() {
  const customMarker = L.icon({
    iconUrl:
      process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
    iconSize: [22, 22],
    iconAnchor: [20, 5],
  });

  const map = useMap();
  const [image, setImage] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [imageOpacity, setImageOpacity] = useState(0.8);
  const [file, setFile] = useState("");
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    console.log("Image UseEfeect");
  }, [image]);
  const addImage = (imgName) => {
    if (image && markers.length > 0) {
      map.removeLayer(image);
      markers.forEach((marker) => {
        map.removeLayer(marker);
      });
      if (file) {
        setFile("");
      }
    }

    console.log("add image");
    //4 control points
    let point2 = L.latLng(
        map.getBounds().getNorthEast().lat,
        map.getBounds().getNorthEast().lng
      ),
      point1 = L.latLng(
        map.getBounds().getNorthWest().lat,
        map.getBounds().getNorthWest().lng
      ),
      point3 = L.latLng(
        map.getBounds().getSouthWest().lat,
        map.getBounds().getSouthWest().lng
      );

    //markers for each control point and add them to map
    let marker1 = L.marker(point1, {
        icon: customMarker,
        draggable: true,
      }).addTo(map),
      marker2 = L.marker(point2, {
        icon: customMarker,
        draggable: true,
      }).addTo(map),
      marker3 = L.marker(point3, {
        icon: customMarker,
        draggable: true,
      }).addTo(map);

    //bounds of map
    let bounds = new L.LatLngBounds(point1, point2).extend(point3);
    map.fitBounds(bounds);

    let overlay = L.imageOverlay.rotated(imgName, point1, point2, point3, {
      opacity: imageOpacity,
      interactive: true,
      attribution:
        "Historical building plan &copy; <a href='http://www.ign.es'>Instituto Geográfico Nacional de España</a>",
    });

    function repositionImage() {
      overlay.reposition(
        marker1.getLatLng(),
        marker2.getLatLng(),
        marker3.getLatLng()
      );
    }

    marker1.on("drag dragend", repositionImage);
    marker2.on("drag dragend", repositionImage);
    marker3.on("drag dragend", repositionImage);

    // let c = overlay.getCanvas2DContext();

    map.addLayer(overlay);
    setMarkers([marker1, marker2, marker3]);
    setImage(overlay);
  };
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0]; // accesing file
    if (["png","jpg","jpeg"].includes(file.name.split(".")[1].toLowerCase())) {
      let imagURL = URL.createObjectURL(file);
      addImage(imagURL);
      setFile(e.target.value);
    } else {
      alert(
        "Invalid image format. Please choose valid format like png, jpeg, jpg,....etc"
      );
    }
  };

  const handleChangeOpacity = (e) => {
    let opacityValue = e.target.value;
    image.setOpacity(opacityValue);
    setImageOpacity(opacityValue);
  };
  const handleRemoveLayer = () => {
    if (image && markers.length > 0) {
      map.removeLayer(image);
      markers.forEach((marker) => {
        map.removeLayer(marker);
      });
      setMarkers([]);
      setImage(null);
      setImageOpacity(0.8);
      setFile("");
    }
  };
  return (
    <div style={{zIndex: "1000", position:"absolute", bottom:"15vh", left:"1vw"}}>
      {image ? (
        <>
          <input
            type="range"
            min="0"
            name="imageOpacity"
            max="1"
            step="0.1"
            value={imageOpacity}
            className="btn btn-secondary"
            onChange={handleChangeOpacity}
            style={{ padding: "1vw" }}
          />
          <br></br>
          <button onClick={handleRemoveLayer} className="btn btn-outline-danger">
            Remove Image
          </button>
        </>
      ) : (
        <>
          <span
            onClick={handleClick}
            title="Add file"
            className="btn btn-custom"
          >
            Add Image
          </span>

          <input
            type="file"
            
            value={file}
            ref={hiddenFileInput}
            onChange={handleUploadImage}
            style={{ display: "none" }}
            accept="image/*"
          />
        </>
      )}
    </div>
  );
}
