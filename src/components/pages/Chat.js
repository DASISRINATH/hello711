import React, {Fragment, useState, useEffect, useContext } from 'react';
import { UserContext } from "./../../context/LoginContext";
import { ChatContext } from "./../../context/ChatContext";
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer2';
import Content from '../sections/chat/Content';
//import "./../../assets/chat/webfonts/inter/inter.css";
//import "./../../assets/chat/css/app.min.css";
import "./../../assets/css/style.css";
import firebase from '../DB/Fire';
import {database} from '../DB/Fire';
import axios from 'axios';
import { Redirect, useLocation } from "react-router-dom";

function Chat(){

  const {isLoggedIn, loginuserId,} = useContext(UserContext); 

  const {
    list, setList,
    loading, setLoading,
    error, setError,
    returntype, setReturntype,
    startFirstChat,fetchChatUsersList,
    firstChat, setFirstChat
  } = useContext(ChatContext);
  const [itemData, setItemData] = useState('');
  const [isOnline, setOnline] = useState("");
  const [messages, setMessages] = useState([]);

//  const [list, setList] = useState([]);
//  const [loading, setLoading] = useState(false);
//  const [error, setError] = useState(false);
//  const [returntype, setReturntype] = useState('seller');
  

  const chatItem = useLocation();

    useEffect(() => {
      console.log('test location')
      console.log(chatItem.state)

      if(chatItem.state){
        setFirstChat(true);
        setReturntype('seller')
        setItemData(chatItem.state.itemData);
        database.ref('User_Presence/').child(chatItem.state.seller_id).once("value",snapshot=>{
          const isOnline = snapshot.exists();
          console.log(isOnline);
          if(isOnline){
            setOnline("Online");
          }else{
            setOnline("Offline");
          }
        })
        database.ref('Message/'+chatItem.state.seller_id+"_"+loginuserId+"_"+chatItem.state.itemId).once("value", snapshot=>{
          const users = [snapshot.val()];
          if(snapshot.val()!==null){
            console.log(Object.values(users[0]));
            setMessages(Object.values(users[0]));
          }
        })
        startFirstChat('seller',chatItem.state.itemId,chatItem.state.seller_id)
      }else{
        setReturntype('buyer')
        fetchChatUsersList('buyer')
      }

      console.log('test location end')  
    }, []);
      //https://api.prod.online.risee.in/index.php/rest/chat_items/get_buyer_seller_list/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/
      //https://api.prod.online.risee.in/index.php/rest/chats/get_chat_history/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL


//      const callChatusers = async() =>{
//        setError(false)
//        setLoading(true)
//
//        var postData = {
//          item_id:chatItem.state.itemId,
//          buyer_user_id:loginuserId,
//          seller_user_id:chatItem.state.seller_id,
//        };
//
//        await axios.post(`${process.env.REACT_APP_API_URL}chats/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
//        .then(response => {
//           setLoading(false)
//           //setList(response.data)
//           console.log(response.data)
//          })
//        .catch(error => {
//          setLoading(false)
//          setError(true)
//          //setList([])
//        });
//      }

//      const fetchBuyerSellerList = async() =>{
//        setError(false)
//        setLoading(true)
//
//        var postData = {
//          user_id:loginuserId,//"usr7298ac1214aae6d0c30c0e70aff3ca8e",//"usrb33baa0da30496b06faacc59cc80c0fe",
//          return_type:returntype,//"buyer",//"seller",
//        };
//
//        await axios.post(`${process.env.REACT_APP_API_URL}chat_items/get_buyer_seller_list/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
//        .then(response => {
//           setLoading(false)
//           setList(response.data)
//          })
//        .catch(error => {
//          setLoading(false)
//          setError(true)
//          setList([])
//        });
//      }

      const filterReturntype = (data) =>{
        setReturntype(data)
      }

      const condition = () => {
        switch(loginuserId) {
  
          case "usrb94deaa8243e362ac854bb42d5ba9508": return true;
          case "usr796a5e605cd2f0026cb8de262978e625": return true;
          case "usrb33baa0da30496b06faacc59cc80c0fe": return true;
          case "usrd759c08fe60137ffa1043cbc1f30b84f": return true;
  
          default: return false;
        }
      }



    // return (
    //     <>
    //     {!isLoggedIn ? (<Redirect to="/404" />) :
    //       loading ? (<h1 className="text-center">Loading...</h1>) :
    //       error ? (<h1 className="text-center">Something went wrong plz try again...</h1>) :

    //       condition() ?
    //        <Fragment>
    //            <MetaTags>
    //                <title>INDMarketplace - Real Estate Platform | Services | Marketing | News </title>
    //                <meta
    //                    name="description"
    //                    content="#"
    //                />
    //            </MetaTags>
    //            <Header/>
    //            <Content list={list} error={error} loading={loading} loginUser={loginuserId} returntype={returntype} firstChat={firstChat} itemData={itemData} isOnline={isOnline}/>
    //            <Footer/>
    //        </Fragment> : <Redirect to="/404" />  
    //     } 
    //     </>
    // );

    return (
      <>
      {
        (!isLoggedIn && !condition) ? <Redirect to="/404"/> : 
        <Fragment>
          <MetaTags>
            <title>Hello71 - Online Marketplace for Language Trainers & Learners</title>
            <meta
              name="description"
              content="#"
            />
          </MetaTags>
          <Header/>
          {
            loading ? 
              <div style={{height:"90vh"}}>
                <h1
                  style={{
                    position:"relative", 
                    top:"35%", 
                    bottom:"40%", 
                    left:"25%", 
                    fontWeight:"normal",
                    width:"55%"
                  }}
                  className="text-center"
                >Loading Chats...</h1>
              </div>
            :
            error ?
              <div style={{height:"90vh"}}>
                <h1
                  style={{
                    position:"relative",
                    top:"35%",
                    bottom:"40%",
                    left:"25%",
                    fontWeight:"normal",
                    width:"55%"
                  }}
                  className="text-center"
                >Loading Chats...</h1>
              </div>
            :
            <Content list={list} error={error} loading={loading} loginUser={loginuserId} returntype={returntype} firstChat={firstChat} itemData={itemData} isOnline={isOnline} messages={messages}/>
          }
          <Footer/>
        </Fragment>
      }
      </>
    )

}

export default Chat;