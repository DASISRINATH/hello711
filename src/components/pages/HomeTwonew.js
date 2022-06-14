import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Clients from '../sections/hometwo/Clients';
import Testimonials from '../sections/hometwo/Testimonials';
import Blockcta from '../layouts/Blockcta';
import InfoSection from '../sections/hometwo/InfoSection';
import Counter from '../sections/hometwo/Counter';
import Services from './Servicesdetails';
import TutorListings from './TutorListings';
import HomeBanner2 from '../sections/hometwo/HomeBanner2';
import Clients2 from '../sections/hometwo/Clients2';

const HomeTwonew = () => {
  return (
    <Fragment>
        <MetaTags>
                    <title>Hello71 - Online Marketplace for Language Trainers | Language Trainers | Students</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <HomeBanner2/>
                <Footer/>
    </Fragment>
  )
}

export default HomeTwonew