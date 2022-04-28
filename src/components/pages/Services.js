import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/services/Content';

class Services extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>INDMarketplace - ReOnline Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Services</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Services'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Services;