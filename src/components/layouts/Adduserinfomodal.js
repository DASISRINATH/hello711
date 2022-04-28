import React,{ useState, useEffect,Fragment, useContext } from 'react';
import { UserContext } from "./../../context/LoginContext";
import 'react-responsive-modal/styles.css';
import './css/modalstyle.css';
import { Modal } from 'react-responsive-modal';
import Form from './Urform';



const Adduserinfomodal = () => {
  const {isLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);
  //const [isLoggedin, setIsLoggedin] = React.useState(false); setFirstLogin
  const [open, setOpen] = React.useState(true);


  return (
    <>
       {/* {mobileinputform && otpmodal.status == false ? (<Mobileinputform Otp={Otp} clsmodal={clsmodal} />) : (<Otpform  otpvrftoken={otpmodal.otpvrfytoken} Login={Login} timeOut={timeOut} />)} */}
      {/* {loginuserData !== null && loginuserData.user_name === '' &&  */}
         {/* console.log('testing modal 222222222====>')  */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          center
          classNames={{
            overlay: 'customOverlay',
          }}
        >
          <div className="phoneformdiv">
           <Form />
          </div>
        </Modal>
       {/* } */}
    </>
  );
};

export default Adduserinfomodal;

