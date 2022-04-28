import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer2";
import Content from "../sections/submit-listing/Content2";

class Submitlisting extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>
            INDMarketplace - ReOnline Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell |
            Submit Listing
          </title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Submit Listing" }} />
        <Content  params={this.props.match.params}/>
        <Footer />
      </Fragment>
    );
  }
}

export default Submitlisting;
