import React, {useContext, useEffect, useState, Fragment} from 'react';
import {UserContext} from "../../../context/LoginContext";
import {Link} from 'react-router-dom';
import {Modal} from "react-responsive-modal";
import Profileimg from "./Profileimg";
import CancelIcon from '@material-ui/icons/Cancel';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const ProfileSidebar = (props)=>{
    const {isLoggedIn, loginuserId, loginuserData, fetchLoginUserData} = useContext(UserContext);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        fetchLoginUserData(loginuserId);
    },[]);

    return(
        <>
            <div className="col-xl-3 col-lg-4 mb-30">
                <div className="sticky-top">
                    <div className="candidate-info">
                    
                        <div onClick={() => console.log(loginuserData)} style={{paddingTop: "0"}} className="candidate-detail text-center">
                        <div className="candidate-verify">
                            {loginuserData!== null && loginuserData.is_user_verified === "0" ? <div>
                                <span>Not Verified</span>
                                <CancelIcon className="candidate-clogo" />
                            </div> : <div>
                                <VerifiedUserIcon className="candidate-vlogo" />
                                <span>Verified</span> 
                            </div>}
                            
                        </div>
                            <div className="canditate-des">
                                <Link onClick={()=>setOpen(true)}>
                                <img
                                    src={
                                    loginuserData !== null
                                        ? loginuserData.user_profile_photo === ""
                                            ? process.env.PUBLIC_URL +
                                                "/assets/img/people/profile_ex.jpg"
                                            : process.env.REACT_APP_BASE_URL+"/uploads/" +
                                                loginuserData.user_profile_photo
                                        : process.env.PUBLIC_URL +
                                        "/assets/img/people/profile_ex.jpg"
                                    }
                                    alt="Click here to upload image.."
                                />
                                    <div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
                                        <i className="fa fa-camera"></i>
                                    </div>
                                </Link>
                            </div>
                            <div className="candidate-title">
                                <div className="">
                                    <h5 style={{marginBottom:'0px'}}>{loginuserData !== null && loginuserData.user_name}</h5>
                                    <p style={{marginBottom:'0px'}}>{loginuserData !== null && loginuserData.user_phone}</p>
                                    <p className="m-b0"><i className="fas fa-map-marker" aria-hidden="true"></i>{loginuserData !== null && ' '+loginuserData.city}</p>
                                    {/* <Link to={"/submit-listing"} className="btn-custom secondary button-sm">Submit Listing</Link> */}
                                    <div className="candidate-follow">
                                        <div>
                                            <strong>
                                                <p>{loginuserData !== null ? loginuserData.listings_count : "0"}</p>
                                            </strong>
                                                Listings
                                            
                                        </div>
                                        <div>
                                            <strong>
                                                <p>{loginuserData !== null ? loginuserData.follower_count : "0"}</p>
                                            </strong>
                                                Followers
                                        </div>
                                        <div>
                                            <strong>
                                                <p>{loginuserData !== null ? loginuserData.following_count : "0"}</p>
                                            </strong>
                                                Following
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul className="myprofile-options">
                            <li> <Link className={props.path==="profile" ? "active": ""} to="/myprofile"><i className="fas fa-user" aria-hidden="true"></i> Edit Profile</Link> </li>
                            {/* <li> <Link className={props.path==="listings" ? "active": ""} to="/profile-listings"><i className="fas fa-list" aria-hidden="true"></i> My Listings</Link> </li> */}
                            {/* <li> <Link className={props.path==="saved-listings" ? "active": ""} to="/profile-saved-listings"><i className="fas fa-heart" aria-hidden="true"></i> Favorite Listings</Link> </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            {/*/////------- Profile Image Upload Modal----------///// */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                center
                classNames={{
                overlay: "customOverlay",
                }}
            >
                <Profileimg clsmodal={() => setOpen(false)} />
            </Modal>
        </>
    )
}
export default ProfileSidebar;