import React, { Component, useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "./../../../context/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import Registerform from "./Registerform";

import { Link, useLocation } from "react-router-dom";


function Loginform(){ 

  const {isLoggedIn,setIsLoggedIn,loginuserId,loginuserData,fetchLoginUserData, businessLoginAction} = useContext(UserContext);

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [successmsg, setSuccessmsg] = useState('')
  const [errormsg, setErrormsg] = useState('')

  const onSubmit = (e) =>{
    e.preventDefault();

    setSuccessmsg('')
    setSuccess(false)
    setError(false)
    setErrormsg('')  
    setLoading(true)

    var loginData = {
        email:email,
        password:password,
    };

      //fetch("http://localhost/prod-rs-web-master/index.php/rest/business/login/api_key/rappikey/", {
      fetch(process.env.REACT_APP_API_URL+"business/login/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/", {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }, 
        body: JSON.stringify(loginData)
      })
      .then(response => response.json())
      .then(data => {if(data.status !== 'error'){
                setIsLoggedIn(false)
                setLoading(false)
                setSuccess(true)
                setSuccessmsg('Login Success.')
                businessLoginAction(data)
                setEmail('')
                setPassword('')
                //localStorage.setItem('businessUserLogin', JSON.stringify({businessLoginStatus:true,}));
            }else{
                setLoading(false)
                setError(true)  
                setErrormsg(data.message)                  
            }})
      .catch(error => {
            setLoading(false)
            setError(true)
            setErrormsg('Operation failed. Try again later') 
        });     

  }
 
  
  return (
    <>
      <div className="section"> 
        <form onSubmit={onSubmit}>
            {success && <h5 className="text-success">{successmsg}</h5>}
            {error && <h5 className="text-danger">{errormsg}</h5>}
            <div className="auth-text">
                <h3>Login Into Business</h3>
                {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p> */}
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control form-control-light" placeholder="Enter Email" value={email} name="email" onChange={e => setEmail(e.target.value)}  />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control form-control-light" placeholder="Password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
            </div>
            {/* <div className="form-group">
                <Link to="#" className="forgot-password">Forgot Password?</Link>
            </div> */}
            <button type="submit" className="btn-custom secondary btn-block">Login</button>
            {loading && <h5 className="text-primary">Loading...</h5>}
            {/* <p className="text-center my-3">Don't have an account? <Link>Create One</Link> </p> */}
        </form> 
      </div> 
    </>
  );
};

export default Loginform;
