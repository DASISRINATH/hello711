import React, { useState, useEffect, Fragment, useContext } from "react";
import { UserContext } from "./../../../context/LoginContext";
import "react-responsive-modal/styles.css";
// import "./css/styles.css";
import { Modal } from "react-responsive-modal";
import { Link, Redirect } from "react-router-dom";
import Locationtab1 from "./Locationtab1";
import "./css/modalStyles.css";
import { submitContext } from "./../../../context/SubmitListContext";

const MapModal = () => {
  const [open, setOpen] = React.useState(false);
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

  return (
    <>
      {latitude && longitude ? (
        <div onClick={() => setOpen(true)} className="editLocation">
          Edit
        </div>
      ) : (
        <span className="modal-edit" onClick={() => setOpen(true)}>
          + Add location on the map
        </span>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "mapModalOverlay",
        }}
      >
        <Locationtab1 />
        <div style={{ marginBottom: "4px" }} className="col-md-12 form-group">
          {/* <div className="saveLocation">Save</div> */}
          <div onClick={() => setOpen(false)} className="closeLocation">
            Close
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MapModal;
