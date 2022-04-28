import React from 'react'
import {  } from 'react-redux'
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import PropTypes from 'prop-types'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Itemimgslide from './Itemimgslide';
import Iteminfo from './Iteminfo';
import Itemdatamodal from './Itemdatamodal'
// import ItemEditdatamodal from './edit/ItemEditdatamodal';
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
const ItemView = ({userItems,onDelete,onPatch, loading, error}) => {
    // const itemArray =props;
    const [open, setOpen] = React.useState(false);
//   const [item, seItemid] = React.useState(props.item);
     return (
         <>
        {loading ? (<h5 className="text-center text-info">Loading....</h5>) : null }
        {!loading && userItems.length === 0 && <div className="">
                            <div className="acr-empty-section">
                                <i className="flaticon-home" />
                                <h3>You Haven't Saved Any Listings</h3>
                                <p>You still havent saved any listings yet, Go back to the listings page and check some of your favorite listings</p>
                                <Link to="/listing-map" className="btn-custom">Go to Listings</Link>
                            </div>
                        </div>}
        {userItems.map((item,i)=>(
        <div className="listing listing-list">
            <div className="listing-thumbnail">
                <img
                  className="makeStyles-img-7 mx-auto"
                  src={
                    item.default_photo.img_path === ""
                      ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                      : process.env.REACT_APP_BASE_URL+"/uploads/" +
                        item.default_photo.img_path
                  }
                  className="rounded mx-auto d-block"
                  alt="item-img"
                  style={{ height: "250px" }}
                />
                {/* <Link to="/listing-details-v1"><img src={process.env.PUBLIC_URL + "/" + item.listimg} alt="listing" /></Link> */}
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
                    {/* <Link to="#" className="favorite"><i className="far fa-heart" /></Link>
                    <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link>
                    <Link to="#" className="edit"><i className="fas fa-edit" /></Link> */}
                </div>
            </div>
            <div className="listing-body">
                <div className="listing-author">
                    {/* <img src={process.env.PUBLIC_URL + "/" + item.authorimg} alt="author" /> */}
                    <div className="listing-author-body">
                        {/* <h5 className="listing-title"> <Link to="/listing-details-v1" title={item.id}>{item.title}</Link> </h5> */}
                        {/* <p> <Link to="#">{item.title}</Link> </p> */}
                        {/* <span className="listing-date">{it}</span> */}
                    </div>
                    
                </div>
                <h4 className="listing-title"> <Link to="/listing-details-v1" title={item.id}>{item.title}</Link> </h4>
                {/* <span className="listing-price">{new Intl.NumberFormat().format((item.UserItems.).toFixed(2))}$ <span>/month</span> </span> */}
                <p className="listing-text">{item.item_location.name}</p>
                <div className="acr-listing-icons">
                    {/* <OverlayTrigger overlay={bedstip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-bedroom" />
                            <span className="acr-listing-icon-value">{}</span>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={bathstip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-bathroom" />
                            <span className="acr-listing-icon-value">{}</span>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={areatip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-ruler" />
                            {/* <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item))}</span> */}
                        {/*</div></div>
                    </OverlayTrigger> */}
                    <OverlayTrigger overlay={areatip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-ruler" />
                            {/* <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item))}</span> */}
                            <span className="acr-listing-icon-value">
                              {new Intl.NumberFormat().format(item.area)}
                              {item.area_type !== '' && <span style={{ textTransform: 'capitalize' }}>/{item.area_type.toLowerCase()}</span>}
                            </span>
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="listing-gallery-wrapper">
                     <Itemdatamodal itemData={item}/>
                     {/* <ItemEditdatamodal itemData={item}/> */}
                    {/* <Link onClick={() => setOpen(true)} className="btn-custom btn-sm secondary">View Details</Link> */}
                    {/* <Link onClick={()=>onPatch(item.id,{(item.title=='New title')})}> <i className="fas fa-envelope" /> Edit </Link> */}
                    {/* <Link onClick={()=>onDelete(item.id)}><i  className="fas fa-bookmark"> Delete </i></Link>  */}
                    {/* <Link onClick={handleClickOpen}><i  className="fas fa-bookmark"> Delete </i></Link>  */}
                    
                    {/* <OverlayTrigger overlay={gallerytip}>
                        <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                    </OverlayTrigger> */}
                </div>
                
               
            </div>
        </div> 
        
        ) )}
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
