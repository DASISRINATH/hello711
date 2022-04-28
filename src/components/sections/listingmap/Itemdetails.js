import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Listingwrapper from './Listingwrapper';

class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <Banner item={this.props.itemData}/>
                <Listingwrapper item={this.props.itemData} />
            </Fragment>
        );
    }
}

export default Content;