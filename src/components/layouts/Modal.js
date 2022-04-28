import React, { useState, useEffect, Fragment, useContext } from "react";
import { UserContext } from "./../../context/LoginContext";
import "react-responsive-modal/styles.css";
import "./css/modalstyle.css";
import { Modal } from "react-responsive-modal";
import Mobileinputform from "./Mobileinputform";
import Otpform from "./Otpform";
import Adduserinfomodal from "./Adduserinfomodal";
import Requirement from "./Requirement";
import { Link, Redirect } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

const Modalbox = (props) => {
  const { isLoggedIn } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [otpmodal, setOtpmodal] = React.useState({
    status: false,
    otpvrfytoken: [],
  });
  const [addusernamemodal, setAddusernamemodal] = React.useState(false);
  const [loginuserdata, setLoginuserdata] = React.useState();

  const Otp = (confirmationResult) => {
    setOtpmodal({ status: true, otpvrfytoken: confirmationResult });
  };

  const timeOut = () => {
    setOpen(false);
    setOtpmodal({ status: false, otpvrfytoken: "" });
  };

  return (
    <>
      {props.btnType === "submit" ? (
        <span onClick={() => setOpen(true)} className="submit-button">
          Submit
        </span>
      ) : props.btnType === "create" ? (
        props.icon === "" ? (
          <span style={{ fontSize: "15px" }}>{props.btnText}</span>
        ) : (
          <span onClick={() => setOpen(true)} className="create-dropdown-span">
            {" "}
            {props.icon} {props.btnText}
          </span>
        )
      ) : props.btnText === "Login" ? (
        <li className="menu-item">
          {" "}
          <Link onClick={() => setOpen(true)}>
            <i class={props.icon}></i> {props.btnText}
          </Link>{" "}
        </li>
      ) : props.btnText ? (
        <Link
          className="px-4 py-1"
          onClick={() => setOpen(true)}
          style={{ fontSize: "15px", color: "#424762" }}
        >
          <i class={props.icon} style={{ fontSize: "15px" }}></i>
          {props.btnText}
        </Link>
      ) : (
        <Link
          className={`${
            props.mb_view ? "login-mb-view" : ""
          } btn-custom primary`}
          onClick={() => setOpen(true)}
        >
          Login
          <i className="fas fa-user" style={{ fontSize: "15px" }} />{" "}
        </Link>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeOnOverlayClick={false}
        center
        classNames={{
          overlay: "customOverlay",
        }}
      >
        {otpmodal.status === true ? (
          <Otpform
            otpvrftoken={otpmodal.otpvrfytoken}
            timeOut={timeOut}
            clsmodal={() => setOpen(false)}
          />
        ) : (
          <Mobileinputform Otp={Otp} clsmodal={() => setOpen(false)} />
        )}
        {/*
        {(otpmodal.status == true &&
            <Otpform  otpvrftoken={otpmodal.otpvrfytoken} timeOut={timeOut} />)
        || (addusernamemodal == true &&
            <Adduserinfomodal loginuserdata={loginuserdata} clsmodal={clsmodal} />)
        ||
          <Mobileinputform Otp={Otp} />
        }*/}
      </Modal>
    </>
  );
};

export default Modalbox;
