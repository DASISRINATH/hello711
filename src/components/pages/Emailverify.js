import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
// import Content from '../sections/verification/Content';
import {Link, Redirect } from "react-router-dom";
import axios from "axios";

function Emailverify(){

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        activeEmail()
    }, []);

       const activeEmail = async() =>{
          setLoading(true) 
          var formData = {
            verify_token:window.location.pathname.split('/')[1],
          };  
          await axios.post(`${process.env.REACT_APP_API_URL}users/activate/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, formData)
          .then(response => {
              setLoading(false)
              setSuccess(true)
            })
          .catch(error => {
              setLoading(false)
              setError(true)
            });
       }

        return (
            <>
               {error ?  (<Redirect to="/404" />) :
                <Fragment>
 
                    {/* {console.log(match.params.slug)} */}
                    <Header/>
                    {/* {agent.user_id ? (<Content agent={agent} agentid={agent.user_id}/>) : null} */}
                    <div className="section agent-wrapper">
                        <div className="container">
                            {loading && <h5 className="text-center">Please wait...</h5>}
                           {success && <> 
                            <h3><span className="text-center text-success">Congratulations</span>. Your Email was Verified....</h3>
                            <p className="text-center"><span>Go to </span><Link to="/">Home</Link></p>
                           </>}
                           {error && <>
                            <h3><span className="text-center text-danger">Sorry</span>.Something went wrong plz try Again later.</h3>
                            <p className="text-center"><span>Go to </span><Link to="/">Home</Link></p>
                           </>}
                        </div>
                    </div>
                    <Footer/>
                </Fragment>
              }
            </>
        );
}

export default Emailverify;