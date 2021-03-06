import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

class Content extends Component {
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            dots: true,
            dotsClass: "d-flex slick-dots",
        }
        return (
            <div className="acr-auth-container">
                <div className="acr-auth-bg">
                    <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
                        {images.map((item, i) => (
                            <div key={i}>
                                <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} >
                                    <div className="acr-auth-quote">
                                        <h6>{item.title}</h6>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="acr-auth-content">
                    <form method="post">
                        <div className="auth-text">
                            <h3>Enter OTP token</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                        </div>
                        <div className="form-group">
                            <label>Enter OTP token</label>
                            <input type="text" className="form-control form-control-light" placeholder="* * * * * *" name="username" />
                        </div>
                        {/* <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control form-control-light" placeholder="Password" name="password" />
                        </div> */}
                        {/* <div className="form-group">
                            <Link to="#" className="forgot-password">Forgot Password?</Link>
                        </div> */}
                        <Link to="/enter-user-details"><button type="submit" className="btn-custom secondary btn-block">Validate OTP Token</button></Link>
                        <div className="auth-seperator">
                            <span>OR</span>
                        </div>
                        {/* <div className="social-login">
                            <button type="button" className="acr-social-login facebook">Join as Agent </button>
                            <button type="button" className="acr-social-login google"> Join as Company</button>
                        </div> */}
                        {/* <p className="text-center mb-0">Don't have an account? <Link to="/register">Create One</Link> </p> */}
                    </form>
                </div>
            </div>
        );
    }
}

export default Content;