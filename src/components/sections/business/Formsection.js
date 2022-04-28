import React, { Component, useRef, useState, useEffect, useContext } from "react";
//import { UserContext } from "./../../../context/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import Registerform from "./Registerform";
import Loginform from "./Loginform";

import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Tabs, Tab } from "react-bootstrap";


const Formsection = (props) => {

  //const {isLoggedIn,setIsLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);

  const [loginsection, setLoginsection] = useState(true)
  const [registersection, setRegistersection] = useState(false)


  const changeSection = (form)=>{
     if(form === 'login'){
      setLoginsection(true)
      setRegistersection(false)
     }

     if(form === 'register'){
      setLoginsection(false)
      setRegistersection(true)
     }
  }
 
  
  return (
    <>
      {loginsection &&
        <>
          <Loginform />
          <p className="text-center my-3">Don't have an account? <Link onClick={()=> changeSection('register')}>Create One</Link> </p>
        </>
      }
        {registersection && 
          <>
            <Registerform />
            <p className="text-center mb-0">Already have an account? <Link onClick={()=> changeSection('login')}>Login</Link> </p>
          </> 
        }


        {/* <Tabs defaultActiveKey="login" id="uncontrolled-tab-example"> 
            <Tab eventKey="login" title="Login">
              <Loginform />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Registerform />
            </Tab>
        </Tabs> */}
    </>
  );
};

export default Formsection;
