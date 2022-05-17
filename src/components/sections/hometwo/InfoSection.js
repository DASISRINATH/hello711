import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InfoSection extends Component {
    render() {
        return (
            <div className="section"> 
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-5 mb-md-30 acr-dots-wrapper acr-single-img-wrapper">
                            <img src={process.env.PUBLIC_URL + "/assets/img/listings-list/3.png"} alt="img" />
                            <div className="acr-dots" />
                        </div>
                    <div className="col-lg-7">
                            <div className="section-title-wrap mr-lg-30">
                                <h5 className="custom-primary">Learn World Languages.</h5>
                                <h2 className="title">We provide a wide range of innovative and effective foreign language courses.</h2>
                                <p className="subtitle">
                                Hello71 offers wide range of foreign language classes, across levels (beginners, intensive, kids and teens), industries (business, translation, conversation classes, tourism, hospitality) and foreign language writing classes.
                                </p>
                                <p className="subtitle">
                                If you're looking for Foreign language courses online, then Hello71 is the best choice.
                                </p>
                                <Link to="/listing-map" className="btn-custom">Browse Listings</Link>
                            </div>
                        </div>
                       
                      
                    </div>
                </div>
            </div>
        );
    }
}

export default InfoSection;