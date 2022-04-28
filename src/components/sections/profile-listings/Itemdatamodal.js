import React,{useState,Fragment} from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Itemimgslide from './Itemimgslide';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import Iteminfo from './Iteminfo';
import "./itemdatastyles.css";

const Itemdatamodal = (props) => {
  
  const [open, setOpen] = React.useState(false);
  const [item, seItemid] = React.useState(props.itemData);
  const [viewDesc,setViewDesc] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  //React.useEffect(() => {
  //   //alert(itemid);
  //    //dispatch(fetchItemListData(selectedLocation))
  //},[]);
  return (
    <>
      <Link
        //to="/listing-details-v1"
        onClick={() => setOpen(true)}
        className="pl-btn btn-custom btn-sm secondary mx-1">
        View Details
      </Link>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
        }}>

<div style={{marginBottom: "0"}} className="listing">
          <div className="listing-thumbnail" style={{ height: "420px",backgroundColor:'#f5f5f500' }}>
            <div className="mx-auto">
              <Itemimgslide itemId={item.id} />
            </div>
              {/* <Link>
                <img
                  src={
                    item.default_photo.img_path === ""
                      ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                      //: API_URL.IMG_URL+item.default_photo.img_path
                      : 'https://api.prod.online.risee.in/uploads/'+item.default_photo.img_path
                  }
                  className="makeStyles-img-7 rounded mx-auto d-block"
                  alt="item-img"
                  style={{ height: "420px" }}
                />
              </Link> */}
              {/* <div className="listing-controls">
                  <Link to="#" className="favorite"><i className="far fa-heart" /></Link>
                  <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link>
              </div> */}
          </div>
          
          <div className="listing-body">
            {copySuccess}
              <div className="listing-body-details">
                <div className="listing-body-counts">
                  <div className="listing-count-item">
                    <i class="far fa-heart fa-lg"></i>
                    <span>{item.favourite_count} likes</span>
                  </div>
                  <div className="listing-count-item">
                    <i class="far fa-eye fa-lg"></i>
                    <span>{item.touch_count} views</span>
                  </div>
                </div>
                <h4 className="listing-title" style={{fontSize:'18px', margin: "0"}}>
                  <Link style={{color: "rgb(81, 159, 255)"}} to={`/${item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa'?"rent" : "properties"}/${item.id}`} title={item.title} target="_blank">{item.title}</Link> 
                </h4>
                <span className="listing-price-1">{item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa' ?  'Rs.'+item.price : 'Rs.'+item.price_SqYard} <span style={{fontSize: "13px",fontWeight: "200"}}>{item.cat_id === 'cat445639833db3eff8b6cdb5510aa39faa' ? "/ Month" : "/ Sq.Yds"}</span> </span>
                <div className=""><FilterHdrIcon />{" "+item.area+" "+item.area_type}</div>
                {item.item_location_id !== '' && (<div className=""> <i className="fas fa-map-marker-alt" /> {item.item_location.name}</div>)}
              </div>

              <div className="listing-desc">
                <div className="listing-desc-title">Details:</div>
                <div>
                  {item.description.length > 250 ? (
                    viewDesc ? <Fragment>
                      {item.description}
                      <div onClick={() => setViewDesc(!viewDesc)} className="listing-desc-view">
                      <span>View Less</span>
                      </div>
                    </Fragment> : <Fragment>
                      {item.description.slice(0,250)+"..."}
                      <div onClick={() => setViewDesc(!viewDesc)} className="listing-desc-view">
                        <span>View More...</span>
                      </div>
                    </Fragment>
                  ) : item.description }
                </div>
              </div>
              
              
              {/* <p className="listing-text">{item.description.slice(0,300)+'....'}</p> */}

              <div className="listing-desc">
                <div className="listing-desc-title">Overview:</div>
                <div className="row">

                    <div className="Itemd__col-lg-6">    
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Property</h6>
                            <span className="Itemd__feature-value">{item.category.cat_name}</span>
                        </div> 
                    </div>
                
                    <div className="Itemd__col-lg-6">    
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Property Type</h6>
                            <span className="Itemd__feature-value">{item.sub_category.name}</span>
                        </div> 
                    </div>
                    <div className="Itemd__col-lg-6"> 
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Listing Type</h6>
                            <span className="Itemd__feature-value">{item.item_type.name === "Sell" ? "For Sale" : "For "+item.item_type.name}</span>
                        </div> 
                    </div>

                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Posted</h6>
                            <span className="Itemd__feature-value">{item.posted_time_ago}</span>
                        </div> 
                    </div>

                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Listed By</h6>
                            <span className="Itemd__feature-value">{item.listed_by}</span>
                        </div> 
                    </div>
                    {item.towers !== '' &&
                    <div className="Itemd__col-lg-6"> 
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Towers</h6>
                            <span className="Itemd__feature-value">{item.towers}</span>
                        </div> 
                    </div>
                }
                                        
                {/* {item.project_details.name !== '' &&
                    <div className="Itemd__col-lg-6"> 
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Project Name</h6>
                            <span className="Itemd__feature-value">{item.project_details.name}</span>
                        </div> 
                    </div>
                }
                {item.organisation.org_name !== '' &&
                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Company Name</h6>
                            <span className="Itemd__feature-value">{item.organisation.org_name}</span>
                        </div> 
                    </div>      
                }

                {item.added_date_str !== '' && 
                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Posted</h6>
                            <span className="Itemd__feature-value">{item.posted_time_ago}</span>
                        </div> 
                    </div>
                }

                {item.launch_date_convert !== '' && 
                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Launched Date</h6>
                            <span className="Itemd__feature-value">{item.launch_date_convert}</span>
                        </div> 
                    </div>
                }
                    
                {item.project_details.project_website_url !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Project URL</h6>
                        <a href={item.project_details.project_website_url} target="_blank">Visit Here</a>
                    </div>  
                    </div>
                }
                
                {item.sub_category.name !== '' && 
                    <div className="Itemd__col-lg-6">    
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Property Type</h6>
                        <span className="Itemd__feature-value">{item.sub_category.name}</span>
                    </div> 
                    </div>
                }



                {item.length !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Length</h6>
                        <span className="Itemd__feature-value">{item.length}</span>
                    </div>
                    </div>    
                }
                {item.car_parking === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Parking</h6>
                        <span className="Itemd__feature-value">{item.car_parking === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>
                }    
                {item.property_id !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Property Id</h6>
                        <span className="Itemd__feature-value">{item.property_id}</span>
                    </div>
                    </div>    
                }
                        
                {item.price_SqYard !== '' && item.price_SqYard !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Price per Sq.Yd</h6>
                        <span className="Itemd__feature-value">{item.price_SqYard}</span>
                    </div>
                    </div>      
                }
                {item.rera_id !== '' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">RERA ID</h6>
                        <span className="Itemd__feature-value">{item.rera_id}</span>
                    </div>  
                    </div>    
                }
                {item.Lp_number !== '' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">LP Number</h6>
                        <span className="Itemd__feature-value">{item.Lp_number}</span>
                    </div>
                    </div>      
                }
                {item.area !== '' &&  item.area !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Property Size</h6>
                        <span className="Itemd__feature-value">{item.area} {item.area_type}</span>
                    </div> 
                    </div>
                }

                {item.total_project_area !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Project Area</h6>
                        <span className="Itemd__feature-value">{item.total_project_area} {" "} acres</span>
                    </div> 
                    </div>
                }  
                {item.total_planned_units !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Planned Units</h6>
                        <span className="Itemd__feature-value">{item.total_planned_units}</span>
                    </div> 
                    </div>
                }

                {item.total_floors !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Floors</h6>
                        <span className="Itemd__feature-value">{item.total_floors}</span>
                    </div> 
                    </div>
                }

                {item.towers !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Towers</h6>
                        <span className="Itemd__feature-value">{item.towers}</span>
                    </div> 
                    </div>
                }

                {item.breadth !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Breadth</h6>
                        <span className="Itemd__feature-value">{item.breadth}</span>
                    </div>
                    </div>    
                } 

                {item.facing !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Facing</h6>
                        <span className="Itemd__feature-value">{item.facing}</span>
                    </div>
                    </div>    
                }

                {item.location_short !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Location</h6>
                        <span className="Itemd__feature-value">{
                            item.location_short.length > 20 ? item.location_short.slice(0,17)+"..." :  item.location_short
                        }</span>
                    </div>
                    </div>    
                }
                {item.is_hmda === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">HMDA</h6>
                        <span className="Itemd__feature-value">{item.is_hmda === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>    
                }
                
                {item.is_dtcp === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">DTCP</h6>
                        <span className="Itemd__feature-value">{item.is_dtcp === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>    
                }

                {item.is_verified === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Verified</h6>
                        <span className="Itemd__feature-value">{item.is_verified === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>    
                }  

                {item.total_project_area !== '' &&  item.total_project_area !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Project Area</h6>
                        <span className="Itemd__feature-value">{item.total_project_area}</span>
                    </div> 
                    </div>
                }

                {item.total_planned_units !== '' &&  item.total_planned_units !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Planned Units</h6>
                        <span className="Itemd__feature-value">{item.total_planned_units}</span>
                    </div> 
                    </div>
                }
                

                {item.added_date_str !== '' && 
                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Posted</h6>
                            <span className="Itemd__feature-value">{item.added_date_str}</span>
                        </div> 
                    </div>
                }

                {item.launch_date_convert !== '' && 
                    <div className="Itemd__col-lg-6">
                        <div className="Itemd__feature">
                            <h6 className="Itemd__feature-label">Launched Date</h6>
                            <span className="Itemd__feature-value">{item.launch_date_convert}</span>
                        </div> 
                    </div>
                }
                    
                {item.project_details.project_website_url !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Project URL</h6>
                        <a href={item.project_details.project_website_url} target="_blank">Visit Here</a>
                    </div>  
                    </div>
                }
                
                {item.sub_category.name !== '' && 
                    <div className="Itemd__col-lg-6">    
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Property Type</h6>
                        <span className="Itemd__feature-value">{item.sub_category.name}</span>
                    </div> 
                    </div>
                }



                {item.length !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Length</h6>
                        <span className="Itemd__feature-value">{item.length}</span>
                    </div>
                    </div>    
                }
                {item.car_parking === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Parking</h6>
                        <span className="Itemd__feature-value">{item.car_parking === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>
                }    
                {item.property_id !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Property Id</h6>
                        <span className="Itemd__feature-value">{item.property_id}</span>
                    </div>
                    </div>    
                }
                        
                {item.price_SqYard !== '' && item.price_SqYard !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Price per Sq.Yd</h6>
                        <span className="Itemd__feature-value">{item.price_SqYard}</span>
                    </div>
                    </div>      
                }
                {item.rera_id !== '' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">RERA ID</h6>
                        <span className="Itemd__feature-value">{item.rera_id}</span>
                    </div>  
                    </div>    
                }
                {item.Lp_number !== '' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">LP Number</h6>
                        <span className="Itemd__feature-value">{item.Lp_number}</span>
                    </div>
                    </div>      
                }
                {item.area !== '' &&  item.area !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Property Size</h6>
                        <span className="Itemd__feature-value">{item.area} {item.area_type}</span>
                    </div> 
                    </div>
                }

                {item.total_project_area !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Project Area</h6>
                        <span className="Itemd__feature-value">{item.total_project_area} {" "} acres</span>
                    </div> 
                    </div>
                }  
                {item.total_planned_units !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Planned Units</h6>
                        <span className="Itemd__feature-value">{item.total_planned_units}</span>
                    </div> 
                    </div>
                }

                {item.total_floors !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Floors</h6>
                        <span className="Itemd__feature-value">{item.total_floors}</span>
                    </div> 
                    </div>
                }

                {item.towers !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Towers</h6>
                        <span className="Itemd__feature-value">{item.towers}</span>
                    </div> 
                    </div>
                }

                {item.breadth !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Breadth</h6>
                        <span className="Itemd__feature-value">{item.breadth}</span>
                    </div>
                    </div>    
                } 

                {item.facing !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Facing</h6>
                        <span className="Itemd__feature-value">{item.facing}</span>
                    </div>
                    </div>    
                }

                {item.location_short !== '' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Location</h6>
                        <span className="Itemd__feature-value">{
                            item.location_short.length > 20 ? item.location_short.slice(0,17)+"..." :  item.location_short
                        }</span>
                    </div>
                    </div>    
                }
                {item.is_hmda === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">HMDA</h6>
                        <span className="Itemd__feature-value">{item.is_hmda === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>    
                }
                
                {item.is_dtcp === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">DTCP</h6>
                        <span className="Itemd__feature-value">{item.is_dtcp === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>    
                }

                {item.is_verified === '1' && 
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Verified</h6>
                        <span className="Itemd__feature-value">{item.is_verified === '1' ? 'Yes' : 'No'} </span>
                    </div>
                    </div>    
                }  

                {item.total_project_area !== '' &&  item.total_project_area !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Project Area</h6>
                        <span className="Itemd__feature-value">{item.total_project_area}</span>
                    </div> 
                    </div>
                }

                {item.total_planned_units !== '' &&  item.total_planned_units !== '0' &&
                    <div className="Itemd__col-lg-6">
                    <div className="Itemd__feature">
                        <h6 className="Itemd__feature-label">Total Planned Units</h6>
                        <span className="Itemd__feature-value">{item.total_planned_units}</span>
                    </div> 
                    </div>
                }                                             */}
                </div>
              </div>
              
              

              
              {/* <div className="acr-listing-icons">
                  <OverlayTrigger  overlay={bedstip}>
                      <div className="acr-listing-icon">
                          <i className="flaticon-bedroom" />
                          <span className="acr-listing-icon-value">{item.beds}</span>
                      </div>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={bedstip}>
                      <div className="acr-listing-icon">
                          <i className="flaticon-bathroom" />
                          <span className="acr-listing-icon-value">{item.bathrooms}</span>
                      </div>
                  </OverlayTrigger>
                  <OverlayTrigger overlay={bedstip}>
                      <div className="acr-listing-icon">
                          <i className="flaticon-ruler" />
                          <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.area))}</span>
                      </div>
                  </OverlayTrigger>
              </div> */}
              <div className="listing-gallery-wrapper">
                  {/* <Link to={"/"+props.pathname+"/"+item.id} className="btn-custom btn-sm secondary">View More..</Link> */}
                  {/* <OverlayTrigger  overlay={gallerytip}>
                      <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                  </OverlayTrigger> */}
              </div>
          </div>
      </div>
     
      {/* <div className="my-5 item-data-modal">
          {item.default_photo.img_path != '' && 
            <div>
              <Itemimgslide itemId={item.id} />
            </div>
          }
          <div className="my-4 mx-2">
            <Iteminfo item={item} />
          </div>
      </div> */}
      </Modal>
    </>
  );
};

export default Itemdatamodal;

