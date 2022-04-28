import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import User from '../sections/user/User';

class Listingmap extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Risee | User Data</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header />
                <User></User>
            </Fragment>
        );
    }
}

export default Listingmap;