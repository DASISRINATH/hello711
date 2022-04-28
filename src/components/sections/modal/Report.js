import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/LoginContext";
import 'react-responsive-modal/styles.css';
import './css/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link, Redirect } from 'react-router-dom';
import axios from "axios";

const Report = (props)=>{
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(null);
  const {isLoggedIn,loginuserId} = useContext(UserContext);
  //const [f, setF] = useState(false);

  useEffect(() => {
    setLoading(false)
    setError(false)
    setMsg(null)
  },[]);

  const reportItem = async ()=>{
    if(isLoggedIn){
      setError(false)
      setLoading(true)
      var postData = {
           item_id:props.userData.id,
           reporting_user:loginuserId
      }
      await axios.post(`${process.env.REACT_APP_API_URL}users/report/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
      .then(response =>{
        setLoading(false)
        setMsg(response.data.message)
      })
      .catch(err => {
        setLoading(false)
        setError(true)
        setMsg("Invalid User or Item")        
      });
    }  
  }

  return (
    <>
    <li onClick={()=>setOpen(true)}>
      {" "}
      <Link>
        {" "}
        <i class="fas fa-flag"></i>Report{/* <i class="fas fa-flag"></i> {props.userData.user.user_id === '1' ? 'Reported' : 'Report'} */}
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
       width:"25%"
     }}}
    >
      {loading && 
        <div className="my-4 text-center">
          <h5 className="text-success">Loading...</h5>
        </div>
      }  

      {!loading && error ? (
          <div className="my-4 text-center">
            <h5 className="text-danger">{msg}</h5>
          </div>
          ):(
            <div className="my-4 text-center">
              <h5 className="text-success">{msg}</h5>
            </div>
          )
      }

      {!loading && msg === null &&
        <div className="my-4 text-center">
          {/* <h5>Either you are already following {props.userData.user.user_name}. <br></br>Or there is some problem with the server</h5> */}
          <h5>Really Do You want to report?</h5>
          <div className="text-center">
              <button className="btn btn-primary mx-1" onClick={()=> reportItem()}>Confirm</button>
              <button className="btn btn-dark mx-1" onClick={()=>setOpen(false)}>Cancel</button>
          </div>
        </div>
      }
    </Modal>
    </>
  )
}


export default Report;