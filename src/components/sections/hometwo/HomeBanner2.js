import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/img/demo/test_1.jpg";
import Slider from "react-slick";

import Partnersimage from "../../../assets/img/demo/7.png";

import BuyModalBox from "../../sections/blockcta/BuyModalBox";
import SellModalBox from "../../sections/blockcta/SellModalBox";
import RentModalBox from "../../sections/blockcta/RentModalBox";

const bannerList = [
  [" Brining a high-end educational model for both industry and learners"],
  [" Providing a dymanic platform to high motivated career aspirants."],
  [" Training studetns to upgrade their technical knowledge"],
  [
    " Leaveaging sound technical learning for vocational growth and desired salary hike.",
  ],
  [" Rebuliding the employability calibre amoung yound professionals."],
];

const ctablock = [
  {
    id: 1,
    icon: "sales-agent",
    title: "Are you Language Trainer?",
    text: "Having Experience in Language Training? Register yourself as Trainer and get access to all the features of our Platform for free.",
  },
  {
    id: 2,
    icon: "user",
    title: "Want to learn New Langugage?",
    text: "If you are looking for learn any New Language, you can enroll yourself for the Training Programs by having a Free demo.",
  },
  {
    id: 3,
    icon: "star",
    title: "Explore Language Resources",
    text: "Hello71 helps Students to explore Trainers available for teaching various Languages and schedule and book a Training.",
  },
];

const settings = {
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  autoplay: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const HomeBanner2 = () => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="section-title-wrap mr-lg-30">
                <h2 className="title">The Journey About GEEKLURN</h2>
                <p className="title text-bold">DREAM, EXPLORE, DISCOVER.</p>
                <p className="m-0">
                  GEEKLURN is a Microsoft Technology Associate, Out Professional
                  texh-edu company providing a number of trending and
                  conventional ceritfied coureses like Data Sceince, Web
                  Develpmentm, Scrum Product Management and more. Our programs
                  are designed by industry experts, taking into account all the
                  corporate demand hierarchy.
                </p>
                <ul>
                  {bannerList.map((li, idx) => (
                    <li key={idx}>
                      <i className="far fa-heart" /> {li}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-5 mb-lg-30 acr-dots-wrapper acr-single-img-wrapper">
              <img src={image} alt="img" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="acr-dots-wrapper acr-single-img-wrapper w-lg-75 mx-auto p-lg-5 p-2">
            <div className="p-4 text-center">
              <h3 className="">GeekLurn is Now a Member of NASSCOM</h3>
              <p className="subtitle">
                In our journey towards excellence, we are proud to become a
                member of NASSCOM. Thankful to all aour learners, team and
                cheerleaders who keep on inspiring us to do better each day.
              </p>
            </div>
            <div className="px-lg-5 mx-lg-5">
              <img
                src={image}
                alt="Certificate img"
                className="container rounded"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container my-sm-4">
        <div className="row p-lg-2 m-lg-5">
          <div style={{ cursor: "pointer" }} className="col-lg-6 cta-container">
            <Link to="/#">
              <div className={"cta cta-2 item" + 1 + ""}>
                <i className={"flaticon-user"} />
                <div className="cta-body">
                  <h4>Our Vision</h4>
                  <p>
                    can enroll yourself for the Training Programs by having a
                    Free demo.", text: "If you are looking for learn any New
                    Language, you can enroll yourself for the Training Programs
                    by having a Free demo.", text: "If you are looking for learn
                    any New Language, you
                  </p>
                </div>
              </div>
            </Link>
          </div>

          <div style={{ cursor: "pointer" }} className="col-lg-6 cta-container">
            <Link to="/#">
              <div className={"cta cta-2 item" + 1 + ""}>
                <i className={"flaticon-user"} />
                <div className="cta-body">
                  <h4>Our Mission</h4>
                  <p>
                    text: "If you are looking for learn any New Language, you
                    text: "If you are looking for learn any New Language, you
                    can enroll yourself for the Training Programs by having a
                    Free demo.", can enroll yourself for the Training Programs
                    by having a Free demo.",
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div class="footer-top" style={{ backgroundColor: "#F7F8FC" }}>
        <div className="section mb-5 text-center">
          <h3>Our Partners</h3>
          <div className="container">
            <Slider className="2-slider" {...settings}>
              {/* {clients.map((item, i) => ( */}
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>
              <div className="acr-client-item text-center">
                <div className="p-1">
                  <img src={Partnersimage} alt="client" />
                </div>
              </div>

              {/* ))} */}
            </Slider>
          </div>
        </div>
      </div>

      <div
        className="section light-bg infographics-2 bg-norepeat bg-bottom"
        style={{
          backgroundImage:
            "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png )",
        }}
      >
        <div className="container">
          <div className="section-header text-lg-left text-center mb-5">
            <h4 className="">For Trainers & Learners.</h4>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="acr-infographic-item">
                <h5>Instructed-led Live Online Training</h5>
                <i className={"flaticon-search"} />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="acr-infographic-item">
                <h5>On-Premise Classroom training</h5>
                <i className={"flaticon-picture"} />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="acr-infographic-item">
                <h5>Self-Paced Online Training</h5>
                <i className={"flaticon-speech-bubble"} />
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="acr-infographic-item">
                <h5>Onr on One Online Training & Mentorships</h5>
                <i className={"flaticon-new"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBanner2;
