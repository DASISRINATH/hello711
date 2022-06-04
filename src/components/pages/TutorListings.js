import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import listing from '../../data/listings.json';

class Banner extends Component {
    render() {
        const settings = {
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: false,
            dots: true,
            dotsClass: "slick-dots d-flex",
            autoplay: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
        return (
            <div className="hometwo-listings section section-padding pt-0">
                <div className="container">
                <div className="section section-title-wrap text-center">
                            <h5 className="custom-primary">Our Trainers</h5>
                            <h2 className="title">Simple & Easy Way to Learn New Language</h2>
                            <p className="subtitle">
                            Hello71 offers list of language study and training programs which are expertly designed to equip Individual Students and Professionals & Corporate.<br /> We provide a big pool of highly qualified language trainers and resources at one place.
                            </p>
                            
                            {/* <Link to="https://www.youtube.com/watch?v=TKnufs85hXk&t=1s" className="btn-custom popup-youtube"> <i className="m-0 fas fa-play" /> </Link> */}
                        </div>
                    <div className="banner-item">
                        <div className="banner-inner">
                            {/* Featured Listings Start */}
                            <Slider className="acr-featured-listings banner-featured-slider" {...settings}>
                                {listing.slice(0, 8).map((item, i) => (
                                    <div key={i} className="col-12">
                                        <div className="acr-featured-listing">
                                            <div className="featured-listing-thumb">
                                                <Link to={`/trainers/${item.id}`}><img src={process.env.PUBLIC_URL + "/" + item.gridimg} alt="listing" /></Link>
                                                {/* <Link to=""><img src={process.env.PUBLIC_URL + "/" + item.gridimg} alt="listing" /></Link> */}
                                                <div className="featured-listing-controls">
                                                    {item.star === true ? <span>Featured</span> : ''}
                                                    <Link to="#"><i className="far fa-heart" /></Link>
                                                </div>
                                            </div>
                                            <div className="featured-listing-content">
                                              <span>{item.authorname}</span>
                                                <h6>{new Intl.NumberFormat().format((item.monthlyprice).toFixed(2))}₹/hr</h6>
                                                <div className="featured-listing-meta">
                                                    <p>{item.title}</p>
                                                </div>
                                                <span><i className="fas fa-map-marker-alt" /> {item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                            {/* Featured Listings End */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;