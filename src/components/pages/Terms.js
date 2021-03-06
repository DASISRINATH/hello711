import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/terms/Content';

class Legal extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Hello71 - ReOnline Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Terms and Conditions</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                {/* <Breadcrumb breadcrumb={{pagename:'Terms and Conditions'}} /> */}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Legal;