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
import Services from './Servicesdetails';
import TutorListings from './TutorListings';

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
                <div class="footer-top" style={{backgroundColor:'#F7F8FC'}}>
                    <div className="section mb-5 text-center">
                        <p>Worlds <b>Top 10+</b> language's are available to learn on <b>Hello71</b>.</p>
                        <Clients/>
                    </div>  
                </div> 
                <div className="section section-padding pt-2">   
                   <Blockcta/>
                </div>
                
                <InfoSection/>
                <Services/>
                {/* <Counter/> */}
                <TutorListings/>
                {/* <Content/> */}
                <Testimonials />
                <Footer/>
            </Fragment>
        );
    }
}

export default Hometwo;