import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomeBanner extends Component {
    render() {
        return (
            <div className="section"> 
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-5">
                            <div className="section-title-wrap mr-lg-30">
                                <h5 className="custom-primary">About Us</h5>
                                <h2 className="title">We provide state of the art real estate service</h2>
                                <p className="subtitle">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                                <p className="subtitle">
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                </p>
                                <Link to="/listing-map" className="btn-custom">Browse Listings</Link>
                            </div>
                        </div>
                        <div className="col-lg-7 mb-lg-30 acr-dots-wrapper acr-single-img-wrapper">
                            <img src={process.env.PUBLIC_URL + "/assets/img/listings-list/home-page-banner.png"} alt="img" />
                            <div className="acr-dots" />
                        </div>
                      
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeBanner;