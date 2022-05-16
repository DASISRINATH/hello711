import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/comingsoon/Content';

class Comingsoon extends Component {
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
                <Content/>
            </Fragment>
        );
    }
}

export default Comingsoon;