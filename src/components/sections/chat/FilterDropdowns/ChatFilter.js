import React, { useState, useEffect, useContext } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ChatFilterOptions } from "../Config/Config.js";

import { ReactComponent as SearchSvg } from "../../../../assets/chat/media/icons/search.svg";

import { ChatContext } from "./../../../../context/ChatContext";

// Top chat filter
const ChatFilter = (props) => {

  const {returntype, setReturntype, fetchChatUsersList,firstChat, setFirstChat} = useContext(ChatContext); 

  const [selectedTitle, setSelectedTitle] = useState("");

//  useEffect(() => {
//    switch (props.selectedOption) {
//      case ChatFilterOptions.AllChats:
//        setSelectedTitle("All Chats");
//        break;
//      case ChatFilterOptions.Friends:
//        setSelectedTitle("Friends");
//        break;
//      case ChatFilterOptions.Groups:
//        setSelectedTitle("Groups");
//        break;
//      case ChatFilterOptions.Unread:
//        setSelectedTitle("Unread");
//        break;
//      case ChatFilterOptions.Archived:
//        setSelectedTitle("Archived");
//        break;
//      default:
//        break;
//    }
//    return () => {};
//  }, [props.selectedOption]);

  useEffect(() => {
    switch (returntype) {
      case 'seller':
        setSelectedTitle("Seller");
        break;
      case 'buyer':
        setSelectedTitle("Buyer");
        break;
      default:
        break;
    }
    return () => {};
  }, [returntype]);

  const handleChange = async (e) => {
    if(e.target.value==="buyer"){
      setFirstChat(false);
    }
    if(returntype !== e.target.value){
      setReturntype(e.target.value)
      fetchChatUsersList(e.target.value)
    }
  };

  return (
    <div className="sidebar-sub-header">
      <button
       className="btn-custom-2 grey"
       style={
        returntype==="buyer"
          ? { color: "#5FB8AE", borderColor: "#5FB8AE", marginRight:"10px"}
          : {marginRight:"10px"}
       }
       value="buyer" 
       onClick={handleChange}>
        Buyers
      </button>
      <button
       className="btn-custom-2 grey"
       style={
        returntype==="seller"
          ? { color: "#5FB8AE", borderColor: "#5FB8AE", marginRight:"10px"}
          : {marginRight:"10px"}
       }
       value="seller" 
       onClick={handleChange}>
        Sellers
      </button>

      <form className="form-inline">
        <div className="input-group">
          <input
            type="text"
            className="form-control search border-right-0 transparent-bg pr-0"
            placeholder="Search users..."
            value={props.search}
            onChange={props.handleSearch}
          ></input>
          <div className="input-group-append">
            <div
              className="input-group-text transparent-bg border-left-0"
              role="button"
            >
              <SearchSvg className="text-muted hw-20" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ChatFilter;
