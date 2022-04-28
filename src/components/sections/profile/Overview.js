import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./profile.css";

class Overview extends Component {
    constructor() {
        super();
        this.state = {
          isLoggedin: false,
          loggedinUser:[],
        }
      }

      componentDidMount = () =>{
        this.checklogin();
      }

      checklogin = () =>{
        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        {
            loginuserinfo != null && loginuserinfo.loginstatus != null ? 
            this.setState({ isLoggedin: loginuserinfo.loginstatus, loggedinUser:loginuserinfo.loginuser }) :  this.setState({ isLoggedin: false })
        }
      }


    render() {
        const {isLoggedin,loggedinUser,OverviewDiv, MyListingsDiv, MyFavouritesDiv, MyHistoryDiv} = this.state;

        return (
            <div className="section">
                  <div className="container mx-2">
                    <Link to="/submit-listing">
                      <div className="text-center" style={{padding:'40px 0px 40px 0px', border:'2px dashed #969191', borderRadius:'5px'}}>
                        <div className="py-2"> <span style={{padding:'10px 12px 10px 12px', border:'1px solid #969191', borderRadius:'50%',fontSize:'22px'}}><i class="fas fa-plus" ></i> </span></div>
                        <div className="py-2"> <span style={{fontSize:'20px'}}>New Listing  </span></div>
                      </div>
                    </Link>  
                  </div>
            </div>
        );
    }
}

export default Overview;