import React from 'react'
import {  } from 'react-redux'
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import PropTypes from 'prop-types'
import 'react-responsive-modal/styles.css';
import {Modal} from "react-responsive-modal";
import Itemimgslide from './Itemimgslide';
import Iteminfo from './Iteminfo';
import Itemdatamodal from './Itemdatamodal'
import ItemEditdatamodal from './edit/ItemEditdatamodal';
import { TrendingUpRounded } from '@material-ui/icons';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import HomeIcon from '@material-ui/icons/Home';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';
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
const ItemView = ({userItems,onDelete,updateItem,loading,error,filter,status}) => {
    // const itemArray =props;
    const [open, setOpen] = React.useState(false);
    //const [userItems, setUserItems] = React.useState(props.userItems);
     return (
        <>
         {/* {console.log(userItems)} */}
        {loading ? (<h5 className="text-center text-info">Loading....</h5>) : null }
        {!loading && userItems.filter(userItems => filter ? userItems.status === status : userItems.status).length === 0 && 
        <div>
            <div className="acr-empty-section">
                <i className="flaticon-home" />
                <h3>You don't have any {status==='1'?(<span>Approved</span>):status==='0'?(<span>Pending</span>):status==='3'?(<span>Rejected</span>):null} Listings</h3>
                <Link onClick={()=>setOpen(true)} className="btn-custom">Create A New Listing</Link>
            </div>
        </div>
        }
        {userItems.filter(userItems => filter ? userItems.status === status : userItems.status ).map((item,i)=>(
        <div className="pl-container">
            <div className="pl-thumbnail">
                {/* <Link to="/listing-details-v1"><img src={process.env.PUBLIC_URL + "/" + item.listimg} alt="listing" /></Link> */}
                <img
                  className=""
                  src={
                    item.default_photo.img_path === ""
                      ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                      : process.env.REACT_APP_BASE_URL+"/uploads/" +
                        item.default_photo.img_path
                  }
                  className="rounded mx-auto d-block"
                  alt="item-img"
                />
            </div>
            <div className="pl-body">
                <div>
                    <div className="pl-price">
                        {item.category.cat_name==="Residential" &&
                            <span className="pl-price_1">
                            {item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa' ?  '₹'+new Intl.NumberFormat().format(item.price)+"/" : '₹'+new Intl.NumberFormat().format(item.price_price)+"/"}
                            <span className="pl-price_2">{item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa' ? "Month" : ""}</span>
                            </span>
                        }
                        {(item.category.cat_name==="Plots" || item.category.cat_name==="Projects") && 
                            <span className="pl-price_1">
                            {'₹'+new Intl.NumberFormat().format(item.price_SqYard)+"/"}
                            <span className="pl-price_2">{"/Sq. Yd"}</span>
                            </span>
                        }
                        {/* {item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa' ?  '₹'+item.price : '₹'+item.item_price}
                        <span style={{color:"#101737"}}>{item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa' ? "/ Month" : ""}</span> */}
                    </div>
                    <h5 className="pl-title"> <Link to="" title={item.id}>{item.title}</Link> </h5>
                    {/* <span className="listing-price">{new Intl.NumberFormat().format((item.UserItems.).toFixed(2))}$ <span>/month</span> </span> */}
                    <p className="pl-text">{item.item_location.name}</p>
                    <div className="pl-icon">
                        <span className="acr-listing-icon-value" style={{marginRight: "5px"}}>
                            {new Intl.NumberFormat().format(item.area)}
                            {item.area_type !== '' ? <span style={{ textTransform: 'capitalize' }}> {item.area_type.toLowerCase()}</span> : <span style={{ textTransform: 'capitalize' }}> Acres</span>}
                        </span>
                        <span className="pl-dot">&#183;</span>
                        <span style={{fontSize:"12px"}}>{item.category.cat_name==="Plots" ? "Land" : item.category.cat_name}</span>
                    </div>
                    
                    
                    <div className="pl-gallery-wrapper">
                        <Itemdatamodal itemData={item}/>
                        <ItemEditdatamodal itemData={item}  updateItem={updateItem}/>
                        {/* <Link onClick={() => setOpen(true)} className="btn-custom btn-sm secondary">View Details</Link> */}
                        {/* <Link onClick={()=>onPatch(item.id,{(item.title=='New title')})}> <i className="fas fa-envelope" /> Edit </Link> */}
                        <Link onClick={()=>onDelete(item.id)} className="btn btn-sm btn-danger mx-1"><i  className="fas fa-trash-alt"> Delete </i></Link> 
                        {/* <Link onClick={handleClickOpen}><i  className="fas fa-bookmark"> Delete </i></Link>  */}
                        
                        {/* <OverlayTrigger overlay={gallerytip}>
                            <Link to="#" className="listing-gallery mx-1"> <i className="fas fa-camera" /> </Link>
                        </OverlayTrigger> */}
                    </div>
                </div>
                <div>
                    {item.status==='1'? 
                    (<h6 style={{color:'green'}}>
                    Approved</h6>): 
                    item.status==='0'?
                    (<h6 style={{color:'#00008B'}}>
                    Pending</h6>): 
                    item.status==='3'?
                    (<h6 style={{color:'red'}}>
                    Rejected</h6>):null} 
                </div>
            </div>
        </div> 
        ))}


     <Modal
        open={open}
        onClose={() => setOpen(false)}
        showCloseIcon={false}
        center
        classNames={{
          overlay: 'customOverlay',
        }}
        styles={{modal:{
            padding: "0",
            maxWidth:'210px',
            borderRadius: "4px",
  
         }}}
        
      >
      <div>
        <ul className="mb-0">
        <li className="mt-0 pl-3 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce",fontSize:"16px",backgroundColor:"#f1f1f1"}}><span className="font-weight-bold">Sell</span></li>
        <Link to="/submit-listing/1" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce",}}><FilterHdrIcon /><span className="ml-1">Land/Plot</span></li></Link>
        <Link to="/submit-listing/2" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><ApartmentIcon/><span className="ml-1">Apartments</span></li></Link>
        <Link to="/submit-listing/3" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><HomeWorkIcon/><span className="ml-1">House/Villa</span></li></Link>
        <li className="mt-0 pl-3 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce",fontSize:"16px",backgroundColor:"#f1f1f1"}}><span className="font-weight-bold">Rent</span></li>
        <Link to="/submit-listing/4" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><HomeIcon/><span className="ml-1">House/Apartments</span></li></Link>
        <Link to="/submit-listing/5" style={{color:"#535556"}}><li className="mt-0 px-4 py-1" style={{borderTop: "1px solid #cbccce",borderBottom:"1px solid #cbccce"}}><BusinessIcon/><span className="ml-1">Commercial</span></li></Link>
        </ul>
      </div>
      
      </Modal>

        </>
        
        )      
 }
ItemView.propTypes = {
    userItems: PropTypes.array.isRequired,
    // body: PropTypes.string.isRequired,
    // onPatch: PropTypes.func.isRequired,
    // onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }
export default ItemView
