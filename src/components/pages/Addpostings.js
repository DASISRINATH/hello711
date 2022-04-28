import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/add-post/Content';

class Submitlisting extends Component {
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
                <Breadcrumb breadcrumb={{pagename:'Add Post'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Submitlisting;