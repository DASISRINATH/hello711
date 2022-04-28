import React, {useState, useEffect, useContext} from 'react';
import { UserContext } from "./../../context/LoginContext"
import './css/modalstyle.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import axios from "axios";
import  { Redirect } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  modalbtn: {
    width:'100%',
    height:'42px',
    color: 'white',
    fontWeight: 600, 
    backgroundImage: 'linear-gradient(to top, #353232de , #bb4f59 24%)',   
  }
}));

export default function Otpform({otpvrftoken, timeOut, clsmodal}) {

  const {loginAction} = useContext(UserContext);

  const classes = useStyles();
  const [otpcode, setOtpcode] = useState();
  const [timeLeft, setTimeLeft] = useState(60);
  //const [otpverification, setOtpverification] = useState({status:false, vrid:[]});
  const [alertmsg , setAlertmsg] = useState({status: false})
  const [validation , setValidation] = useState(false)
  

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return timeOut();

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);




  const onSubmitotp = (e) =>{
    e.preventDefault();
      //alert(otpcode);
      
      if(!otpcode){
        setValidation(true)
      }else if(otpcode.length !== 6){
        setValidation(true)
      }else{
        showMsg();
        //console.log(confirmationResults);
        const code = otpcode;
        var  confirmationResults = otpvrftoken;
        confirmationResults.confirm(code).then((result) => {
      
          //console.log(result.user);
          const device_token = result.user.refreshToken;               
          const mobile_id = result.user.uid;
          const phone_no = result.user.phoneNumber; 
          loginUserapi(device_token, mobile_id, phone_no);
      
        }).catch((error) => {
          alert('Something went wrong please try again');
          clsmodal()
          // User couldn't sign in (bad verification code?)
          // ...
        });
      }
  }

  const showMsg = (e) => {
    setAlertmsg({ status:true,});
  }

  const loginUserapi = (device_token, mobile_id, phone_no) => {
    const fireurInfo = {user_phone:phone_no, device_token:device_token, phone_id:mobile_id}; 
    var pathName = window.location.pathname;
    loginAction(fireurInfo,pathName)
  }
  

  return (
    <div className="otpformdiv">
      {alertmsg.status ? (<h4 className="text-center text-success">Please Wait...</h4>) : (
        <>
          <p className="modaltitle">Enter OTP to Login</p>
          <form>
             <div>
                <FormControl style={{width: "100%"}}  variant="outlined">
                  <OutlinedInput
                    value={otpcode}
                    onChange={e => setOtpcode(e.target.value)}
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                      maxLength: 6,
                    }}
                    placeholder="******"
                    style={{
                        paddingLeft:'16px',
                        fontSize: '21px',
                        color: 'black',
                        letterSpacing: '12px',
                        width: '100%',}}                           
                  />
                </FormControl>
             </div>
             {validation && <p className="text-danger">Enter Valid OTP</p>}
             <div style={{paddingTop:"12px",paddingBottom:"12px",}}>
             <Button onClick={onSubmitotp} className={classes.modalbtn} >verify</Button>
             <div style={{float:'left',}}>0.{timeLeft}sec</div>
             {/*<div style={{float:'right',color: '#497da2c2',}}>Resend OTP</div>*/}
             </div>
          </form>
        </>  
      )}
    </div>
  );
}