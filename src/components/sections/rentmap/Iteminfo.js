import React from 'react';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom';

const Itemdatamodal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [item, seItemid] = React.useState(props.item);
  return (
    <>
        <div className="listing-content">
            <div className="listing-title-wrapper mt-1">
                <h4 style={{marginBottom:'5px'}}>{item.title}</h4>
            </div>
            <div className="listing-price">
                <h5 style={{marginBottom:'5px'}} className="custom-primary ">Rs.{item.price}</h5>
            </div>
            {item.address !== '' && null}
            <span className=""> <i className="fas fa-map-marker-alt" /> {item.address}</span>
            <p className="mb-1">{item.description.slice(0,300)+'....'}</p>
        </div>
        {/* <div className="section section-padding pt-0 acr-listing-features">
            <h4 className="text-center-feature">Features :</h4>
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="listing-feature-wrapper">
                        <div className="listing-feature">
                            <i className="flaticon-picture" />
                            <h6 className="listing-feature-label">Propery Type</h6>
                            <span className="listing-feature-value">{item.sub_category.name}</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-ruler" />
                            <h6 className="listing-feature-label">Property Size</h6>
                            <span className="listing-feature-value">{item.area} {item.area_type}</span>
                        </div> */}
                        {/*
                        <div className="listing-feature">
                            <i className="flaticon-bone" />
                            <h6 className="listing-feature-label">Pet Friendly</h6>
                            <span className="listing-feature-value">Yes</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-chair" />
                            <h6 className="listing-feature-label">Furnished</h6>
                            <span className="listing-feature-value">Yes</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-fan" />
                            <h6 className="listing-feature-label">Cooling</h6>
                            <span className="listing-feature-value">Yes</span>
                        </div>
                        */}
                    {/* </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="listing-feature-wrapper">
                        {item.numberofbedrooms !== '' &&
                            <div className="listing-feature">
                                <i className="flaticon-pillow" />
                                <h6 className="listing-feature-label">Bed Rooms</h6>
                                <span className="listing-feature-value">{item.numberofbedrooms}</span>
                            </div>
                        } 
                        {item.numberofbathrooms !== '' && 
                            <div className="listing-feature">
                                <i className="flaticon-bathroom" />
                                <h6 className="listing-feature-label">Bathrooms</h6>
                                <span className="listing-feature-value">{item.numberofbathrooms}</span>
                            </div>
                        } */}
                        {/*
                        <div className="listing-feature">
                            <i className="flaticon-mailbox" />
                            <h6 className="listing-feature-label">Mail box</h6>
                            <span className="listing-feature-value">Yes</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-ruler" />
                            <h6 className="listing-feature-label">Property Size</h6>
                            <span className="listing-feature-value">3,000 Sqft</span>
                        </div>
                        */}
                    {/* </div>
                </div>
            </div> */}
           {/*
            <div >
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="listing-feature">
                            <i className="flaticon-key" />
                            <h6 className="listing-feature-label">Property Id</h6>
                            <span className="listing-feature-value">BPFXQEI</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-garage" />
                            <h6 className="listing-feature-label">Parking</h6>
                            <span className="listing-feature-value">Yes</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-history" />
                            <h6 className="listing-feature-label">Year Built</h6>
                            <span className="listing-feature-value">1979</span>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="listing-feature">
                            <i className="flaticon-new" />
                            <h6 className="listing-feature-label">Condition</h6>
                            <span className="listing-feature-value">New</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-ruler" />
                            <h6 className="listing-feature-label">Lot Size</h6>
                            <span className="listing-feature-value">89 Acres</span>
                        </div>
                        <div className="listing-feature">
                            <i className="flaticon-eye" />
                            <h6 className="listing-feature-label">View</h6>
                            <span className="listing-feature-value">City View</span>
                        </div>
                    </div>
                </div>
            </div>
           */}
        {/* </div> */}
    </>
  );
};

export default Itemdatamodal;

