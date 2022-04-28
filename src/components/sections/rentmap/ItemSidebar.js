import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Itemimgslide from './Itemimgslide';
import Iteminfo from './Iteminfo';
import {Dropdown,NavLink} from 'react-bootstrap'
const ItemSidebar = (props) => {
  
  const [open, setOpen] = React.useState(false);
  const [item, seItemid] = React.useState(props.itemData);
  //React.useEffect(() => {
  //   //alert(itemid);
  //    //dispatch(fetchItemListData(selectedLocation))
  //},[]);
  return (
    <>
      <Link
        //to="/listing-details-v1"
        onClick={() => setOpen(true)}
        className="btn-custom btn-sm secondary">
        View Details
      </Link>

      {/* <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
        }}>
     
      <div className="my-5 items-view-modal" >
          {item.default_photo.img_path != '' && 
            <div>
              <Itemimgslide itemId={item.id} />
            </div>
          }
          <div className="my-4 mx-2">
            <Iteminfo item={item} />
          </div>
      </div>
      </Modal> */}
      {open ? 
      <div style={{marginTop:'-20px', zIndex: '0'}} className="viw-details-container" >
                                  {/* start image container */}
              <div className="img-container">
                          {/* start btn-container */}
                  <div className="img-btn-container d-flex">
                      <div onClick={()=> setOpen(false)} type="button" className="btn-custom-2 light-grey mx-2" ><i class="fas fa-chevron-left mr-2"></i>Back
                      </div>

                      <div className="premium-button d-flex mr-2">
                          <div style={{zIndex:'1',height:'30px',width:'80px',align:'center',fontSize:'25px',marginLeft:'460px',cursor:'pointer'}} className="div ">
                          <i  class="fas fa-chart-line bg-white text-dark"></i>
                          </div>
              
                          <button className="btn btn-danger"style={{backgroundColor:'#3CB371', color:'#ffff',height:'30px', width:'70px', textAlign:'center', borderRadius:'5px', zIndex:'1',cursor:'pointer'}}className="bg-danger text-light">
                              Premium
                          </button>
                      </div>
                  </div>
                    {/* End btn-container */}

                                  {/* container image */}
                <img 
                style={{width: '100%', height: '300px', marginTop:'-55px', borderRadius:'6px', border:'1px solid #a29d9d'}}
                src={item.default_photo.img_path === ""
                    ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                    //: API_URL.IMG_URL+item.default_photo.img_path
                    : process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path
                }
                alt=""
                  />
              </div>
                          {/* End image container */}

                          {/*start user container */}
              <div className="user-container d-flex mt-4 mb-2"> 
                          {/* user image container */}
                  <div className="user-img-container">
                    <img 
                    style={{width:'100px', height:'auto', borderRadius:'50%',}}  
                    src={item.user.user_profile_photo === "" ?
                      (process.env.PUBLIC_URL + "/assets/img/agents/5.jpeg")
                      //: (API_URL.IMG_URL+item.user.user_profile_photo )
                      : (process.env.REACT_APP_BASE_URL+'/uploads/'+item.user.user_profile_photo )
                      }
                    alt=""/>
                  </div>
                          {/* user details container */}
                  <div className="user-details-container">
                    <h6 style={{marginBottom:'0px', marginTop:'20px', marginLeft:'10px'}}>
                        Sai Vinay
                        </h6>
                    <p style={{marginLeft:'10px'}}>March 3, 2020</p>
                  </div>
                          {/* user container options */}
                <Dropdown style={{marginLeft:'65%'}} className="options-dropdown">
                              <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                  <ul>
                                      <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                      <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                                      <li> <Link to=""> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                                  </ul>
                              </Dropdown.Menu>
                          </Dropdown>
              </div>
                            {/*end user container */}
                            {/* End-information details-container */}
              <div className="details-container ">
                  <h4 style={{fontSize:'24px', marginBottom:'0px'}}>Iris Watson, Frederick Nebraska 20620</h4>
                  <h5 style={{fontWeight:'700', fontSize:'20px'}} className="text-danger"><i class="fas fa-rupee-sign mr-2"></i>25 Lakhs</h5>
                  <span style={{fontWeight:'normal', fontSize:'16px', marginTop:'0px'}}><i class="fas fa-chart-area mr-2"></i>1 Acre</span>
                  <p style={{fontWeight:'400', fontSize:'18px', marginTop:'5px'}}>Property details</p>
                  <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatum magnam aperiam enim a architecto laborum odit, placeat rem deserunt molestiae sint facere sit doloribus qui sequi expedita quis vero.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatum magnam aperiam enim a architecto laborum odit, placeat rem deserunt molestiae sint facere sit doloribus qui sequi expedita quis vero.
                  </p>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <div style={{backgroundColor:'#3CB371', color:'#ffff',height:'auto', width:'150px', textAlign:'center', borderRadius:'5px'}}>
                      View full screen
                      </div>
                  <br/>   
              </div>
            {/* End-information details-container */}
          </div>
      :""}
      
    </>
  );
};

export default ItemSidebar;

