import React, { Fragment } from 'react';
import NavMenu from '../layouts/NavMenu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Modalcontent from './Modalcontent';
//import Modal from './Modal';
import { OverlayTrigger, Popover,} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Adduserinfomodal from './Adduserinfomodal';
import { Modal } from 'react-responsive-modal';


class Headerfive extends HeaderComponent {
    constructor() {
        super();
        this.state = {
          open:false,
          isLoggedin: false,
          loggedinUser:[],
        }
      }

      logout = () =>{
        localStorage.clear();
        this.setState({ isLoggedin: false });
      }

      componentDidMount = () =>{
        this.checklogin_default();
        //this.OpenAdduserinfomodal();
      }

      checklogin_default = () =>{
        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        {
            loginuserinfo != null && loginuserinfo.loginstatus != null ? 
            this.setState({ isLoggedin: loginuserinfo.loginstatus, loggedinUser:loginuserinfo.loginuser }) :  this.Logout() 
        }
        //{loginuserinfo.status == "error"  && this.Logout()}
      }

      checklogin = () =>{
        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        {
            loginuserinfo != null && loginuserinfo.loginstatus != null ? 
            this.setState({ isLoggedin: loginuserinfo.loginstatus, loggedinUser:loginuserinfo.loginuser }) : this.Logout()
        }
        {loginuserinfo.loginuser.user_name == '' && this.setState({ open: true }) }
      }

      Logout = () => {
        localStorage.clear()
        this.setState({ isLoggedin: false })
      }


      Updateuserdata = () =>{
        fetch("https://api.test.takengo.risee.in/index.php/rest/users/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/id/" +this.state.loggedinUser.user_id+"")
        .then(response => response.json())
        .then(data =>	this.updateUserLocalstorage(data))
        .catch(error => {
          //console.log(error)
          alert("please Login again")
          this.Logout()
          this.CloseAdduserinfomodal()
        });
      }

      updateUserLocalstorage = (data) =>{
        localStorage.setItem('userlogin', JSON.stringify({loginstatus:true, loginuser:data}));
        this.checklogin();
        this.CloseAdduserinfomodal()
      }


      CloseAdduserinfomodal = () =>{
        this.setState({ open: false })
      }



      //OpenAdduserinfomodal = () =>{
      //  {this.state.loggedinUser.user_name == '' && this.setState({ open: true }) }
      //    //alert("test the function");
      //  //this.setState({ open: true })
      //}



    render() {
        const {isLoggedin,loggedinUser} = this.state;
        return (
            <Fragment>
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": this.state.navtoggle })}>
                    <div className="aside-title">
                        <div className="aside-controls aside-trigger">
                            <h4>Menu</h4>
                            <div className="close-btn close-dark" onClick={this.navtoggleClass} >
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={this.navtoggleClass} />
                {/* Header Start */}
                <header className="main-header header-fw">
                    {/* Top Header Start */}
                   
                    {/* Top Header End */}
                    <nav className="navbar">
                        {/* Menu */}
                        <NavMenu />
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">
                                <li className="mx-2">
                                    {/*<Link to="/submit-listing" className="btn-custom primary">Submit Listing <i className="fas fa-plus" /> </Link>*/}
                                    <Link to="/submit-listing"><Button variant="contained" size="sm">Add + </Button>  </Link>
                                    <Link to="/submit-listing"><Button variant="contained" size="sm">Login </Button>  </Link>

                                </li>
                                <li className="mx-2">
                                    {isLoggedin ? (
                                        <OverlayTrigger
                                        trigger="click"
                                        key={'bottom'}
                                        placement={'bottom'}
                                        overlay={
                                          <Popover id={`popover-positioned-${'bottom'}`}>
                                            {/*<Popover.Title as="h3">{`Popover ${'bottom'}`}</Popover.Title>*/}
                                            <Popover.Content>
                                            <ul className="submenu">
                                                <li className="menu-item" > <Link to="/profile" style={{fontSize:'19px', color:'#8b8c8e'}}> <i class="far fa-user-circle pr-2" style={{fontSize:'22px',}} ></i><span>My Profile</span></Link> </li>
                                                <li className="menu-item" > <Link to="/" style={{fontSize:'19px', color:'#8b8c8e'}}><i class="far fa-star pr-2" style={{fontSize:'22px',}} ></i>My Favorites</Link> </li>
                                                <li className="menu-item" > <Link to="/" style={{fontSize:'19px', color:'#8b8c8e'}}><i class="fas fa-list-ol pr-2" style={{fontSize:'22px',}} ></i>My Listings</Link> </li>
                                                <li className="menu-item" > <Link to="/add-post" style={{fontSize:'19px', color:'#8b8c8e'}}><i class="fab fa-telegram-plane pr-2" style={{fontSize:'22px',}} ></i>Post Listing</Link> </li>
                                                <li className="menu-item" > <Link to="/" style={{fontSize:'19px', color:'#8b8c8e'}} onClick={this.logout}><i class="fas fa-sign-out-alt pr-2" style={{fontSize:'22px',}} ></i>Logout</Link> </li>
                                            </ul>
                                        
                                              {/* <strong>Holy guacamole!</strong> Check this info.*/}
                                            </Popover.Content>
                                          </Popover>
                                        }
                                        >
                                        <button  className="btn dropdown-toggle" >
                                            <img 
                                               src={loggedinUser.user_profile_photo === '' ?  (process.env.PUBLIC_URL + "/assets/img/people/profile_ex.jpg") : ('https://api.test.takengo.risee.in/uploads/'+loggedinUser.user_profile_photo) }  
                                               alt="agent" className="rounded-circle" 
                                               style={{height:'42px', width:'42px',borderRadius: '50%',border:'solid 2px #9e9999'}}   
                                            />
                                        </button>
                                        </OverlayTrigger>
                                    ) : null }

                                </li>
                            </ul>
                            {/* Toggler */}
                            <div className="aside-toggler aside-trigger" onClick={this.navtoggleClass}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </nav>
                </header>
                {/* Header End */}

                <Modal
                    open={this.state.open}
                    onClose={this.CloseAdduserinfomodal}
                    center
                    classNames={{
                      overlay: 'customOverlay',
                    }}
                 >
                    <Adduserinfomodal clsmodal={this.CloseAdduserinfomodal} Updateuserdata={this.Updateuserdata} 
                    />
                </Modal>

            </Fragment>
        );
    }
}

export default Headerfive;
//src={process.env.PUBLIC_URL + "/assets/img/people/profile_ex.jpg"}