import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/cookie-policy/Content';

const Privacy = ()=>{
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
      {/* <Breadcrumb breadcrumb={{pagename:'Privacy Policy'}} /> */}
      <Content/>
      <Footer/>
    </Fragment>
  );
}

export default Privacy;