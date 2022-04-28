import React,{useState, useEffect, useContext} from 'react';
import { UserContext } from "./../../../context/LoginContext";
import Editprofile from './Editprofile';


const Formsection = (props) => {

    const {isLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);

    useEffect(() => {
        fetchLoginUserData(loginuserId);
	},[]);


  return (
    <>
        <div className="acr-welcome-message">
            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p> */}
        </div>
         {loginuserData !== null && <Editprofile userData={loginuserData}/>} 
        {/* <hr /> */}
        {/* <div className="acr-welcome-message">
            <h3>Security</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
        </div>
        <form>
            <div className="row">
                <div className="col-lg-6 form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                </div>
                <div className="col-lg-6 form-group">
                    <label>Repeat Password</label>
                    <input type="password" className="form-control" placeholder="Repeat Password" />
                </div>
                <div className="col-lg-12 form-group">
                    <label>Upload Your ID</label>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="propertyThumbnail" />
                        <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn-custom">Save Changes</button>
        </form> */}
    </>
  );
};

export default Formsection;

