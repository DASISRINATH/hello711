import React, {useState, useContext} from 'react';
import './css/styles.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import firebase from '../../DB/Fire';
import {Link} from 'react-router-dom';
import axios from "axios";
import FacebookLogin from 'react-facebook-login';
import { UserContext } from "./../../../context/LoginContext"



const useStyles = makeStyles((theme) => ({

  modalbtn: {
    width:'100%',
    height:'42px',
    color: 'white',
    fontWeight: 600, 
    backgroundImage: 'linear-gradient(to top, #353232de , #bb4f59 24%)',   
  }
}));

export default function Mobileinputform({Otp,clsmodal}) {


  const {fbLoginAction} = useContext(UserContext);

  const [mobileNumber , setMobileNumber] = useState()
  const [alertmsg , setAlertmsg] = useState({status: false})
  const [validation , setValidation] = useState(false)
  const [flag, setFlag] = useState(true);

  const classes = useStyles();


  const onSubmit = (e) =>{
    e.preventDefault(); 

    if(!mobileNumber){
      setValidation(true)
    }else if(mobileNumber.length !== 12){
      setValidation(true)
    }else{
      showMsg();
      var phoneNumber = "+"+mobileNumber;
      let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
        'size': 'invisible',
        'callback': (response) => {
          }
      })
      firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
       .then((confirmationResult) => { 
            otpvrid(confirmationResult);      
         }).catch((error)=>{
          alert('Something went wrong please try again'); 
          clsmodal()  
         })
    }
  }

  const otpvrid = (confirmationResult) =>{
    Otp(confirmationResult);
  }

  const showMsg = (e) => {
    setAlertmsg({ status:true,});
  }

  const responseFacebook = async (response) => {

    console.log("FB login ");
    console.log(response);
    console.log("FB login End"); 

    if(response.status !== "unknown"){
      const fburInfo = {facebook_id:response.id, user_name:response.name, user_email:response.email, device_token:response.accessToken}; 
      var pathName = window.location.pathname;
      fbLoginAction(fburInfo,pathName)
      clsmodal(); 
      setAlertmsg({ status:false,});     
    }else{
      clsmodal();
      setAlertmsg({ status:false,});
      alert("FB login Failed. Plz check your Email and Password.")
    }
  }


  return(
      <div className="phoneformdiv">
        {alertmsg.status ? (<h4 className="text-center text-success">Please Wait...</h4>) : (
        <div>
          <h4 className="text-center">Login/Singup</h4>
          <p className="modaltitle">Enter Your Phone Number:</p>
          <form  onSubmit={onSubmit}>
            <div>
              <PhoneInput
                onlyCountries={['in']}
                country={'in'}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                  autoFocus: true,
                }}
                inputStyle={{
                  width:'100%',
                  height:'42px',
                  fontSize:'18px',
                }}
                value={mobileNumber}
                onChange={phone => setMobileNumber(phone)}
              />
            </div>
            {validation && <p className="text-danger">Enter Valid Phone Number</p>}  
            <div style={{paddingTop:"12px",paddingBottom:"12px",}}>
            <Button type="submit" className={classes.modalbtn} name="submit" >Login</Button>
            </div>

            {/* <div className="text-center">
                <p>--OR--</p>
            </div>

            <div className="text-center my-2">

                <FacebookLogin
                  appId="566906578094663"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="my-facebook-button-class"
                  icon="fa-facebook"
                />

            </div> */}

            <div>
              <input type="checkbox" checked={flag} onChange={()=>setFlag(!flag)}/>
              <label> I here by agree to the <Link>Terms and Conditions</Link></label>
            </div>
            {!flag && <p className="text-danger">It should be accepted to login.</p>}
          </form>
        </div>             
        )}
        <div id="recaptcha"></div>
      </div>  
  );

}

//8639142119