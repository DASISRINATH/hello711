import React from "react";
import { Link } from "react-router-dom";
import { ProfileType, UserStatus } from "../../Config/Config";
const ChatMessage = (props) => {
  let profile = "";
  let status = null;
  switch (props.status) {
    case UserStatus.Online:
      status = "avatar-online";
      break;
    case UserStatus.Offline:
      status = "avatar-offline";
      break;
    case UserStatus.Busy:
      status = "avatar-busy";
      break;
    case UserStatus.Away:
      status = "avatar-away";
      break;
    default:
      break;
  }
  // switch (props.profileType) {
  //   case ProfileType.Image:
  //     profile = (
  //       <div className={"avatar " + status}>
  //         <img src={props.profile} alt=""></img>
  //       </div>
  //     );
  //     break;
  //   case ProfileType.Svg:
  //     profile = (
  //       <div className="avatar bg-success text-light">
  //         <span>{props.profile}</span>
  //       </div>
  //     );
  //     break;
  //   case ProfileType.Text:
  //     profile = (
  //       <div className={"avatar bg-info text-light " + status}>
  //         <span>EW</span>
  //       </div>
  //     );
  //     break;
  //   default:
  //     break;
  // }
      profile = (
         <div className={"avatar " + status}>
           <img src={props.profile} alt=""></img>
         </div>
        );
  return (
    <li
      className={
        "contacts-item friends " +
        (props.ChatUserId && window.location.href.search(props.ChatUserId) > 0
          ? "active "
          : " ") +
        (props.badge ? "unread" : "")
      }
    >
      <Link
        className="contacts-link"
        to={props.to}
        onClick={props.handleChatClick}
      >
        {profile}
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{props.name}</h6>
            <div className="chat-time">{props.time}</div>
            {props.unread!=="0" && <span className="chat-unread">{props.unread}</span>}
          </div>
          <div className="contacts-texts">
            {props.MessageSvg ? props.MessageSvg : null}
            <p className="text-truncate">{props.message}</p>
            {props.endIcon ? (
              <div className="d-inline-flex align-items-center ml-1">
                {props.endIcon}
              </div>
            ) : null}
            {props.badge ? (
              <div className="badge badge-rounded badge-primary ml-1">
                {props.badge}
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
};
export default ChatMessage;
