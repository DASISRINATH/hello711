import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/legal/Content';

class Legal extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Hello71 - One Stop Platform for all your Foreign Language Trianers & Resources Legal</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                {/* <Breadcrumb breadcrumb={{pagename:'Refund Policy'}} /> */}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Legal;