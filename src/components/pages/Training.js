import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
// import Testimonials from '../home/Testimonials';
import Footer from '../layouts/Footer2';

import Content from "../sections/training/Content3";

class Listingmap extends Component {

  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Hello71 - ReOnline Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Listing Map</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        {/* <Testimonials /> */}
        <Content />
        {/* <Footer/> */}
      </Fragment>
    );
  }
}

export default Listingmap;
