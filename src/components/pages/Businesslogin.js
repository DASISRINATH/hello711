import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer2';
import Content from '../sections/business/Content';

class Businesslogin extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Hello71 - Online Marketplace for Language Trainers & Learners</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                {/* <Breadcrumb breadcrumb={{pagename:'Businesslogin'}} /> */}
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Businesslogin;