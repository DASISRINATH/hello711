import React, { Component, Fragment, useContext, useEffect, useState } from 'react';
import Banner from './Banner';
import Contactform from './Contactform';
import Bluecta from '../../layouts/Bluecta';
import Testimonials from './Testimonials';
import Clients from './Clients';
import Numbers from './Numbers'
import ContactUsModal from './ContactUsModal'
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../../context/LoginContext';
import { ItemsContext } from '../../../context/ItemsContext';
import Modalbox from "./Modalbox";

const Content = () => {

    const { fetchNewListing,homeItem,items,fetchItems } = useContext(ItemsContext);
    const [itemDatas,setItemDatas] = useState([]);
    const [viewMore,setViewMore] = useState(false);
    useEffect(() => {
        fetchItems()
        fetchNewListing();
        setItemDatas(homeItem);
        // console.log(homeItem);
        // console.log(itemDatas);
    },[])

    return (
        <Fragment>
            {/* <Banner/> */}
            {/* <Numbers /> */}
            
            <div className="hometwo-listings section section-padding pt-0">
                <div className="container">
                    <div className="section section-title-wrap text-center">
                            <h5 className="custom-primary">Our Ways</h5>
                            <h2 className="title">Simple & Easy Way to Learn New Language</h2>
                            <p className="subtitle">
                            Hello71 offers list of language study and training programs which are expertly designed to equip Individual Students and Professionals & Corporate.<br /> We provide a big pool of highly qualified language trainers and resources at one place.
                            </p>
                            
                            {/* <Link to="https://www.youtube.com/watch?v=TKnufs85hXk&t=1s" className="btn-custom popup-youtube"> <i className="m-0 fas fa-play" /> </Link> */}
                        </div>
                    <div className="hometwo-title">
                        {/* <span className="title">New Listings</span> */}
                        {/* <span onClick={() => setViewMore(true)} className="view_more">View More...</span> */}
                        <Link to="/properties">View More...</Link>
                    </div>
                    <div className="row">
                    {
                        items.slice(0,4).map(item => (
                        <div className="col-lg-3 col-md-4">
                            <div className="hometwo-itemC">
                                <img src={
                                item.default_photo.img_path === ""
                                  ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                                  : 'https://api.prod.online.risee.in/uploads/'+item.default_photo.img_path
                                } alt="img" />
                                <div className="hometwo-itemD">
                                    <div className="itemD-title">{item.title.length > 23 ? item.title.slice(0,19)+"..." : item.title}</div>
                                    {
                                        item.price_SqYard !== "0" ? 
                                        <div className="cost"> <span>₹ </span>{item.price_SqYard}/Sq. Yd </div> :
                                        item.price !== "0" && <div className="cost"> <span>₹ </span>{item.price}</div>
                                    }
                                    <div className="location">{item.item_location.name}</div>

                                </div>
                            </div>
                        </div>
                        ))
                    }

                    {/* {viewMore ? homeItem.map(item => (
                        <div className="mb-20 col-lg-3 col-md-4">
                            <div className="hometwo-itemC">
                                <img src={
                                item.default_photo.img_path === ""
                                  ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                                  : process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path
                                } alt="img" />
                                <div className="hometwo-itemD">
                                    <div className="itemD-title">{item.title.length > 23 ? item.title.slice(0,19)+"..." : item.title}</div>
                                    <div className="cost"> <span>₹</span>{item.item_price} </div>
                                    <div className="location">{item.item_location.name}</div>

                                </div>
                            </div>
                        </div>
                        
                    )) : homeItem.slice(0,4).map(item => (
                        <div className="col-lg-3 col-md-4">
                            <div className="hometwo-itemC">
                                <img src={
                                item.default_photo.img_path === ""
                                  ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                                  : process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path
                                } alt="img" />
                                <div className="hometwo-itemD">
                                    <div className="itemD-title">{item.title.length > 23 ? item.title.slice(0,19)+"..." : item.title}</div>
                                    <div className="cost"> <span>₹ </span>{item.item_price} </div>
                                    <div className="location">{item.item_location.name}</div>

                                </div>
                            </div>
                        </div>
                    ))} */}
                    </div>
                    <div class="pt-5 text-center">
                        <Link to="/" className="btn-custom">Browse Trainers</Link>
                    </div>
                </div>
                
            </div>
            {/* <div className="section pt-0">
                <Bluecta/>
            </div> */}
            {/* <div style={{marginTop:'-80px'}}>
                <Testimonials />
            </div> */}
            {/* <div className="section pt-0">
                <Clients/>
            </div> */}
            <Contactform/>
            <div class="bottom-fab-container">
                <div class="bottom-fab bottom-fab-icon-holder">
                <i class="fas fa-question"></i>
                </div>
            
                <ul class="fab-options">
                {/* <li>
                    <span class="fab-label">Live Chat</span>
                    <div class="bottom-fab-icon-holder">
                    <i class="fas fa-comments"></i>
                    </div>
                </li> */}
                <li onClick={(e) => {
                    // e.preventDefault();
                    e.target="_blank";
                    window.open('https://wa.me/918688932501?text=Please%20leave%20us%20your%20message%20.We%20will%20reply%20back%20soon.','_blank')
                }}>
                    <div class="bottom-fab-icon-holder">
                        <i style={{color:'white'}} class="fab fa-whatsapp"></i>
                    </div>
                    <span class="fab-label">Whatsapp</span>
                </li>
                {/* <li>
                    <span class="fab-label">Download</span>
                    <div class="bottom-fab-icon-holder">
                    <i class="fas fa-file-alt"></i>
                    </div>
                </li> */}
                {/* <li>
                    <span class="fab-label">FQA's</span>
                    <div class="bottom-fab-icon-holder">
                    <i class="fas fa-video"></i>
                    </div>
                </li> */}
                
                <ContactUsModal/>
                
                <li onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.google.com/search?q=risee+proptech&oq=risee+proptech&aqs=chrome..69i57j69i60l3.458j0j1&sourceid=chrome&ie=UTF-8#lrd=0x3bcb9351806b5e49:0x5f8e941523d45588,3,,,','_blank')
                    }}>
                    <div class="bottom-fab-icon-holder">
                        <i class="fas fa-star"></i>
                    </div>
                    <span class="fab-label">Review</span>
                </li>
                <li  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.facebook.com/riseetech','_blank')
                    }}>
                    <div class="bottom-fab-icon-holder">
                        <i class="fas fa-heart"></i>
                    </div>
                    <span class="fab-label">Like Us</span>
                </li>
                </ul>
            </div>
        </Fragment>
    );
    
}

export default Content;