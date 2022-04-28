import React, {Fragment, Component, useRef, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocationsData } from './../../slices/items/locationsSlice';
import { fetchItemListData } from './../../slices/items/itemSlice';

const Content = (props) => {
    const locations = useSelector(state => state.locations.location);
    const error = useSelector(state => state.locations.error);
    const loading = useSelector(state => state.locations.loading);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchLocationsData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectLocation = (id) => {
        //alert(id);
        dispatch(fetchItemListData(id))
    }

  return (
    <Fragment>
        <MetaTags>
            <title>Bhoomi - Real Estate React Template | About Us</title>
            <meta
                name="description"
                content="#"/>
        </MetaTags>
        <div className="container">
            <div className="my-5">
                <h3 className="text-center">Please Select Location</h3>
                <div className="my-5">
                    <div className="row">
                        {console.log(locations)}
                        {locations === undefined || loading === true ? (
                            error === 'Rejected' ? (<h5 className="text-danger">Something went wrong. please try again later.</h5>) : (<h5 className="text-center">Loading...</h5>)
                           ) : locations.map((location, i) => (
                            <div className="col-md-6">
                                <article className="post m-4">
                                    <div className="post-thumbnail">
                                        <Link to="/home" onClick={() => selectLocation(location.id)}><img src={process.env.PUBLIC_URL + "/assets/img/blog/1.jpg"} alt="blog post" /></Link>
                                    </div>
                                    <div className="post-body">
                                        <h5 className="post-title text-center"> { location.name === '' ? 'NO Title' : <Link to={{pathname: "/home/"+location.name+"", state: {locationId:location.id} }} > {location.name} </Link> } </h5>
                                    </div>
                                </article>
                            </div>
                         ))}
                        {// listing.map((item, i) => ( <p className="text-center">{ item.title == '' ? 'NO Title' : item.title }</p> ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  );
};

export default Content;

