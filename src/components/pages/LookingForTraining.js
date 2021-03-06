import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import LookingForTraining from '../sections/joinh71/looking-for-training';
import LookingForTraining2 from '../sections/joinh71/looking-for-training2';

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
                {/* <LookingForTraining/> */}
                <LookingForTraining2/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Contact;