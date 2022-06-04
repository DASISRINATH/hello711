import React,{useState, useEffect, useContext, } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "./../../context/LoginContext";
import './css/modalstyle.css';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom';

const Form = (props) => {

    const {isLoggedIn,
           loginuserId,
           loginuserData,
           fetchLoginUserData,
           updateLoginUserData,
           loading,
           setLoading,
           successMsg, 
           setSuccessMsg,
           errormsg, 
           setErrormsg
        } = useContext(UserContext);

    //const [isLoggedin, setIsLoggedin] = useState(false);
    const [user_name, setUser_name] = useState(loginuserData !== null ?  loginuserData.user_name : '');
    const [city, setCity] = useState(loginuserData !== null ?  loginuserData.city : '');
    const [listing_by, setListing_by] = useState(loginuserData !== null ?  loginuserData.listing_by : '');


    const onSubmit = (e) =>{
        e.preventDefault();
        if(isLoggedIn){
            setSuccessMsg(false)
            setErrormsg(false)
            setLoading(true)
            var formData = {
                user_name:user_name,
                city:city,
                listing_by:listing_by
            };
            updateLoginUserData(formData)
        }else{
            alert('Please Login first.')
        }
    }


  return (
    <>
        <div>
            <p className="modaltitle">Please Enter Your Details</p>
            {successMsg ? (<h5 className="text-success">User Profile Successfully Updated.</h5>) : null}
            {errormsg ? (<h5 className="text-danger">Operation Failed try Again.</h5>) : null}
            <form onSubmit={onSubmit} >
                <div className=" form-group">
                    <label>Your Name</label>
                    <input type="text" className="form-control" value={user_name} onChange={e =>setUser_name(e.target.value)} placeholder="Your Name" name="user_name" required />
                </div>
                <div className="form-group">
                   {/* <label>Your Location :</label>
                    <select className="form-control" name="type"  onChange={e =>setCity(e.target.value)} required>
                        <option value="">Select Your Location</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Warangal">Warangal</option>
                        <option value="karimnagar">karimnagar</option>
                    </select> */}
                    <label>City</label>
                    <input type="text" className="form-control" value={city} onChange={e =>setCity(e.target.value)} placeholder="Your City" name="city" required/>
                </div>
                <div className="form-group">
                    <label>You are a</label>
                    <select className="form-control" name="listing_by" onChange={e =>setListing_by(e.target.value)} required>
                        <option value=""  >Select You are</option>
                         {listing_by == 'Dealer' ? (<option value="Dealer" selected>Student</option>): (<option value="Dealer">Student</option>)}
                         {listing_by == 'Owner' ? (<option value="Owner" selected>Trainer</option>): (<option value="Owner">Trainer</option>)}
                         {listing_by == 'Builder' ? (<option value="Builder" selected>Organisation</option>): (<option value="Builder">Organisation</option>)}
                    </select>
                </div>
                <div style={{paddingTop:"12px",paddingBottom:"12px",}}>
                  <button type="submit"  className="btn modalbtn" ><span style={{color:'aliceblue',fontWeight:'800'}}>Save</span></button>
                </div>
            </form>
            {loading ? (<h5 className="text-info">Loading...</h5>) : null}
        </div>
    </>
  );
};

export default Form;

