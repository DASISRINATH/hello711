import React,{ useState, useEffect,Fragment, useContext } from 'react';
import { UserContext } from "./../../../context/LoginContext"
import 'react-responsive-modal/styles.css';
import './css/styles.css';
import { Modal } from 'react-responsive-modal';
import Mobileinputform from './Mobileinputform';
import Otpform from './Otpform';
import { Link, Redirect } from 'react-router-dom';




const Loginmodal = (props) => {
  const {isLoggedIn} = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [otpmodal, setOtpmodal] = React.useState({status:false, otpvrfytoken:[]});
  const [addusernamemodal, setAddusernamemodal] = React.useState(false);
  const [loginuserdata, setLoginuserdata] = React.useState();


  const Otp = (confirmationResult) =>{
    setOtpmodal({ status: true, otpvrfytoken:confirmationResult });
  }

  const timeOut = () =>{
    setOpen(false);
    setOtpmodal({ status: false, otpvrfytoken:''});
  }

  return (
    <>
      {/* <Link className="btn-custom primary" onClick={() => setOpen(true)} >Login <i className="fas fa-user" /> </Link> */}
      <li onClick={()=>setOpen(true)}>
        {" "}
        <Link /*to="tel:+123456789"*/>
          {" "}
          <i className={props.icon} /> {props.text} 
        </Link>{" "}
      </li>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
        }}
      >
        {otpmodal.status == true ? (<Otpform  otpvrftoken={otpmodal.otpvrfytoken} timeOut={timeOut}  clsmodal={()=>setOpen(false)} />) : (<Mobileinputform Otp={Otp} clsmodal={()=>setOpen(false)} />) }
        {/*
        {(otpmodal.status == true &&
            <Otpform  otpvrftoken={otpmodal.otpvrfytoken} timeOut={timeOut} />)
        || (addusernamemodal == true &&
            <Adduserinfomodal loginuserdata={loginuserdata} clsmodal={clsmodal} />)
        ||
          <Mobileinputform Otp={Otp} />
        }*/}
      
      </Modal>
    </>
  );
};

export default Loginmodal;

