import React, { Component,useContext } from 'react';
import { locationlist, statuslist, pricerangelist, bedslist, bathroomslist, typelist, diameterlist } from '../../../data/select.json';
import Select2 from 'react-select2-wrapper';
import classNames from 'classnames';
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";
import Search from "./Search";
import Modalbox from "../../layouts/Modal";

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            advancesearch: false,
            location: null,
            lat: null,
            lng: null,
        }
        this.advancetoggle = this.advancetoggle.bind(this);
    }
    advancetoggle() {
        this.setState({
            advancesearch: !this.state.advancesearch
        })
    }
    
    render() {
        var options =[
            { value: 'itm_loca7b66748e03d457e976ca63a50e1bde0', label: 'Hyderabad', lat: "17.385000", lng: "78.486702" },
            { value: 'itm_loc32db8931aaf39e3dfb5c388799109d5b', label: 'Bengaluru', lat: "12.971600", lng: "77.594597", },
            { value: 'itm_loc247387cc3640d1a88f3d9342d216dc13', label: 'Chennai', lat: "13.082700", lng: "80.270699",},
           //  { value: 'itm_locc91e7fd5ffc739b26951228b0a564569', label: 'Warangal' },
           //  { value: 'itm_loc0da9dce069f1f834f38f262ecc57ffd1', label: 'Mancherial' },
           //  { value: 'itm_loc892e3dbe2fbf07ae7b19455a4e75b28c', label: 'Karim Nagar' },
          ]

          


        return (
            <div className="banner banner-1 banner-3 dark-overlay bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/3.jpg)" }}>
            {/* <div className="banner banner-1 banner-3 dark-overlay bg-cover bg-center"> */}
                <div className="container">
                    <div className="banner-item">
                        <div className="banner-inner">
                            <div className="banner-text">
                                <h2 className="title text-white">Explore New Real Estate Properties</h2>
                                <p className="subtitle text-white">Select Your City and find out suitable properties for your investment.</p>
                                {/* <Modalbox mb_view={true}/> */}
                            </div>
                            <div className="acr-filter-form">
                              {/* Location Search component */}
                                <Search/>
                              {/* Location Search component End*/}
                                {/* <form onSubmit={handleSubmit}> */}
                                    {/* <div className="row" >
                                        <div className="col-lg-10 col-md-6">
                                            <div className="form-group acr-custom-select">
                                            <Select
                                              placeholder="Select Location"
                                              value={options.find(obj => obj.value === this.state.location)} // set selected value
                                              options={options}
                                              onChange={e=>this.setState({location: e.value, lat:e.lat , lng:e.lng})}
                                            />
                                            </div>
                                        </div> */}
                                        {/* <div className="col-lg-3 col-md-6">
                                            <div className="form-group acr-custom-select">
                                                <label>Status: </label>
                                                <Select2 data={statuslist} options={{
                                                    placeholder: 'Any Status',
                                                }} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            <div className="form-group acr-custom-select">
                                                <label>Price Range: </label>
                                                <Select2 data={pricerangelist} options={{
                                                    placeholder: 'Any Range',
                                                }} />
                                            </div>
                                        </div> */}
                                        {/* <div className="submit-btn col-lg-2 col-md-6">
                                            <div className="form-group">
                                            <Link to="/properties" className="btn-custom secondary btn-block">Search</Link> */}
                                                {/* <Link to={{pathname: "/properties", state: { locationId:this.state.location, lat:this.state.lat, lng:this.state.lng}}} className="btn-custom secondary btn-block">Search</Link> */}
                                                {/* <button type="submit" className="btn-custom secondary btn-block">Search</button> */}
                                            {/* </div>
                                        </div> */}
                                    {/* </div> */}
                                    {/* <div className={classNames("advanced-search", { "d-block": this.state.advancesearch })}>
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6">
                                                <div className="acr-custom-select form-group">
                                                    <label>Beds: </label>
                                                    <Select2 data={bedslist} options={{
                                                        placeholder: 'Any amount',
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6">
                                                <div className="acr-custom-select form-group">
                                                    <label>Bathrooms: </label>
                                                    <Select2 data={bathroomslist} options={{
                                                        placeholder: 'Any amount',
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6">
                                                <div className="acr-custom-select form-group">
                                                    <label>Type: </label>
                                                    <Select2 data={typelist} options={{
                                                        placeholder: 'Any Type',
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6">
                                                <div className="acr-custom-select form-group">
                                                    <label>Diameter: </label>
                                                    <Select2 data={diameterlist} options={{
                                                        placeholder: 'Any Range',
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                {/* </form> */}
                                {/* <div className={classNames("advanced-search-trigger semi-circle", { "active": this.state.advancesearch })} onClick={this.advancetoggle}>
                                    <i className="fas fa-chevron-down" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;