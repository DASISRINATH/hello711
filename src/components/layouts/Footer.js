import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, NavLink } from 'react-bootstrap';
import App from './App';
import SeolistContent from './../sections/hometwo/SeolistContent';
import "./css/Footer.css";
import { useTranslation } from 'react-i18next';
const Footer = () => {

    const {t} = useTranslation(['footer']);
    return (
        <footer className="acr-footer footer-2">
            {/* Footer Top Start */}
            {/* <App/> */}
            {/* Footer Top End */}
            {/* Footer Middle Start */}
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-sm-12 footer-widget">
                            <div className="footer-logo"> <img src={process.env.PUBLIC_URL + "/assets/img/hello71-wt-logo.svg"} alt="propyaar" /> </div>
                            <p>{t('footer:middle.title')}</p>
                            {/* <Dropdown className="acr-language-selector">
                                <Dropdown.Toggle as={NavLink} className="dropdownicon">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/flags/united-states.png"} alt="flag" />
                                    <span>English</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu">
                                    <ul>
                                        <li> <Link to="#"><img src={process.env.PUBLIC_URL + "/assets/img/flags/germany.png"} alt="flag" /> German</Link> </li>
                                        <li> <Link to="#"><img src={process.env.PUBLIC_URL + "/assets/img/flags/russia.png"} alt="flag" /> Russian</Link> </li>
                                        <li> <Link to="#"><img src={process.env.PUBLIC_URL + "/assets/img/flags/united-states.png"} alt="flag" />English</Link> </li>
                                        <li> <Link to="#"><img src={process.env.PUBLIC_URL + "/assets/img/flags/spain.png"} alt="flag" /> Spanish</Link> </li>
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>
                        <div className="col-lg-2 offset-lg-1 col-sm-4 col-xs-6 footer-widget">
                            <h5 className="widget-title" style={{color: "#ddd"}}>{t('footer:middle.menu')}</h5>
                            <ul>
                                <li> <Link to="/properties">{t('footer:middle.buy')}</Link> </li>
                                {/* <li> <Link to="/rent">{t('footer:middle.rent')}</Link> </li> */}
                                {/* <li> <Link to="/projects">Projects</Link> </li> */}
                                {/* <li> <Link to="/services">Services</Link> </li> */}
                                {/* <li> <Link to="/blogs">Blog</Link> </li> */}
                            </ul>
                        </div>
                        <div className="col-lg-2 col-sm-4 footer-widget">
                            <h5 className="widget-title" style={{color: "#ddd"}}>{t('footer:middle.information')}</h5>
                            <ul>
                                <li> <Link to="/about">{t('footer:middle.about_us')}</Link> </li>
                                <li> <Link to="/contact">{t('footer:middle.contact_us')}</Link> </li>
                                <li> <Link to="/career">Career</Link> </li>
                                <li> <a href="https://www.facebook.com/groups/520672879025235" target='_blank'>{t('footer:middle.propyaar_agent_fb_group')}</a> </li>
                                {/* <li> <Link to="/pricing">Pricing</Link> </li> */}
                                {/* <li> <Link to="/faq">FAQ's</Link> </li> */}
                            </ul>
                        </div>
                        <div className="col-lg-2 col-sm-4 footer-widget">
                            <h5 className="widget-title" style={{color: "#ddd"}}>{t('footer:middle.legal')}</h5>
                            <ul>
                                <li> <Link to="/privacy-policy">{t('footer:middle.privacy_policy')}</Link> </li>
                                <li> <Link to="/refunds-cancellations">{t('footer:middle.refund')}</Link> </li>
                                <li> <Link to="/terms-and-conditions">{t('footer:middle.terms')}</Link> </li>
                                <li> <Link to="/Pricing">{t('footer:middle.pricing')}</Link> </li>
                                <li> <Link to="/cookie-policy">{t('footer:middle.cookie_policy')}</Link> </li>
                            </ul>
                        </div>
                    </div>  
                    {/* <hr /> */}
                    <div className="row">
                        <div className="col-sm-12">
                            {/* <h4 class="title">{t('footer:middle.seolist.title')}</h4> */}
                            <SeolistContent />
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Middle End */}
            {/* Footer Bottom Start */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <p className="m-0">© {t('footer:bottom.copy_right')} 2020 - <Link to="#">{t('footer:middle.seolist.emusk')}</Link> {t('footer:bottom.all_rights')}.</p>
                        </div>
                        <div className="col-lg-5">
                            <ul className="social-media">
                                <li> <a href="https://www.facebook.com/hello71Learn" target="_blank"> <i className="fab fa-facebook-f" /> </a> </li>
                                <li> <a href="https://www.instagram.com/hello71learn/" target="_blank"> <i className="fab fa-instagram" /> </a> </li>
                                {/* <li> <Link to="#"> <i className="fab fa-pinterest-p" /> </Link> </li> */}
                                <li> <a href="https://www.youtube.com/channel/UC6hj6GKbSTlH0EKEBh1Vu_A" target="_blank"> <i className="fab fa-youtube" /> </a> </li>
                                <li> <a href="https://twitter.com/propyaar"> <i className="fab fa-twitter" target="_blank" /> </a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer Bottom End */}
        </footer>
    );
}

export default Footer;