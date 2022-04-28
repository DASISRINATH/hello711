import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header-UserDetails';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/enter-user-details/enterdetails';

class About extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Bhoomi - Real Estate React Template | About Us</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
                {/* <Footer/> */}
            </Fragment>
        );
    }
}

export default About;