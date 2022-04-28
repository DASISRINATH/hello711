import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./profile.css";
import listing from '../../../data/listings.json';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';




const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Beds
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Bathrooms
    </Tooltip>
);
const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);

class MyFavourites extends Component {
    constructor() {
        super();
        this.state = {
          isLoggedin: false,
          loggedinUser:[],
          isLoading:true,
          MyFavouritesdata:[],
          error:false,
          errormsg:'',
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
        // console.log(loginuserinfo.loginuser.user_id)
      }

      fetchMyFavourites = () =>{
        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
        var user = {
            added_user_id:loginuserinfo.loginuser.user_id,
        }

        fetch("https://api.test.takengo.risee.in/index.php/rest/items/get_favourite/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/", {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }, 
            body: JSON.stringify(user)
          })
          .then(response => response.json())
          .then(data => this.setFavouritesstate(data))
          .catch(error => console.log(error));  
      }

      setFavouritesstate = (data) =>{
       if(data.status == 'error'){
        this.setState({isLoading:false, error:true, errormsg:data.message})
       }else{
        this.setState({isLoading:false, MyFavouritesdata:data})
       }
      }

    render() {
        const {isLoggedin,loggedinUser,MyFavouritesdata,error,errormsg,isLoading} = this.state;
        return (
            <div className="py-2">
                {isLoading ? (<h4 className="text-center text-primary">Loading...</h4>):(
                       error ? (<h5 className="text-center text-danger">{errormsg}</h5>):(
                <div className="row">
                    {/* Listing Start */}
                    {MyFavouritesdata.slice(0, 6).map((item, i) => (
                        <div className="col-md-6">
                            <div key={i} style={{width:'100%', height:'162px', borderRadius: '6px', border:'1px solid #a29d9d'}}>    
                                <div style={{float:'left',width:'72%',padding:'6px 2px 6px 12px'}}>
                                    <p className="price-p1">{new Intl.NumberFormat().format((item.price).toFixed(2))}$</p>
                                    <h6 className="title-p1"> {item.title}</h6>
                                    <p className="desc-p1">{item.description}</p>
                                    <p><span className="px-1 "><i className="far fa-eye px-1"></i>30 Views</span> <span><i className="far fa-star px-1"></i>5</span></p>
                                </div>
                                <div style={{float:'right',width:'28%'}}>  
                                    <Link to=""><img src={item.default_photo.img_path == '' ?   (process.env.PUBLIC_URL + "/assets/img/listings-list/1.jpg"):("https://api.test.takengo.risee.in/uploads/"+item.default_photo.img_path)}  alt="listing" style={{borderRadius: '6px',border:'1px solid #a29d9d',height:'161px', width:'100%'}} /></Link>
                                </div>
                            </div> 
                        </div>
                        ))}
                        </div> 
                    ))}
                    {/* Listing End */}  
                
            </div>
        );
    }
}

export default MyFavourites;