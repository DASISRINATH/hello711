import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, NavLink } from 'react-bootstrap';
import App from './App';

class Footer extends Component {
    render() {
        return (
            <footer className="acr-footer footer-2">
                {/* Footer Middle End */}
                {/* Footer Bottom Start */}
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-7">
                                <p className="m-0">© Copyright 2020 - <Link to="">NXTSquare Technologies Pvt.Ltd </Link> All Rights Reserved.</p>
                            </div>
                            <div className="col-lg-5">
                            <ul className="social-media">
                                <li> <a href="https://www.facebook.com/propyaar/" target="_blank"> <i className="fab fa-facebook-f" /> </a> </li>
                                <li> <a href="https://www.instagram.com/propyaar/" target="_blank"> <i className="fab fa-instagram" /> </a> </li>
                                {/* <li> <Link to="#"> <i className="fab fa-pinterest-p" /> </Link> </li> */}
                                <li> <a href="https://www.youtube.com/channel/UC6hj6GKbSTlH0EKEBh1Vu_A" target="_blank"> <i className="fab fa-youtube" /> </a> </li>
                                <li> <a href="https://twitter.com/propyaar"> <i className="fab fa-twitter" /> </a> </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Bottom End */}
            </footer>
        );
    }
}

export default Footer;