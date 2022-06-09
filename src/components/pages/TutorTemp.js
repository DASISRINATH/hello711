import React, { useEffect, useState, Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Tab, Nav, Accordion, Card, NavLink } from "react-bootstrap";
import { Link, useParams, withRouter } from "react-router-dom";
import IND from "../../assets/img/demo/pic1.63e5cf4e.jpg";
import listing from "../../data/listings.json";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Breadcrumb from '../layouts/Breadcrumb';


const TutorTemp = () => {
  const [tutorInfo, setTutorInfo] = useState({});

  useEffect(() => {
    const person = listing.find((product) => product.id === parseInt(peopleId));

    console.log(person);

    setTutorInfo(person);
  }, []);

  const { peopleId } = useParams();
  console.log(peopleId);

  const person = listing.find((product) => product.id === parseInt(peopleId));

  console.log(person);

  return (
    <Fragment>
      <MetaTags>
        <title>
          Hello71 - Online Marketplace | Mobiles | Tablets | Accessories | Buy
          amd Sell | Listing Details
        </title>
        <meta name="description" content="#" />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Trainers" }} />
      <div className="" style={{ backgroundColor: "#f2f3ff", height: "100%" }}>
        <div className="">
          <div style={{ backgroundColor: "#f2f3ff", height: "10vh" }}></div>
          <div className="container mt-5" style={{ backgroundColor: "#fff" }}>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-3">
                  <img src={process.env.PUBLIC_URL + "/" + tutorInfo.gridimg} alt="listing" />
                </div>
                <div className="col-lg-7 row ">
                  <h4 className="col-12 pt-3">
                    <strong>
                      {tutorInfo.authorname} <i className="far fa-heart" />{" "}
                    </strong>
                  </h4>
                  <h6 className="col-12 font-weight-normal text-secondary mt-lg-n3 mb-1">
                    {tutorInfo.title}
                  </h6>
                  <div className="col-12 row mb-2">
                    <div className="col-4">
                      <span className="h6 text-dark">
                        <i className="far fa-heart" /> 4.5
                      </span>
                      <span>/5.0 </span>
                      <span> (4,448)</span>
                    </div>
                    <div className="col-4">
                      <span className="h6 text-dark">
                        <i className="far fa-heart" /> 95%{" "}
                      </span>
                      <span className="text-secondary">Job Compelition</span>
                    </div>
                    <div className="col-4">
                      <span> </span>
                      <span className="text-secondary">
                        <i className="far fa-heart" /> Sacramento,{" "}
                        {tutorInfo.location}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 text-secondary mb-lg-n2">
                    Languages I know
                  </div>
                  <h6 className="col-12 ">
                    English, Arabic, Chinese, Hebrew, French, Spanish,
                    <span className="font-weight-bold text-primary">
                      {" "}
                      +02 more
                    </span>
                  </h6>
                </div>
                <div className="col-lg-2 mt-2">
                  <p className="text-right text-secondary mb-n1">
                    Starting from
                  </p>
                  <h5 className="text-right text-primary">
                    ${tutorInfo.monthlyprice}/hr
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-center flex-lg-row flex-column justify-content-around mt-5">
                <div className="flex-grow-1">
                  <i className="far fa-heart" /> &nbsp;
                  <Link to={`/`} className="text-primary">
                    www.tutorlinkhere.com/tutor/uk/armando/295548
                  </Link>
                  <button className="px-4 btn btn-sm subtitle text-secondary mx-2">
                    <i className="far fa-heart" />
                  </button>
                </div>
                <div className="flex-grow-1 d-flex justify-content-end">
                  <button className="px-4 btn btn-light text-secondary mx-2">
                    <i className="far fa-heart" /> Save
                  </button>
                  <button className="px-4 btn btn-outline-secondary mx-2 font-weight-bold">
                    Lets Talk Now
                  </button>
                  <button className="px-4 btn btn btn-primary mx-2">
                    Book a tution
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section">
              <div className="mx-lg-n3">
                {/* <div className="col-lg-8"> */}
                <Tab.Container defaultActiveKey="general">
                  <Nav variant="tabs" className="nav nav-tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="general">
                        <i className="far fa-heart" /> Introduction
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="listings">
                        <i className="far fa-heart" /> Reviews
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content className="">
                    <Tab.Pane eventKey="general">
                      <Accordion defaultActiveKey="0" className="with-gap">
                        <div className="card p-4">
                          <h5>A brief Introduction</h5>
                          Anim pariatur cliche reprehenderit, enim eiusmod high
                          life accusamus terry richardson ad squid. 3 wolf moon
                          officia aute, non cupidatat skateboard dolor brunch.
                          Square Scacco Diamond Ring truck quinoa nesciunt
                          laborum eiusmod. Brunch 3 wolf moon tempor, sunt
                          aliqua put a bird on it squid single-origin coffee
                          nulla assumenda shoreditch et. Nihil anim keffiyeh
                          helvetica, craft beer labore wes anderson cred
                          nesciunt sapiente ea proident. Ad vegan excepteur
                          butcher vice lomo. Leggings occaecat craft beer
                          farm-to-table, raw denim aesthetic synth nesciunt you
                          probably haven't heard of them accusamus labore
                          sustainable VHS. Anim pariatur cliche reprehenderit,
                          enim eiusmod high life accusamus terry richardson ad
                          squid. 3 wolf moon officia aute, non cupidatat
                          skateboard dolor brunch. Square Scacco Diamond Ring
                          truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                          moon tempor, sunt aliqua put a bird on it squid
                          single-origin coffee nulla assumenda shoreditch et.
                          Nihil anim keffiyeh helvetica, craft beer labore wes
                          anderson cred nesciunt sapiente ea proident. Ad vegan
                          excepteur butcher vice lomo. Leggings occaecat craft
                          beer farm-to-table, raw denim aesthetic synth nesciunt
                          you probably haven't heard of them accusamus labore
                          sustainable VHS. Anim pariatur cliche reprehenderit,
                          enim eiusmod high life accusamus terry richardson ad
                          squid. 3 wolf moon officia aute, non cupidatat
                          skateboard dolor brunch. Square Scacco Diamond Ring
                          truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                          moon tempor, sunt aliqua put a bird on it squid
                          single-origin coffee nulla assumenda shoreditch et.
                          Nihil anim keffiyeh helvetica, craft beer labore wes
                          anderson cred nesciunt sapiente ea proident. Ad vegan
                          excepteur butcher vice lomo. Leggings occaecat craft
                          beer farm-to-table, raw denim aesthetic synth nesciunt
                          you probably haven't heard of them accusamus labore
                          sustainable VHS.
                        </div>
                        <Card>
                          <Accordion.Collapse
                            eventKey="0"
                            className="collapseparent"
                          >
                            <Card.Body>
                              <p>
                                {" "}
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Square Scacco Diamond Ring truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch
                                et. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo.
                                Leggings occaecat craft beer farm-to-table, raw
                                denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore
                                sustainable VHS.
                              </p>
                              <ul className="acr-list mb-0">
                                <li>
                                  {" "}
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.{" "}
                                </li>
                                <li>
                                  {" "}
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  There are many variations of passages of Lorem
                                  Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  Internet tend to repeat predefined chunks as
                                  necessary{" "}
                                </li>
                                <li>
                                  {" "}
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text.
                                </li>
                              </ul>
                            </Card.Body>
                          </Accordion.Collapse>
                          <Card.Header>
                            <Accordion.Toggle
                              as={NavLink}
                              variant="link"
                              eventKey="0"
                            >
                              <p class="h5 text-dark">Education</p>
                              MBBS, MD, DM rhenumatology
                              <div className="row">
                                <div className="col-3 text-secondary">
                                  <i className="far fa-heart" /> Univeristy of
                                  Florida
                                </div>
                                <div className="col-2 text-secondary">
                                  <i className="far fa-heart" /> San Francisco,
                                  TN
                                </div>
                                <div className="col-4 text-secondary">
                                  <i className="far fa-heart" /> June 2018 -
                                  Present
                                </div>
                              </div>
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                        <Card>
                          <Accordion.Collapse
                            eventKey="1"
                            className="collapseparent"
                          >
                            <Card.Body>
                              <p>
                                {" "}
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Square Scacco Diamond Ring truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch
                                et. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo.
                                Leggings occaecat craft beer farm-to-table, raw
                                denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore
                                sustainable VHS.
                              </p>
                              <ul className="acr-list mb-0">
                                <li>
                                  {" "}
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.{" "}
                                </li>
                                <li>
                                  {" "}
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  There are many variations of passages of Lorem
                                  Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  Internet tend to repeat predefined chunks as
                                  necessary{" "}
                                </li>
                                <li>
                                  {" "}
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text.
                                </li>
                              </ul>
                            </Card.Body>
                          </Accordion.Collapse>
                          <Card.Header>
                            <Accordion.Toggle
                              as={NavLink}
                              variant="link"
                              eventKey="1"
                            >
                              MBBS, MS, Mch neurosurgery
                              <div className="row">
                                <div className="col-4 text-secondary">
                                  <i className="far fa-heart" /> University of
                                  Massachusettes - Amherst
                                </div>
                                <div className="col-2 text-secondary">
                                  <i className="far fa-heart" /> Kansas City, LA
                                </div>
                                <div className="col-4 text-secondary">
                                  <i className="far fa-heart" /> January 2014 -
                                  2018
                                </div>
                              </div>
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                        <Card>
                          <Accordion.Collapse
                            eventKey="2"
                            className="collapseparent"
                          >
                            <Card.Body>
                              <p>
                                {" "}
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Square Scacco Diamond Ring truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch
                                et. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo.
                                Leggings occaecat craft beer farm-to-table, raw
                                denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore
                                sustainable VHS.
                              </p>
                              <ul className="acr-list mb-0">
                                <li>
                                  {" "}
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.{" "}
                                </li>
                                <li>
                                  {" "}
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  There are many variations of passages of Lorem
                                  Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  Internet tend to repeat predefined chunks as
                                  necessary{" "}
                                </li>
                                <li>
                                  {" "}
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text.
                                </li>
                              </ul>
                            </Card.Body>
                          </Accordion.Collapse>
                          <Card.Header>
                            <Accordion.Toggle
                              as={NavLink}
                              variant="link"
                              eventKey="2"
                            >
                              MBBS, MD pathology
                              <div className="row">
                                <div className="col-3 text-secondary">
                                  <i className="far fa-heart" /> Auburn
                                  University
                                </div>
                                <div className="col-2 text-secondary">
                                  <i className="far fa-heart" /> Atlanta, CO
                                </div>
                                <div className="col-4 text-secondary">
                                  <i className="far fa-heart" /> April 2011 -
                                  December 2013
                                </div>
                              </div>
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                        <div className="card p-4">
                          <h5>I can Teach</h5>
                          <div className="row">
                            <h6 className="col-2">Language Courses</h6>
                            <div className="col-10">
                              Typescript, C#, Java, Azure, Node js, Express,
                              Pearl, Spring, Redux, Ionic, iOS development,
                              Andorid development
                            </div>
                          </div>
                        </div>
                      </Accordion>
                    </Tab.Pane>
                    <Tab.Pane eventKey="listings">
                      <Accordion defaultActiveKey="10" className="with-gap">
                        <Card>
                          <Accordion.Collapse
                            eventKey="10"
                            className="collapseparent"
                          >
                            <Card.Body>
                              <p>
                                {" "}
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Square Scacco Diamond Ring truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch
                                et. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo.
                                Leggings occaecat craft beer farm-to-table, raw
                                denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore
                                sustainable VHS.
                              </p>
                              <ul className="acr-list mb-0">
                                <li>
                                  {" "}
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.{" "}
                                </li>
                                <li>
                                  {" "}
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  There are many variations of passages of Lorem
                                  Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  Internet tend to repeat predefined chunks as
                                  necessary{" "}
                                </li>
                                <li>
                                  {" "}
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text.
                                </li>
                              </ul>
                            </Card.Body>
                          </Accordion.Collapse>
                          <Card.Header>
                            <Accordion.Toggle
                              as={NavLink}
                              variant="link"
                              eventKey="10"
                            >
                              How can I submit my product?
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                        <Card>
                          <Accordion.Collapse
                            eventKey="11"
                            className="collapseparent"
                          >
                            <Card.Body>
                              <p>
                                {" "}
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Square Scacco Diamond Ring truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch
                                et. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo.
                                Leggings occaecat craft beer farm-to-table, raw
                                denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore
                                sustainable VHS.
                              </p>
                              <ul className="acr-list mb-0">
                                <li>
                                  {" "}
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.{" "}
                                </li>
                                <li>
                                  {" "}
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  There are many variations of passages of Lorem
                                  Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  Internet tend to repeat predefined chunks as
                                  necessary{" "}
                                </li>
                                <li>
                                  {" "}
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text.
                                </li>
                              </ul>
                            </Card.Body>
                          </Accordion.Collapse>
                          <Card.Header>
                            <Accordion.Toggle
                              as={NavLink}
                              variant="link"
                              eventKey="11"
                            >
                              For how long does my product stay posted?
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                        <Card>
                          <Accordion.Collapse
                            eventKey="12"
                            className="collapseparent"
                          >
                            <Card.Body>
                              <p>
                                {" "}
                                Anim pariatur cliche reprehenderit, enim eiusmod
                                high life accusamus terry richardson ad squid. 3
                                wolf moon officia aute, non cupidatat skateboard
                                dolor brunch. Square Scacco Diamond Ring truck
                                quinoa nesciunt laborum eiusmod. Brunch 3 wolf
                                moon tempor, sunt aliqua put a bird on it squid
                                single-origin coffee nulla assumenda shoreditch
                                et. Nihil anim keffiyeh helvetica, craft beer
                                labore wes anderson cred nesciunt sapiente ea
                                proident. Ad vegan excepteur butcher vice lomo.
                                Leggings occaecat craft beer farm-to-table, raw
                                denim aesthetic synth nesciunt you probably
                                haven't heard of them accusamus labore
                                sustainable VHS.
                              </p>
                              <ul className="acr-list mb-0">
                                <li>
                                  {" "}
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.{" "}
                                </li>
                                <li>
                                  {" "}
                                  Many desktop publishing packages and web page
                                  editors now use Lorem Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  There are many variations of passages of Lorem
                                  Ipsum{" "}
                                </li>
                                <li>
                                  {" "}
                                  Internet tend to repeat predefined chunks as
                                  necessary{" "}
                                </li>
                                <li>
                                  {" "}
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text.
                                </li>
                              </ul>
                            </Card.Body>
                          </Accordion.Collapse>
                          <Card.Header>
                            <Accordion.Toggle
                              as={NavLink}
                              variant="link"
                              eventKey="12"
                            >
                              Can I submit products for free?
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                      </Accordion>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
                {/* Contact Form Start */}
                <div className="section pb-0">
                  <div className="section-title-wrap section-header">
                    <h5 className="custom-primary">Contact Us</h5>
                    <h2 className="title">Still Got Questions?</h2>
                    <p className="subtitle">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy
                    </p>
                  </div>
                  <div className="comment-form">{/* <Formbox /> */}</div>
                </div>
                {/* Contact Form End */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default TutorTemp;
