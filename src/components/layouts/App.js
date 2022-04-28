import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const App = () => {
    const {t} = useTranslation(['footer']);
        return (
            <div className="footer-top">
                {/* <div className="container"> */}
                    <div className="row footer-btn-wrapper">
                        <div className="col-lg-7 footer-widget">
                            <h4>{t('footer:top.title')}</h4>
                            <p>{t('footer:top.detail')}</p>
                        </div>
                        <div className="col-lg-5 col-md-12 footer-widget">
                            <div className="footer-btn">
                                <a target="_blank" href="https://play.google.com/store/apps/details?id=com.proptech.risee" className="btn-custom-2 grey"> <i className="flaticon-playstore" />{t('footer:top.google_play')}</a>
                                {/* <Link to="#" className="btn-custom-2 grey"> <i className="flaticon-apple" />App Store</Link> */}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
        );
    
}

export default App;