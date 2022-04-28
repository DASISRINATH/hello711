import React, { Component, useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "./../../../context/LoginContext";
import { LocationContext } from "./../../../context/LocationContext";
import { useSelector, useDispatch } from "react-redux";
//import axios from 'axios';
import axios from "../../../baseAxios";
import Loginmodal from "../../sections/modal/Loginmodal";
import Usermobile from "../../sections/modal/userinfo/UserMobile";
import Adduserinfomodal from './../../layouts/Adduserinfomodal';
//import {useLocation} from "react-router";
//import Pagination from './presenter'
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
// import listing from '../../../data/listings.json';
import listing from "../../../data/real_data.json";
import Mobilefilter from "./Mobilefilter";
//import Pagination from "../Pagination"
import ReactPaginate from 'react-paginate';

import {
  locationlist,
  statuslist,
  pricerangelist,
  bedslist,
  bathroomslist,
  typelist,
  diameterlist,
  floorlist,
  sortbylist,
} from "../../../data/select.json";

import Iteminfodiv from '../listingitem/Iteminfodiv';
import Listingmap from "./Listingmap";
import Select2 from "react-select2-wrapper";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SimpleImageSlider from "react-simple-image-slider";
import DemoImg from "./test_1.jpg";
import DemoImg1 from "./logo_1.png";
import Slider from "./Slider";
// import { Button } from 'bootstrap';
import Pictures from "./Pictures";
import "./listingmap.css";
import Itemdatamodal from "./Itemdatamodal";
import locations from "../../../data/location.json";
import { fetchLocationsData } from "./../../../slices/items/locationsSlice";
import { fetchItemListData, itemsSelectors } from "./../../../slices/items/itemSlice";
import { fetchUserItemListData,userItemsSelectors } from "./../../../slices/useritems/userItemSlice";
import Select from "react-select";
const images = [{ url: DemoImg }, { url: DemoImg1 }, { url: "images/7.jpg" }];
const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Square Feet</Tooltip>;


  //const cities = locations.map(
  //  ({id,name})=>{
  //    return {
  //      value:id,
  //      label:name
  //    }
  //  }
  //);

  //var subCatoptions =[
  //  //{ value: '', label: 'All Categories' },
  //  { value: 'subcata533742b6f520075afa275fe3da21ce3', label: 'Residential Land' },
  //  { value: 'subcat4ddefa6bbd2f86e6a3fa102d83ae1631', label: 'Agricultural Land' },
  //  { value: 'subcata6ca03906a86602a88fc7d9048105c67', label: 'Commercial Plot' },
  //  { value: 'subcat435c6e19f9dec97f559116c452cda562', label: 'Industrial Land' },
  //]

  var cities =[
    { value: 'itm_loca7b66748e03d457e976ca63a50e1bde0', label: 'Hyderabad' },
    { value: 'itm_loc32db8931aaf39e3dfb5c388799109d5b', label: 'Bengaluru' },
    { value: 'itm_loc247387cc3640d1a88f3d9342d216dc13', label: 'Chennai' },
  ]

  var priceOptions =[
    //{ value: 'all', label: 'All' },
    { value: '0Rs-50K', label: '0Rs - 50K' },
    { value: '50K-1Lac', label: '50K - 1Lac' },
    { value: '1Lac-25lac', label: '1Lac - 25lac' },
    { value: '25Lac-50Lac', label: '25Lac - 50Lac' },
    { value: '50Lac-75Lac', label: '50Lac - 75Lac' },
    { value: '75Lac-1cr', label: '75Lac - 1cr' },
    { value: '1cr-10cr', label: '1cr - 10cr' },
  ]

  var sortOptions =[
    { value: 'new_listing', label: 'New Listing' },
    { value: 'popular', label: 'Popular' },
    //{ value: '3', label: 'Relavance' },
    { value: 'low_to_high', label: 'Price Low to High' },
    { value: 'high_to_low', label: 'Price High to Low' },
  ]

const Content = (props) => {
  const {offset, setOffset, items, setItems, locationName, setLocationName, selectedLocation,setSelectedLocation,center,setCenter,zoomLevel,setZommLevel,s,setS} = useContext(LocationContext);
  const {isLoggedIn,setIsLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);

  //const [offset, setOffset] = useState(0)
  //const [items, setItems] = useState([])
  
  const [itemscount, setItemscount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const [activepage, setActivepage] = useState(1);
  //const [selectedLocation, setSelectedLocation] = useState('itm_loca7b66748e03d457e976ca63a50e1bde0');
  //const [subcat, setSubcat] = useState('subcat005e166e76bfc175d52242279dadc597');
  const [pricefilter, setPricefilter] = useState('');
  const [minprice, setMinprice] = useState('');
  const [maxprice, setMaxprice] = useState('');
  const [sort, setSort] = useState('new_listing');
  const [order_by, setOrder_by] = useState('added_date');
  const [order_type, setOrder_type] = useState('desc');
  const [listlayoutonly, layouttoggle] = useState(false);
  //const [center, setCenter] = useState({ lat: 17.385000, lng: 78.486702 });
  //const [zoomLevel, setZommLevel] = useState(10);
  const [animateSec, setAnimateSec] = useState(20);
  const [favorite, setFavorite] = useState(false);
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const [itemInfodiv, setItemInfodiv] = React.useState(false);
  const [itemdata, setItemdata] = React.useState('');
  const [searchstate, setsearchstate] = useState('');
  const [searchClickState, setsearchClickState] = useState('');
  const [searchData, setSearchData] = useState('');
  const [searching, setSearching] = useState('');
  const [isHovered, setIsHovered] = useState();

  useEffect(() => {
    fetchLoginUserData(loginuserId)
    fetchItems()
  }, [selectedLocation, minprice, maxprice, order_by, order_type, offset,searching ]);

const fetchItems = async ()=>{
  //  console.log('Calling API')
    setError(false)
    setLoading(true)
    var postData = {
      item_location_id:selectedLocation,
      cat_id:'cat5dfc0138547b926dccc5ee269b1cd042',
      sub_cat_id:'subcat005e166e76bfc175d52242279dadc597',
      min_price:minprice,
      max_price:maxprice,
      order_by:order_by,
      order_type:order_type,
      login_user_id:loginuserId,
      status:1,
      searchterm:searchData,
    };

    await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/10/offset/${offset}/`, postData)
        .then(response => updateItemsState(response.data))
        .then(setS(false))
        .catch(error => {
            setLoading(false)
            setError(true)
            setItems([])
            setItemscount(0)
            setOffset(0)
        });
  } 

  const resetFilter = () =>{   
    setItems([])
    setItemscount(0)
    setOffset(0)
    setLocationName('Hyderabad')
    setSelectedLocation('itm_loca7b66748e03d457e976ca63a50e1bde0')
    setCenter({ lat: 17.385000, lng: 78.486702 })
    setZommLevel(11)
    setPricefilter('all')
    setMinprice('')
    setMaxprice('')
    setSort('new_listing') 
    setOrder_by('added_date') 
    setOrder_type('desc')
    fetchItems()
    setsearchClickState('')
  }

  const updateItemsState = (data) =>{
        setLoading(false)
        setItems(items.concat(data) )
        setItemscount(data.length)
        // console.log(data)
    }

  const switchLocation = (lat, lng) => {
    if (1 == 1) {
      const { current = {} } = mapRef;
      // const { leafletElement: map } = current;
      // map.flyTo([16, 80], ZOOM_LEVEL, { animate: true, duration: 3 });
      setCenter({ lat: lat, lng: lng });
      setZommLevel(15);
      setAnimateSec(3);
    } else {
      alert("wqdef");
    }
  };

  const selectLocation = (e) => {
    setSelectedLocation(e.value);
    setOffset(0);
    setItems([]);
    const found = locations.find(city=>city.id===e.value);
    setCenter({ lat: found.lat, lng: found.lng });
    setZommLevel(11);
  };

  //console.log(selectedLocation);

//  const selectsubCat = (e) => {
//    if(e === null){
//      setOffset(0)
//      setItems([])
//      setSubcat('')
//    }else{
//      if(subcat != e.value){
//        setOffset(0)
//        setItems([])
//        setSubcat(e.value)
//      }
//    }
//  };

  const sorting = (e) => {

    setSort(e.value)
    setOffset(0)
    setItems([])

    if(e.value === 'new_listing'){
      setOrder_by('added_date')
      setOrder_type('desc')
    }
    if(e.value === 'popular'){
      setOrder_by('touch_count')
      setOrder_type('desc')
    }
    if(e.value === 'low_to_high'){
      setOrder_by('price')
      setOrder_type('asc')
    }
    if(e.value === 'high_to_low'){
      setOrder_by('price')
      setOrder_type('desc')
    }
  };

  const selectpriceOptions = (e) =>{

    if(e === null){
      setOffset(0)
      setItems([])
      setPricefilter('')
    }else{
      if(pricefilter != e.value){
        setOffset(0)
        setItems([])
        setPricefilter(e.value)
      }
    }
  
    if(e === null){
      setMinprice('')
      setMaxprice('')
    }else{ 
      if(pricefilter != e.value){
        if(e.value === 'all'){
          setMinprice('')
          setMaxprice('')
        }
        if(e.value === '0Rs-50K'){
          setMinprice(0)
          setMaxprice(50000)
        }
        if(e.value === '50K-1Lac'){
          setMinprice(50000)
          setMaxprice(100000)
        }
        if(e.value === '1Lac-25lac'){
          setMinprice(100000)
          setMaxprice(2500000)
        }
        if(e.value === '25Lac-50Lac'){
          setMinprice(2500000)
          setMaxprice(5000000)
        }
        if(e.value === '50Lac-75Lac'){
          setMinprice(5000000)
          setMaxprice(7500000)
        }
        if(e.value === '75Lac-1cr'){
          setMinprice(7500000)
          setMaxprice(10000000)
        }
        if(e.value === '1cr-10cr'){
          setMinprice(10000000)
          setMaxprice(100000000)
        }
      }
    }  
  }

  const callLoadmore = () =>{
    setOffset(offset + 10)
  }
  const customControlStyles ={
    control: (base,_state) => ({
      ...base,
      minHeight: 36,
      height:36,
      width:138,
    }),
    placeholder: () => ({
      paddingBottom: 6,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 6,
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  };
  const customLocationStyles ={
    control: (provided,_state) => ({
      ...provided,
      height:36,
      paddingBottom:5 
    }),
    
  };
  // toggleClearable = () =>
  //   this.setState(state => ({ isClearable: !state.isClearable }));


  const callfavouriteApi = async (id,key) =>{
    if(isLoggedIn && loginuserId !== null){
      if(items[key].is_favourited === '1'){
        items[key].is_favourited = '0'
      }else{
        items[key].is_favourited = '1'
      }
      var Data = {
        item_id:id,
        user_id:loginuserId,
      };
      //await axios.post(`${API_URL.BASE_URL}/favourites/press/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, Data)
      await axios.post(`${process.env.REACT_APP_API_URL}favourites/press/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, Data)
          .then(response => {items[key].is_favourited = response.data.is_favourited})
          .catch(error => {
            console.log(error)
            if(items[key].is_favourited === '1'){
              items[key].is_favourited = '0'
            }else{
              items[key].is_favourited = '1'
            }
            if(favorite){
              setFavorite(false)
            }else{
              setFavorite(true)
            }
          });
    }else{
      alert('Please Login...')
    }
  } 

  const clsItemInfodiv = () =>{
    setItemInfodiv(false)
    setItemdata('')
  }

  const handleSearchclick =()=>{
    setsearchClickState(searchstate);
    console.log(searchstate);
  }
 
  function clickDataFromChild(params) {
    setsearchClickState(params);
  }

  const searchHandleonchange=(e)=>{
    setsearchstate(e.target.value);
  }

  const handleXChange=(e)=>{
    setsearchstate('');
    setsearchClickState('');
  }

  const callSearch = () =>{
    setOffset(0)
    setItems([])
    setSearching(searchData)
}

  const clearSearch = () =>{
    setOffset(0)
    setItems([])
    setSearchData('')
    setSearching('') 
}
  return (
    <>
    <div>
      <div className="listing-main-wrapper2 filter-mobile-view-off" style={{ width: "100%" }}>
      { !itemInfodiv && ( 
        <div className="row" style={{width:'100%'}}>
          <div className="row" style={{float:'left',width:'85%'}}>
          {/* SEARCH START */}
          <div class="input-group" style={{
                marginLeft:'16px',
                marginBottom:'5px',
                width:'300px',
                height: '35px',
                border: 'solid 1px hsl(0, 0%, 80%)',
                borderRadius:'5px',
                backgroundColor:'white'
            }}>
            <div class="form-outline">
              <input 
                type="text" 
                id="form1" 
                class="form-control" 
                name='search'
                onChange={e=>setSearchData(e.target.value)} 
                value={searchData}
                placeholder='Search Title Here..'
                style={{height:'32px', width:'236px',border:'none'}}
              />
            </div>
            <div className="" style={{width:'20px', height:'20px'}}>
              {searchData !== '' && <span 
              style={{
                height:'32px',
                width:'20px',
                paddingLeft:'5px',
                marginTop:'1px',
                marginRight:'1px',
                fontWeight: 'bold',
                fontSize:'20px',
                float:'right'}}
              onClick={clearSearch}>x</span>}
              </div>
            <button 
            onClick={callSearch} 
            type="button" 
            class="btn btn-primary"
            style={{height:'34px', borderRadius:'0px 5px 5px 0px',float:'right'}}>
              <i class="fas fa-search"></i>
            </button>
          </div>
          {/* SEARCH ENDS */}
 
          <div className="col-md-9 form-group" style={{maxWidth:'450px'}}>
            <div className="row">
             
              <div className="col-lg-2 col-md-6 ml-3 " style={{paddingRight:'0',minWidth:'140px',marginLeft:'0',paddingLeft:'0'}}>
                <Select
                  placeholder="Price"
                  //value={priceOptions.find(obj => obj.value === pricefilter)} // set selected value
                  options={priceOptions}
                  onChange={selectpriceOptions}
                  isClearable
                  styles={customControlStyles}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
                {/* <input type="text" className="form-control" placeholder="MinPrice" value={minprice} onChange={e =>setMinprice(e.target.value)} />
                <div className="acr-custom-select form-group">
                  <label>Type: </label>
                  <Select2 data={typelist} />
                </div>
                */}
              </div>
              <div className="col-lg-2 col-md-6 " style={{paddingRight:'0',minWidth:'138px'}}>
                  <Select
                    placeholder="Sort Properties"
                    value={sortOptions.find(obj => obj.value === sort)} // set selected value
                    options={sortOptions}
                    onChange={sorting}
                    styles={customControlStyles}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                  />
                   {/* <button
                  type="button"
                  className="btn-custom-2 light-grey mx-1"
                  style={{ color: "#fff", backgroundColor: "#848486" }}
                  onClick={() => resetFilter()}
                >
                  Reset
                </button> */}

                {/*
                <div className="acr-custom-select form-group">
                  <label>Sort by: </label>
                  <Select2 data={sortbylist} />
                </div>
                */}
              </div>
              <div className="col-lg-3 col-md-6">
              </div> 
            </div>
            {/*<button type="button" className="btn-custom-2 light-grey filter-trigger mx-1" onClick={this.advancetoggle}><i class="fas fa-filter pr-1"></i>Filter</button>*/}
          </div>
        </div>
        {/* <div className="container" style={{display:'block'}}>

        </div> */}
        <div className="row" style={{ textAlign: "right" ,float:'right',display:'block',width:'15%'}}>
        <button
          type="button"
          className="btn-custom-2 light-grey mx-1"
          style={
            listlayoutonly
              ? { color: "#fff", backgroundColor: "#848486" }
              : null
          }
          onClick={() => layouttoggle(!listlayoutonly)}
        >
          <i className="fas fa-list pr-1"></i>List
        </button>

        <button
          type="button"
          className="btn-custom-2 light-grey mx-1"
          style={
            listlayoutonly
              ? null
              : { color: "#fff", backgroundColor: "#848486" }
          }
          onClick={() => layouttoggle(!listlayoutonly)}
        >
          <i className="fas fa-map-marker-alt pr-1"></i>Map
        </button>
           </div>
        </div>
       )}
      </div>
      <div className="container-fluid text-center my-2 filter-mbl-only">
        <div className="row">
          <div className="col-12">    
            <Mobilefilter DataFromChild={clickDataFromChild} selectLocation={selectLocation}  selectpriceOptions={selectpriceOptions} sorting={sorting}/>        
            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                listlayoutonly
                  ? { color: "#fff", backgroundColor: "#848486" }
                  : null
              }
              onClick={() => layouttoggle(!listlayoutonly)}
            >
              <i className="fas fa-list pr-1"></i>List
            </button>

            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                listlayoutonly
                  ? null
                  : { color: "#fff", backgroundColor: "#848486" }
              }
              onClick={() => layouttoggle(!listlayoutonly)}
            >
              <i className="fas fa-map-marker-alt pr-1"></i>Map
            </button>
          </div>
        </div>
      </div>  

      <div className="listing-map-wrapper">
        <div
          className={
            listlayoutonly
              ? "listing-main-wrapper"
              : "listing-main-wrapper mobile-view-off"
          }
          style={listlayoutonly ? { width: "100%",paddingLeft:"80px" } : { width: "44%" ,paddingRight: "10px",paddingLeft:"32px"}}>
          <div className="row">

            {itemInfodiv && 
              <div className="col-md-12 ">
                <Iteminfodiv itemData={itemdata} pathname={'projects'} clsItemInfodiv={clsItemInfodiv} />
              </div>
            }

            {offset === 0 && error && !itemInfodiv &&
             (<div className="text-center">
                <div className="acr-empty-section">
                    <i className="flaticon-home" />
                    <h3>Sorry For The Inconvenience</h3>
                    <h5>Please try again later</h5>
                </div>
              </div>)
            } 
            {offset === 0 &&  loading &&  !itemInfodiv &&
                <>
                 <div
                   className={
                     listlayoutonly ? "col-md-3 col-sm-6" : "col-md-6 col-sm-6"
                   } >
                   <div className="card">
                     <div className="shimmerBG media"></div>
                     <div className="p-32">
                       <div className="shimmerBG title-line"></div>
                       <div className="shimmerBG title-line end"></div>
                       <div className="shimmerBG content-line m-t-24"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line end"></div>
                     </div>
                   </div>
                 </div>
                 <div
                   className={
                     listlayoutonly ? "col-md-3 col-sm-6" : "col-md-6 col-sm-6"
                   }>
                   <div className="card">
                     <div className="shimmerBG media"></div>
                     <div className="p-32">
                       <div className="shimmerBG title-line"></div>
                       <div className="shimmerBG title-line end"></div>
                       <div className="shimmerBG content-line m-t-24"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line end"></div>
                     </div>
                   </div>
                 </div>
                 <div
                   className={
                     listlayoutonly ? "col-md-3 col-sm-6" : "col-md-6 col-sm-6"
                   }>
                   <div className="card">
                     <div className="shimmerBG media"></div>
                     <div className="p-32">
                       <div className="shimmerBG title-line"></div>
                       <div className="shimmerBG title-line end"></div>
                       <div className="shimmerBG content-line m-t-24"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line"></div>
                       <div className="shimmerBG content-line end"></div>
                     </div>
                   </div>
                 </div>
                </> 
            }  
            {items.length > 0 && !itemInfodiv &&
                 items.map((item, i) => (
                   <div
                     className={
                       listlayoutonly ? "col-md-3 col-sm-6 listing-div" : "col-md-6 col-sm-6 listing-div"
                     } >
                     <div
                        //onMouseOver={()=>console.log(i)}
                       //onClick={() => switchLocation(item.lat, item.lng)}
                       className="listing" style={{paddingBottom:'0px !important'}} onMouseOver={()=>setIsHovered(item.id)} onMouseOut={()=>setIsHovered(null)}>
                       <div className="listing-thumbnail">
                         {/* <Link to="/listing-details-v1"><img src={process.env.PUBLIC_URL + "/" + item.gridimg} alt="listing" /></Link> */}
                         {/* <Link to="/listing-details-v1"><img src={DemoImg} alt="listing" /></Link> */}
                         {/* <Link to="/listing-details-v1">
                          </Link> */}
                         {/* <Slider></Slider> */}
                         {/* <Link to="/listing-details-v1"><img src={DemoImg} alt="listing" /></Link> */}
                         {/*<Pictures></Pictures>*/}
                         <img
                           src={
                             item.default_photo.img_path === ""
                               ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                               //: API_URL.IMG_URL+item.default_photo.img_path
                               : process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path
                           }
                           className="makeStyles-img-7 rounded mx-auto d-block"
                           alt="item-img"
                           style={{ height: "250px" }}
                         />    
                         <div className="listing-badges">
                           {/* {item.overall_rating === true ? (
                             <span className="listing-badge featured">
                               {" "}
                               <i className="fas fa-star" />{" "}
                             </span>
                           ) : (
                             ""
                           )}
                           {item.item_type.id === "4" && (
                             <span className="listing-badge sale">
                               On {item.item_type.name}
                             </span>
                           )} */}
                           {/*
                               {item.for_sale_count === true ? (
                                 <span className="listing-badge sale">On Sale</span>
                               ) : (
                                 <span className="listing-badge sale">On Sale</span>
                               )}
                               {item.title === true ? (
                                 <span className="listing-badge pending"> Pending</span>
                               ) : (
                                 <span className="listing-badge pending"> Pending</span>
                               )}
                               {item.title === true ? (
                                 <span className="listing-badge rent"> Rental</span>
                               ) : (
                                 <span className="listing-badge rent"> Rental</span>
                               )} */}
                         </div>
                         <div className="listing-controls">
                           <Link to="#" style={item.is_favourited === '1' ? {backgroundColor:'#dc3545',color:'#f8f9fa'} : {}}  onClick={() =>callfavouriteApi(item.id,i)}>
                             <i className="far fa-heart" />
                             {/* is_favourited */}
                           </Link>
                           {/* <Link to="#" className="compare">
                             <i className="fas fa-sync-alt" />
                           </Link> */}
                           {/* <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link> */}
                           {/* <Link
                             to="#"
                             className="fly-to-location"
                             data-lat="-77.020945"
                             data-lng="38.878241"
                           >
                             <i className="fas fa-map-marker-alt" />
                           </Link> */}
                         </div>
                       </div>
                       <div className="listing-body">
                   
                         <div className="listing-author" style={{backgroundColor:'#fff'}}>
                        
                           {/* <Link 
                              to={item.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && ("/agent-details/"+item.user.user_id)}
                              onClick={(e) => item.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' && (alert('User Account is not Created.'))} 
                           >
                            <img 
                              src={item.user.user_profile_photo === "" ?
                                (process.env.PUBLIC_URL + "/assets/img/agents/5.jpeg")
                                : ('https://api.prod.online.risee.in/uploads/'+item.user.user_profile_photo )
                                } alt="author"
                                className="d-block"
                                alt="agent" 
                            />
                              </Link> */}
                           <div className="listing-author-body" onClick={() => {
                                 setItemInfodiv(true) 
                                 setItemdata(item)
                                 switchLocation(item.lat, item.lng)
                              }} >
                           <h5 className="projects-listing-title">
                              {" "}
                              <Link to="#" onClick={() => switchLocation(item.lat, item.lng)}>
                                {item.title == "" ? "NO Title" : item.title}
                              </Link>{" "}
                            </h5>
                            <span className="projects-listing-price">
                              {'Rs.'+item.price_SqYard}
                              <span style={{fontWeight: "600", color:"#101737"}}> / Sq.Yds</span>
                              {/*<span>/month</span>{" "}*/}
                            </span>
                            <p className="projects-listing-loc"> <i className="fas fa-map-marker-alt" /> {item.location_short}</p>
                             {/* <p>
                               {" "}
                               

                               <Link 
                                 to={item.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && ("/agent-details/"+item.user.user_id)}
                                 onClick={(e) => item.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' && (alert('User Account is not Created.'))} 
                               >
                                {item.user.user_id === 'c4ca4238a0b923820dcc509a6f75849b' ? (
                                    item.listed_by_name === "" ? "NO Title" : item.listed_by_name
                                    ): (
                                      item.user.user_name === "" ? "NO Title" : item.user.user_name
                                )}
                               </Link>{" "}
                             </p>
                             <span className="listing-date">
                               {item.posted_time_ago}
                             </span> */}
                           </div> 
                           <Dropdown className="options-dropdown">
                             <Dropdown.Toggle as={NavLink}>
                               <i className="fas fa-ellipsis-v" />
                             </Dropdown.Toggle>
                             <Dropdown.Menu className="dropdown-menu-right">
                               <ul>
                                 {isLoggedIn ? <Usermobile userData={item} /> : <Loginmodal icon={'fas fa-phone'} text={'View Number'}  />}
                                 {isLoggedIn ?                                  
                                  <li>
                                     {" "}
                                     <Link >
                                       {" "}
                                       <i className="fas fa-bookmark" /> Follow User
                                     </Link>{" "}
                                  </li>  : <Loginmodal icon={'fas fa-bookmark'} text={'Follow User'} />}

                               </ul>
                             </Dropdown.Menu>
                           </Dropdown>
                         </div>
                        
                         {/* <p className="listing-text">{item.description.slice(0,50)+'...'}</p> */}
                         <div className="acr-listing-icons">
                           {/* <OverlayTrigger overlay={bedstip}>
                             <div className="acr-listing-icon">
                               <i className="flaticon-bedroom" />
                               <span className="acr-listing-icon-value">
                                 {item.numberofbedrooms}
                               </span>
                             </div>
                           </OverlayTrigger>
                           <OverlayTrigger overlay={bathstip}>
                             <div className="acr-listing-icon">
                               <i className="flaticon-bathroom" />
                               <span className="acr-listing-icon-value">
                                 {item.numberofbathrooms}
                               </span>
                             </div>
                           </OverlayTrigger> */}
                           {/* <OverlayTrigger overlay={areatip}>
                             <div className="acr-listing-icon">
                               <i className="flaticon-ruler" />
                               <span className="acr-listing-icon-value">
                                 {new Intl.NumberFormat().format(item.area)}
                                 {item.area_type !== '' && <span style={{ textTransform: 'capitalize' }}>/{item.area_type.toLowerCase()}</span>}
                               </span>
                             </div>
                           </OverlayTrigger> */}
                           {/* <div className="listing-gallery"  >
                              <Link onClick={() => {
                                 setItemInfodiv(true) 
                                 setItemdata(item)
                                 switchLocation(item.lat, item.lng)
                              }}  className="btn-custom btn-sm secondary">  View Details </Link>
                              <Itemdatamodal itemData={item} />
                           </div> */}
                         </div>
                         {/* <div className="listing-gallery-wrapper"> */}
                           {/* <Itemdatamodal itemData={item} /> */}
                           {/* <Button
                               onClick={() => switchLocation(item.lat, item.lng)}
                               className="btn-custom btn-sm secondary">View Location</Button> */}
                           {/* <OverlayTrigger overlay={gallerytip}>
                             <Link to="#" className="listing-gallery">
                               {" "}
                               <i className="fas fa-camera" />{" "}
                             </Link>
                           </OverlayTrigger> */}
                         {/* </div> */}
                       </div>
                     </div>
                   </div>
                 ))                  
            }       


          </div>
          {/*
          <h5 className="text-center my-3">
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              {offset > 0 && <Button onClick={()=>callLoadmore('prev')}>Prev</Button>}
              {itemscount < 10 ? null : <Button onClick={()=>callLoadmore('next')}>Next</Button>}
            </ButtonGroup>
          </h5>
          */}
          <h5 className="text-center my-3">{!itemInfodiv && (itemscount < 10 ? null : ( <Button variant="outlined" color="primary" onClick={()=>callLoadmore()}>{loading ? ('Loading...'):('Loadmore') } </Button>))}</h5>
        </div>
        {listlayoutonly ? null : (
          <div class="col" style={{paddingRight:0,paddingLeft:0}}>
            {itemscount < 10 ? null : ( <span className="btn btn-outline-info" style={{marginTop:'1%', marginLeft:'45%', position:'absolute', zIndex:'1000'}} onClick={()=>callLoadmore()}>{loading ? ('Loading...'):('Load More') } </span>)}
            <Listingmap
              //center={center}
              //zoom={zoomLevel}
              animate={animateSec}
              markerData={items}
              changeCenter={s}
              login={z=>{
                setZommLevel(z);
                setOffset(offset+10);
              }}
              isHover={isHovered}
              // ref={mapRef}
            />
          </div>
        )}
      </div>
      <div>
        {/*<Pagination/>*/}
        {/*
        <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"mx-2"}
            pageCount={itemscount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
        />
        */}

       {/* {isLoggedIn && loginuserFirst && <Adduserinfomodal loginuserFirst={loginuserFirst} />} */}
      
      </div>
    </div>
    </>
  );
};

export default Content;
