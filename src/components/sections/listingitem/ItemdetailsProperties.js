import React, { Component, Fragment,useContext } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import { ItemsContext } from "./../../../context/ItemsContext";
import Calculator from '../../layouts/Calculator';
import classNames from 'classnames';
import axios from 'axios';
import Slider from 'react-slick';
import Listingmap from "./Listingmap.js";
import Loginmodal from "../../sections/modal/Loginmodal";
import Usermobile from "../../sections/modal/userinfo/UserMobile";
import PrintIcon from '@material-ui/icons/Print';
import LaunchIcon from '@material-ui/icons/Launch';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PersonIcon from '@material-ui/icons/Person';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import GridOnIcon from '@material-ui/icons/GridOn';
import RoomIcon from '@material-ui/icons/Room';

// Import Amenties Icons
import swimIcon from "./img/2932355.png";
import gymIcon from "./img/3720735.png";
import parkIcon from "./img/2204056.png";
import waterIcon from "./img/1009460.png";
import gatedIcon from "./img/553907.png";
import jogIcon from "./img/1668480.png";
import tennisIcon from "./img/625322.png";
import libraryIcon from "./img/2784596.png";
import spaIcon from "./img/1997093.png";
import indoorIcon from "./img/2145570.png";
import tourIcon from "./img/4950723.png";
import InterIcon from "./img/2660925.png";
import FireIcon from "./img/1764497.png";
import CarParkIcon from "./img/708949.png";
import gardenIcon from "./img/3392660.png";

import "./listingitem.css";

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

//const sliderpost = [
//    { img: "assets/img/listing-single/2.jpg" },
//    { img: "assets/img/listing-single/3.jpg" },
//    { img: "assets/img/listing-single/4.jpg" },
//    { img: "assets/img/listing-single/5.jpg" },
//];

class ContentProperties extends Component {
    constructor(props) {
        super(props)
        this.state = {
            similarProperties: [],
            showmore: false,
            bgcolor: true,
            viewAbout: false,
            viewAmenties: false,
            viewDesc: false,
            amenties: ["is_24_water_supply", "is_intercom_facility", "is_fire_alarm", "is_swimming_pool", "is_gym", "is_park", "is_jogging_track", "is_library","is_3dtour_available","is_car_parking", "is_indoor_games", "is_garden", "is_spa_available", "is_tennis_court"],
            amentiesIcon: [waterIcon,InterIcon,FireIcon,swimIcon,gymIcon,parkIcon,jogIcon,libraryIcon,tourIcon,CarParkIcon,indoorIcon,gardenIcon,spaIcon,tennisIcon],
            viewMap: false
        }
        this.showmoretoggle = this.showmoretoggle.bind(this);
        this.setViewDesc = this.setViewDesc.bind(this);
        this.setColor = this.setColor.bind(this);
        this.setViewAmenties = this.setViewAmenties.bind(this);
        this.setViewAbout = this.setViewAbout.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    // componentDidMount() {
    //     console.log(this.props.index);
    // }
    componentDidMount() {
        console.log(this.props.itemData);
        const arr = [...this.state.amenties];
        const newArr = [];
        const newArrIcon = [];
        arr.forEach((item,i) => {
            if(this.props.itemData[item] !== "0") {
                newArr.push(item);
                newArrIcon.push(this.state.amentiesIcon[i]);
            }
        });

        this.setState({
            amenties: newArr,
            amentiesIcon: newArrIcon
        });

        setTimeout(() => {
            this.setState({
                viewMap: true,
            });
        },150);


        const postData = {
            item_location_id: this.props.itemData.item_location_id,
            item_type_id: this.props.itemData.item_type_id,
            cat_id: this.props.itemData.cat_id,
            sub_cat_id: this.props.itemData.sub_category.id,
            status: 1
        };
        axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/10/offset/0/`, postData)
            .then(res => {this.setState({similarProperties: res.data});console.log(res.data)});


        

    }
    showmoretoggle() {
        this.setState({
            showmore: !this.state.showmore
        })
    }

    setColor() {
        this.setState({
            bgcolor: !this.state.bgcolor
        })
    }

    setViewAmenties() {
        this.setState({
            viewAmenties: !this.state.viewAmenties
        });
    }

    setViewDesc() {
        this.setState({
            viewDesc: !this.state.viewDesc
        });
    }

    setViewAbout() {
        this.setState({
            viewAbout: !this.state.viewAbout
        })
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
        }

        const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        const sliderpost = this.props.images;
        const itemData = this.props.itemData;
        const recentListings = this.props.recentListings;
        const callfavouriteApi = this.props.callfavouriteApi;
        const index = this.props.index;
        // const similarListings = this.props.similarListings;
        return (
            <Fragment>
                {/* Subheader Start */}
                <div className="listing-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="listing-banner-inner">
                                    {/* Arrows */}
                                    {
                                        sliderpost.length > 1 && (
                                            <Fragment>
                                                <i className="slider-prev fas fa-chevron-left slick-arrow" onClick={this.previous} />
                                                <i className="slider-next fas fa-chevron-right slick-arrow" onClick={this.next} />
                                            </Fragment>
                                        )
                                    }

                                    {/* <div className="listing-controls">
                                        <Link to="#" style={itemData.is_favourited === '1' ? {backgroundColor:'#dc3545',color:'#f8f9fa'} : {}}  onClick={() =>callfavouriteApi(itemData.id,index)}>
                                            <i className="far fa-heart" />
                                        </Link>
                                    </div> */}
                                    <Slider className="listing-banner-slider" ref={c => (this.slider = c)} {...settings}>
                                        {sliderpost.map((item, i) => (
                                            <div key={i} className="listing-thumbnail">
                                                <img src={process.env.REACT_APP_BASE_URL+"/uploads/"+item.img_path+""} alt="listing" style={{height:'540px'}} />
                                                {/* <img src={process.env.PUBLIC_URL + "/" + item.img} alt="listing" /> */}
                                            </div>
                                        ))}
                                    </Slider>
                                    {/* Badge */}
                                    {/* <span className="listing-badge featured"> Home {"> "} Projects {"> "} {
                                        itemData.title.length > 30 ? (itemData.title.slice(0,27)+"...") : (itemData.title)
                                    } </span> */}
                                    <div className="listing-item-path">
                                        <Link to="/">Home</Link> <ArrowForwardIosIcon fontSize="small" style={{margin: "0 5px"}}/> <Link to="/properties">Properties</Link> <ArrowForwardIosIcon fontSize="small" style={{margin: "0 5px"}} /> {
                                        itemData.title.length > 30 ? (itemData.title.slice(0,27)+"...") : (itemData.title) }
                                    </div>

                                    {itemData.property_id !== "" && (
                                        <div className="listing-item-id">
                                            Property ID: {itemData.property_id}
                                        </div>  
                                    )}
                                    

                                    {/* <div className="listing-item-cont">
                                        <div className="listing-item-lists"><PhotoLibraryIcon />{" "+itemData.photo_count}</div>
                                        <div className="listing-item-lists"><PlaylistAddCheckIcon />{" "+1}</div>
                                        <div className="listing-item-lists"><GridOnIcon />{" Floor Plan"}</div>
                                        <div className="listing-item-lists"><RoomIcon />{" Map"}</div>
                                    </div> */}

                                </div>
                            </div>
                            {/* <div className="col-lg-5">
                                <div className="sidebar-widget">
                                    {/* Author Start */}
                                    {/* <div className="media sidebar-author listing-agent">
                                        <Link to="#"><img src={process.env.PUBLIC_URL + "/assets/img/people/1.jpg"} alt="agent" /></Link>
                                        <div className="media-body">
                                            <h6> <Link to="#">Freddy Burben</Link> </h6>
                                            <span>Company Agent</span>
                                        </div>
                                        <Dropdown className="options-dropdown">
                                            <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                                <ul>
                                                    <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                                    <li> <Link to="/listing-grid"> <i className="fas fa-th-list" /> View Listings</Link> </li>
                                                    <li> <Link to="#"> <i className="fas fa-star" /> Save Agent</Link> </li>
                                                </ul>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div> */}
                                    {/* Author End */}
                                    {/* Contact Start */}
                                    {/* <form>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Email Address" name="email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Phone Number" name="phone" />
                                        </div>
                                        <div className="form-group">
                                            <textarea name="message" rows={3} placeholder="Enter your message" className="form-control" />
                                        </div>
                                        <button type="submit" className="btn-custom primary light btn-block">Send Message</button>
                                    </form> */}
                                    {/* Contact End */}
                                {/* </div> 
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* Subheader End */}
                {itemData && 
                <div className="section listing-wrapper" style={{paddingTop:'40px'}}>
                    <div className="container">
                    <div style={{position: "relative"}} className="mb-30 Itemd__title">
                            <span className="fs-15r">Overview</span>
                            <Link to={{pathname: `https://api.whatsapp.com/send?phone=&text=Hey!%20I%20found%20a%20Listing%20:%20https://risee.in/properties/${itemData.id}%20in%20INDMarketplace%20website`}} target="_blank">
                                              <div style={{height: "25px",padding: "0 5px",fontSize: "0.8rem"}} className="listing-whtapp-btn">
                                                  <WhatsAppIcon style={{width: "1.2rem",height: "1.2rem"}} /> 
                                                  <span>Share</span>
                                              </div>
                                            </Link>
                            {/* <div>
                                <PrintIcon style={{marginLeft: "10px"}}/>
                                <LaunchIcon style={{marginLeft: "10px"}} />
                            </div> */}
                        </div>
                        <div className="row flex-cr">
                            {/* Listings Start */}
                            <div className="col-lg-8">
                                {/* Content Start */}
                                {/* <div className="mb-30 row">
                                    <div className="mb-10 col-md-4 Itemd__br">
                                        <div className="Itemd__option">Possession Date</div>
                                        <div className="Item__opdetails">
                                            <i class="icon-2x far fa-calendar-alt"></i>
                                            <span>{itemData.possession_start_date_convert}</span>
                                        </div>
                                    </div>
                                    <div className="mb-10 col-md-4">
                                        <div className="Itemd__option">Property Type</div>
                                        <div className="Item__opdetails">
                                        <i class="icon-2x far fa-calendar-alt"></i>
                                            <span>{itemData.sub_category.name}</span>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="fs-15r mb-20 mt-30 Itemd__title">Details</div>

                                <div className="row">
                                        
                                <div className="Itemd__col-md-6">    
                                    <div className="Itemd__feature">
                                        <h6 className="Itemd__feature-label">Property</h6>
                                        <span className="Itemd__feature-value">{itemData.category.cat_name}</span>
                                    </div> 
                                     </div>
                            
                                <div className="Itemd__col-md-6">    
                                    <div className="Itemd__feature">
                                        <h6 className="Itemd__feature-label">Property Type</h6>
                                        <span className="Itemd__feature-value">{itemData.sub_category.name}</span>
                                    </div> 
                                </div>
                                <div className="Itemd__col-md-6"> 
                                    <div className="Itemd__feature">
                                        <h6 className="Itemd__feature-label">Listing Type</h6>
                                        <span className="Itemd__feature-value">{itemData.item_type.name === "Sell" ? "For Sale" : "For "+itemData.item_type.name}</span>
                                    </div> 
                                </div>

                                <div className="Itemd__col-md-6">
                                    <div className="Itemd__feature">
                                        <h6 className="Itemd__feature-label">Posted</h6>
                                        <span className="Itemd__feature-value">{itemData.posted_time_ago}</span>
                                    </div> 
                                </div>

                                <div className="Itemd__col-md-6">
                                    <div className="Itemd__feature">
                                        <h6 className="Itemd__feature-label">Listed By</h6>
                                        <span className="Itemd__feature-value">{itemData.listed_by}</span>
                                    </div> 
                                </div>
                                        
                                {itemData.towers !== '' &&
                                <div className="Itemd__col-md-6"> 
                                    <div className="Itemd__feature">
                                        <h6 className="Itemd__feature-label">Towers</h6>
                                        <span className="Itemd__feature-value">{itemData.towers}</span>
                                    </div> 
                                </div>}
                                        
                                        {itemData.project_details.name !== '' &&
                                         <div className="Itemd__col-md-6"> 
                                             <div className="Itemd__feature">
                                                 <h6 className="Itemd__feature-label">Project Name</h6>
                                                 <span className="Itemd__feature-value">{itemData.project_details.name}</span>
                                             </div> 
                                         </div>
                                        }
                                        {itemData.organisation.org_name !== '' &&
                                         <div className="Itemd__col-md-6">
                                             <div className="Itemd__feature">
                                                 <h6 className="Itemd__feature-label">Company Name</h6>
                                                 <span className="Itemd__feature-value">{itemData.organisation.org_name}</span>
                                             </div> 
                                         </div>      
                                        }

                                        {itemData.launch_date_convert !== '' && 
                                            <div className="Itemd__col-md-6">
                                                <div className="Itemd__feature">
                                                    <h6 className="Itemd__feature-label">Launched Date</h6>
                                                    <span className="Itemd__feature-value">{itemData.launch_date_convert}</span>
                                                </div> 
                                            </div>
                                        }
                                            
                                        {itemData.project_details.project_website_url !== '' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Project URL</h6>
                                                <a href={itemData.project_details.project_website_url} target="_blank">Visit Here</a>
                                            </div>  
                                         </div>
                                        }
                                        



                                        {itemData.length !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Length</h6>
                                                <span className="Itemd__feature-value">{itemData.length}</span>
                                            </div>
                                         </div>    
                                        }
                                        {itemData.car_parking === '1' && 
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Parking</h6>
                                                <span className="Itemd__feature-value">{itemData.car_parking === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>
                                        }    
                                        {itemData.property_id !== '' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Property Id</h6>
                                                <span className="Itemd__feature-value">{itemData.property_id}</span>
                                            </div>
                                         </div>    
                                        }
                                               
                                        {itemData.price_SqYard !== '' && itemData.price_SqYard !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Price per Sq.Yd</h6>
                                                <span className="Itemd__feature-value">{itemData.price_SqYard}</span>
                                            </div>
                                         </div>      
                                        }
                                        {itemData.rera_id !== '' && 
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">RERA ID</h6>
                                                <span className="Itemd__feature-value">{itemData.rera_id}</span>
                                            </div>  
                                         </div>    
                                        }
                                        {itemData.Lp_number !== '' && 
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">LP Number</h6>
                                                <span className="Itemd__feature-value">{itemData.Lp_number}</span>
                                            </div>
                                         </div>      
                                        }
                                        {itemData.area !== '' &&  itemData.area !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Property Size</h6>
                                                <span className="Itemd__feature-value">{itemData.area} {itemData.area_type}</span>
                                            </div> 
                                         </div>
                                        }

                                        {itemData.total_project_area !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Total Project Area</h6>
                                                <span className="Itemd__feature-value">{itemData.total_project_area} {" "} acres</span>
                                            </div> 
                                         </div>
                                        }  
                                        {itemData.total_planned_units !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Total Planned Units</h6>
                                                <span className="Itemd__feature-value">{itemData.total_planned_units}</span>
                                            </div> 
                                         </div>
                                        }

                                        {itemData.total_floors !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Total Floors</h6>
                                                <span className="Itemd__feature-value">{itemData.total_floors}</span>
                                            </div> 
                                         </div>
                                        }

                                        {itemData.breadth !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Breadth</h6>
                                                <span className="Itemd__feature-value">{itemData.breadth}</span>
                                            </div>
                                         </div>    
                                        } 

                                        {itemData.facing !== '' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Facing</h6>
                                                <span className="Itemd__feature-value">{itemData.facing}</span>
                                            </div>
                                         </div>    
                                        }

                                        {itemData.location_short !== '' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Location</h6>
                                                <span className="Itemd__feature-value">{
                                                    itemData.location_short.length > 20 ? itemData.location_short.slice(0,17)+"..." :  itemData.location_short
                                                }</span>
                                            </div>
                                         </div>    
                                        }
                                        {itemData.is_hmda === '1' && 
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">HMDA</h6>
                                                <span className="Itemd__feature-value">{itemData.is_hmda === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>    
                                        }
                                        
                                        {itemData.is_dtcp === '1' && 
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">DTCP</h6>
                                                <span className="Itemd__feature-value">{itemData.is_dtcp === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>    
                                        }

                                        {itemData.is_verified === '1' && 
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Verified</h6>
                                                <span className="Itemd__feature-value">{itemData.is_verified === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>    
                                        }  

                                        {itemData.total_project_area !== '' &&  itemData.total_project_area !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Total Project Area</h6>
                                                <span className="Itemd__feature-value">{itemData.total_project_area}</span>
                                            </div> 
                                         </div>
                                        }

                                        {itemData.total_planned_units !== '' &&  itemData.total_planned_units !== '0' &&
                                         <div className="Itemd__col-md-6">
                                            <div className="Itemd__feature">
                                                <h6 className="Itemd__feature-label">Total Planned Units</h6>
                                                <span className="Itemd__feature-value">{itemData.total_planned_units}</span>
                                            </div> 
                                         </div>
                                        }                                       
                                    </div>

                                    

                                    <div>
                                        {
                                            itemData.about_builder.length > 300 ? (
                                                <Fragment>
                                                    <div className="mb-30 mt-30 Itemd__title">About</div>
                                                    {
                                                        this.state.viewAbout ? (
                                                            <div>
                                                                {itemData.about_builder}
                                                                <div className="Itemd__viewmore">
                                                                    <span onClick={this.setViewAbout}>View Less...</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {itemData.about_builder.slice(0,300)+"..."}
                                                                <div className="Itemd__viewmore">
                                                                    <span onClick={this.setViewAbout}>View More...</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Fragment>
                                            ) : 
                                            itemData.about_builder !== "" && (
                                                <Fragment>
                                                    <div className="mb-30 mt-30 Itemd__title">About</div>
                                                    {itemData.about_builder}
                                                </Fragment>
                                            )
                                        }
                                        
                                    </div>

                                    {this.state.amenties.length !== 0 && (<div className="fs-15r mb-20 mt-30 Itemd__title">Amenties</div>)}
                                    
                                    <div className="row">
                                        {
                                            this.state.amenties.length > 6 ? (
                                                    this.state.viewAmenties ? (
                                                        <Fragment>
                                                            {this.state.amenties.map((item,i) => (
                                                                <div className="mb-10 col-md-4 col-sm-6">
                                                                    <div className="Item__opdetails">
                                                                        <img className="itemD-icon" src={this.state.amentiesIcon[i]} alt="" />
                                                                        <span>{item.slice(3,item.length)}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div style={{width: "100%",padding: "15px"}} className="Itemd__viewmore">
                                                                <span onClick={this.setViewAmenties}>View less...</span>
                                                            </div>
                                                        </Fragment>
                                                        
                                                    ) : (
                                                        <Fragment>
                                                            {this.state.amenties.map((item,i) => {
                                                                if(i<6) {
                                                                    return (
                                                                        <div className="mb-10 col-md-4 col-sm-6">
                                                                            <div className="Item__opdetails">
                                                                                <img className="itemD-icon" src={this.state.amentiesIcon[i]} alt="" />
                                                                                <span>{item.slice(3,item.length)}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                            <div style={{width: "100%",padding: "15px"}} className="Itemd__viewmore">
                                                                <span onClick={this.setViewAmenties}>View More...</span>
                                                            </div>
                                                        </Fragment>
                                                    )
                                            ) : (
                                                this.state.amenties.map((item,i) => (
                                                    <div className="mb-10 col-md-4 col-sm-6">
                                                        <div className="Item__opdetails">
                                                            <img className="itemD-icon" src={this.state.amentiesIcon[i]} alt="" />
                                                            <span>{item.slice(3,item.length)}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>

                                    <div>
                                    {
                                            itemData.description.length > 300 ? (
                                                <Fragment>
                                                    <div className="fs-15r mb-20 mt-30 Itemd__title">Description</div>
                                                    {
                                                        this.state.viewDesc ? (
                                                            <div>
                                                                {itemData.description}
                                                                <div className="Itemd__viewmore">
                                                                    <span onClick={this.setViewDesc}>View Less</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {itemData.description.slice(0,300)+"..."}
                                                                <div className="Itemd__viewmore">
                                                                    <span onClick={this.setViewDesc}>View More...</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Fragment>
                                            ) : 
                                                
                                                    itemData.description !== '' && (
                                                        <Fragment>
                                                            <div className="fs-15r mb-20 mt-30 Itemd__title">Description</div>
                                                            {itemData.description}
                                                        </Fragment>
                                                    )
                                                
                                        }
                                    </div>


                                    <div className="fs-15r mb-10 mt-30 Itemd__title">Location</div>
                                    <div className="mb-10">{itemData.address}</div>
                                    {this.state.viewMap && (<Listingmap lat={itemData.lat} lng={itemData.lng}/>)}
                                    
                                    
                                {/* <div className="listing-content">
                                    <h1 className="listing-title">{itemData.title}</h1>
                                    {itemData.price_SqYard !== '' && itemData.price_SqYard !== '0' && 
                                     <h4 className="custom-primary">RS. {itemData.price_SqYard}/Sq.Yd</h4>
                                    }
                                   {itemData.address !== '' && <span className="listing-address"> <i className="fas fa-map-marker-alt" />{itemData.address}</span>} 
                                   {itemData.project_details.pdf_link_url !== '' &&
                                     <a href={itemData.project_details.pdf_link_url} className="btn-custom primary my-3"  download >Download Brochure</a>
                                   }
                                   <p className="my-2">{itemData.description}</p>
                                </div> */}
                                {/* Content End */}
                               
                                {/* Price Range In the area End */}
                                {/* Features */}
                                {/* <div className="section section-padding pt-0 acr-listing-features">
                                    <h4>Features</h4>
                                    <div className="row">
                                        
                                        {itemData.project_details.name !== '' &&
                                         <div className="col-lg-6 col-md-6"> 
                                             <div className="Itemd__feature">
                                                 <i className="flaticon-picture" />
                                                 <h6 className="Itemd__feature-label">Project Name</h6>
                                                 <span className="Itemd__feature-value">{itemData.project_details.name}</span>
                                             </div> 
                                         </div>
                                        }         
                        {console.log('Test loading...')}
                        {console.log(itemData)}
                        {console.log('Test loading  End...')}
                                        {itemData.organisation.org_name !== '' &&
                                         <div className="col-lg-6 col-md-6">
                                             <div className="listing-feature">
                                                 <i className="flaticon-picture" />
                                                 <h6 className="listing-feature-label">Company Name</h6>
                                                 <span className="listing-feature-value">{itemData.organisation.org_name}</span>
                                             </div> 
                                         </div>      
                                        }
                                            
                                        {itemData.project_details.project_website_url !== '' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-picture" />
                                                <h6 className="listing-feature-label">Project URL</h6>
                                                <a href={itemData.project_details.project_website_url} target="_blank">{itemData.project_details.project_website_url.slice(0,26)+"...."}</a>
                                            </div>  
                                         </div>
                                        }
                                        
                                        {itemData.sub_category.name !== '' && 
                                         <div className="col-lg-6 col-md-6">    
                                            <div className="listing-feature">
                                                <i className="flaticon-picture" />
                                                <h6 className="listing-feature-label">Property Type</h6>
                                                <span className="listing-feature-value">{itemData.sub_category.name}</span>
                                            </div> 
                                         </div>
                                        }

                                        {itemData.length !== '0' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Length</h6>
                                                <span className="listing-feature-value">{itemData.length}</span>
                                            </div>
                                         </div>    
                                        }
                                        {itemData.car_parking === '1' && 
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-garage" />
                                                <h6 className="listing-feature-label">Parking</h6>
                                                <span className="listing-feature-value">{itemData.car_parking === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>
                                        }    
                                        {itemData.property_id !== '' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-key" />
                                                <h6 className="listing-feature-label">Property Id</h6>
                                                <span className="listing-feature-value">{itemData.property_id}</span>
                                            </div>
                                         </div>    
                                        }
                                               
                                        {itemData.price_SqYard !== '' && itemData.price_SqYard !== '0' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-picture" />
                                                <h6 className="listing-feature-label">Price per Sq.Yd</h6>
                                                <span className="listing-feature-value">{itemData.price_SqYard}</span>
                                            </div>
                                         </div>      
                                        }
                                        {itemData.rera_id !== '' && 
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-picture" />
                                                <h6 className="listing-feature-label">RERA ID</h6>
                                                <span className="listing-feature-value">{itemData.rera_id}</span>
                                            </div>  
                                         </div>    
                                        }
                                        {itemData.Lp_number !== '' && 
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-picture" />
                                                <h6 className="listing-feature-label">LP Number</h6>
                                                <span className="listing-feature-value">{itemData.Lp_number}</span>
                                            </div>
                                         </div>      
                                        }
                                        {itemData.area !== '' &&  itemData.area !== '0' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Property Size</h6>
                                                <span className="listing-feature-value">{itemData.area} {itemData.area_type}</span>
                                            </div> 
                                         </div>
                                        }    

                                        {itemData.breadth !== '0' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Breadth</h6>
                                                <span className="listing-feature-value">{itemData.breadth}</span>
                                            </div>
                                         </div>    
                                        } 

                                        {itemData.facing !== '' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Facing</h6>
                                                <span className="listing-feature-value">{itemData.facing}</span>
                                            </div>
                                         </div>    
                                        }

                                        {itemData.location_short !== '' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Location</h6>
                                                <span className="listing-feature-value">{itemData.location_short}</span>
                                            </div>
                                         </div>    
                                        }
                                        {itemData.is_hmda === '1' && 
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-garage" />
                                                <h6 className="listing-feature-label">HMDA</h6>
                                                <span className="listing-feature-value">{itemData.is_hmda === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>    
                                        }
                                        
                                        {itemData.is_dtcp === '1' && 
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-garage" />
                                                <h6 className="listing-feature-label">DTCP</h6>
                                                <span className="listing-feature-value">{itemData.is_dtcp === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>    
                                        }

                                        {itemData.is_verified === '1' && 
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-garage" />
                                                <h6 className="listing-feature-label">Verified</h6>
                                                <span className="listing-feature-value">{itemData.is_verified === '1' ? 'Yes' : 'No'} </span>
                                            </div>
                                         </div>    
                                        }  

                                        {itemData.total_project_area !== '' &&  itemData.total_project_area !== '0' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Total Project Area</h6>
                                                <span className="listing-feature-value">{itemData.total_project_area}</span>
                                            </div> 
                                         </div>
                                        }

                                        {itemData.total_planned_units !== '' &&  itemData.total_planned_units !== '0' &&
                                         <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Total Planned Units</h6>
                                                <span className="listing-feature-value">{itemData.total_planned_units}</span>
                                            </div> 
                                         </div>
                                        }                                        
                                    </div>
                                </div> */}
                                {/* Features End*/}
              
                                {/* About Project */}
                                {/* {itemData.project_details.about_project !== '' &&
                                 <div className="section pt-0">
                                    <h4>About Project</h4>
                                    <p>{itemData.project_details.about_project}</p>
                                 </div>
                                } */}
                                {/* About Project End*/}
                                
                                <div>
                                        {
                                            itemData.project_details.about_project.length > 300 ? (
                                                <Fragment>
                                                    <div className="fs-15r mb-20 mt-30 Itemd__title">About Project</div>
                                                    {
                                                        this.state.viewAbout ? (
                                                            <div>
                                                                {itemData.project_details.about_project}
                                                                <div className="Itemd__viewmore">
                                                                    <span onClick={this.setViewAbout}>View Less...</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {itemData.project_details.about_project.slice(0,300)+"..."}
                                                                <div className="Itemd__viewmore">
                                                                    <span onClick={this.setViewAbout}>View More...</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </Fragment>
                                            ) : 
                                                
                                                    itemData.project_details.about_project !== '' && (
                                                        <Fragment>
                                                            {itemData.about_builder}
                                                        </Fragment>
                                                    )
                                                
                                        }
                                        
                                    </div>

                                    <div className="fs-15r mb-20 mt-30 Itemd__title">Similar Properties</div>
                                    <div>
                                        {this.state.similarProperties.length >=3 ? (<Fragment>
                                            <div className="row">
                                                {this.state.similarProperties.slice(0,3).map((item,i) => (
                                                    <div className="col-md-4">
                                                        <div className="similarProp">
                                                            <Link to={"/properties/"+item.id} target="_blank">
                                                                <img 
                                                                    src={item.default_photo.img_path === "" ? 
                                                                        (process.env.PUBLIC_URL + "/" + item.gridimg):
                                                                        (process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path)
                                                                    }
                                                                    style={{height:'100px'}} 
                                                                    alt={"Img-"+item.title} 
                                                                />
                                                            </Link>
                                                            <div className="propTitle">
                                                                <div>{item.title.length > 25 ? item.title.slice(0,22)+"..." : item.title}</div>
                                                                <div><i style={{marginRight: "5px"}} class="fas fa-map-marker"></i> {itemData.item_location.name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) )}
                                                
                                            </div>
                                            {/* <div className="Itemd__viewmore">
                                                <span onClick={this.setViewAbout}>View More...</span>
                                            </div> */}
                                            </Fragment>
                                        ) : (
                                            <div className="row">
                                                {this.state.similarProperties.slice(0,3).map((item,i) => (
                                                        <div className="col-md-4">
                                                            <div className="similarProp">
                                                                <Link to={"/properties/"+item.id} target="_blank">
                                                                    <img 
                                                                        src={item.default_photo.img_path === "" ? 
                                                                            (process.env.PUBLIC_URL + "/" + item.gridimg):
                                                                            (process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path)
                                                                        }
                                                                        style={{height:'100px'}} 
                                                                        alt={"Img-"+item.title} 
                                                                    />
                                                                </Link>
                                                                <div className="propTitle">
                                                                    <div>{item.title.length > 25 ? item.title.slice(0,22)+"..." : item.title}</div>
                                                                    <div><i style={{marginRight: "5px"}} class="fas fa-map-marker"></i> {itemData.item_location.name}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) )}
                                            </div>
                                        )}
                                    </div>

                                {/* About Company */}
                                {/* {itemData.about_builder !== '' && 
                                 <div className="section pt-0">
                                    <h4>About Company</h4>
                                    <p>{itemData.about_builder}</p>
                                 </div>
                                } */}
                                {/* About Company End*/}
                                
                                {/* <div className="section pt-0">
                                    <h4>Schedule Link tour</h4>
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <input type="text" className="form-control" placeholder="Full Name" name="fname" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <input type="email" className="form-control" placeholder="Email Address" name="email" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <input type="text" className="form-control" placeholder="Phone Number" name="phone" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <input type="text" className="form-control" placeholder="Date" name="date" />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <textarea className="form-control" placeholder="Type your comment..." name="comment" rows={7} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-custom primary" name="button">Schedule Tour</button>
                                    </form>
                                </div> */}
                                {/* Pagination Start */}
                                {/* <div className="section p-0 post-single-pagination-wrapper">
                                    <div className="post-single-pagination post-prev">
                                        <i className="fas fa-arrow-left" />
                                        <Link to="#" className="post-single-pagination-content">
                                            <span>Prev Listing</span>
                                            <h6>Theodore Lowe, Azusa New York 39531</h6>
                                        </Link>
                                    </div>
                                    <div className="post-single-pagination post-next">
                                        <Link to="#" className="post-single-pagination-content">
                                            <span>Next Listing</span>
                                            <h6>Cecilia Chapman, Mankato Mississippi 96522</h6>
                                        </Link>
                                        <i className="fas fa-arrow-right" />
                                    </div>
                                </div> */}
                                {/* Pagination End */}
                                {/* Similar Start */}


                                {/* Similar End */}
                            </div>
                            {/* Listings End */}
                            {/* Sidebar Start */}
                            <div className="col-lg-4">
                                <div className="sidebar sticky-sidebar mg-none">
                                    <div className="sidebar-widget">
                                        {/* Author Start */}
                                        {itemData && (
                                            <div className="propDetails">
                                                <div className="approveDetails">
                                                    { itemData.is_hmda === "0" && (
                                                        <span className="approveItem">HMDA</span>
                                                    )}

                                                    { itemData.is_rera_approved === "0" && (
                                                        <span className="approveItem">RERA Approved</span>
                                                    )}
                                                </div>
                                                <div className="mb-10">
                                                    <span className="fs-14r" style={{fontSize: "1.7rem",color: "black",fontWeight: "600"}}>Rs. {itemData.price_SqYard}</span>
                                                    <span style={{color:"#101737",marginLeft: "10px"}}>/ Sq.Ft</span>
                                                    {/* <span style={{color:"#101737",marginLeft: "10px"}}>/{itemData.price_SqYard} Sq.Ft</span> */}
                                                    
                                                </div>
                                                <div className="mb-10">
                                                    <span className="fs-14r" style={{fontSize: "1.5rem",color: "black"}}>{itemData.title}</span>

                                                </div>
                                                <div className="mb-10">
                                                    <i style={{marginRight: "5px"}} class="fas fa-map-marker"></i> {itemData.item_location.name}
                                                </div>
                                            </div>
                                        )
                                        }
                                        {/* Contact Start */}
                                        {itemData &&
                                        <div className="listing-author-cont">
                                            <p>Posted By:</p>
                        
                                            <div className="sidebar-flex-start">
                                                <Link 
                                                    className="sidebar-link"
                                                    to={itemData.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && ("/agent-details/"+itemData.user.user_id)}
                                                    onClick={(e) => itemData.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' && (alert('User Account is not Created.'))}
                                                >
                                                    <img 
                                                    src={itemData.user.user_profile_photo === "" ? 
                                                    (process.env.PUBLIC_URL + "/assets/img/people/1.jpg"):
                                                    (process.env.REACT_APP_BASE_URL+'/uploads/'+itemData.user.user_profile_photo)}
                                                    alt="agent" />
                                                </Link>
                                                <div className="media-body">
                                                    <h6> 
                                                        <Link 
                                                        to={itemData.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && ("/agent-details/"+itemData.user.user_id)}
                                                        onClick={(e) => itemData.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' && (alert('User Account is not Created.'))}
                                                        >
                                                            {itemData.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' ? (
                                                                itemData.listed_by_name === "" ? "NO Title" : itemData.listed_by_name
                                                                ): (
                                                                    itemData.user.user_name === "" ? "NO Title" : itemData.user.user_name
                                                            )}
                                                        </Link>
                                                    </h6>
                                                    <span>{itemData.user.city}</span>
                                                </div>
                                                <Dropdown className="options-dropdown">
                                                    <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                                                    <Dropdown.Menu className="dropdown-menu-right">
                                                        {/* <ul>
                                                            <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                                            <li> <Link to="/listing-grid"> <i className="fas fa-th-list" /> View Listings</Link> </li>
                                                            <li> <Link to="#"> <i className="fas fa-star" /> Save Agent</Link> </li>
                                                        </ul> */}
                                                        <ul className="pd-15">
                                                        {this.props.isLoggedIn ? <Usermobile userData={itemData} /> : <Loginmodal icon={'fas fa-phone'} text={'View Number'}  />}
                                                        {itemData.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && 
                                                        <li> 
                                                            <Link 
                                                                to={itemData.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && ("/agent-details/"+itemData.user.user_id)}
                                                                onClick={(e) => itemData.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' && (alert('User Account is not Created.'))}
                                                            > 
                                                                <i className="fas fa-th-list" /> View Listings
                                                            </Link> 
                                                        </li>
                                                        }
                                                        {itemData.is_whatsapp_allowed === '1' && 
                                                            itemData.user.user_whatsapp_number !== '' &&
                                                            <li>
                                                                {" "}
                                                                <a href={"https://wa.me/"+itemData.user.user_whatsapp_number+""} target="_blank">
                                                                {" "}
                                                                <i class="fab fa-whatsapp-square" style={{fontSize:'16px'}}></i>WhatsApp
                                                                </a>{" "}
                                                            </li>
                                                        } 
                                                        {this.props.isLoggedIn ?                                  
                                                        <li>
                                                            {" "}
                                                            <Link /*to="/listing-details-v1" */>
                                                                {" "}
                                                                <i className="fas fa-bookmark" /> Follow User
                                                            </Link>{" "}
                                                        </li>  : <Loginmodal icon={'fas fa-bookmark'} text={'Follow User'} />} 
                                                        </ul>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                        }
                                        {/* <form>

                                            <h5 className="mb-20">Interested ? Send your query</h5>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Email Address" name="email" />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Phone Number" name="phone" />
                                            </div>
                                            <div className="form-group">
                                                <textarea name="message" rows={3} placeholder="Enter your message" className="form-control" />
                                            </div>
                                            <div className="keepInfo">
                                                <input type="checkbox" id="info" name="info" checked/>
                                                <label for="info">Keep me informed about similar properties</label>
                                            </div>
                                            <button className="formBtn">Send Enquiry</button>
                                        </form> */}

                                        
                                        {/* Contact End */}
                                        
                                    </div>
                                    {/* <div className="sidebar-widget">
                                        <h5>Mortgage Calculator</h5>
                                        <Calculator />
                                    </div> */}
                                </div>
                            </div>
                            {/* Sidebar End */}
                        </div>
                    </div>
                </div>
                }
            </Fragment>
        );
    }
}

export default ContentProperties;