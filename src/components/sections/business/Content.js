import React, { Component, useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "./../../../context/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import Formsection from "./Formsection";
import Slider from 'react-slick';
import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";


const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    dots: true,
    dotsClass: "d-flex slick-dots",
}

const Content = (props) => {

  const {isLoggedIn,setIsLoggedIn,loginuserId,loginuserData,fetchLoginUserData, logoutAction} = useContext(UserContext);

  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if(isLoggedIn){
       logoutAction()
    }
  },[]);
 
  
  return (

    <div className="section">
        <div className="container-fluid">
            <div className="acr-auth-container">
                <div className="acr-auth-bg">
                    <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
                        {images.map((item, i) => (
                            <div key={i}>
                                <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} >
                                    <div className="acr-auth-quote">
                                        <h6>{item.title}</h6>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="acr-auth-content">
                    <Formsection />
                </div>
            </div>
        </div>           
    </div>

  );
};

export default Content;
