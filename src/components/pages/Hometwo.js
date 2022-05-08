import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/hometwo/Content';
import HomeBanner from '../sections/hometwo/HomeBanner';
import Clients from '../sections/hometwo/Clients';
import Testimonials from '../sections/hometwo/Testimonials';
import Blockcta from '../layouts/Blockcta';
import InfoSection from '../sections/hometwo/InfoSection';
import Counter from '../sections/hometwo/Counter';

class Hometwo extends Component {
    render() {
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
                <HomeBanner/>    
                <div className="section section-padding pt-0">
                   <Blockcta/>
                </div>
                <div class="footer-top" style={{backgroundColor:'#F7F8FC'}}>
                    <div className="section mb-5">
                        <Clients/>
                    </div>  
                </div>  
                <InfoSection/>
                <Counter/>
                <Content/>
               
                <Testimonials />
                <Footer/>
            </Fragment>
        );
    }
}

export default Hometwo;