import React, {useState, useEffect, useContext} from 'react';
import {useHistory } from "react-router-dom";
import { UserContext } from "./../../../context/LoginContext";
import axios from "../../../baseAxios";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ReactPaginate from 'react-paginate';
import Itemdatamodal from "./Itemdatamodal";
import Loginmodal from "../../sections/modal/Loginmodal";
import Usermobile from "../../sections/modal/userinfo/UserMobile";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
//import { useSelector, useDispatch } from "react-redux";
//import { fetchItemListData, itemsSelectors } from "./../../../slices/items/itemSlice";




const Content = (props) => {
    const history = useHistory();
  const {isLoggedIn,setIsLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);
  //const dispatch = useDispatch();
  //const items = useSelector(itemsSelectors.selectAll);
  //const loading = useSelector((state) => state.items.loading);
  //const error = useSelector((state) => state.items.error);

  const [agentid, setAgentid] = useState(props.agentid);
  const [items, setItems] = useState([]);
  const [itemscount, setItemscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [url,setUrl] = useState("");

  useEffect(() => {   
    fetchItems()
  }, [offset]);

  const fetchItems = async() =>{
    setLoading(true)
    setError(false) 
    // alert(props.agent.user_id) 
    //var agentid = {added_user_id:props.agent.user_id,};
    //var offsetcount = offset;
    //var data = {sort:agentid, offset:offsetcount}
    //dispatch(fetchItemListData(data));

    var postData = {
        added_user_id:agentid,
        status:1,
    };

    console.log(postData)
    await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/10/offset/${offset}/rappikey/app_list_id/2`, postData)
    .then(response => updateItemsState(response.data))
    .catch(error => {
        setLoading(false)
        setError(true)
        setItems([])
        setItemscount(0)
        setOffset(0)
    });
  }

  const updateItemsState = (data) =>{
    setLoading(false)
    setItems(items.concat(data) )
    setItemscount(data.length)
}

  const callLoadmore = () =>{
    setOffset(offset + 10)
  }

  const copyUrl = ()=>{
    navigator.clipboard.writeText(window.location.href)
    alert('Copied!')
  }

  

  

  return (
        <div className="section agent-wrapper">
            <div className="container">
                <div className="row">
                    {/* Agent Sidebar Start */}
                    <div className="col-lg-3">
                        <div className="sidebar sticky-sidebar sidebar-left">
                            <div className="candidate-info mb-10">
                                <div className="candidate-detail text-center">
                                    <div className="candidate-img-holder">
                                    <img 
                                        src={props.agent.user_profile_photo === "" ?
                                        (process.env.PUBLIC_URL + "/assets/img/agents/1.jpg")
                                        : (process.env.REACT_APP_BASE_URL+"/uploads/" +
                                            props.agent.user_profile_photo )
                                        }
                                        alt="agent" 
                                    />
                                    </div>

                                    <div className="candidate-title">
                                        <div className="">
                                            <h5 style={{marginBottom:'5px'}}>{props.agent.user_name !== null && props.agent.user_name}</h5>
                                            <p style={{marginBottom:'5px'}}><i className="fas fa-map-marker" aria-hidden="true"></i>{props.agent.city !== null && ' '+props.agent.city}</p>
                                            {/* { isLoggedIn ? (
                                                <p style={{marginBottom:'5px'}}><PhoneInTalkIcon style={{marginRight: "7px"}} />{props.agent.user_phone !== null && props.agent.user_phone}</p>
                                            ) : (
                                                <Loginmodal icon={'fas fa-phone'} text={'View Number'}  />
                                            )} */}
                                            <p style={{marginBottom:'5px'}}><PhoneInTalkIcon style={{marginRight: "7px"}} />{props.agent.user_phone !== null && props.agent.user_phone}</p>
                                            {/* <Link to={"/submit-listing"} className="btn-custom secondary button-sm">Submit Listing</Link> */}
                                            {/* { isLoggedIn ? (
                                                <Link to="#" style={{textDecoration: "none"}} className="candidate-link">
                                                    Follow User <PersonAddIcon style={{marginLeft: "10px"}}/>
                                                </Link>
                                            ) : (<Loginmodal icon={'fas fa-bookmark'} text={'Follow User'} />)} */}
                                            
                                        </div>
                                    </div>
                                
                                </div>
                            </div>

                            {props.agent.user_qr_code !== "" && 
                            <div className="candidate-info">
                                <div className="pd-b-10 candidate-detail text-center">
                                    <div className="">
                                        <h5 style={{marginBottom:'7px'}}>Profile QR Code</h5>

                                        <div className="candidate-img-holder">
                                            {/* <img style={{borderRadius: "0"}} src="https://img.favpng.com/22/10/9/qr-code-2d-code-barcode-information-png-favpng-29frTA2GAPJZCGYKWHvsnED9g.jpg" alt="agent" /> */}
                                            <img style={{borderRadius: "0"}} src={process.env.REACT_APP_BASE_URL+"/uploads/"+props.agent.user_qr_code} alt="agent" />
                                        </div>
                                        
                                        <a href={process.env.REACT_APP_BASE_URL+"/uploads/"+props.agent.user_qr_code} target="_blank" download style={{textDecoration: "none",marginTop: "7px"}} className="candidate-link">
                                            <span>Download</span> <i style={{marginLeft: "10px"}} class="fas fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            }
                            
                            
                        </div>
                    </div>
                    {/* Agent Sidebar End */}
                    {/* Agent Listings Start */}
                    <div className="col-lg-9">
                        <div className="listing-header">
                            <span>{props.agent.user_name !== null ? props.agent.user_name+" " : "Builder's "}Properties:</span>
                            <div className="btn-header">
                                    {/* <Link>
                                        <div className="listing-header-btn ad-prf">
                                            <PersonAddIcon /> <span>Profile</span>
                                        </div>
                                    </Link> */}

                                    <Link to={{pathname: `https://api.whatsapp.com/send?phone=&text=Users%20Profile%20:%20https://propyaar.in/${props.agent.unique_link}`}} target="_blank">
                                        <div className="listing-header-btn shr-profile">
                                            <WhatsAppIcon /> <span>Share Profile</span>
                                        </div>
                                    </Link>
                                    
                                
                                
                            </div>
                        </div>
                        <div className="row pt-0 section section-padding">
                            {/* Listing Start */}
                            {offset === 0 && error && <h5 className="text-danger text-center">No Records...</h5>}
                            {offset === 0 &&  loading && <h5 className="text-center">Loading...</h5> }
                            {items.length > 0 &&   
                                items.map((item, i) => (
                                  <div key={i} className="col-lg-4 col-md-6 ">
                                      <div className="listing">
                                          <div className="listing-thumbnail">
                                                <Link to={item.cat_id === "cat445639833db3eff8b6cdb5510aa39faa" ? "/rent/"+item.id : (
                                                    item.cat_id === "catfa070dd5cc2a2c9c6196159f85480ff7" ? "/properties/"+item.id : (
                                                        "/projects/"+item.id
                                                    )
                                                )} target="_blank">
                                                <img 
                                                  src={item.default_photo.img_path === "" ?
                                                    (process.env.PUBLIC_URL + "/assets/img/blog/8.jpg")
                                                    : (process.env.REACT_APP_BASE_URL+"/uploads/" +
                                                      item.default_photo.img_path )
                                                    } alt="author"
                                                    className="rounded mx-auto d-block"
                                                    alt="item-img"
                                                    style={{ height: "250px" }} 
                                                />
                                                </Link>
                                                
                                              <div className="listing-badges">
                                                  {/* {
                                                      item.star === true ? <span className="listing-badge featured"> <i className="fas fa-star" /> </span> : ''
                                                  }
                                                  {
                                                      item.sale === true ? <span className="listing-badge sale">On Sale</span> : ''
                                                  }
                                                  {
                                                      item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                                                  }
                                                  {
                                                      item.rental === true ? <span className="listing-badge rent"> Rental</span> : ''
                                                  } */}
                                              </div>
                                              <div className="listing-controls">
                                                  <Link to="#" className="favorite"><i className="far fa-heart" /></Link>
                                                  {/* <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link> */}
                                              </div>
                                          </div>
                                          <div className="listing-body">
                                              <h5 className="listing-title-1">
                                                  {item.cat_id === "cat445639833db3eff8b6cdb5510aa39faa" && (
                                                    <Link to={"/rent/"+item.id} title={item.title} target="_blank">{item.title.length > 15 ? item.title.slice(0,12)+"..." : item.title}</Link>
                                                  )}
                                                  {item.cat_id === "catfa070dd5cc2a2c9c6196159f85480ff7" &&  (
                                                    <Link to={"/properties/"+item.id} title={item.title} target="_blank">{item.title.length > 15 ? item.title.slice(0,12)+"..." : item.title}</Link>
                                                  )}
                                                  {item.cat_id === "cat5dfc0138547b926dccc5ee269b1cd042" && (
                                                    <Link to={"/projects/"+item.id} title={item.title} >{item.title.length > 15 ? item.title.slice(0,12)+"..." : item.title}</Link>
                                                  )}
                                                  
                                                  
                                              </h5>
                                              <div style={{position: "relative"}}>
                                                <Link to={{pathname: `https://api.whatsapp.com/send?phone=&text=Hey!%20I%20found%20a%20Listing%20:%20https://propyaar.in${item.cat_id === "cat445639833db3eff8b6cdb5510aa39faa" ? "/rent/"+item.id : (
                                                    item.cat_id === "catfa070dd5cc2a2c9c6196159f85480ff7" ? "/properties/"+item.id : (
                                                        "/projects/"+item.id
                                                    )
                                                )}%20in%20INDMarketplace%20website`}} target="_blank">
                                                    <div className="listing-whtapp-btn">
                                                        <WhatsAppIcon /> 
                                                        <span>Share</span>
                                                    </div>
                                                  </Link>
                                                <span className="listing-price">
                                                    {item.item_type_id === "2" ? (
                                                        "Rs."+item.price+" "
                                                    ) : "Rs."+item.price_SqYard+" "}
                                                    <span style={{fontSize: "10px",fontWeight: "600", color:"#101737"}}>
                                                        {item.item_type_id === "2" ? (
                                                            "/ Month"
                                                        ) : "/ Sq.Yds"}
                                                    </span>
                                                </span>
                                              </div>
                                              
                                              <div className="acr-listing-icons">
                                                  {/* <OverlayTrigger overlay={bedstip}> */}
                                                      {/* <div className="acr-listing-icon"> */}
                                                          {/* <i className="flaticon-bedroom" /> */}
                                                          {/* <span className="acr-listing-icon-value">{item.beds}</span> */}
                                                      {/* </div> */}
                                                  {/* </OverlayTrigger> */}
                                                  {/* <OverlayTrigger overlay={bathstip}> */}
                                                      {/* <div className="acr-listing-icon"> */}
                                                          {/* <i className="flaticon-bathroom" /> */}
                                                          {/* <span className="acr-listing-icon-value">{item.bathrooms}</span> */}
                                                      {/* </div> */}
                                                  {/* </OverlayTrigger> */}
                                                  {/* <OverlayTrigger overlay={areatip}> */}
                                                      {/* <div className="acr-listing-icon"> */}
                                                          {/* <i className="flaticon-ruler" /> */}
                                                          {/* <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.area))}</span> */}
                                                      {/* </div> */}
                                                  {/* </OverlayTrigger> */}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                ))
                            }
                            {/* Listing End */}
                        </div>
                        {/* Comments Start */}
                            <h5 className="text-center my-3">{itemscount < 10 ? null : ( <Button variant="outlined" color="primary" onClick={()=>callLoadmore()}>{loading ? ('Loading...'):('Loadmore') } </Button>)}</h5>
                        {/* Comments End */}
                    </div>
                    {/* Agent Listings End */}
                </div>
                {/* Similar Agents Start */}
                
                {/* Similar Agents End */}
            </div>
        </div>
    
  );
};

export default Content;

