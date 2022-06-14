import React, { Component } from 'react';
import Slider from 'react-slick';
import clients from '../../../data/clients.json'
import image from "../../../assets/img/demo/7.png";


class Clients2 extends Component {
    render() {
        const settings = {
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 2,
                    }
                },
            ]
        }
        return (
            <div className="container">
                <Slider className="2-slider" {...settings}>
                    {/* {clients.map((item, i) => ( */}
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        <div className="acr-client-item text-center">
                            <div className='p-1'>
                            <img src={image} alt="client" />
                            </div>
                        </div>
                        
                    {/* ))} */}
                </Slider>
            </div>
        );
    }
}

export default Clients2;