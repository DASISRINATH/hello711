import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/LoginContext";
import 'react-responsive-modal/styles.css';
import './css/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

const FollowUser = (props)=>{
  const [open, setOpen] = useState(false);
  const {loginuserId} = useContext(UserContext);
  const [f, setF] = useState(false);

  //useEffect(()=>{
  //  follow()
  //  console.log("modal rendered");
  //})

  const follow = async ()=>{
    var postData = {
      user_id: loginuserId,
      followed_user_id: props.userData.user.user_id
    }
    await axios.post(`${process.env.REACT_APP_API_URL}userfollows/add_follow/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
      .then(response => (response.is_followed==1?setF(true):null))
  }

  return (
    <>
    <li onClick={()=>setOpen(true)}>
      {" "}
      <Link /*to="/listing-details-v1" */ onClick={()=> follow()}>
        {" "}
        <i className="fas fa-bookmark" /> {props.userData.user.user_id === '1' ? 'Following' : 'Follow User'}
      </Link>
      {" "}
    </li>

    <Modal
     open = {open}
     onClose={()=>setOpen(false)}
     center
     classNames = {{
       overlay: 'customOverlay'
     }}
     styles={{modal:{
       width:"40%"
     }}}
    >
      <div className="my-4 text-center">
        {
          f===true?(
            <h5>Your are following {props.userData.user.user_name}</h5>
          ):(
            <h5>Either you are already following {props.userData.user.user_name}. <br></br>Or there is some problem with the server</h5>
          )
        }
      </div>
    </Modal>
    </>
  )
}


export default FollowUser;