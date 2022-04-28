import React, { useState, useEffect,Fragment, useContext } from 'react';
import { UserContext } from "./../../../context/LoginContext"
//import Notifications from 'react-notifications-menu';
import bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Popover, Dropdown,DropdownButton,ButtonGroup,DropdownType, Toast} from 'react-bootstrap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import axios from 'axios';
import { Link } from 'react-router-dom';

  
export default function Notifications(props) {
    const {isLoggedIn,loginuserId, loginuserData, fetchLoginUserData} = useContext(UserContext);

    const [notifications, setNotifications] = React.useState([]);
    const [pushNotifications, setPushNotifications] = React.useState([]);


    useEffect(() => {
        if(isLoggedIn){
            fetchNotifications()
            fetchPushNotifications()
            console.log(pushNotifications)
            if(loginuserData === null){
                fetchLoginUserData(loginuserId)
            }
        }else{
            setNotifications([])
            setPushNotifications([])
        }
	},[]);

    const fetchNotifications = async ()=>{
        if(isLoggedIn && loginuserId !== null){
            var postData = {
                user_id:loginuserId,
            };

            await axios.post(`${process.env.REACT_APP_API_URL}noti_messages/all_notis/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
            .then(response => setNotifications(response.data.filter(noti => noti.is_read === '0')) )
            .catch(error => {
                setNotifications([])
            });
        }
      } 
    
    const deleteNotifications = (noti)=>{
       
        if(isLoggedIn && loginuserId !== null && noti !== null && loginuserData !== null){

            if(noti.is_read === '0' && noti.id !== ''){

                var readData = {
                    noti_id: noti.id,  
                    user_id:loginuserId,
                    device_token:loginuserData.device_token,
                 };
                 axios.post(`${process.env.REACT_APP_API_URL}notis/is_read/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, readData
                 ).then(res=> {
                    var postData = {
                        noti_id:noti.id,
                        user_id:loginuserData.user_id,
                        is_visible:'0',
                    };
                   
                   axios.post(`${process.env.REACT_APP_API_URL}noti_messages/delete_noti/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
                   .then(response => fetchNotifications())
                   .catch(error => {
                       alert('Operation failed try again')
                   });
                });
            }  
        }
      }


      const fetchPushNotifications = async ()=>{
        if(isLoggedIn && loginuserId !== null){
    
            var postData = {
                user_id:loginuserId,
                is_read:'0',
            };

            if(postData.user_id){
                await axios.post(`${process.env.REACT_APP_API_URL}notifications/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
                .then(response => setPushNotifications(response.data))
                .catch(error => {
                    setPushNotifications([])
                });
            }  
        }
      } 

      const deletePushNotifications = async (id)=>{
        if(isLoggedIn && loginuserId !== null && id !== null){
            var postData = {
                id:id,
                user_id:loginuserId,
            };

            await axios.post(`${process.env.REACT_APP_API_URL}notifications/delete_noti/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
            .then(response => fetchPushNotifications())
            .catch(error => {
                alert('Operation failed try again')
            });
        }   
      } 


    return (

        <div className="notification-dropdown">
            <a id="dLabel" role="button" data-toggle="dropdown" data-target="#" >
                <i className="fas fa-bell" style={{fontSize:'18px',}} ></i>
            </a>
            
            {notifications.length + pushNotifications.length > 0 && <span className="notification-icon-button__badge">{notifications.length + pushNotifications.length}</span>}

            <ul className="dropdown-menu  notifications dropdown-menu-right"  role="menu" aria-labelledby="dLabel">
                
                <div className="notification-heading">
                    <h5 className="menu-title">Notifications</h5>
                    {/* <h5 className="menu-title pull-right">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h5> */}
                </div>
                <hr style={{marginTop:'0px',marginBottom:'0px'}}/>
                {/* <li className="divider"></li> */}
                <div className="notifications-wrapper">
                    {notifications.length < 1 && pushNotifications.length < 1 && <p className="item-info mx-3">No More Notifications.</p>}

                    {/* {pushNotifications.map((noti, i) => (
                        <a className="content"  >
                            <div className="notification-item">
                                <h5 className="item-title" style={{marginBottom:'0px',fontWeight:'300',fontSize:'16px'}}>{noti.title}</h5>
                                <p className="item-info">{noti.description}</p>
                                <button className="btn btn-sm btn-danger" onClick={()=>deletePushNotifications(noti.id)}>Delete</button>
                            </div>
                        </a>
                    ))} */}
                    {pushNotifications.map((noti, i) => (
                        <a className="content"  >
                            <div className="notification-item-1">
                                <div className="notification-delete">
                                    <button onClick={()=>deletePushNotifications(noti.id)}>
                                        <HighlightOffIcon/>
                                    </button>
                                </div>
                                <div className="notification-detail">
                                    <p className="item-info-1">{noti.description}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                    {/* {console.log(notifications)} */}
                    {notifications.map((noti, i) => (
                        <a className="content" >
                            <div className="notification-item">
                              <i className="fas fa-user"></i>
                                <h4 className="item-title">{noti.message}</h4>
                                <p className="item-info">{noti.description}</p>
                                <button className="btn btn-sm btn-danger" onClick={()=>deleteNotifications(noti)}>Delete</button>
                            </div>
                        </a>
                    ))}
                    {/* <a className="content" href="#">
                    <div className="notification-item">
                        <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                        <p className="item-info">Marketing 101, Video Assignment</p>
                    </div>
                    </a> */}
                </div>
                <li className="divider"></li>
                {/* <div className="notification-footer"><h4 className="menu-title">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4></div> */}
            </ul>
            
        </div>
    
    )
}

