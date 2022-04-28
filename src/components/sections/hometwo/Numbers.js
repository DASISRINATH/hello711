import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Whyus from '../hometwo/Whyus';

class Aboutus extends Component {
    render() {
        return (
            <div className="section pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 acr-single-img-wrapper mb-lg-30">
                        <Whyus/>
                        </div>
                        <div className="col-lg-4 acr-single-img-wrapper">
                            <div className="section-title-wrap">
                            {/* <p className="subtitle">Properties Spread Across India</p> */}
                            <p></p>
                                {/* <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}
                                {/* <Link to="/listing-map" className="btn-link custom-primary">Browse Listings <i className="fas fa-arrow-right" /> </Link> */}
                                <img src={process.env.PUBLIC_URL + "/assets/img/about/1.png"} alt="listing" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aboutus;