import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-responsive-modal/styles.css";
import "./../../modal/css/styles.css";

import avatar2 from "../../../../assets/chat/media/avatar/2.png";
import avatar6 from "../../../../assets/chat/media/avatar/6.png";
import photo1 from "../../../../assets/chat/media/shared-photos/01.jpg";
import photo2 from "../../../../assets/chat/media/shared-photos/02.jpg";
import photo3 from "../../../../assets/chat/media/shared-photos/03.jpg";

import { ReactComponent as BackToList } from "../../../../assets/chat/media/icons/backtolist.svg";
import { ReactComponent as SearchSvg } from "../../../../assets/chat/media/icons/search.svg";
import { ReactComponent as CallNowSvg } from "../../../../assets/chat/media/icons/callnow.svg";
import { ReactComponent as VerticalOptionDots } from "../../../../assets/chat/media/icons/verticaloptiondots.svg";
import { ReactComponent as InfoSvg } from "../../../../assets/chat/media/icons/infosvg.svg";
import { ReactComponent as MuteNotificationsSvg } from "../../../../assets/chat/media/icons/mutenotifications.svg";
import { ReactComponent as WallpaperSvg } from "../../../../assets/chat/media/icons/wallpaper.svg";
import { ReactComponent as ArchiveSvg } from "../../../../assets/chat/media/icons/archive.svg";
import { ReactComponent as DeleteSvg } from "../../../../assets/chat/media/icons/delete.svg";
import { ReactComponent as BlockSvg } from "../../../../assets/chat/media/icons/block.svg";
import { ReactComponent as ChatDocFileSvg } from "../../../../assets/chat/media/icons/chatdocmessage.svg";

import { ReactComponent as ChatPlusSvg } from "../../../../assets/chat/media/icons/chatplus.svg";
import { ReactComponent as EmojiSvg } from "../../../../assets/chat/media/icons/emoji.svg";
import { ReactComponent as GallarySvg } from "../../../../assets/chat/media/icons/gallary.svg";
import { ReactComponent as AudioSvg } from "../../../../assets/chat/media/icons/audio.svg";
import { ReactComponent as ContactSvg } from "../../../../assets/chat/media/icons/contact.svg";
import { ReactComponent as LocationSvg } from "../../../../assets/chat/media/icons/location.svg";
import { ReactComponent as PollSvg } from "../../../../assets/chat/media/icons/poll.svg";
import { ReactComponent as SendMessageSvg } from "../../../../assets/chat/media/icons/sendmessage.svg";
import { ReactComponent as AddContactSvg } from "../../../../assets/chat/media/icons/addcontact.svg";
import { ReactComponent as HeartSvg } from "../../../../assets/chat/media/icons/heart.svg";
import { ReactComponent as CloseSvg } from "../../../../assets/chat/media/icons/close.svg";

import { ReactComponent as DocumentsSvg } from "../../../../assets/chat/media/icons/documents.svg";
import { ReactComponent as ProfileDocumentsSvg } from "../../../../assets/chat/media/icons/profiledocuments.svg";
import { Dropdown } from "react-bootstrap";
import MessageDropdown from "./Dropdowns/MessageDropdown";
import DocumentOptionDropdown from "./Dropdowns/DocumentOptionDropdown";

import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { ThemeColor } from "./../Config/Config";
import "./../Chats.css";
import {database} from '../../../DB/Fire';
import Modal from "react-responsive-modal";

// User  chat detail component - chat with users
class UserChat extends Component {
  state = {
    messageInfo:'',
    showProfileDetail: false,
    chatSearchBox: false,
    showUserInformation: true,
    showLastMedia: true,
    showDocuments: true,
    emojiWidth: window.innerWidth / 16 + "rem",
    themeColor: Boolean(localStorage.getItem("theme"))
      ? parseInt(localStorage.getItem("theme"))
      : ThemeColor.Light,
    message: "",
    files:[],
    is_file:false,
    show:false,
  };

  constructor() {
    super();
    this.messagesEndRef = React.createRef();

    window.onresize = () => {
      let width = window.innerWidth / 16;
      if (width >= 50) width = 50;
      this.setState({ emojiWidth: width + "rem" });
    };
  }

  componentDidMount(){
    if(window.outerWidth<=1024){
      document.getElementById("chat-messages").style.display="block";
    }
  }

  toggleShowProfileDetail = () => {
    this.setState({ showProfileDetail: !this.state.showProfileDetail });
    document.body.click();
  };

  toggleChatSearchBox = () => {
    this.setState({ chatSearchBox: !this.state.chatSearchBox });
    document.body.click();
  };

  toggleShowUserInformation = () => {
    this.setState({ showUserInformation: !this.state.showUserInformation });
  };

  toggleShowLastMedia = () => {
    this.setState({ showLastMedia: !this.state.showLastMedia });
  };

  toggleShowDocuments = () => {
    this.setState({ showDocuments: !this.state.showDocuments });
  };


  handleMessageChange = (event) => {
    this.setState({message:event.target.value});
  };

  sendMessage = async () => {   

    var cont = document.getElementById("message-container");
    cont.scrollTop = cont.scrollHeight;

    console.log(this.state.message);

    var type_data = this.state.files.length !== 0 ? 1 : 0 ;

    if(this.state.message !== ''){
      var newPostKey = database.ref('Message/').child(this.props.sessionId).push().key;
      var postData = {
        addedDate:new Date().getTime(),
        id:newPostKey,
        isSold:false,
        itemId: this.props.itemId,//"itm_f4c0cf020fa6cef086e2d631aa04a8b1",
        message: this.state.message,
        offerStatus:0,
        sendByUserId: this.props.loginUser,//"usr7298ac1214aae6d0c30c0e70aff3ca8e",
        sessionId: this.props.sessionId,//'usr7298ac1214aae6d0c30c0e70aff3ca8e_usrb33baa0da30496b06faacc59cc80c0fe',
        type:type_data, 
      };      

      var updates = {};
      //updates['/posts/' + newPostKey] = postData;
      updates['/Message/' + this.props.sessionId + '/' + newPostKey] = postData;

      try {
        await database.ref().update(updates);
        //await database.ref('Message/usr7298ac1214aae6d0c30c0e70aff3ca8e_usrb33baa0da30496b06faacc59cc80c0fe').push(this.state.messageInfo);
      } catch (error) {
        alert("Error")
        console.log(error)
      }
      this.props.callchatHistory(this.props.sessionId, this.props.itemId, this.props.userName, this.props.profile, this.props.receiverId, this.props.itemData, this.props.userDetails);
    }else{
      alert("The message is empty.");
    }
    this.setState({message:"", is_file:false, files:[]});
  };

  handleEmojiSelect = (param) => {
    this.setState({ message: this.state.message + param.native });
  };

  triggerDialogBox = (id)=>{
    var elem = document.getElementById(id);
    if(elem){
      // var evt = document.createEvent("MouseEvent");
      // evt.initEvent("click", true, false);
      // elem.dispatchEvent(evt);
      elem.click();
    }
  }

  handleImageUpload = (e)=>{
    console.log(e.target.files[0]);
    this.setState({is_file:true, files:e.target.files}, this.imageUpload)
  }
  imageUpload = async ()=>{
//    var postData = {
//      sender_id:this.props.loginUser,
//      buyer_user_id:this.props.returntype==="seller"  ? this.props.loginUser : this.props.receiverId,
//      seller_user_id:this.props.returntype==="seller" ? this.props.receiverId : this.props.loginUser,
//      item_id:this.props.itemId,
//      type:this.props.returntype,
//      file:this.state.files[0].name
//    }
    console.log(this.state.files[0].name);
  

    var formData = new FormData();
    formData.append("sender_id",this.props.loginUser);
    formData.append("buyer_user_id",this.props.returntype==="seller"  ? this.props.loginUser : this.props.receiverId);
    formData.append("seller_user_id",this.props.returntype==="seller" ? this.props.receiverId : this.props.loginUser);
    formData.append("item_id",this.props.itemId);
    formData.append("type",this.props.returntype);
    formData.append("file",this.state.files[0]);

    console.log(formData);
    await axios.post(`${process.env.REACT_APP_API_URL}images/chat_image_upload/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`,formData)
    .then(response=>{
      console.log(response);
      this.setState({message:response.data.img_path}, this.sendMessage);
    })
    .catch(err=>console.log(err))
  }

  handleClick = ()=>{
    var list = document.getElementById("chat-contacts");
    var messages = document.getElementById("chat-messages");
    list.style.display="block";
    messages.style.display="none";
  }

  render() {
    const messages = this.props.messages;
    return (
      <main className = "main main-visible" style={{flexWrap:"wrap"}} id="chat-messages">
        <Link className="contacts-link" onClick={this.handleClick}>
          <button
            className="btn-custom-2 grey mx-1 text-muted d-xl-none"
            type="button"
          >
            <BackToList />
          </button>
        </Link>
        <div className="chats" style={{flexBasis:"100%"}}>
          <div className="chat-body">
            <div className="chat-header" style={{flexWrap:"wrap"}}>
              <div className="media chat-name align-items-center text-truncate">
                <div className="avatar d-none d-sm-inline-block mr-3">
                  <img src={this.props.profile} alt=""></img>
                </div>
                <div className="media-body align-self-center ">
                  <h6 className="text-truncate mb-0">{this.props.userName}</h6>
                  <small className="text-muted">{this.props.isOnline}</small>
                </div>
              </div>
              <ul className="nav flex-nowrap">
                {/* <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                  <Link
                    className="nav-link text-muted px-1"
                    onClick={this.toggleChatSearchBox}
                    to="#"
                  >
                    <SearchSvg />
                  </Link>
                </li> */}
                <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                  <Link
                    className="nav-link text-muted px-1"
                    to="#"
                    title="Call Now"
                    onClick={()=>this.setState({show:true})}
                  >
                    <CallNowSvg />
                  </Link>
                </li>
                <li className="nav-item list-inline-item d-none d-sm-block mr-0">
                  <Dropdown className="options-dropdown">
                    <Dropdown.Toggle
                      className="text-muted hw-20 mt-2"
                      as={VerticalOptionDots}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      {/* <Link
                        className="dropdown-item align-items-center d-flex"
                        onClick={this.toggleChatSearchBox}
                        to="#"
                      >
                        <SearchSvg className="hw-20 mr-2" />
                        <span>Search</span>
                      </Link> */}

                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <InfoSvg className="hw-20 mr-2" />
                        <span>View Info</span>
                      </Link>
                      {/* <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <MuteNotificationsSvg className="hw-20 mr-2" />
                        <span>Mute Notifications</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <WallpaperSvg className="hw-20 mr-2" />
                        <span>Wallpaper</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <ArchiveSvg className="hw-20 mr-2" />
                        <span>Archive</span>
                      </Link> */}
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <DeleteSvg className="hw-20 mr-2" />
                        <span>Delete</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex text-danger"
                        to="#"
                      >
                        <BlockSvg className="hw-20 mr-2" />
                        <span>Block</span>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li className="nav-item list-inline-item d-sm-none mr-0">
                  <Dropdown className="options-dropdown">
                    <Dropdown.Toggle
                      className="text-muted hw-20 mt-2"
                      as={VerticalOptionDots}
                    ></Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right">
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={()=>this.setState({show:true})}
                      >
                        <CallNowSvg className="hw-20 mr-2" />
                        <span>Call</span>
                      </Link>
                      {/* <Link
                        className="dropdown-item align-items-center d-flex"
                        onClick={this.toggleChatSearchBox}
                        to="#"
                      >
                        <SearchSvg className="hw-20 mr-2" />
                        <span>Search</span>
                      </Link> */}
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <InfoSvg className="hw-20 mr-2" />
                        <span>View Info</span>
                      </Link>
                      {/* <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <MuteNotificationsSvg className="hw-20 mr-2" />
                        <span>Mute Notifications</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <WallpaperSvg className="hw-20 mr-2" />
                        <span>Wallpaper</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <ArchiveSvg className="hw-20 mr-2" />
                        <span>Archive</span>
                      </Link> */}
                      <Link
                        className="dropdown-item align-items-center d-flex"
                        to="#"
                      >
                        <DeleteSvg className="hw-20 mr-2" />
                        <span>Delete</span>
                      </Link>
                      <Link
                        className="dropdown-item align-items-center d-flex text-danger"
                        to="#"
                      >
                        <BlockSvg className="hw-20 mr-2" />
                        <span>Block</span>
                      </Link>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
              <div className="media chat-name align-items-center text-truncate border-top" style={{flexBasis:"100%", marginBottom:"0"}}>
                <div className="avatar d-none d-sm-inline-block mr-3">
                  <img src={process.env.REACT_APP_BASE_URL+"/uploads/"+this.props.itemData.default_photo.img_path} alt=""></img>
                </div>
                <div className="media-body align-self-center ">
                  <h6 className="text-truncate mb-0">{this.props.itemData.title}</h6>
                  <small className="text-muted">{this.props.itemData.item_price}</small>
                </div>
              </div>
            </div>
            <div
              className={
                "border-bottom px-3 collapse " +
                (this.state.chatSearchBox ? "show" : "")
              }
            >
              <div className="container-xl py-2 px-0 px-md-3">
                <div className="input-group bg-light ">
                  <input
                    type="text"
                    className="form-control form-control-md border-right-0 transparent-bg pr-0"
                    placeholder="Search..."
                  ></input>
                  <div className="input-group-append">
                    <span className="input-group-text transparent-bg border-left-0">
                      <SearchSvg className="hw-20 text-muted" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat-content p-2" id="message-container">
              <div className="container">
                {/* <div
                  className="message-divider pb-2"
                  data-label="Yesterday"
                ></div> */}
              {/*<div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        I have to give a presentation on global warming on
                        Friday, and I am so nervous.
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message self">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        First of all, you need to understand the subject matter
                        thoroughly. You need to know what is global warming,
                        what causes global warming, and what people should do to
                        abate the effects of global warming.
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <span className="message-status">Edited</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        I have done a lot of research on the subject, and I know
                        I can answer any questions I will receive from the
                        audience.
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        I should talk about more precisely the sequence of my
                        presentation?
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message self">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        Yes, what you should present first, second and third…
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <div className="document">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                          <ChatDocFileSvg />
                        </div>

                        <div className="document-body">
                          <h6>
                            <Link
                              to="#"
                              className="text-reset"
                              title="global-warming-data-2020.xlxs"
                            >
                              global-warming-data-2020.xlxs
                            </Link>
                          </h6>
                          <ul className="list-inline small mb-0">
                            <li className="list-inline-item">
                              <span className="text-muted">79.2 KB</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-muted text-uppercase">
                                xlxs
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        If that is the case, then I already have an outline. To
                        make it easy for my audience to follow the presentation,
                        I intend to post the outline on the board at all time
                        during my speech.
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message-divider pb-2" data-label="Today"></div>

                <div className="message self">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        Good idea! By the way, do you have any facts to back you
                        up? For example, change of climate, yearly disasters…
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>

                    <span className="message-date">9:12am</span>
                    <span className="message-status">Edited</span>

                    <MessageDropdown />
                  </div>
                </div>
                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <h6>I have shared some photos, Please have a look.</h6>
                      <div className="form-row">
                        <LightgalleryProvider>
                          <div className="col">
                            <LightgalleryItem
                              group={"group1"}
                              src={photo1}
                              thumb={photo1}
                            >
                              <img
                                alt="photo1"
                                src={photo1}
                                style={{ width: "100%" }}
                              />
                            </LightgalleryItem>
                          </div>
                          <div className="col">
                            <LightgalleryItem
                              group={"group1"}
                              src={photo2}
                              thumb={photo2}
                            >
                              <img
                                alt="photo2"
                                src={photo2}
                                style={{ width: "100%" }}
                              />
                            </LightgalleryItem>
                          </div>
                          <div className="col">
                            <LightgalleryItem
                              group={"group1"}
                              src={photo3}
                              thumb={photo3}
                            >
                              <img
                                alt="photo3"
                                src={photo3}
                                style={{ width: "100%" }}
                              />
                            </LightgalleryItem>
                          </div>
                        </LightgalleryProvider>
                      </div>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>

                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        No, I have not thought about that. I better get some
                        statistics from the Internet. I should not have any
                        problems since the Internet has all kinds of data.
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message self">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        Pictures will keep your audience from being bored. In
                        order for you to succeed, you need to keep them
                        interested and involved.
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>

                <div className="message">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        You are absolutely right. I will take time to practice
                        and to learn to relax and express myself really well.
                        Wish me luck, Catherine!
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date">9:12am</span>
                    <MessageDropdown />
                  </div>
                </div>
                <div className="message self">
                  <div className="message-wrapper">
                    <div className="message-content">
                      <span>
                        I know you. You can do it. Good luck, Jennifer!
                      </span>
                    </div>
                  </div>
                  <div className="message-options">
                    <div className="avatar avatar-sm">
                      <img alt="" src={avatar6}></img>
                    </div>
                    <span className="message-date" ref={this.messagesEndRef}>
                      Just now
                    </span>
                    <MessageDropdown />
                  </div>
                </div> */}


                {messages.map((msg,i)=>(
                  <div className={msg.sendByUserId === this.props.loginUser ? "message self" : "message" }>
                    <div className="message-wrapper">
                      <div className="message-content">
                        <span>
                          {msg.message.includes(".jpeg") || msg.message.includes(".png") || msg.message.includes(".jpg") ? 
                            <img src={process.env.REACT_APP_BASE_URL+'/uploads/'+msg.message} style={{borderRadius:"1.25rem"}}/>
                            :
                            msg.message
                          }
                        </span>
                      </div>
                    </div>
                    <div className="message-options">
                      <span className="message-date" /*ref={this.messagesEndRef}*/>
                        {new Date(msg.addedDate).toString().substr(4,6) + " " + new Date(msg.addedDate).toString().substr(16,5)}
                      </span>
                      <MessageDropdown />
                    </div>
                  </div>
                ))}

              </div>
              <div className="chat-finished" id="chat-finished"></div>
            </div>



            <div className="chat-footer">
              <div className="form-row align-items-center">
                <div className="col">
                  <div className="input-group">
                    <div className="input-group-prepend mr-sm-2 mr-1">
                      <Dropdown>
                        <Dropdown.Toggle
                          className="text-muted hw-20"
                          as={ChatPlusSvg}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                          <input type="file" accept="image/png, image/jpeg" id="img-upload" style={{display:"none"}} onChange={this.handleImageUpload}/>
                          <Link className="dropdown-item" to="#" onClick={()=>document.getElementById("img-upload").click()}>
                            <GallarySvg className="hw-20 mr-2" />
                            <span>Gallery</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <AudioSvg />
                            <span>Audio</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <ChatDocFileSvg className="hw-20 mr-2" />
                            <span>Document</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <ContactSvg />
                            <span>Contact</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <LocationSvg />
                            <span>Location</span>
                          </Link>
                          <Link className="dropdown-item" to="#">
                            <PollSvg />
                            <span>Poll</span>
                          </Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <input
                      type="text"
                      className="form-control transparent-bg border-0 no-resize hide-scrollbar"
                      placeholder="Write your message..."
                      rows="1"
                      value={this.state.message}
                      onChange={this.handleMessageChange}
                    ></input>
                    <div className="input-group-prepend mr-sm-2 mr-1">
                      <Dropdown className="w-100">
                        <Dropdown.Toggle
                          className="text-muted hw-20"
                          as={EmojiSvg}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu className="border-0 color-none">
                          <Picker
                            className="emoji-picker"
                            title="Pick your emoji…"
                            emoji="point_up"
                            showPreview={true}
                            set="facebook"
                            theme={
                              this.state.themeColor === ThemeColor.Light
                                ? "light"
                                : "dark"
                            }
                            style={{
                              width: this.state.emojiWidth,
                              maxWidth: "65rem",
                            }}
                            onSelect={this.handleEmojiSelect}
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <div
                    className="btn btn-primary btn-icon rounded-circle text-light mb-1"
                    role="button"
                    onClick={this.sendMessage}
                  >
                    <SendMessageSvg />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* this.handleSubmitMessage */}
          <div
            className={
              "chat-info " +
              (this.state.showProfileDetail ? "chat-info-visible" : "")
            }
          >
            <div className="d-flex h-100 flex-column">
              <div className="chat-info-header px-2">
                <div className="container-fluid">
                  <ul className="nav justify-content-between align-items-center">
                    <li className="text-center">
                      <h5 className="text-truncate mb-0">Profile Details</h5>
                    </li>
                    <li className="nav-item list-inline-item">
                      <Link
                        className="nav-link text-muted px-0"
                        to="#"
                        onClick={this.toggleShowProfileDetail}
                      >
                        <CloseSvg />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hide-scrollbar flex-fill">
                <div className="text-center p-3">
                  <div className="avatar avatar-xl mx-5 mb-3">
                    <img className="avatar-img" src={this.props.profile} alt=""></img>
                  </div>
                  <h5 className="mb-1">{this.props.userDetails.user_name}</h5>
                  <p className="text-muted d-flex align-items-center justify-content-center">
                    <LocationSvg />
                    <span>{this.props.userDetails.city}</span>
                  </p>

                  <div className="d-flex align-items-center justify-content-center">
                    <div className="btn btn-outline-default btn-icon rounded-circle mx-1">
                      <AddContactSvg />
                    </div>
                    <div className="btn btn-primary btn-icon rounded-circle text-light mx-1">
                      <HeartSvg />
                    </div>
                    <div className="btn btn-danger btn-icon rounded-circle text-light mx-1">
                      <BlockSvg />
                    </div>
                  </div>
                </div>
                <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowUserInformation}
                  >
                    <h6 className="mb-0">User Information</h6>
                    <InfoSvg className="hw-20 text-muted" />
                  </Link>

                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showUserInformation ? "show" : "")
                    }
                  >
                    <div className="chat-info-group-content list-item-has-padding">
                      <ul className="list-group list-group-flush ">
                        <li className="list-group-item border-0">
                          <p className="small text-muted mb-0">Phone</p>
                          <p className="mb-0">{this.props.userDetails.user_phone}</p>
                        </li>
                        <li className="list-group-item border-0">
                          <p className="small text-muted mb-0">Email</p>
                          <p className="mb-0">{this.props.userDetails.user_email}</p>
                        </li>
                        <li className="list-group-item border-0">
                          <p className="small text-muted mb-0">Address</p>
                          <p className="mb-0">
                          {this.props.userDetails.user_address}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowLastMedia}
                  >
                    <h6 className="mb-0">Last Media</h6>
                    <GallarySvg className="hw-20 text-muted" />
                  </Link>

                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showLastMedia ? "show" : "")
                    }
                    id="shared-media"
                  >
                    <div className="chat-info-group-content">
                      <div className="form-row">
                        <div className="col-4 col-md-2 col-xl-4">
                          <Link to="#">
                            <img
                              src={photo1}
                              className="img-fluid rounded border"
                              alt=""
                            ></img>
                          </Link>
                        </div>
                        <div className="col-4 col-md-2 col-xl-4">
                          <Link to="#">
                            <img
                              src={photo2}
                              className="img-fluid rounded border"
                              alt=""
                            ></img>
                          </Link>
                        </div>
                        <div className="col-4 col-md-2 col-xl-4">
                          <Link to="#">
                            <img
                              src={photo3}
                              className="img-fluid rounded border"
                              alt=""
                            ></img>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div className="chat-info-group">
                  <Link
                    className="chat-info-group-header"
                    data-toggle="collapse"
                    to="#"
                    onClick={this.toggleShowDocuments}
                  >
                    <h6 className="mb-0">Documents</h6>
                    <DocumentsSvg className="hw-20 text-muted" />
                  </Link>

                  <div
                    className={
                      "chat-info-group-body collapse " +
                      (this.state.showDocuments ? "show" : "")
                    }
                    id="shared-files"
                  >
                    <div className="chat-info-group-content list-item-has-padding">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <div className="document">
                            <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                              <ProfileDocumentsSvg />
                            </div>

                            <div className="document-body">
                              <h6 className="text-truncate">
                                <Link
                                  to="#"
                                  className="text-reset"
                                  title="effects-of-global-warming.docs"
                                >
                                  Effects-of-global-warming.docs
                                </Link>
                              </h6>

                              <ul className="list-inline small mb-0">
                                <li className="list-inline-item">
                                  <span className="text-muted">79.2 KB</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="text-muted text-uppercase">
                                    docs
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="document-options ml-1">
                              <DocumentOptionDropdown />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="document">
                            <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                              <ProfileDocumentsSvg />
                            </div>

                            <div className="document-body">
                              <h6 className="text-truncate">
                                <Link
                                  to="#"
                                  className="text-reset"
                                  title="global-warming-data-2020.xlxs"
                                >
                                  Global-warming-data-2020.xlxs
                                </Link>
                              </h6>

                              <ul className="list-inline small mb-0">
                                <li className="list-inline-item">
                                  <span className="text-muted">79.2 KB</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="text-muted text-uppercase">
                                    xlxs
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="document-options ml-1">
                              <DocumentOptionDropdown />
                            </div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="document">
                            <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                              <ProfileDocumentsSvg />
                            </div>

                            <div className="document-body">
                              <h6 className="text-truncate">
                                <Link
                                  to="#"
                                  className="text-reset"
                                  title="great-presentation-on global-warming-2020.ppt"
                                >
                                  Great-presentation-on global-warming-2020.ppt
                                </Link>
                              </h6>
                              <ul className="list-inline small mb-0">
                                <li className="list-inline-item">
                                  <span className="text-muted">79.2 KB</span>
                                </li>
                                <li className="list-inline-item">
                                  <span className="text-muted text-uppercase">
                                    ppt
                                  </span>
                                </li>
                              </ul>
                            </div>

                            <div className="document-options ml-1">
                              <DocumentOptionDropdown />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <Modal
          open={this.state.show} 
          onClose={()=>this.setState({show:false})}
          classNames={{
            overlay: 'customOverlay',
          }}
          center
          >
            <div className="my-4">
              <h5 className="text-center mx-3 my-1">User :  {this.props.userDetails.user_name }</h5>
              <h5 className="text-center mx-3 my-1">Mobile : <Link >{this.props.userDetails.user_phone}</Link></h5>
            </div>
          </Modal>
        </div>
      </main>
    );
  }
}
export default UserChat;
