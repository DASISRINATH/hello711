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
                                <h5 className="custom-primary">Learn Foriegn Languages.</h5>
                                <h2 className="title">Learning a new language is now easier with Hello71.</h2>
                                <p className="subtitle">
                                Explore Trainers, share tips, strategies, and resources for helping students develop in world languages. 
                                </p>
                                <p className="subtitle">
                                Join Live and Interactive Online Classes with the best Tutors                      
                                </p>
                                <Link to="/join-as-trainer" className="btn-custom">Join Us</Link>
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