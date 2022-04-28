import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../../../context/LoginContext";
import axios from "axios";

const Profileimg = (props) => {
  const { isLoggedIn, loginuserId, fetchLoginUserData } =
    useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState();
  const [fileCheck, setfileCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const fileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  function fileCheckFunction() {
    setLoading(false);
    setfileCheck('Please Click on "Choose File"');
  }
  // console.log(fileCheckFunction);

  function postFunction() {
    const fd = new FormData();
    fd.append("file", selectedFile, selectedFile.name);
    fd.append("user_id", loginuserId);
    fd.append("platform_name", "web");
    axios
      .post(
        process.env.REACT_APP_API_URL+"images/upload/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/",
        fd
      )
      .then((res) => {
        if (res.status === 200) {
          fetchLoginUserData(loginuserId);
          setLoading(false);
          props.clsmodal();
        } else {
          setLoading(false);
          setErrorMsg(true);
        }
      });
  }

  const fileUpload = () => {
    //console.log(selectedFile.name);
    //console.log(selectedFile);
    setErrorMsg(false);
    setLoading(true);
    !selectedFile ? fileCheckFunction() : postFunction();
  };

  return (
    <>
      <div className="my-5">
        {loading && (
          <div style={{ width: "400px" }}>
            <h5 className="text-center text-primary">Please Wait...</h5>
          </div>
        )}
        {errorMsg && (
          <div style={{ width: "400px" }}>
            <h5 className="text-center text-danger">
              Operation Failed try Again.
            </h5>{" "}
          </div>
        )}
        {!loading && !errorMsg && (
          <div>
            <h4>Upload Profile Image</h4>
            <p style={{ color: "red" }}>{fileCheck}</p>
            <input type="file" onChange={fileSelect} />
            <button onClick={fileUpload}>Upload</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profileimg;
