import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import "./contact.css"
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/contact/Content';

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
                <div className="cover">
    <div className="container text-center">
      <div className="text-subtitle">
    <h2>Course Enquiry</h2>
    </div>
    </div>
    <div className="container">
  <div className="row">
    <div className="col-sm">
      <div class="card mb-4">
      <div style={{ height: "rem" }}>
                    <img
                      src={"https://images.unsplash.com/photo-1525011268546-bf3f9b007f6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                      alt="card image cap"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
  <div class="card-body">
    <h5 class="card-title text-center">Enroll for Courses</h5>
    <p class="card-text" style={{lineHeight:1.5}}>
                      Having a quary or just wnat to know if digital Scholar is the
                      right institute for you? Fell free to to ping us.Happy to help
                      and ensure you become a digital marketing master..
                    </p>
  </div>
</div></div>
    <div className="col-sm">
      <div class="card mb-4">
      <div style={{ height: "rem" }}>
                    <img
                      src={"https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                      alt="card image cap"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
  <div class="card-body">
    <h5 class="card-title text-center">Collaboration</h5>
    <p class="card-text" style={{lineHeight:1.5}}>
                      Want to collaborste eith us for corporate trinng, lecture, summit or sny other work.
                      Feel free to ping us, we would love to collabarate and grow together.
                    </p>
  </div>
</div></div>
<div className="col-sm">
      <div class="card mb-4">
      <div style={{ height: "rem" }}>
                    <img
                      src={"https://img.freepik.com/free-photo/satisfied-businessman-company-employer-wearing-suit-handshake-new-employee-get-hired-job-interview-man-hr-manager-employ-successful-candidate-shake-hand-business-meeting-placement-concept_482257-5113.jpg?w=360"}
                      alt="card image cap"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
  <div class="card-body">
    <h5 class="card-title text-center">Placement Partnerships</h5>
    <p class="card-text" style={{lineHeight:1.5}}>
                     Tired of hiring under skilled students/ Hire our industry ready students who have in depth
                     knowleledge about various domains in digital marketing due to our agency style trining.
                    </p>
  </div>
</div></div>
  </div>
</div>
</div>
                
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Contact;