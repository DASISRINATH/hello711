import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
// import Header from '../layouts/Headerfive';
import Content from '../sections/Otp-token/Content';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Hello71 - One Stop Platform for all your Foreign Language Trianers & Resources Login</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                {/* <Header/> */}
                <Content/>
            </Fragment>
        );
    }
}

export default Login;