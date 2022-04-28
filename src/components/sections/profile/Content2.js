import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./profile.css";
import Overview from './Overview';
import Editprofile from './Editprofile';
import MyListings from './Mylistings';
import MyFavourites from './MyFavourites';
import Profileimg from './Profileimg';
import { Modal } from 'react-responsive-modal';


class Content extends Component {
    constructor() {
        super();
        this.state = {
          isLoggedin: false,
          loggedinUser:[],
          profileupdatemsg:false,
          EditprofileDiv: false,
          OverviewDiv: true,
          MyListingsDiv: false,
          MyFavouritesDiv: false,
          MyHistoryDiv: false,
          open:false,
        }
      }

      componentDidMount = () =>{
        this.checklogin();
      }

      checklogin = () =>{
        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        {
            loginuserinfo != null && loginuserinfo.loginstatus != null ? 
            this.setState({ isLoggedin: loginuserinfo.loginstatus, loggedinUser:loginuserinfo.loginuser }) :  this.setState({ isLoggedin: false })
        }
      }

      ActiveOverviewDiv = () => {
        this.setState({ OverviewDiv: true, MyListingsDiv: false, MyFavouritesDiv: false, MyHistoryDiv: false, EditprofileDiv:false, });
      }

      ActiveMyListingsDiv = () => {
        this.setState({ OverviewDiv: false, MyListingsDiv: true, MyFavouritesDiv: false, MyHistoryDiv: false, EditprofileDiv:false, profileupdatemsg:false });
      }

      ActiveMyFavouritesDiv = () => {
        this.setState({ OverviewDiv: false, MyListingsDiv: false, MyFavouritesDiv: true, MyHistoryDiv: false, EditprofileDiv:false, profileupdatemsg:false });
      }

      ActiveMyHistoryDiv = () => {
        this.setState({ OverviewDiv: false, MyListingsDiv: false, MyFavouritesDiv: false, MyHistoryDiv: true, EditprofileDiv:false, profileupdatemsg:false });
      }

      ActiveEditprofileDiv = () => {
        this.setState({ OverviewDiv: false, MyListingsDiv: false, MyFavouritesDiv: false, MyHistoryDiv: false, EditprofileDiv:true, profileupdatemsg:false });
      }

      successUserupdateapicall = () =>{
            fetch("https://api.test.takengo.risee.in/index.php/rest/users/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/id/" +this.state.loggedinUser.user_id+"")
              .then(response => response.json())
              .then(data =>	this.updateUserLocalstorage(data))
              .catch(error => console.log(error));
      }

      updateUserLocalstorage = (data) =>{
        localStorage.setItem('userlogin', JSON.stringify({loginstatus:true, loginuser:data}));
        this.checklogin();
      }


    render() {
        const {isLoggedin,loggedinUser,OverviewDiv, MyListingsDiv, MyFavouritesDiv, MyHistoryDiv, EditprofileDiv,profileupdatemsg,open} = this.state;
        
        const showprofileupdatemsg = () => {
            this.successUserupdateapicall();
            this.ActiveOverviewDiv();
            this.setState({ profileupdatemsg: true,});
        }

        const updateProfileimg = () => {
            this.props.updatelocalStorage();
            this.checklogin();
        }

        return (
            <div className="section">
                <div className="container">
                    <div className="pb-3">
                        {EditprofileDiv ? (<Link onClick={this.ActiveOverviewDiv} style={{fontSize:'20px'}}>Back</Link>) : (<p  style={{fontSize:'20px'}}>Profile Details</p>) }
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                        
                            <div className="media justify-content-center">
                              <Link onClick={()=> this.setState({open:true})}>
                                <img src={loggedinUser.user_profile_photo == '' ?  (process.env.PUBLIC_URL + "/assets/img/people/profile_ex.jpg") : ('https://api.test.takengo.risee.in/uploads/'+loggedinUser.user_profile_photo) } alt="agent" className="rounded-circle p-2" style={{border:'1.3px dashed #969191'}} /> 
                               </Link>
                            </div>
                            {EditprofileDiv ? null : (
                                <div>
                                    {loggedinUser.user_name != '' ? (<h5 className="mb-1 text-center" style={{color: 'rgb(80, 76, 76)'}}>{loggedinUser.user_name}</h5>) : null}
                                    {loggedinUser.city != '' ? (<p className="text-center"><i class="fas fa-map-marker-alt pr-1"></i>{loggedinUser.city}</p>) : null}
                                    <div className="text-center my-2">
                                        <button onClick={this.ActiveEditprofileDiv} class="btn btn-outline-secondary ">Edit Profile</button>
                                    </div>
                                    <div className="text-center my-2">
                                        <button type="button" class="btn btn-success ">upgrade Plan</button>
                                    </div>
                                    <div className="text-center my-2">
                                        <span className="profile-info-1"><i class="far fa-star"></i>41</span>
                                        <span className="profile-info-1"><i class="fas fa-user-friends"></i>Followers</span>
                                        <span className="profile-info-1"><b>0</b> Following</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-md-9"> 
                            {EditprofileDiv ? (
                                <div className="acr-welcome-message text-center tabs-nav-div">
                                    <h2 className="text-center" style={{color:'#655d5d'}}>Edit Profile Details</h2>
                                </div>
                            ) : (
                                <div className="acr-welcome-message text-center tabs-nav-div">
                                    <Link onClick={this.ActiveOverviewDiv} style={{color: 'rgb(80, 76, 76)'}}><span className={OverviewDiv ? ("tabs-nav tabs-nav-active"):("tabs-nav")} ><i class="fas fa-book-open pr-1 icon-mobile-off"></i>Overview</span></Link>
                                    <Link onClick={this.ActiveMyListingsDiv} style={{color: 'rgb(80, 76, 76)'}}><span className={MyListingsDiv ? ("tabs-nav tabs-nav-active"):("tabs-nav")}><i class="fas fa-list pr-1 icon-mobile-off"></i>My Listings</span></Link>
                                    <Link onClick={this.ActiveMyFavouritesDiv} style={{color: 'rgb(80, 76, 76)'}}><span className={MyFavouritesDiv ? ("tabs-nav tabs-nav-active"):("tabs-nav")}><i class="far fa-heart pr-1 icon-mobile-off"></i>My Favourites</span></Link>
                                    <Link onClick={this.ActiveMyHistoryDiv} style={{color: 'rgb(80, 76, 76)'}}><span className={MyHistoryDiv ? ("tabs-nav tabs-nav-active"):("tabs-nav")}><i class="fas fa-history pr-1 icon-mobile-off"></i>My History</span></Link>
                                </div>
                            )}

                            {profileupdatemsg ? (<h5 className="text-center text-success">Your profile successfully updated</h5>) : null}

                            {OverviewDiv ? (
                                <div className="acr-welcome-message">
                                    <Overview />
                                </div>
                            ): null}

                            {MyListingsDiv ? (
                                <div className="acr-welcome-message">
                                    <p className="mt-5" style={{fontSize:'22px'}}>My Listings</p>
                                    <MyListings />
                                </div>
                            ): null}

                            {MyFavouritesDiv ? (
                                <div className="acr-welcome-message">
                                    <p className="mt-5" style={{fontSize:'22px'}}>My Favourites</p>
                                    <MyFavourites />
                                </div>
                            ): null}

                            {MyHistoryDiv ? (
                                <div className="acr-welcome-message">
                                    <p className="mt-5" style={{fontSize:'22px'}}>My History</p>
                                    <MyFavourites />
                                </div>
                            ): null}

                            {EditprofileDiv ? (
                                <div className="acr-welcome-message">
                                    <Editprofile  showprofileupdatemsg={showprofileupdatemsg}/>
                                </div>
                            ): null}



                        </div>
                    </div>
                </div>

                <Modal
                  open={open}
                  onClose={()=> this.setState({open:false})}
                  center
                  classNames={{
                    overlay: 'customOverlay',
                  }}
                >
                    <Profileimg clsmodal={()=> this.setState({open:false})} updateProfileimg={updateProfileimg} />
                </Modal>

            </div>
        );
    }
}

export default Content;