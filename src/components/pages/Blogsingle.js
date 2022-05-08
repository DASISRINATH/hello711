import React, { Component, Fragment, useEffect, useState } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../sections/blogsingle/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/blogsingle/Content';
import axios from 'axios';

const Blogsingle = ({match})=>{
  const [blog, setBlog] = useState('');

  useEffect(()=>{
    fetchBlog();
  },[]);

  const fetchBlog = async ()=>{
    const postData = {
      title: match.params.slug
    }
    await axios.post(`${process.env.REACT_APP_API_URL}/feeds/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
    .then(response=>{
      console.log(response.data);
      setBlog(response.data[0]);
    })
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Hello71 - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell</title>
        <meta
          name="description"
          content="#"
        />
      </MetaTags>
      <Header/>
      {blog!=='' && (
        <>
          <Breadcrumb data={blog}/>
          <Content data={blog}/>
        </>
      )}
      <Footer/>
    </Fragment>
  );

}

export default Blogsingle;