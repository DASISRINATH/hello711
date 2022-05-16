import React, {Fragment, useState, useEffect } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/agent-details/Content2';
import { Redirect } from "react-router-dom";
import axios from 'axios';



function Agentdetails(){

    const [agent, setAgent] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchUserInfo()
    }, []);

      const fetchUserInfo = async() =>{
        var agentid = window.location.pathname.split('/')[1];
         await axios.get(`${process.env.REACT_APP_API_URL}users/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/unique_link/${agentid}`)
         .then(response => {setAgent(response.data[0])})
         .catch(error => {setError(true)});
      }

        return (
            <>
               {error ?  (<Redirect to="/404" />) :
                <Fragment>
                    <MetaTags>
                        <title>Hello71 - Online Marketplace for Language Trainers & Learners</title>
                        <meta
                            name="description"
                            content="#"
                        />
                    </MetaTags>
                    {/* {console.log(match.params.slug)} */}
                    <Header/>
                    {agent.user_id ? (<Content agent={agent} agentid={agent.user_id}/>) : null}
                    <Footer/>
                </Fragment>
              }
            </>
        );
}

export default Agentdetails;