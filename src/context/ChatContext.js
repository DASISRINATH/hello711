import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./LoginContext";
import axios from "axios";
import "firebase/auth";
import firebase from '../components/DB/Fire';


export const ChatContext = createContext({})

export default function ChatmsgContext({ children }) {

  const {isLoggedIn, loginuserId,} = useContext(UserContext)

  const [itemId, setItemId] = useState(null);
  const [buyerId, setBuyerId] = useState(null);
  const [sellerId, setSellerId] = useState(null);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [returntype, setReturntype] = useState(null);
  const [firstChat, setFirstChat] = useState(false);


//	useEffect(() => {
//        fetchChatUsersList()
//	},[]);


  const changeReturnType = (data) => {
      setReturntype(data)
  }

  const startFirstChat = (returnTypeStr, item_id,seller_id) => {

    setReturntype(returnTypeStr)
    setFirstChat(true);
    setError(false)
    setLoading(true)

    var postData = {
      item_id:item_id,
      buyer_user_id:loginuserId,
      seller_user_id:seller_id,
    };

    axios.post(`${process.env.REACT_APP_API_URL}chats/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
    .then(response => {
        //setLoading(false)
        //setList(response.data)
        fetchChatUsersList(returnTypeStr)
        console.log(response.data)
      })
    .catch(error => {
      setLoading(false)
      setError(true)
      //setList([])
    });       
  };

  const fetchChatUsersList = async(data) =>{
    setError(false)
    setLoading(true)

    var postData = {
      user_id:loginuserId,//"usr7298ac1214aae6d0c30c0e70aff3ca8e",//"usrb33baa0da30496b06faacc59cc80c0fe",
      return_type:data,//"buyer",//"seller",
    };

    await axios.post(`${process.env.REACT_APP_API_URL}chat_items/get_buyer_seller_list/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
    .then(response => {
      setLoading(false)
      setList(response.data)
      })
    .catch(error => {
      setLoading(false)
      //setError(true)
      setList([])
    });
  }

	return (
		<ChatContext.Provider
			value={{
				list,setList,
        loading, setLoading,
        error, setError,
        returntype, setReturntype,
        firstChat, setFirstChat,
        itemId, setItemId,
        buyerId, setBuyerId,
        sellerId, setSellerId,

        startFirstChat,
        fetchChatUsersList,
        changeReturnType,
			}}
		>
			{children}
		</ChatContext.Provider>
	)
}