import React, { Component } from "react";
import NavBar from "./NavBar/NavBar";

import ChatList from "./ChatList/ChatList";
import ChatHistory from "./ChatHistory/ChatHistory";
import UserChat from "./ChatHistory/UserChat";
import { ThemeColor } from "./Config/Config";
import {database} from '../../DB/Fire';

// Chat master component
class Chats extends Component {
  state = {
    messages: [],
    msgSesionId:'',
    itemId:'',
    mainVisible: false,
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    isRTL: Boolean(localStorage.getItem("rtl")),
    userName:'',
    profile:"",
    receiverId:"",
    showChat:false,
    isOnline:"",
    itemData:'',
    userDetails:'',
    firstChat:false,
  };

  // Load selected theme
  componentDidMount() {
    this.state.firstChat = this.props.firstChat;
    database.ref('User_Presence/').child(this.props.loginUser).set({a:this.props.loginUser});
    let classList = document.body.classList;
    if (classList.length === 0 && this.state.themeColor === ThemeColor.Dark) {
      document.body.classList.add("dark-skin");
    } else if (classList.length && this.state.themeColor === ThemeColor.Light) {
      document.body.classList.remove("dark-skin");
    }
    if (this.state.isRTL) document.body.setAttribute("dir", "rtl");
    else document.body.removeAttribute("dir");
    if(window.outerWidth<=1024){
      document.getElementById("chat-contacts").style.display="block";
      document.getElementById("chat-cover").style.display="none";
    }
  }
  componentWillUnmount(){
    database.ref('User_Presence/').child(this.props.loginUser).remove()
    .then(()=>{
      console.log("Removed record successfully")
    }).catch(err=>{
      console.log(err);
    })
  }

  handleChatClick = () => {
    this.setState({ mainVisible: true });
  };

  handleBackToList = () => {
    this.setState({ mainVisible: false });
  };

  callchatHistory = (id,itemId, userName, profile, receiverId, itemData, userDetails) => {
    //alert(id)
    this.setState({
      firstChat:false,
      msgSesionId: id,
      itemId:itemId, 
      userName:userName, 
      profile:profile,
      receiverId:receiverId,
      showChat:true,
      itemData:itemData,
      userDetails:userDetails,
    },()=>console.log("state restored"));
    database.ref('User_Presence/').child(receiverId).once("value",snapshot=>{
      const isOnline = snapshot.exists();
      console.log(isOnline);
      if(isOnline){
        this.setState({isOnline:"Online"});
      }else{
        this.setState({isOnline:"Offline"});
      }
    })
    const userRef = database.ref('Message/'+id)
    .orderByKey()
    .limitToLast(20);

    userRef.on('value', snapshot => {
      const users = [snapshot.val()];
      //console.log(snapshot);
      //console.log([users[0]]);
      //[users[0]].map((msg,i)=>(
      // console.log(Object.values(msg))
      //))
      if(snapshot.val() === null){
        this.setState({messages:[]})
      }else{
        console.log(Object.values(users[0]));
        this.setState({messages: Object.values(users[0])})
        if(window.outerWidth<=1024){
          document.getElementById("chat-contacts").style.display="none";
          document.getElementById("chat-messages").style.display="block";
        }
      }

      //console.log(Object.values(users[0]));
      //this.setState({messages: Object.values(users[0])})
      //console.log(users[0].usrb0454f760a96bce3283ade4559998e00_usrb2e4af79fac4c37ea125b8421ae00aa3);
      //this.setState({users: users});
    });
  };



  render() {
    return (
      <div className="chats-tab-open h-100 px-2">
        <div className={"main-layout h-100"}>
          {/* <NavBar activeMenu="chat" /> */}

          <ChatList 
              handleChatClick={this.handleChatClick} 
              list={this.props.list} 
              callchatHistory={this.callchatHistory} 
              returntype={this.props.returntype}
          />
          {
            (this.state.showChat  || this.state.firstChat) ? 
            <UserChat 
              messages={this.state.firstChat ? this.props.messages : this.state.messages} 
              sessionId={this.state.firstChat ? this.props.itemData.user.user_id+"_"+this.props.loginUser+"_"+this.props.itemData.id : this.state.msgSesionId} 
              itemId={this.state.firstChat ? this.props.itemData.id : this.state.itemId} 
              loginUser={this.props.loginUser} 
              callchatHistory={this.callchatHistory}
              userName={this.state.firstChat ? this.props.itemData.user.user_name : this.state.userName}
              profile={this.state.firstChat ? process.env.REACT_APP_BASE_URL+"/uploads/"+this.props.itemData.user.user_profile_photo : this.state.profile}
              receiverId={this.state.firstChat ? this.props.itemData.user.user_id : this.state.receiverId}
              isOnline={this.state.firstChat ? this.props.isOnline : this.state.isOnline}
              returntype={this.state.returntype}
              itemData={this.state.firstChat ? this.props.itemData : this.state.itemData}
              userDetails={this.state.firstChat ? this.props.itemData.user : this.state.userDetails}
            /> : 
            <div className={"main main-visible"} id="chat-cover">
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
              >
                Please click on a chat. To show that chat.
              </h1>
            </div>
          }
          {/* <ChatHistory
            mainVisible={this.state.mainVisible}
            BackToListClicked={this.handleBackToList}
          /> */}
          <div className="backdrop"></div>
        </div>
      </div>
    );
  }
}
export default Chats;
