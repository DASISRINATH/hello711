import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer2';
import Content from '../sections/profile-saved-listings/Content';

class Profilesavedlistings extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>INDMarketplace - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | My Products</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                {/* <Breadcrumb /> */}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Profilesavedlistings;