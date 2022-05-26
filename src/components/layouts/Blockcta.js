import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Home_Icon from "./img/home_icon.png";
import BuyModalBox from "../sections/blockcta/BuyModalBox";
import SellModalBox from "../sections/blockcta/SellModalBox";
import RentModalBox from "../sections/blockcta/RentModalBox";

const ctablock = [
    {
        id: 1,
        icon: 'sales-agent',
        title: 'Are you Language Trainer?',
        text: "Having Experience in Language Training? Register yourself as Trainer and get access to all the features of our Platform for free."
    },
    {
        id: 2,
        icon: 'user',
        title: 'Want to learn New Langugage?',
        text: "If you are looking for learn any New Language, you can enroll yourself for the Training Programs by having a Free demo."
    },
    {
        id: 3,
        icon: 'star',
        title: "Explore Language Resources",
        text: "Hello71 helps Students to explore Trainers available for teaching various Languages and schedule and book a Training."
    }
]

class Blockcta extends Component {
    render() {
        return (
            <div className="container">
                  <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Why Hello71?</h5>
                        <h2 className="title">You Need It, We Got It</h2>
                    </div>
                <div className="row">
                <BuyModalBox id={ctablock[0].id} icon={ctablock[0].icon} title={ctablock[0].title} text={ctablock[0].text} />
                <SellModalBox id={ctablock[1].id} icon={ctablock[1].icon} title={ctablock[1].title} text={ctablock[1].text} />
                <RentModalBox id={ctablock[2].id} icon={ctablock[2].icon} title={ctablock[2].title} text={ctablock[2].text} />
                    {/* {ctablock.map((item, i) => (
                        <div style={{cursor: "pointer"}} key={i} className="col-lg-4 cta-container">
                            <div className={"cta cta-2 item" + item.id + ""}>
                                <i className={"flaticon-" + item.icon + ""} />
                                <div className="cta-body">
                                    <h4>{item.title}</h4>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))} */}
                    {/* <div style={{cursor: "pointer"}} className="col-lg-4 cta-container">
                            <div className={"cta cta-2 item2"}>
                                <img src={Home_Icon} alt="home icon" />
                                <div className="cta-body">
                                    <h4>Renting a Property?</h4>
                                    <p>Post your listing for 2BHK, 3BHK properties.</p>
                                </div>
                            </div>
                        </div> */}
                </div>
            </div>
        );
    }
}

export default Blockcta;