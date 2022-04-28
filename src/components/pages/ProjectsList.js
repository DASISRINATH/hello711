import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfive";
import Content from "../sections/projects-list/Content";

class ProjectsList extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Risee | User Data redux</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Content></Content>
      </Fragment>
    );
  }
}

export default ProjectsList;
