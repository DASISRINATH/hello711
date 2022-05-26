import React, {useState, useEffect, useContext} from 'react';
import './css/modalstyle.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import firebase from '../DB/Fire';
import {Link} from "react-router-dom";
import axios from "axios";
import FacebookLogin from 'react-facebook-login';
import { UserContext } from "./../../context/LoginContext"



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
  const [countryCode,setCountryCode] = useState('');

  const getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        const text = data.country_code.toLowerCase();
        setCountryCode(text);
        // console.log(data);
    }).catch((error) => {
        console.log(error);
    });
    console.log(countryCode);
};

  useEffect(() => {
    getGeoInfo();
  },[]);


  const onSubmit = (e) =>{
   e.preventDefault(); 
    //console.log("clicked");
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
            //console.log(confirmationResult);    
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

//  const responseFacebook = async (response) => {
//
//    setAlertmsg({ status:true,});
//    var formData = {
//      facebook_id:"10219976291624923",//response.id,
//      user_name:"Kiran Kumar",//response.name,
//      user_email:"ranik124@gmail.com",//response.email,
//      device_token:"EAAIDmTk1SkcBAJmSw2TsKZC206EKsErP0BMmseMFH7n3Xkc6vrAfEueATxHaKWdXYXd4Og9xsSTVNCmWtQF2OM1yRZCZBepb8dVMBQ0IJsPSqYs16tBLXNNUkLStFZAw4kgB6EqsreycDGu8hRdBXBhNSxwbQ7GYNd7Mti1BfZCSpZAxik2rOPqZCkIZCBhHdZAFPzYL9xdcGS9RPfWj1NrMT9BZBHAtMKGGcZD",//response.accessToken,
//    };   
//    //await axios.post(`${process.env.REACT_APP_API_URL}users/facebook_register/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, formData)
//    await axios.post(`http://localhost/prod-rs-web-master/index.php/rest/users/facebook_register/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, formData)
//    .then(response => {
//      setAlertmsg({ status:false,});
//      clsmodal();
//      newLocalStorage(response)
//      setLoginuserData(response)
//      })
//    .catch(error => {
//        setAlertmsg({ status:false,});
//        clsmodal();
//        alert("Something went wrong plz try again later")
//      });
//  }

  return(
      <div className="phoneformdiv">
        {alertmsg.status ? (<h4 className="text-center text-success">Please Wait...</h4>) : (
          <div>
             <h4 className="text-center">Login / SignUp </h4>
             <p className="modaltitle">Enter Your Phone Number:</p>
             <form  onSubmit={onSubmit}>
                <div className="inputBox">
                  <PhoneInput
                    onlyCountries={['us','in']}
                    country={countryCode}
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
                  //  disableDropdown={true}
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
                    onClick={()=> setAlertmsg({ status:true,})}
                  />

                </div> */}

                <div className="modalbox-tc">
                  <input type="checkbox" checked={flag} onChange={()=>setFlag(!flag)}/>
                  <label> I here by agree to the <Link to="/terms-and-conditions" target="_blank">Terms and Conditions</Link></label>
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