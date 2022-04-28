import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/compare-listings/Content';

class Comparelistings extends Component {
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
                <Breadcrumb breadcrumb={{pagename:'Compare Listings'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Comparelistings;