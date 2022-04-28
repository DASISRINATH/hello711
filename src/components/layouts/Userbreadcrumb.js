import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../../context/LoginContext";
import Profileimg from "./../sections/profile/Profileimg";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import edit_image_icon from "../../assets/img/users_uncroped/circular_upload_button.png";
import "../../assets/css/style.css";

const Userbreadcrumb = (props) => {
  const { isLoggedIn, loginuserId, loginuserData, fetchLoginUserData } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchLoginUserData(loginuserId);
  }, []);

  return (
    <>
      {/* <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-2.jpg)" }}> */}
      <div className="subheader subheader-2 user-subheader bg-cover bg-center">
        <div className="container">
          <div className="media">
            <Link onClick={() => setOpen(true)}>
              <img
                src={
                  loginuserData !== null
                    ? loginuserData.user_profile_photo === ""
                      ? process.env.PUBLIC_URL +
                        "/assets/img/people/profile_ex.jpg"
                      : process.env.REACT_APP_BASE_URL+"/uploads/" +
                        loginuserData.user_profile_photo
                    : process.env.PUBLIC_URL +
                      "/assets/img/people/profile_ex.jpg"
                }
                alt="Click here to upload image.."
              />
              <img className="edit_image_icon" src={edit_image_icon} alt="" />
            </Link>
            <div className="media-body">
              <h3 className="text-white">
                {loginuserData !== null && loginuserData.user_name}
              </h3>
              <span className="user-email">
                {loginuserData !== null && loginuserData.user_phone}
              </span>
            </div>
            <Link to="/submit-listing" className="btn-custom secondary mr-0">
              Submit Listing <i className="fas mr-0 fa-plus" />{" "}
            </Link>
          </div>
        </div>
      </div>

      {/*======Profile Image Upload modal======*/}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: "customOverlay",
        }}
      >
        <Profileimg clsmodal={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default Userbreadcrumb;
