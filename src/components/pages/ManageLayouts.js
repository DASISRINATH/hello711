import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
// import Testimonials from '../home/Testimonials';
import Footer from '../layouts/Footer2';

import Content from "../sections/manage-layouts/Content";

class ManageLayouts extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>INDMarketplace - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Listing Map</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        {/* <Testimonials /> */}
        <Content/>
      </Fragment>
    );
  }
}

export default ManageLayouts;
