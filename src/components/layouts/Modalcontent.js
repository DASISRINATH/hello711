import React from 'react';
import 'react-responsive-modal/styles.css';
import './css/modalstyle.css';
import { Modal } from 'react-responsive-modal';
import Mobileinputform from './Mobileinputform';
import Otpform from './Otpform';
import Adduserinfomodal from './Adduserinfomodal';
import Requirement from './Requirement';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';




const Modalcontent = ({checklogin}) => {
  
  const [open, setOpen] = React.useState(false);
  const [isLoggedin, setIsLoggedin] = React.useState(false);
  const [mobileinputform, setMobileinputform] = React.useState(true);
  const [otpmodal, setOtpmodal] = React.useState({status:false, otpvrfytoken:[]});


 

  //const [otp, setOtp] = React.useState({status:false, vrid:''});


  const Otp = (confirmationResult) =>{
    // console.log(confirmationResult);
    setOtpmodal({ status: true, otpvrfytoken:confirmationResult });
  }

  const Login = (userdata) => {
    //console.log(userdata);
    setOtpmodal({ status:false, otpvrfytoken:''});
    console.log(userdata.user_profile_photo); 
    localStorage.setItem('userlogin', JSON.stringify({loginstatus:true, loginuser:userdata.id}));
    var userinfo = JSON.parse(localStorage.getItem('userlogin'));
    {userinfo.loginuser.id != '' ? 
       setIsLoggedin(true) : 
       localStorage.clear()
       setIsLoggedin(false)
    }   
    {userinfo.loginstatus ? 
       checklogin() :
       //setOpen(false) : 
       localStorage.clear()
       setIsLoggedin(false)
    }

  }

  const timeOut = () =>{
    setOpen(false);
    setOtpmodal({ status: false, otpvrfytoken:''});
  }

  const Logout = () => {
    localStorage.clear();
    setIsLoggedin(false);
  }

  const clsmodal = () =>{
    setOpen(false);
  }


  return (
    <>

      {/*<Link to="#" onClick={() => setOpen(true)}> Login</Link>*/}
      {/* <Fab variant="extended" size="small" aria-label="add" onClick={() => setOpen(true)}>Login</Fab> */}
      {/* <Link to="/login" className="btn-custom primary">Login <i className="fas fa-user" /> </Link> */}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
        }}
      >
        {mobileinputform ? (<Mobileinputform Otp={Otp} />) : (<Otpform  otpvrftoken={otpmodal.otpvrfytoken} Login={Login} timeOut={timeOut} />)}
        {/*
        {(otpmodal.status == true &&
            <Otpform  otpvrftoken={otpmodal.otpvrfytoken} Login={Login} timeOut={timeOut} />)
        || (addusernamemodal == true &&
            <Adduserinfomodal clsmodal={clsmodal} Login={Login} />)
        ||
          <Mobileinputform Otp={Otp} />
        }
      */}
      

      </Modal>
    </>
  );
};

export default Modalcontent;

