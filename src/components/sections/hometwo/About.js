import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [about, setAbout] = useState([]);

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async ()=>{
    let res = await axios.get(`${process.env.REACT_APP_API_URL}abouts/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`);
    setAbout(res.data[0].about_description.split('*'));
    console.log(res.data[0].about_description.split('*'));
  }

  return (
    <div className="section"> 
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-lg-30 acr-dots-wrapper acr-single-img-wrapper">
            <img src={process.env.PUBLIC_URL + "/assets/img/listings-list/3.jpg"} alt="img" />
            <div className="acr-dots" />
          </div>
          <div className="col-lg-6">
            <div className="section-title-wrap mr-lg-30">
              <h5 className="custom-primary">About Us</h5>
              <h2 className="title">We are a Real Estate Technology - Proptech Startup</h2>
              {about.map((a)=>
                <p className="subtitle">{a}</p>
              )}
              {/* <Link to="/listing-map" className="btn-custom">Browse Listings</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;