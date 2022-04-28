import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/privacy-policy/Content';

const Privacy = ()=>{
  return (
    <Fragment>
      <MetaTags>
        <title>INDMarketplace - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Privacy Policy</title>
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