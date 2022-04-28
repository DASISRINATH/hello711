import React, { Component, Fragment } from 'react';
import  { Redirect } from 'react-router-dom';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfive';
import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/profile/Content2';
import Profileimg from '../sections/profile/Profileimg';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
          isLoggedin:'false',
        }
      }


      componentDidMount = () =>{
           this.checkloginprofile();
      }

      checkloginprofile = (e) =>{
        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        {
            loginuserinfo != null && loginuserinfo.loginstatus != null ? 
            this.setState({ isLoggedin: loginuserinfo.loginstatus,})  : this.setState({ isLoggedin: false }) 
        }
      }


    render() {
        const {isLoggedin} = this.state;
          
        const updatelocalStorage = () =>{
           this.checkloginprofile();
        }

        return (
            <>
               {isLoggedin ? (
                  <Fragment>
                      <MetaTags>
                          <title>INDMarketplace - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | My Account</title>
                          <meta
                              name="description"
                              content="#"
                          />
                      </MetaTags>
                      <Header />
                      <Breadcrumb />
                      <Content updatelocalStorage={updatelocalStorage} />
                      <Footer/>
                  </Fragment>
               ): (<Redirect to='/' />)}
            </>
        );
    }
}

export default Profile;