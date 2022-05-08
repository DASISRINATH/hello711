import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Bluecta extends Component {
    render() {
        return (
            <div className="container">
                <div className="cta cta-1">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <h3>Why Hello71 is a better Property Market Place?</h3>
                        </div>
                        <div className="offset-lg-1 col-lg-6">
                            <p>
                            Hello71 provides you lot of cool and new features, like Google Map Visualization with layout, Real Time Chat, Notifications on Best Properties, 3D Tours, Video, Realty Shares, Realty Pooling, Services etc.  
                            </p>
                            {/* <Link to="/contact" className="btn-custom-2 light">Find Out More</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bluecta;