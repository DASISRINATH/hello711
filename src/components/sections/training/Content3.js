import React,{ useState, useEffect,Fragment, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import imgOne from './images/hero-image-long-webinar-500.png';
import img2 from './images/web-testimonial-2.jpg';
import img1 from './images/web-testimonial-1.jpg';
import './contentStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
const Content = () => {
       
  return (
    <>
    <div>
        {/* <div className="section-1">
            <div className="container">
                <h2>Webnow</h2>
            </div>
        </div> */}
        <div className="section-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 py-3">
                        <div className="my-5">
                            <div>
                                <h1>Start A Business In Just 1 Hour.</h1>
                            </div>
                            <div>
                                <p style={{fontSize:"18px",letterSpacing:"0.5px"}}>
                                    Join the free session with Nathan Salvatore and learn how to quickly master your business
                                    skills with your own capabilities. Become a succesful entrepreneur and run your own business !
                                </p>
                            </div>
                            <div>
                                <div className="row">
                                    <div className="col-md-6 py-2">
                                       <span className="ml-2 mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 0 32 32" class="svg-blue c mB XC LD"><path d="M 9 4 L 9 5 L 5 5 L 5 27 L 27 27 L 27 5 L 23 5 L 23 4 L 21 4 L 21 5 L 11 5 L 11 4 Z M 7 7 L 9 7 L 9 8 L 11 8 L 11 7 L 21 7 L 21 8 L 23 8 L 23 7 L 25 7 L 25 9 L 7 9 Z M 7 11 L 25 11 L 25 25 L 7 25 Z M 13 13 L 13 15 L 15 15 L 15 13 Z M 17 13 L 17 15 L 19 15 L 19 13 Z M 21 13 L 21 15 L 23 15 L 23 13 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z"></path></svg>
                                       </span> 
                                       <span  className=" mx-1font-weight-light" style={{fontSize:"18px", letterSpacing:"1px",color:"black"}}> March 24th 2020</span>
                                    </div>
                                    <div className="col-md-6 py-2">
                                        <span className="ml-2 mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" viewBox="0 0 32 32" class="svg-blue c mB XC LD"><path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z"></path></svg>
                                        </span>
                                        <span className=" mx-1 font-weight-light" style={{fontSize:"18px", letterSpacing:"1px",color:"black"}}>Starts 18:00 IST</span>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className="col-md-6 py-3">
                        <div className="form-div">
                            <Form>
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label><span className="font-weight-bold" style={{fontSize:"16px"}}>Full Name</span></Form.Label>
                                <Form.Control type="text"  />
                              </Form.Group>
    
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label><span className="font-weight-bold" style={{fontSize:"16px"}}>E-mail ID</span></Form.Label>
                                <Form.Control type="email" />
                              </Form.Group>
    
                              <Form.Group controlId="formBasicEmail">
                                <Form.Label><span className="font-weight-bold" style={{fontSize:"16px"}}>Zip Code</span></Form.Label>
                                <Form.Control type="text" />
                              </Form.Group>
    
                              <Button variant="primary" type="submit">
                                REGISTER NOW
                              </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-3">
            <div className="container">
                <div className="row" /*style={{display:"flex",flexFlow:"column-reverse"}} */>
                    <div className="col-md-6 order-md-2">
                        <div className="mt-5">
                            <div>
                                <h3>Meet your Host</h3>
                                <p style={{fontSize:"18px",letterSpacing:"0.5px"}}>
                                    Nathan Salvator is an American businessman, investor, speaker, consultant, syndicated columnist, author,
                                    and television personality.Salvatore is a columnist for The Daily Review, and Redbook. He has written several 
                                    books, and has been featured on Shark Tank, and CNN's Today show.
                                </p>
                            </div>
                            <div>
                                <h4>What you’ll learn.</h4>
                                <div>
                                    <div>
                                        <div style={{float:"left",marginRight:"12px"}}>
                                            <svg version="1.1" className="svg-s" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="e oB ZC ND">
                                            <title>check</title>
                                            <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
                                            </svg>
                                        </div>
                                        <div style={{fontSize:"16px",letterSpacing:"0.5px"}}>How to spot succesful business opportunities</div>
                                    </div>
                                    <div>
                                        <div style={{float:"left",marginRight:"12px"}}>
                                            <svg version="1.1" className="svg-s" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="e oB ZC ND">
                                            <title>check</title>
                                            <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
                                            </svg>
                                        </div>
                                        <div style={{fontSize:"16px",letterSpacing:"0.5px"}}>Raising capital for your business</div>
                                    </div>
                                    <div>
                                        <div style={{float:"left",marginRight:"12px"}}>
                                            <svg version="1.1" className="svg-s" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="e oB ZC ND">
                                            <title>check</title>
                                            <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
                                            </svg>
                                        </div>
                                        <div style={{fontSize:"16px",letterSpacing:"0.5px"}}>People and Inventory management</div>
                                    </div>
                                    <div>
                                        <div style={{float:"left",marginRight:"12px"}}>
                                            <svg version="1.1" className="svg-s" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="e oB ZC ND">
                                            <title>check</title>
                                            <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
                                            </svg>
                                        </div>
                                        <div style={{fontSize:"16px",letterSpacing:"0.5px"}}>Ideas to propel your current business</div>
                                    </div>
                                    <div>
                                        <div style={{float:"left",marginRight:"12px"}}>
                                            <svg version="1.1" className="svg-s" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="e oB ZC ND">
                                            <title>check</title>
                                            <path d="M8.294 16.998c-0.435 0-0.847-0.203-1.111-0.553l-3.573-4.721c-0.465-0.613-0.344-1.486 0.27-1.951 0.615-0.467 1.488-0.344 1.953 0.27l2.351 3.104 5.911-9.492c0.407-0.652 1.267-0.852 1.921-0.445s0.854 1.266 0.446 1.92l-6.984 11.21c-0.242 0.391-0.661 0.635-1.12 0.656-0.022 0.002-0.042 0.002-0.064 0.002z"></path>
                                            </svg>
                                        </div>
                                        <div style={{fontSize:"16px",letterSpacing:"0.5px"}}>Keys to a successful business empire.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6  order-md-1">
                        <div>
                            <img src={imgOne} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4 my-2 text-center text-color-white">
                        <span className="mx-2">
                             <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" viewBox="0 0 32 32" class="svg-blue svg-blue-bg c mB XC LD"><path d="M 9 4 L 9 5 L 5 5 L 5 27 L 27 27 L 27 5 L 23 5 L 23 4 L 21 4 L 21 5 L 11 5 L 11 4 Z M 7 7 L 9 7 L 9 8 L 11 8 L 11 7 L 21 7 L 21 8 L 23 8 L 23 7 L 25 7 L 25 9 L 7 9 Z M 7 11 L 25 11 L 25 25 L 7 25 Z M 13 13 L 13 15 L 15 15 L 15 13 Z M 17 13 L 17 15 L 19 15 L 19 13 Z M 21 13 L 21 15 L 23 15 L 23 13 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z"></path></svg>
                        </span> 
                        <span className="mx-2 font-weight-light" style={{fontSize:"18px", letterSpacing:"1.5px"}}>MARCH 24TH 2020</span>
                    </div>
                    <div className="col-md-4 my-2  text-center text-color-white">
                        <span className="mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" width="40px" viewBox="0 0 32 32" class="svg-blue svg-blue-bg c mB XC LD"><path d="M 16 4 C 9.382813 4 4 9.382813 4 16 C 4 22.617188 9.382813 28 16 28 C 22.617188 28 28 22.617188 28 16 C 28 9.382813 22.617188 4 16 4 Z M 16 6 C 21.535156 6 26 10.464844 26 16 C 26 21.535156 21.535156 26 16 26 C 10.464844 26 6 21.535156 6 16 C 6 10.464844 10.464844 6 16 6 Z M 15 8 L 15 17 L 22 17 L 22 15 L 17 15 L 17 8 Z"></path></svg>
                        </span>
                        <span className="mx-2 font-weight-light" style={{fontSize:"18px", letterSpacing:"1.5px"}}>STARTS 18:00 IST</span>
                    </div>                    
                </div>
                <div className="section-subtitle">
                    <h3 className="text-center text-color-white">Limited Spots Available.Register Soon !</h3>
                </div>
                <div className="row text-color-light-blue">
                    <div className="col-3 text-center">
                        <div className="countdown-amount">0</div>
                        <div className="countdown-period font-weight-light" style={{fontSize:"18px"}}>Days</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className="countdown-amount">0</div>
                        <div className="countdown-period font-weight-light" style={{fontSize:"18px"}}>Hours</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className="countdown-amount">0</div>
                        <div className="countdown-period font-weight-light" style={{fontSize:"18px"}}>Minutes</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className="countdown-amount">0</div>
                        <div className="countdown-period font-weight-light"  style={{fontSize:"18px"}}>Seconds</div>
                    </div>  
                </div>
                <div className="text-center mt-5 mb-3">
                    <Button variant="outline-light" className="px-5 py-2 font-weight-light" style={{fontSize:"18px", letterSpacing:"2px"}} >REGISTER NOW</Button>
                </div>
            </div>
        </div>
        <div className="section-5 mt-3 mb-5">
            <div className="container">
                <div className="section-title"><h3 className="text-center">Praise for the Speaker</h3></div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img src={img2} height="150px" width="150px" />
                        </div>
                        <div className="text-center">
                            <p style={{fontSize:"18px",letterSpacing:"0.5px"}}>" Nathan is simply a wonder.He condenses years of industry knowledge into a clean simple business model.It gave me the courage to start my own business and the journey has been simply superb. "</p>
                        </div>
                        <div className="text-center">
                            <p className="my-1" style={{fontSize:"18px",letterSpacing:"0.5px",color:"black"}}>Chelsea Balmer</p>
                            <p className="my-1" style={{fontSize:"18px",letterSpacing:"0.5px"}}>Owner at Truffle</p> 
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-center">
                            <img src={img1} height="150px" width="150px"/>
                        </div>
                        <div className="text-center">
                            <p style={{fontSize:"18px",letterSpacing:"0.5px"}}>“ I struggled to raise capital for my business idea until I came across this webinar.Nathan is sharp and to the point he gives you solid advise.Aspiring entrepreneurs will benefit a great deal from this. ”</p>
                        </div>
                        <div className="text-center">
                            <p className="my-1" style={{fontSize:"18px",letterSpacing:"0.5px",color:"black"}}>Steven Smith</p>
                            <p className="my-1" style={{fontSize:"18px",letterSpacing:"0.5px"}}>COO Hooli</p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-6">
            <div className="container">
                <div className="section-title">
                    <h3 className="text-center">Webinar Essentials</h3>
                </div>
                <div className="row text-center">
                    <div className="col-md-3 ">
                        <div>
                            <div className="svg-div mx-auto mb-4">
                                <a>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-white svg-s" viewBox="0 0 32 32"><path d="M 5 5 L 5 27 L 27 27 L 27 5 L 5 5 z M 7 7 L 25 7 L 25 25 L 7 25 L 7 7 z M 11 11 L 11 21 L 13 21 L 13 11 L 11 11 z M 15 11 L 15 13 L 21 13 L 21 11 L 15 11 z M 15 15 L 15 17 L 21 17 L 21 15 L 15 15 z M 15 19 L 15 21 L 21 21 L 21 19 L 15 19 z"></path></svg>
                                    </span>
                                </a>
                            </div>    
                        </div>
                        <div>
                            <h5>Can I get slides Copy</h5>
                        </div>
                        <div>
                            <p>Yes we post all of our presentations online at Slideshare.net</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div>
                            <div className="svg-div mx-auto mb-4">
                                <a>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-white svg-s" viewBox="0 0 32 32"><path d="M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z"></path></svg>
                                    </span>
                                </a>
                            </div>    
                        </div>
                        <div>
                            <h5>How do I login ?</h5>
                        </div>
                        <div>
                            <p>The link to the login page should be sent to you in an email.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div>
                            <div className="svg-div mx-auto mb-4">
                                <a>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-white svg-s" viewBox="0 0 32 32"><path d="M 16 5 C 12.144531 5 9 8.144531 9 12 C 9 14.410156 10.230469 16.550781 12.09375 17.8125 C 8.527344 19.34375 6 22.882813 6 27 L 8 27 C 8 22.570313 11.570313 19 16 19 C 20.429688 19 24 22.570313 24 27 L 26 27 C 26 22.882813 23.472656 19.34375 19.90625 17.8125 C 21.769531 16.550781 23 14.410156 23 12 C 23 8.144531 19.855469 5 16 5 Z M 16 7 C 18.773438 7 21 9.226563 21 12 C 21 14.773438 18.773438 17 16 17 C 13.226563 17 11 14.773438 11 12 C 11 9.226563 13.226563 7 16 7 Z"></path></svg>
                                    </span>
                                </a>
                            </div>    
                        </div>
                        <div>
                            <h5>Who should attend?</h5>
                        </div>
                        <div>
                            <p>Individuals looking to start their own business & business owners.</p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div>
                            <div className="svg-div mx-auto mb-4">
                                <a>
                                    <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-white svg-s" viewBox="0 0 32 32"><path d="M 9 5.15625 L 9 26.84375 L 10.53125 25.84375 L 25.84375 16 L 10.53125 6.15625 Z M 11 8.8125 L 22.15625 16 L 11 23.1875 Z"></path></svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5>Recording</h5>
                        </div>
                        <div>
                            <p>We will be recording the video and will post it later.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer className="acr-footer footer-2">
        {/* Footer Middle End */}
        {/* Footer Bottom Start */}
        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                <div className="col-lg-7">
                        <p className="m-0">© Copyright 2020 - <Link to="#">Hello71 </Link> All Rights Reserved.</p>
                    </div>
                    <div className="col-lg-5">
                    <ul className="social-media" style={{flexDirection:"row"}}>
                        <li> <a href="https://www.facebook.com/riseetech/" target="_blank"> <i className="fab fa-facebook-f" /> </a> </li>
                        <li> <a href="https://www.instagram.com/riseetech/" target="_blank"> <i className="fab fa-instagram" /> </a> </li>
                        {/* <li> <Link to="#"> <i className="fab fa-pinterest-p" /> </Link> </li> */}
                        <li> <a href="https://www.youtube.com/channel/UC6hj6GKbSTlH0EKEBh1Vu_A" target="_blank"> <i className="fab fa-youtube" /> </a> </li>
                        <li> <a href="https://twitter.com/riseetech"> <i className="fab fa-twitter" /> </a> </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
        {/* Footer Bottom End */}
    </footer>
    </>
  );
};
export default Content;