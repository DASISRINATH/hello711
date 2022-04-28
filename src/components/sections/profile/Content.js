import React, { Component, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Formsection from './Formsection';
import ProfileSidebar from "./ProfileSideBar";
import { UserContext } from '../../../context/LoginContext';
import {Modal} from "react-responsive-modal";
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import HomeIcon from '@material-ui/icons/Home';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';


const Content = ()=>{
  const {loginuserId, fetchLoginUserData, loginuserData} = useContext(UserContext); 
  const [open, setOpen] = useState(false);
  var approvedCount = "0";
  if(loginuserData !== null) {
    approvedCount = Number(loginuserData.listings_count) - Number(loginuserData.pendings_count) + Number(loginuserData.rejected_count) + Number(loginuserData.indrafts_count);
  }
  useEffect(()=>{
    fetchLoginUserData(loginuserId);
  },[])
  const handleClick = ()=>{
    console.log(loginuserData);
    if(loginuserData!==null && loginuserData.listings_count===loginuserData.pendings_count){
      setOpen(true);
    }else{
      const url = window.location.pathname.split('/')[0]+"/user-details/"+loginuserId;
      window.open(url, "_blank");
    }
  }
  return(
    <>
      <div className="page-wraper">
        <div className="page-content bg-white">
          <div className="content-block">
          <div className="section-full browse-job" style={{paddingTop:'50px',paddingBottom:'60px',backgroundColor:'#F9F8F9'}}>
            <div className="container">
                <div className="row">
                  <ProfileSidebar path={"profile"}/> 
                  <div className="col-xl-9 col-lg-8 m-b30">
                    <div className="job-bx job-profile">
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase" style={{display:"inline"}}>Basic Information</h5>
                        {/* <Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link> */}
                        {/* <Link to={"./"} className="btn btn-sm btn-success float-right">{approvedCount}</Link> */}
                        {approvedCount == 0 ? 
                          <Link onClick={()=>setOpen(true)} className="btn-custom btn-sm float-right">Add New Listing</Link> 
                          :
                          <Link to={"/"+loginuserData.unique_link} className="btn-custom btn-sm float-right">Public Profile View</Link>
                        }
                        {/* <button onClick={handleClick} className="public-profile-button px-3 py-1">Public Profile View</button> */}
                      </div>
                      <Formsection />
                    </div>    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        showCloseIcon={false}
        center
        classNames={{
          overlay: 'customOverlay',
        }}

        styles={{modal:{
          padding: "0",
          maxWidth:'210px',
          borderRadius: "4px",

       }}}
      >
      <div>
        <ul className="mb-0">
        <li className="mt-0 pl-3 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce",fontSize:"16px",backgroundColor:"#f1f1f1"}}><span className="font-weight-bold">Sell</span></li>
        <Link to="/submit-listing/1" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce",}}><FilterHdrIcon /><span className="ml-1">Land/Plot</span></li></Link>
        <Link to="/submit-listing/2" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><ApartmentIcon/><span className="ml-1">Apartments</span></li></Link>
        <Link to="/submit-listing/3" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><HomeWorkIcon/><span className="ml-1">House/Villa</span></li></Link>
        <li className="mt-0 pl-3 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce",fontSize:"16px",backgroundColor:"#f1f1f1"}}><span className="font-weight-bold">Rent</span></li>
        <Link to="/submit-listing/4" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><HomeIcon/><span className="ml-1">House/Apartments</span></li></Link>
        <Link to="/submit-listing/5" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><BusinessIcon/><span className="ml-1">Commercial</span></li></Link>
        </ul>
      </div>
      
      </Modal>


    </>
  )
} 
export default Content;