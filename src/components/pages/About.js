import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/about/Content';

class About extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>INDMarketplace - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'About Us'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default About;