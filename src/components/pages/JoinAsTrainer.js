import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import JoinAsTrainer from '../sections/joinh71/join-as-trainer';
import JoinAsTrainer2 from '../sections/joinh71/join-as-trainer2';

class Contact extends Component {
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
                {/* <Breadcrumb breadcrumb={{pagename:'Contact Us'}} /> */}
                {/* <JoinAsTrainer/> */}
                <JoinAsTrainer2/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Contact;