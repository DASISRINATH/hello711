import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
// import Testimonials from '../home/Testimonials';
import Footer from '../layouts/Footer2';

//import Content from "../sections/rentmap/Content2";
import Content from "../sections/listings/Listings";

class Rentmap extends Component {

  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Hello71 - ReOnline Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | Rent Map</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        {/* <Testimonials /> */}
        <Content locationId={this.props.location.state ? (this.props.location.state.locationId) : null}/>
        <Footer/>
      </Fragment>
    );
  }
}

export default Rentmap;
