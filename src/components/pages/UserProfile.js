import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/job-profile/Content';

class Contact extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Hello71 - ReOnline Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Contact Us</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                {/* <Breadcrumb breadcrumb={{pagename:'Contact Us'}} /> */}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Contact;