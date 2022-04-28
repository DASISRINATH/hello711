import React, {
  useState,
  useEffect,
  Fragment,
  useContext,
  useRef,
} from "react";
import { UserContext } from "./../../context/LoginContext";
import { Redirect } from "react-router-dom";
import Adduserinfomodal from "./Adduserinfomodal";
import Businessloginmodal from "./Businessloginmodal";
import NavMenu from "../layouts/Citymenu";
import Mobilemenu from "../layouts/Mobilemenu";
import classNames from "classnames";
// <<<<<<< HEAD
import {
  OverlayTrigger,
  Popover,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  DropdownType,
  Toast,
  NavLink,
} from "react-bootstrap";
// =======
// import { OverlayTrigger, Popover, Dropdown,DropdownButton,ButtonGroup,DropdownType, Toast, } from 'react-bootstrap';
// >>>>>>> 8bb779bd02f18feb778ca95c874dd35876efb615
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import Menu from "@material-ui/core/Menu";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NavigationIcon from "@material-ui/icons/Navigation";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import HomeIcon from "@material-ui/icons/Home";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ApartmentIcon from "@material-ui/icons/Apartment";
import BusinessIcon from "@material-ui/icons/Business";
import { shadows } from "@material-ui/system";
import { useDispatch } from "react-redux";
import { fetchItemListData } from "../../slices/items/itemSlice";
import Modalbox from "./Modal";
//import Notifications from 'react-notifications-menu';
import { bell } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Notifications from "../sections/notifications/Notifications";
import { useTranslation } from "react-i18next";

import firebase from "../DB/Fire";
//import { getMessaging } from "firebase/messaging";
//import { getMessaging, onMessage } from "firebase/messaging";
import "firebase/messaging";
import { data } from "jquery";

import "./css/Headercustomstyle.css";

// import { data } from 'jquery';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Header(props) {
  //    getToken();
  //
  //    const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    loginuserData,
    firstLogin,
    logoutAction,
    redirectProperties,
    setRedirectProperties,
    lang,
    setLang,
  } = useContext(UserContext);
  const { t, i18n } = useTranslation(["header"]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userImg, setUserimg] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);
  const [submitView, setSubmitView] = useState(false);

  // Submit Listing Dropdown States
  const [viewLandPlots, setViewLandPlots] = useState(false);
  const [viewSellResidential, setViewSellResidential] = useState(false);
  const [viewRentResidential, setViewRentResidential] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (submitView && ref.current && !ref.current.contains(e.target)) {
        setSubmitView(false);
        setViewLandPlots(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [submitView]);

  useEffect(() => {
    // pushNotifications()
    setRedirectProperties(false);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const stickyheader = props.isTop ? "sticky" : "";
  const [navtoggle, setToggle] = useState(false);

  const navtoggleClass = () => {
    setToggle(!navtoggle);
  };

  const changeLang = (langCode) => {
    i18n.changeLanguage(langCode);
    setLang(langCode);
  };

  //Push Notifications

  // const pushNotifications = () =>{
  //    const messaging = firebase.messaging();
  //    messaging.getToken({vapidKey: "BH_QHIySZ4FBReDlvkSjJ5R-7639RiutZe7DfW3UsjGVIFEwP9GaON1UTDYZ6iZ_RfAQerQ2GxMg5v-iUHQ7i7g"}).then((currentToken) => {
  //        console.log(currentToken);
  //    })
  //
  //    messaging.onMessage((payload) => {
  //        console.log('Message received. ', payload);
  //        // ...
  //      });
  // }

  //const messaging = getMessaging();
  //onMessage(messaging, (payload) => {
  //  console.log('Message received. ', payload);
  //  // ...
  //});

  //Push Notifications End

  return (
    <div>
      <Fragment>
        {/* Aside (Mobile Navigation) */}
        <aside className={classNames("main-aside", { open: navtoggle })}>
          <div className="aside-title">
            <div className="aside-controls aside-trigger">
              <h4>Menu</h4>
              <div className="close-btn close-dark" onClick={navtoggleClass}>
                <span />
                <span />
              </div>
            </div>
          </div>
          <Mobilemenu />
        </aside>
        <div className="aside-overlay aside-trigger" onClick={navtoggleClass} />
        {/* Header Start */}
        <header className="main-header header-fw">
          <nav className="navbar">
            {/* Menu */}
            <NavMenu />
            {!isLoggedIn && <Modalbox mb_view={true} />}

            <div className="header-controls" style={{ height: "48px" }}>
              <Dropdown className="acr-language-selector">
                <Dropdown.Toggle
                  as={NavLink}
                  className="dropdownicon nav-toggle"
                >
                  {/* <img src={process.env.PUBLIC_URL + "/assets/img/flags/united-states.png"} alt="flag" /> */}
                  <span className="nav-lang">
                    <i class="fas fa-language fa-2x"></i>
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="nav-lang-menu">
                  <Dropdown.Item
                    disabled={lang === "en"}
                    onClick={() => changeLang("en")}
                    className="nav-lang-item"
                    as={Link}
                    to="#"
                  >
                    <span to="/submit-listing" className="">
                      English
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    disabled={lang === "kn"}
                    onClick={() => changeLang("kn")}
                    className="nav-lang-item"
                    as={Link}
                    to="#"
                  >
                    <span to="/submit-listing" className="">
                      Kannada
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    disabled={lang === "hi"}
                    onClick={() => changeLang("hi")}
                    className="nav-lang-item"
                    as={Link}
                    to="#"
                  >
                    <span to="/submit-listing" className="">
                      Hindi
                    </span>
                  </Dropdown.Item>
                  <Dropdown.Item
                    disabled={lang === "te"}
                    onClick={() => changeLang("te")}
                    className="nav-lang-item"
                    as={Link}
                    to="#"
                  >
                    <span to="/submit-listing" className="">
                      Telugu
                    </span>
                  </Dropdown.Item>
                  {/* <Dropdown.Item className="create-dropdown-item" as={Link} to="#"><span to="/submit-listing" className="create-dropdown-span">German</span></Dropdown.Item>
                                    <Dropdown.Item className="create-dropdown-item" as={Link} to="#"><span to="/submit-listing" className="create-dropdown-span">German</span></Dropdown.Item> */}
                  {/* <ul>
                                    
                                        <li> <Link to="#"> German</Link> </li>
                                        <li> <Link to="#"> Russian</Link> </li>
                                        <li> <Link to="#">English</Link> </li>
                                        <li> <Link to="#"> Spanish</Link> </li>
                                    </ul> */}
                </Dropdown.Menu>
              </Dropdown>
              {/* <img src={process.env.PUBLIC_URL + "/assets/img/flags/germany.png"} alt="flag" />
                            <img src={process.env.PUBLIC_URL + "/assets/img/flags/russia.png"} alt="flag" />
                            <img src={process.env.PUBLIC_URL + "/assets/img/flags/united-states.png"} alt="flag" />
                            <img src={process.env.PUBLIC_URL + "/assets/img/flags/spain.png"} alt="flag" /> */}
              <ul className="header-controls-inner d-none d-lg-flex">
                {/* <li><Businessloginmodal /></li> */}
                {/* {!isLoggedIn && 
                                   <li>
                                       <Link to="/business/login" style={{fontSize:'15px', color:'#424762'}}><i class="fas fa-file-contract pr-2" style={{fontSize:'15px',}} ></i>Business Account</Link>
                                   </li>
                                } */}
                {isLoggedIn && (
                  <li>
                    <Button class="notification-icon-button">
                      <Link to="/chat" style={{ color: "black" }}>
                        <span class="">
                          <i
                            class="fas fa-comment-dots"
                            style={{ fontSize: "18px" }}
                          ></i>
                        </span>
                      </Link>
                    </Button>
                  </li>
                )}
                <li>
                  {isLoggedIn ? (
                    <Notifications />
                  ) : (
                    <i className="fas fa-bell" style={{ fontSize: "18px" }}></i>
                  )}
                </li>
                <li>
                  <div>
                  <Link to="/submit-listing" className="btn btn-sm header-add-property"><AddIcon /></Link>  
                  
                    {/* <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        className="btn btn-sm header-add-property"
                        onClick={() => setSubmitView(true)}
                      >
                        <AddIcon />
                      </Dropdown.Toggle>

                      {submitView && (
                        <div className="submit-list-cont" ref={ref}>
                          <div className="header-submit-item item-1">
                            {t("header:listing.sell")}
                          </div>
                          <Link to="/submit-listing/sell/land-plot">
                          <div
                            className="header-submit-item land-plot-item"
                            onMouseOver={() => setViewLandPlots(true)}
                            onMouseLeave={() => setViewLandPlots(false)}
                          >
                            {viewLandPlots && (
                              <div className="submit-list-cont-land-1">
                                <Link to="/submit-listing/1/1">
                                  <div
                                    onClick={() => {
                                      console.log("ok");
                                    }}
                                    className="header-submit-item"
                                  >
                                    {t("header:listing.residential_land")}
                                  </div>
                                </Link>
                                <Link to="/submit-listing/1/2">
                                  <div
                                    onClick={() => {
                                      console.log("ok");
                                    }}
                                    className="header-submit-item"
                                  >
                                    {t("header:listing.agricultural_land")}
                                  </div>
                                </Link>
                                <Link to="/submit-listing/1/3">
                                  <div
                                    onClick={() => {
                                      console.log("ok");
                                    }}
                                    className="header-submit-item"
                                  >
                                    {t("header:listing.commercial_land")}
                                  </div>
                                </Link>
                                <Link to="/submit-listing/1/4">
                                  <div
                                    onClick={() => {
                                      console.log("ok");
                                    }}
                                    className="header-submit-item"
                                  >
                                    {t("header:listing.industrial_land")}
                                  </div>
                                </Link>
                              </div>
                            )}
                              <FilterHdrIcon />
                              {t("header:listing.land_plot")}

                          </div></Link>
                          <Link to="/submit-listing/sell/residential">
                          <div
                            className="header-submit-item"
                            onMouseOver={() => setViewSellResidential(true)}
                            onMouseLeave={() => setViewSellResidential(false)}
                          >
                            {viewSellResidential && (
                              <div className="submit-list-cont-land-1">
                                <Link to="/submit-listing/2">
                                  <div className="header-submit-item">
                                    {t("header:listing.apartments")}
                                  </div>
                                </Link>
                                <Link to="/submit-listing/3">
                                  <div className="header-submit-item">
                                    {t("header:listing.house_villa")}
                                  </div>
                                </Link>
                              </div>
                            )}
                            <HomeIcon />
                            {t("header:listing.residential")}
                          </div></Link> */}
                          {/* <div className="header-submit-item"> <Link to="/submit-listing/2">Apartments</Link></div>
                                            <div className="header-submit-item"> <Link to="/submit-listing/3">House/Villa</Link></div> */}
                          {/* <div className="header-submit-item item-1">
                            {t("header:listing.rent")}
                          </div>
                          <Link to="/submit-listing/rent/residential">
                          <div
                            className="header-submit-item"
                            onMouseOver={() => setViewRentResidential(true)}
                            onMouseLeave={() => setViewRentResidential(false)}
                          > */}
                            {/* {viewRentResidential && (
                              <div className="submit-list-cont-land-1">
                                <Link to="/submit-listing/4">
                                  <div className="header-submit-item">
                                    {t("header:listing.apartments")}
                                  </div>
                                </Link>
                                <Link to="/submit-listing/5">
                                  <div className="header-submit-item">
                                    {t("header:listing.commercial")}
                                  </div>
                                </Link>
                              </div>
                            )} */}
                            {/* <HomeIcon />
                            {t("header:listing.residential")}
                          </div></Link> */}
                          {/* <div className="header-submit-item"> <Link to="/submit-listing/4">Apartments</Link></div>
                                            <div className="header-submit-item"> <Link to="/submit-listing/5">Commercial</Link></div> */}
                        {/* </div>
                      )} */}

                      {/* <Dropdown.Menu>
                                        {isLoggedIn ?
                                               <Dropdown className="create-dropdown" style={{cursor: "initial",borderTop: "0"}}><div className="header-submit-item item-1">Sell</div></Dropdown>
                                               :(<Dropdown className="create-dropdown"><Modalbox btnType="create" btnText={'Sell'} icon={""}/></Dropdown>)
                                            } 
                                            
                                            {isLoggedIn ?
                                               <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/1"> <div>Lands/Plots</div> </Dropdown.Item>
                                               :(<Dropdown className="create-dropdown-item-login-off btn w-100" ><Modalbox btnType="create" btnText={'Land/Plots'} icon={<FilterHdrIcon />}/></Dropdown>)
                                            }          
                                            
                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/2"><span to="" className="create-dropdown-span"><ApartmentIcon/> {t('header:listing.apartments')}</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'Apartments'} icon={<ApartmentIcon/>}/></Dropdown>)
                                            }
                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/3"><span to="" className="create-dropdown-span"><HomeWorkIcon/> {t('header:listing.house_villa')}</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'House/Villa'} icon={<HomeWorkIcon/>}/></Dropdown>)
                                            }
                                            
                                            
                                            {isLoggedIn ?
                                               <Dropdown className="create-dropdown" style={{cursor: "initial"}}><div className="header-submit-item item-1">Rent</div></Dropdown>
                                               :(<Dropdown className="create-dropdown"><Modalbox btnType="create" btnText={'Rent'} icon={""}/></Dropdown>)
                                            }

                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/4"><span to="" className="create-dropdown-span"><HomeIcon/> {t('header:listing.house_apartments')}</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'House/Apartments'} icon={<HomeIcon/>}/></Dropdown>)
                                            }

                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/5"><span to="" className="create-dropdown-span"><BusinessIcon/> {t('header:listing.commercial')}</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'Commercial'} icon={<BusinessIcon/>}/></Dropdown>)
                                            }
                                        </Dropdown.Menu> */}
                    {/* </Dropdown> */}

                    {/* <ButtonGroup vertical size="sm">
                                            <DropdownButton as={ButtonGroup} id="bg-vertical-dropdown-1" size="sm">
                                            

                                            {isLoggedIn ?
                                               <Dropdown className="create-dropdown" style={{cursor: "initial",borderTop: "0"}}><span style={{fontSize:'15px'}}>Listing to Sell</span></Dropdown>
                                               :(<Dropdown className="create-dropdown"><Modalbox btnType="create" btnText={'Listing to Sell'} icon={""}/></Dropdown>)
                                            } 
                                            
                                            {isLoggedIn ?
                                               <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/1"><span to="/submit-listing" className="create-dropdown-span"><FilterHdrIcon /> Land/Plots</span></Dropdown.Item>
                                               :(<Dropdown className="create-dropdown-item-login-off btn w-100" ><Modalbox btnType="create" btnText={'Land/Plots'} icon={<FilterHdrIcon />}/></Dropdown>)
                                            }          
                                            
                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/2"><span to="" className="create-dropdown-span"><ApartmentIcon/> Apartments</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'Apartments'} icon={<ApartmentIcon/>}/></Dropdown>)
                                            }
                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/3"><span to="" className="create-dropdown-span"><HomeWorkIcon/>  House/Villa</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'House/Villa'} icon={<HomeWorkIcon/>}/></Dropdown>)
                                            }
                                            
                                            
                                            {isLoggedIn ?
                                               <Dropdown className="create-dropdown" style={{cursor: "initial"}}><span style={{fontSize:'15px'}}>Listing to Rent</span></Dropdown>
                                               :(<Dropdown className="create-dropdown"><Modalbox btnType="create" btnText={'Listing to Rent'} icon={""}/></Dropdown>)
                                            }

                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/4"><span to="" className="create-dropdown-span"><HomeIcon/> House/Apartments</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'House/Apartments'} icon={<HomeIcon/>}/></Dropdown>)
                                            }

                                            {isLoggedIn ?
                                              <Dropdown.Item className="create-dropdown-item" as={Link} to="/submit-listing/5"><span to="" className="create-dropdown-span"><BusinessIcon/> Commercial</span></Dropdown.Item>
                                            : (<Dropdown className="create-dropdown-item-login-off btn w-100"><Modalbox btnType="create" btnText={'Commercial'} icon={<BusinessIcon/>}/></Dropdown>)
                                            }
                                            
                                            </DropdownButton>
                                        </ButtonGroup> */}
                  </div>
                </li>

                <li>
                  <div>
                    {isLoggedIn ? (
                      <>
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            size="sm"
                            variant=""
                          >
                            <i
                              class="far fa-user-circle pt-1 mx-1"
                              style={{ fontSize: "25px" }}
                            ></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/myprofile">
                              <Link
                                to="/myprofile"
                                style={{ fontSize: "15px", color: "#424762" }}
                              >
                                {" "}
                                <i
                                  class="far fa-user-circle pr-2"
                                  style={{ fontSize: "18px" }}
                                ></i>
                                <span> {t("header:profile.myprofile")}</span>
                              </Link>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/profile-listings">
                              <Link
                                to="/profile-listings"
                                style={{ fontSize: "15px", color: "#424762" }}
                              >
                                <i
                                  class="fas fa-list pr-2"
                                  style={{ fontSize: "18px" }}
                                ></i>
                                {t("header:profile.mylistings")}
                              </Link>
                            </Dropdown.Item>
                            {/* <Dropdown.Item as={Link} to="/profile-saved-listings"><Link to="/profile-saved-listings" style={{fontSize:'15px', color:'#424762'}}><i class="far fa-heart pr-2" style={{fontSize:'18px',}} ></i> My Favorites</Link></Dropdown.Item> */}
                            {/* <Dropdown.Item href="/submit-listing"><Link to="/submit-listing" style={{fontSize:'15px', color:'#424762'}}><i class="fab fa-telegram-plane pr-2" style={{fontSize:'18px',}} ></i> Submit Listing</Link></Dropdown.Item> */}
                            <Dropdown.Item
                              as={Link}
                              to="/"
                              onClick={logoutAction}
                            >
                              <Link
                                to="/"
                                style={{ fontSize: "15px", color: "#424762" }}
                                onClick={logoutAction}
                              >
                                <i
                                  class="fas fa-sign-out-alt pr-2"
                                  style={{ fontSize: "18px" }}
                                ></i>{" "}
                                {t("header:profile.logout")}
                              </Link>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        {firstLogin && <Adduserinfomodal />}
                      </>
                    ) : (
                      <Modalbox />
                    )}
                  </div>
                </li>
              </ul>
              {/* Toggler */}
              <div
                className="aside-toggler aside-trigger"
                onClick={navtoggleClass}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </nav>
        </header>
        {/* Header End */}
      </Fragment>

      {redirectProperties && <Redirect to="/properties" />}

      {/* <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 20,
            right: 20,
            minWidth: 200
          }}>
            <Toast.Header>
              <strong className="mr-auto">title</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>message</Toast.Body>
          </Toast>  */}
    </div>
  );
}
