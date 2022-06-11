import axios from "axios";
import React, { useState } from "react";
import h71banner from '../../../assets/img/demo/h71-banner.png'
import './JoinAsTrainer.css'

const JoinAsTrainer2 = ({ clsmodal }) => {
  // const FormStepOne = ({postdata,setpostdata,clsmodal})=> {

  const [postdata, setpostdata] = useState("");

  const [formval, setformval] = useState("");
  const [formpost, setformpost] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setpostdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    //console.log(postdata)
    postdata.contact_name === ""
      ? setformval("warning")
      : postdata.contact_email === ""
      ? setformval("warning")
      : postdata.contact_phone === ""
      ? setformval("warning")
      : postdata.contact_language === ""
      ? setformval("warning")
      : postdata.contact_experience === ""
      ? setformval("warning")
      : postdata.contact_message === ""
      ? setformval("warning")
      : sendData();
  };

  const sendData = async () => {
    await axios
      .post(
        `${process.env.REACT_APP_API_URL}contacts/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,
        postdata
      )
      .then((res) => setformpost(res.data))
      .catch((err) => console.log(err));
    setpostdata({
      contact_name: "",
      contact_phone: "",
      contact_email: "",
      contact_message: "",
    });
    setformval("yes");
  };

  return (
    <div className="banner2">
      <div style={{background:"#fff"}} className="container comment-form mb-5 p-5 pt-5 w-50 rounded">
        <h3>Become a trainer</h3>
        <h5 className="mb-5">Please share your details we will contact you</h5>
        <h5>
          {formval === "yes" ? null : formval === "warning" ? (
            <h5 style={{ color: "orange" }}>Please enter all fields..</h5>
          ) : null}
        </h5>
        <form onSubmit={handleClick}>
          <div className="row">
            <div className="col-md-12 form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="contact_name"
                value={postdata.contact_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="contact_email"
                value={postdata.contact_email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Phone Number</label>
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                name="contact_phone"
                value={postdata.contact_phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Language</label>
              <input
                type="text"
                className="form-control"
                placeholder="You Languages"
                name="contact_language"
                value={postdata.contact_language}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-12 form-group">
              <label>Experience</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your Experiences"
                name="contact_experience"
                value={postdata.contact_experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-custom primary">
            Submit
          </button>
          {/* <button className="btn-custom primary" style={{marginLeft:"10rem"}} onClick={()=>clsmodal()}>Cancel</button> */}
          {formval === "warning" ? null : formpost.status === "success" ? (
            <h6 style={{ color: "green", marginTop: "5px" }}>
              Thank you for contacting us, We will reply you back shortly.
            </h6>
          ) : formpost.status === "error" ? (
            <h6 style={{ color: "orange", marginTop: "5px" }}>
              Please Try Again After Sometime.
            </h6>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default JoinAsTrainer2;
