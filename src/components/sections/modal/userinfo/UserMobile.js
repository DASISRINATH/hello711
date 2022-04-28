import React,{ useState, useEffect,Fragment, useContext } from 'react';
import { UserContext } from "./../../../../context/LoginContext"
import 'react-responsive-modal/styles.css';
import './../css/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link, Redirect } from 'react-router-dom';




const Usermobile = (props) => {
  const {isLoggedIn} = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <li onClick={()=>setOpen(true)}>
        {" "}
        <Link /*to="tel:+123456789"*/>
          {" "}
          <i className="fas fa-phone" /> View Number 
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
        <div className="my-4">
            {props.path === 'agent' ? (
              <>
                <h5 className="text-center mx-3 my-1">User :  {props.userData.user_name }</h5>
                <h5 className="text-center mx-3 my-1">Mobile : <Link >{props.userData.user_phone}</Link></h5>
              </>
            ):(
              <>
                <h5 className="text-center mx-3 my-1">User :  {props.userData.user.role_id !== '4' ? props.userData.listed_by_name : props.userData.user.user_name }</h5>
                <h5 className="text-center mx-3 my-1">Mobile : <Link >{props.userData.user.role_id !== '4' ? props.userData.listed_by_phone : props.userData.user.user_phone}</Link></h5>
              </>
            )}
        </div>
        {/* {otpmodal.status == true ? (<Otpform  otpvrftoken={otpmodal.otpvrfytoken} timeOut={timeOut} />) : (<Mobileinputform Otp={Otp} />) } */}
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

export default Usermobile;

