import React from 'react';
import { Accordion, Card, NavLink } from 'react-bootstrap'
import Formbox from '../../layouts/Formbox';
function Contactform() {
    return (
        <div className="section pt-0">
                <div className="container">
                    {/* <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Any Feeback?</h5>
                        <h3 className="title">We are open to Suggestions</h3>
                    </div> */}
                    <div className="row">
                        {/* <div className="col-lg-7">
                            <div className="comment-form mb-lg-30">
                                <Formbox/>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-5">
                            <Accordion defaultActiveKey="0" className="with-gap">
                                <Card>
                                    <Accordion.Collapse eventKey="0" className="collapseparent">
                                        <Card.Body>
                                            For accesssing any of the Features on Hello71, User must login first. He can login using a Phone number or by using email and password.Once logged in, he can goto Post Property Link and submit his listing.
                                            </Card.Body>
                                    </Accordion.Collapse>
                                    <Card.Header>
                                        <Accordion.Toggle as={NavLink} variant="link" eventKey="0">
                                            How can I submit my property?
                                            </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                                <Card>
                                    <Accordion.Collapse eventKey="1" className="collapseparent">
                                        <Card.Body>
                                            User's posting will be visible to other Users, till the the owner of the delete's it.
                                            </Card.Body>
                                    </Accordion.Collapse>
                                    <Card.Header>
                                        <Accordion.Toggle as={NavLink} variant="link" eventKey="1">
                                            For how long does my product stay posted?"
                                            </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                                <Card>
                                    <Accordion.Collapse eventKey="2" className="collapseparent">
                                        <Card.Body>
                                           User's can submit listing for free. He can provide the location, images, videos, and other information for  posting the property.
                                            </Card.Body>
                                    </Accordion.Collapse>
                                    <Card.Header>
                                        <Accordion.Toggle as={NavLink} variant="link" eventKey="2">
                                            Can I submit products for free?
                                            </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                            </Accordion>
                        </div> */}
                    </div>
                </div>
            </div>
    )
}

export default Contactform
