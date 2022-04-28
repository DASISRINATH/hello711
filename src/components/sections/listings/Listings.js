import React, { Component, useRef, useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "./../../../context/LoginContext";
import { ItemsContext } from "./../../../context/ItemsContext";
import { ChatContext } from "./../../../context/ChatContext";
import Loginmodal from "../../sections/modal/Loginmodal";
import Usermobile from "../../sections/modal/userinfo/UserMobile";
import { Link, useLocation } from "react-router-dom";
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from "react-bootstrap";
import Mobilefilter from "./Mobilefilter";
import CustomSelect from "./CustomSelect";
import Iteminfodiv from '../listingitem/Iteminfodiv';
import Listingmap from "./Listingmap";
import Button from "@material-ui/core/Button";
import DemoImg from "./test_1.jpg";
import FilterListIcon from '@material-ui/icons/FilterList';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ReactTooltip from 'react-tooltip';
import DemoImg1 from "./logo_1.png";
import "./listingmap.css";
import Select from "react-select";
//import locations from "../../../data/location.json";
import FollowUser from "../modal/FollowUser";
import Report from "../modal/Report";
import Itemcard from "../loading/Itemcard"
import { useTranslation } from 'react-i18next';
import ListTable from "./ListTable";
import {FacebookShareButton} from "react-share";

const images = [{ url: DemoImg }, { url: DemoImg1 }, { url: "images/7.jpg" }];
const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Beds</Tooltip>;
const bathstip = <Tooltip>Bathrooms</Tooltip>;
const areatip = <Tooltip>Square Feet</Tooltip>;

const Content = (props) => {

  const {startFirstChat,
    returntype, setReturntype,
    itemId, setItemId,
    sellerId, setSellerId,
    changeReturnType,
  } = useContext(ChatContext);
  const { t, i18n } = useTranslation(['listings']);

  // Options
  var cities =[
    { value: 'itm_loca7b66748e03d457e976ca63a50e1bde0', label: t('listings:hyderabad') },
    { value: 'itm_loc32db8931aaf39e3dfb5c388799109d5b', label: t('listings:bangalore') },
    { value: 'itm_loc247387cc3640d1a88f3d9342d216dc13', label: t('listings:chennai') },
  ]

  var propertiesCatOptions = [
    {value: '', label: t('listings:all')},
    {value: 'catfa070dd5cc2a2c9c6196159f85480ff7', label: t('listings:options.plots')},
    {value: 'cat445639833db3eff8b6cdb5510aa39faa', label: t('listings:options.residential')}
  ]

  var propertiesSubCatOptions =[
    { value: '', label: t('listings:all') },
    { value: 'subcata533742b6f520075afa275fe3da21ce3', label: t('listings:options.residential') },
    { value: 'subcat4ddefa6bbd2f86e6a3fa102d83ae1631', label: t('listings:options.agricultural') },
    { value: 'subcata6ca03906a86602a88fc7d9048105c67', label: t('listings:options.commercial') },
    { value: 'subcat435c6e19f9dec97f559116c452cda562', label: t('listings:options.industrial') },
  ]

  var rentSubCatOptions =[
    { value: '', label: t('listings:all') },
    { value: 'subcat89d510a83500e9ac2ecec99cd6b26c94', label: t('listings:options.apartments') },
    { value: 'subcatca64dc358e7737518a68ec88f7e3f99a', label: t('listings:options.house_villa') },
    { value: 'subcat83e59467ed17dd3c8ce2b22fc1876e2c', label: t('listings:options.building') },
    { value: 'subcatc4b6928dd0ba7f1f4ffc5a4588cea59e', label: t('listings:options.others') },
  ]

  var buyPriceOptions =[
    { value: '', label: t('listings:options.price') },
    { value: '0Rs-50K', label: '0Rs - 50K' },
    { value: '50K-1Lac', label: '50K - 1Lac' },
    { value: '1Lac-25lac', label: '1Lac - 25lac' },
    { value: '25Lac-50Lac', label: '25Lac - 50Lac' },
    { value: '50Lac-75Lac', label: '50Lac - 75Lac' },
    { value: '75Lac-1cr', label: '75Lac - 1cr' },
    { value: '1cr-10cr', label: '1cr - 10cr' },
  ]
  var rentPriceOptions = [
    {value:'', label:t('listings:options.price')},
    {value: "5K-10K", label: "5K - 10K"},
    {value: "10K-15K", label: "10K - 15K"},
    {value: "15K-20K", label: "15K - 20K"},
    {value: "20K-25K", label: "20K - 25K"},
    {value: "25K-30K", label: "25K - 30K"},
    {value: "30K-40K", label: "30K - 40K"},
    {value: "40K-50K", label: "40K - 50K"}
  ]

  var sortOptions =[
    { value: 'new_listing', label: t('listings:options.new_listing') },
    { value: 'popular', label: t('listings:options.popular') },
    { value: 'low_to_high', label: t('listings:options.priceLH') },
    { value: 'high_to_low', label: t('listings:options.PriceHL') },
  ]

  var bedOptions = [
    {value: "", label: t('listings:options.housing_type')},
    {value: "1", label: "1 BHK"},
    {value: "2", label: "2 BHK"},
    {value: "3", label: "3 BHK"},
    {value: "4", label: "4 BHK"},
    {value: "5", label: "5 BHK"},
  ]
  const {
        offset, 
        setOffset, 
        items, 
        setItems, 
        locationName, 
        setLocationName, 
        selectedLocation,
        setSelectedLocation,
        center,
        setCenter,
        zoomLevel,
        setZommLevel,
        s, 
        setS,
        itemscount, 
        setItemscount,
        loading, setLoading,
        error, setError,
        
        subcat, setSubcat,
        pricefilter, setPricefilter,
        minprice, setMinprice,
        maxprice, setMaxprice,
        sort, setSort,
        order_by, setOrder_by,
        order_type, setOrder_type,
        listlayoutonly, layouttoggle,
        maplayoutonly,maplayouttoggle,
        animateSec, setAnimateSec,
        favorite, setFavorite,
        searchData, setSearchData,
        searching, setSearching,
        tag,setTag,
        itemInfodiv, setItemInfodiv,
        itemdata, setItemdata,
        isHovered, setIsHovered,
        filter,
        bedrooms, setBedrooms,
        index,setIndex,
        cat, setCat,
        path, setPath,

        filterFlag,setFilterFlag,

        changeCat,
        fetchItems,
        resetFilter,
        switchLocation,
        selectLocation,
        selectsubCat,
        sorting,
        selectpriceOptions,
        selectBedrooms,
        callfavouriteApi,
        mobileSearch,
        callSearch,
        clearSearch,
        secondFilter,
        callLoadmore,
        clsItemInfodiv,
        openItemInfodiv} = useContext(ItemsContext);

  const {isLoggedIn,
        setIsLoggedIn,
        loginuserId,
        loginuserData,
        fetchLoginUserData} = useContext(UserContext);

  const [windowWidth,setWindowWidth] = useState(window.innerWidth);

  const [listtablelayout,setListtablelayout] = useState(false);

  useEffect(() => {
    fetchLoginUserData(loginuserId)
    fetchItems()
    // const { innerWidth: width, innerHeight: height } = window;
    // console.log(width,height);
  }, [cat,bedrooms,selectedLocation, subcat, minprice, maxprice, order_by, order_type, offset, searching, tag,filterFlag]);
  
  const customControlStyles ={
    control: (base,_state) => ({
      ...base,
      minHeight: 36,
      height:36,
      maxWidth:200,
    }),
    placeholder: () => ({
      paddingBottom: 6,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 6,
      paddingLeft: 0
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: 0,
    }),
    menu: (base)=>({
      ...base,
      zIndex: 9999
    })
  };
  const customLocationStyles ={
    control: (provided,_state) => ({
      ...provided,
      height:36,
      minHeight: 36,
      paddingBottom:5 
    }),
    
  };

  const pathName = window.location.pathname.split('/')[1];
  setPath(pathName);

  const handleScroll = (e) => {
    if(itemscount >= 20){
      if(!loading && e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight+1 && itemscount >=20) {
        callLoadmore();
        console.log("yes");
      } else {
        // console.log(e.target.scrollHeight,e.target.scrollTop,e.target.clientHeight)
        console.log("no");
      }
    }
  }

  

 window.onscroll = function() {
   if(window.innerWidth <= 1195) {
     if(listlayoutonly && !loading && window.innerHeight + document.documentElement.scrollTop >= document.scrollingElement.scrollHeight-5 && itemscount >=20) {
       callLoadmore();
     }
   }
 }

 const condition = () => {
  switch(loginuserId) {

    case "usrb94deaa8243e362ac854bb42d5ba9508": return true;
    case "usr796a5e605cd2f0026cb8de262978e625": return true;
    case "usrb33baa0da30496b06faacc59cc80c0fe": return true;
    case "usrd759c08fe60137ffa1043cbc1f30b84f": return true;

    default: return false;
  }
}
 
  return (
    <>   
    <div>
      {/* {console.log(center)} */}
      <div className={`${listlayoutonly ? "" : "z-index-more"} listing-main-wrapper2 filter-mobile-view-off`} style={{ width: "100%" }}>
       { !itemInfodiv && ( 
        <div className="cont">
          <div className="contfilter">
            <div class="input-group search-bar"
            >
              <div class="form-outline">
                <input 
                  type="text" 
                  id="form1" 
                  class="form-control search-bar-input" 
                  name='search'
                  onChange={e=>setSearchData(e.target.value)} 
                  value={searchData}
                  placeholder='Search Title Here..'
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
                  }}
                onClick={clearSearch}>x</span>}
              </div>
              <button 
              onClick={callSearch} 
              type="button" 
              class="btn btn-primary"
              style={{height:'34px', borderRadius:'0px 5px 5px 0px',position: 'absolute',
                  right: '0',
                  top: '0'}}>
                <i class="fas fa-search"></i>
              </button>
            </div>

            
            

               {/* {pathName === 'properties' &&
                  <div className="select-size">
                    <CustomSelect flag={filterFlag} options={propertiesCatOptions} val={cat} setChange={(val) => changeCat(val)}/>
                  </div>
               } */}

               {pathName !== 'projects' && 
                  (pathName === 'rent' || cat === 'cat445639833db3eff8b6cdb5510aa39faa' ? (
                    <div className="select-size">
                    <CustomSelect flag={filterFlag} options={rentSubCatOptions} val={subcat} setChange={(val) => selectsubCat(val)}/>
                  </div>
                  ) : (
                    <div className="select-size">
                    <CustomSelect flag={filterFlag} options={propertiesSubCatOptions} val={subcat} setChange={(val) => selectsubCat(val)}/>
                  </div>
                  ))
               }
               {/* <div className="select-size">
                  <Select
                    classNamePrefix='select'
                    value={
                      pathName === 'rent' || cat === 'cat445639833db3eff8b6cdb5510aa39faa' ? rentSubCatOptions.find(obj => (
                        obj.value === subcat
                      )) : propertiesSubCatOptions.find(obj => (
                        obj.value === subcat
                      ))
                    }
                    options={ pathName === 'rent' || cat === 'cat445639833db3eff8b6cdb5510aa39faa' ? rentSubCatOptions : propertiesSubCatOptions }
                    onChange={selectsubCat}
                    styles={customControlStyles}
                    components={{
                      IndicatorSeparator: () => null
                    }}                 
                  />
                </div> */}

                

                {pathName==="rent" ? 
                  (
                    <div className="select-size">
                      <CustomSelect flag={filterFlag} options={rentPriceOptions} val={maxprice} setChange={(val) => selectpriceOptions(val)}/>
                    </div>
                  ) : 
                  (
                    <div className="select-size">
                      <CustomSelect flag={filterFlag} options={buyPriceOptions} val={maxprice} setChange={(val) => selectpriceOptions(val)}/>
                    </div>
                  )
                }
                <div className="select-size">
                  <CustomSelect flag={filterFlag} options={sortOptions} val={sort} setChange={(val) => sorting(val)}/>
                </div>
                {/* <div className="select-size">
                  <Select
                    classNamePrefix='select'
                    placeholder="Sort Properties"
                    value={sortOptions.find(obj => obj.value === sort)} // set selected value
                    options={sortOptions}
                    onChange={sorting}
                    styles={customControlStyles}
                    components={{
                      IndicatorSeparator: () => null
                    }}
                  />
                </div> */}
                {pathName === 'rent' &&
                  (
                    <div className="select-size">
                      <CustomSelect flag={filterFlag} options={bedOptions} val={bedrooms} setChange={(val) => selectBedrooms(val)}/>
                    </div>
                      
                  )
               }
               {/* <div className="select-size">
                      <Select
                        classNamePrefix='select'
                        value={bedOptions.find(obj => obj.value === bedrooms)} // set selected value
                        options={bedOptions}
                        onChange={selectBedrooms}
                        styles={customControlStyles}
                        components={{
                          IndicatorSeparator: () => null
                        }}
                      />
                    </div> */}

               <div className="selectFilter">
                 <button onClick={() => {
                   resetFilter();
                 }} className={filter ? "clear-filter-selected" : "clear-filter"}>
                  <span>{t('listings:options.clear_search')}</span>
                 </button>
               </div>


                
          </div>
          <div className="" style={{ display:'flex',width:'max-content',alignItems: "center",justifyContent: "flex-end"}}>

            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                listtablelayout
                  ? { color: "#fff", backgroundColor: "#848486" }
                  : null
              }
              onClick={() =>{listtablelayout ? setListtablelayout(false):setListtablelayout(true)}}
            >
              <i className="fas fa-table pr-1"></i>Min
            </button>

            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                !listtablelayout && listlayoutonly
                  ? { color: "#fff", backgroundColor: "#848486" }
                  : null
              }
              onClick={() => {
                {listtablelayout && setListtablelayout(false)}
                layouttoggle(!listlayoutonly)
              }}
            >
              <i className="fas fa-list pr-1"></i>{t('listings:filter.list')}
            </button>

            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                listlayoutonly 
                  ? null
                  : { color: "#fff", backgroundColor: "#848486" }
              }
              onClick={() => {
                {listtablelayout && setListtablelayout(false)}
                layouttoggle(!listlayoutonly)
              }}
            >
              <i className="fas fa-map-marker-alt pr-1"></i>{t('listings:filter.map')}
            </button>

          </div>
        </div>
       )}
      </div>
      <div className="container-fluid text-center my-2 filter-mbl-only">
        <div className="row">
          <div className="col-12">
            {/* <Mobilefilter mobileSearch={mobileSearch} selectLocation={selectLocation} selectsubCat={selectsubCat} selectpriceOptions={selectpriceOptions} sorting={sorting}/> */}
            <Mobilefilter
            cat={cat}
            subcat={subcat}
            sort={sort}
            pricefilter={pricefilter}
            bedrooms={bedrooms}
            mobileSearch={mobileSearch}
            filter={filter}
            filterFlag={filterFlag}
            rentPriceOptions={rentPriceOptions}
            buyPriceOptions={buyPriceOptions}
            bedOptions={bedOptions}
            propertiesCatOptions={propertiesCatOptions}
            propertiesSubCatOptions={propertiesSubCatOptions}
            rentSubCatOptions={rentSubCatOptions}
            sortOptions={sortOptions}
            selectLocation={selectLocation}
            selectsubCat={selectsubCat}
            selectBedrooms={selectBedrooms}
            selectpriceOptions={selectpriceOptions}
            sorting={sorting}
            changeCat={changeCat}
            resetFilter={resetFilter}
            />
            
            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                listtablelayout
                  ? { color: "#fff", backgroundColor: "#848486" }
                  : null
              }
              onClick={() =>{listtablelayout ? setListtablelayout(false):setListtablelayout(true)}}
            >
              <i className="fas fa-table pr-1"></i>Min
            </button>
            
            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                !listtablelayout && listlayoutonly
                  ? { color: "#fff", backgroundColor: "#848486" }
                  : null
              }
              onClick={() => {
                {listtablelayout && setListtablelayout(false)}
                layouttoggle(!listlayoutonly)
              }}
            >
              <i className="fas fa-list pr-1"></i>{t('listings:filter.list')}
            </button>

            <button
              type="button"
              className="btn-custom-2 light-grey mx-1"
              style={
                listlayoutonly 
                  ? null
                  : { color: "#fff", backgroundColor: "#848486" }
              }
              onClick={() => {
                {listtablelayout && setListtablelayout(false)}
                layouttoggle(!listlayoutonly)
              }}
            >
              <i className="fas fa-map-marker-alt pr-1"></i>{t('listings:filter.map')}
            </button>

          </div>
        </div>
      </div>

        {/* List Table*/}
        {listtablelayout && 
          <div style={{overflow:"auto", maxHeight:"800px"}} onScroll={(e) => handleScroll(e)}>
            <div className="m-2">
              <ListTable items={items} />
            </div>
          </div>
        }

        {/* List Table End */}
        
      {!listtablelayout && 
      <div className="listing-map-wrapper">
      {listlayoutonly && (
        <Fragment>
        <div
          className={
            listlayoutonly
              ? "listing-main-wrapper"
              : "listing-main-wrapper mobile-view-off"
          }
          onScroll={(e) => handleScroll(e)}
          style={{ width: "44%" ,paddingRight: "10px",paddingLeft:"32px"}}>
          {isLoggedIn && loginuserId !== null &&  
            <div className="scrollable-tag scrollable-list-view" style={itemInfodiv===true?{display: "none"}:null}>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "all" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("all")}>{t('listings:all')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "my-listing" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("my-listing")}>{t('listings:my_listing')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "favourites" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("favourites")}>{t('listings:favourites')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className="tag">{t('listings:recommended')}</button>
              {/* <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "expired" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("expired")}>Expired</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center",marginRight: "0"}} className={tag === "reported" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("reported")}>Reported</button> */}
            </div>
          }
          <div className="row">
            {itemInfodiv && 
              <div className="col-md-12 ">
                <Iteminfodiv itemData={itemdata} />
              </div>
            }

            {offset === 0 && error && !itemInfodiv && tag!=="my-listing" && 
             (<div className="text-center" style={{marginLeft:"25px"}}>
                <div className="acr-empty-section">
                    <i className="flaticon-home" />
                    <h3>Sorry For The Inconvenience</h3>
                    <h5>No results found.</h5>
                </div>
              </div>)
            }
            {offset === 0 && error && !itemInfodiv && tag==="my-listing" && 
             (<div className="text-center" style={{marginLeft:"25px"}}>
                <div className="acr-empty-section">
                    <i className="flaticon-home" />
                    <h3>You don't have any listings.</h3>
                    <Link to="/submit-listing" className="btn-custom">Create A New Listing</Link>
                </div>
              </div>)
            }

            {/* Loading... */}
            { loading && !itemInfodiv &&  
                  Array.apply(0, Array(6)).map(function (x, i) {
                    return( 
                      <div className="col-md-6 col-sm-6">
                         <Itemcard/>
                      </div>)
                  })
            } 
            {/* Loading... End */}

            {items.length > 0 && !itemInfodiv && 
                 (items.map((item, i) => (
                   <div
                     className="col-md-6 col-sm-6 listing-div">
                     <div
                       className="listing"
                       onMouseOver={()=> {
                        setIsHovered(item.id);
                        setIndex(i);
                       }}
                       onMouseOut={()=>setIsHovered(null)}
                       >
                       <div className="listing-thumbnail">
                         <div onClick={() =>openItemInfodiv(item,item.lat, item.lng)}>
                            <img
                              src={
                                item.default_photo.img_path === ""
                                  ? process.env.PUBLIC_URL + "/assets/img/blog/8.jpg"
                                  : process.env.REACT_APP_BASE_URL+'/uploads/'+item.default_photo.img_path
                              }
                              className="makeStyles-img-7 rounded mx-auto d-block"
                              alt="item-img"
                              style={{ height: "250px" }}
                            />  
                          </div>
                           
                         <div className="listing-badges">
                           {item.overall_rating === true ? (
                             <span className="listing-badge featured">
                               {" "}
                               <i className="fas fa-star" />{" "}
                             </span>
                           ) : (
                             ""
                           )}
                              {(item.posted_time_ago.slice(3,5)) === "ou" ?
                              (<span className="listing-badge new">New</span>):
                              (item.posted_time_ago.slice(3,5)) === "Ho"?
                              (<span className="listing-badge new">New</span>):
                              (item.posted_time_ago.slice(3,5)) === "in"?
                              (<span className="listing-badge new">New</span>):
                              (item.posted_time_ago.slice(3,5)) === "Mi"?
                              (<span className="listing-badge new">New</span>):null}
                              {item.is_premium==="1" && <span className="listing-badge">Premium</span>}
                              {item.is_verified==="1" && <span className="listing-badge">Verified</span>}
                         </div>
                         <div className="listing-controls">
                           <Link to="#" style={item.is_favourited === '1' ? {backgroundColor:'#dc3545',color:'#f8f9fa'} : {}}  onClick={() =>callfavouriteApi(item.id,i)}>
                             <i className="far fa-heart" />
                           </Link>
                         </div>
                       </div>
                       <div className="listing-body">
                         <div className="listing-author">
                           <Link 
                              to={item.user.role_id === '4' && ("/"+item.user.unique_link)}
                              // to={item.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && { 
                              //   pathname: item.user.unique_link !== "" ? '/'+item.user.unique_link : '/'+item.user.user_name,
                              //   state: { userId: item.user.user_id, userName: item.user.user_name, uniqueLink: item.user.unique_link, } 
                              // }}
                              onClick={(e) => item.user.role_id !== '4' && (alert('User Account is not Created.'))} 
                           >
                            <img 
                              src={
                                item.user.role_id === '4' ? 
                                item.user.user_profile_photo === "" ?
                                (process.env.PUBLIC_URL + "/assets/img/agents/5.jpeg")
                                : (process.env.REACT_APP_BASE_URL+'/uploads/'+item.user.user_profile_photo ) : (process.env.PUBLIC_URL + "/assets/img/agents/5.jpeg")
                                } alt="author"
                                className="d-block"
                                alt="agent" 
                            />
                           </Link> 
                           <div className="listing-author-body">
                             <p>
                               {" "}
                               <Link 
                                  to={item.user.role_id === '4' && ("/"+item.user.unique_link)}
                                  // to={item.user.user_id !== 'c4ca4238a0b923820dcc509a6f75849b' && { 
                                  //   pathname: item.user.unique_link !== "" ? '/'+item.user.unique_link : '/'+item.user.user_name,
                                  //   state: { userId: item.user.user_id, userName: item.user.user_name, uniqueLink: item.user.unique_link, } 
                                  // }}
                                  onClick={(e) => item.user.role_id !== '4' && (alert('User Account is not Created.'))} 
                               >
                                {item.user.role_id !== '4' ? (
                                    item.listed_by_name === "" ? "NO Title" : item.listed_by_name
                                    ): (
                                      item.user.user_name === "" ? "NO Title" : item.user.user_name
                                )}
                               </Link>{" "}
                             </p>
                             <span className="listing-date">
                               {item.posted_time_ago}
                             </span>
                           </div>
                           <Dropdown className="options-dropdown">
                             <Dropdown.Toggle as={NavLink}>
                               <i className="fas fa-ellipsis-v" />
                             </Dropdown.Toggle>
                             <Dropdown.Menu className="dropdown-menu-right">
                               <ul style={{padding: "15px"}}>
                                 {isLoggedIn ? <Usermobile userData={item} /> : <Loginmodal icon={'fas fa-phone'} text={'View Number'}  />}
                                 {
                                   item.user.role_id === '4' && (
                                      isLoggedIn ? <FollowUser userData={item} /> : <Loginmodal icon={'fas fa-bookmark'} text={'Follow User'} />
                                    )
                                 }

                                 {
                                   item.user.role_id === '4' && ( 
                                      isLoggedIn && condition() && loginuserId!==item.added_user_id && 
                                        <li>
                                          <Link 
                                           to={{
                                             pathname:'chat',
                                             state: {itemId:item.id,seller_id:item.added_user_id, itemData:item}
                                           }}
                                           //target="_blank"
                                           //onClick={()=> startFirstChat('seller',item.id,item.added_user_id)}
                                           ><i className="fas fa-comment" />Chat</Link>
                                        </li> /*: <Loginmodal icon={'fas fa-bookmark'} text={'Chat'} />*/
                                    )    
                                  }
                                  {/* {isLoggedIn ? <Report userData={item} /> : <Loginmodal icon={'fas fa-flag'} text={'Report'} />} */}
                                  
                                 
                               </ul>
                             </Dropdown.Menu>
                           </Dropdown>
                         </div>
                        <div>
                         <h5 className="listing-title">
                           {" "}
                           <Link onClick={() => openItemInfodiv(item,item.lat, item.lng)}>
                             {item.title == "" ? "NO Title" : item.title}
                           </Link>{" "}
                         </h5>
                         {item.category.cat_name==="Residential" &&  item.item_price !== "0" &&
                          <span className="listing-price" style={{fontWeight:"bolder", fontSize:"18px"}}>
                            {pathName === 'rent' ?  '₹'+item.price : '₹'+item.item_price}
                            <span style={{color:"#101737"}}>{pathName === 'rent' ? "/ Month" : ""}</span>
                          </span>
                         }
                         {(item.category.cat_name==="Plots" || item.category.cat_name==="Projects") &&
                          <span className="listing-price" style={{fontWeight:"bolder", fontSize:"18px"}}>
                            {item.price_SqYard !== "0" && <span>{'₹'+item.price_SqYard} <span style={{color:"#101737"}}>{"/ Sq. Yd"}</span></span>}
                            {item.price !== "0" &&  <span style={{marginLeft:"10px"}}>{"Rs."+item.price}</span>}
                          </span>
                         }
                         
                          <div style={{position: "relative"}} className="acr-listing-icons">
                            {/* <Link to={{pathname: `https://api.whatsapp.com/send?phone=&text=Hey!%20I%20found%20a%20Listing%20:%20https://propyaar.com${item.cat_id === "cat445639833db3eff8b6cdb5510aa39faa" ? "/rent/"+item.id : (
                                          item.cat_id === "catfa070dd5cc2a2c9c6196159f85480ff7" ? "/properties/"+item.id : (
                                              "/projects/"+item.id
                                          )
                                      )}%20in%20INDMarketplace%20website`}} target="_blank"> */}
                                        {/* <div className="listing-whtapp-btn">
                                            <WhatsAppIcon /> 
                                            <span>Share</span>
                                        </div> */}
                                        {/* <div className="listing-whtapp-btn">
                                          <WhatsAppIcon /> 
                                        </div>                                              
                            </Link> */}
                            {/* <div className="listing-facebook-btn">
                              <ShareOutlinedIcon />
                              <FacebookShareButton
                                url={"https://propyaar.com/"+window.location.pathname.split('/')[1]+"/"+item.id}
                                quote={item.title}
                                hashtag={"#realestate"}
                              >
                                <FacebookIcon /> 
                                </FacebookShareButton>
                              </div> */}
                            {/* <div className="listing-share-btn" data-tip data-for="registerTip">
                              <ShareOutlinedIcon />
                            </div> */}

                            <ReactTooltip
                              id="registerTip"
                              place="left"
                              effect="solid"
                              // type="light"
                              // border="true"
                              event="click"
                              globalEventOff="click"
                              backgroundColor="white"
                              // borderColor="#767777"
                              // arrowColor="#767777"
                            >

                              <div className="listing-facebook-btn">
                                <FacebookShareButton
                                  url={"https://propyaar.com/"+window.location.pathname.split('/')[1]+"/"+item.id}
                                  quote={item.title}
                                  hashtag={"#realestate"}
                                >
                                  <FacebookIcon /> 
                                  </FacebookShareButton>
                              </div>
                              <Link to={{pathname: `https://api.whatsapp.com/send?phone=&text=Hey!%20I%20found%20a%20Listing%20:%20https://propyaar.com${item.cat_id === "cat445639833db3eff8b6cdb5510aa39faa" ? "/rent/"+item.id : (
                                   item.cat_id === "catfa070dd5cc2a2c9c6196159f85480ff7" ? "/properties/"+item.id : (
                                       "/projects/"+item.id
                                   )
                                )}%20in%20INDMarketplace%20website`}} target="_blank">
                                  {/* <div className="listing-whtapp-btn">
                                      <WhatsAppIcon /> 
                                      <span>Share</span>
                                  </div> */}
                                  <div className="listing-whtapp-btn">
                                    <WhatsAppIcon /> 
                                  </div>                                              
                              </Link>
                              
                            </ReactTooltip>

                         
                           <OverlayTrigger overlay={areatip}>
                             <div className="acr-listing-icon" style={{marginRight:"5px"}}>
                               <span className="acr-listing-icon-value">
                                 {new Intl.NumberFormat().format(item.area)}
                                 {item.area_type !== '' ? <span style={{ textTransform: 'capitalize' }}> {item.area_type.toLowerCase()}</span> : <span style={{ textTransform: 'capitalize' }}> Acres</span>}
                               </span>
                             </div>
                           </OverlayTrigger>
                           <span style={{fontSize:"42px", marginRight:"5px"}}>&#183;</span>
                           <span style={{fontSize:"12px"}}>{item.category.cat_name==="Plots" ? "Land" : item.category.cat_name}</span>
                           <div className="listing-gallery" >
                           </div>
                          </div>
                        </div>
                       </div>
                     </div>
                   </div>
                 )))                  
            }       
          </div>
          <h5 className="text-center my-3">
            {!itemInfodiv && 
              (itemscount < 20 ? (
                offset < 20 ? (
                  itemscount !== 0 ?  <span className="text-danger">No More Records...</span> : null
                ) : (<span className="text-danger">No More Records...</span>)
              ) : ( <Button variant="outlined" color="primary" onClick={()=>callLoadmore()}>{loading ? t('listings:loading')+"...": t('listings:load_more') } </Button>))
            }
          </h5>
        </div>
        <div className={`col ${listlayoutonly ? "listing-map-none" : ""}`} style={{paddingLeft:'0px',paddingRight:'0px'}}>
            {/* {itemscount < 20 ? null : (<div className="listmap-showmore" style={listlayoutonly ? {marginTop:'1%'} : {marginTop: "0"}}><span className="btn btn-outline-info" onClick={()=>callLoadmore()}>{loading ? ('Loading...'):('Load More') } </span></div>  )} */}
            {!listlayoutonly && isLoggedIn && loginuserId !== null &&  
            <div className="scrollable-tag tag-map" style={itemInfodiv===true?{display: "none"}:null}>
            <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "all" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("all")}>{t('listings:all')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "my-listing" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("my-listing")}>{t('listings:my_listing')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "favourites" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("favourites")}>{t('listings:favourites')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className="tag">{t('listings:recommended')}</button>
              {/* <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "expired" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("expired")}>Expired</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center",marginRight: "0"}} className={tag === "reported" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("reported")}>Reported</button> */}
            </div>
          }
            {itemscount < 20 ? null : (<div className="listmap-showmore" style={listlayoutonly ? {marginTop:'1%'} : {marginTop: "0"}}><span className="btn btn-outline-info" onClick={()=>callLoadmore()}>{loading ? t('listings:loading')+"...": t('listings:load_more') } </span></div>  )}
            
            <Listingmap
              listlayout={listlayoutonly}
              animate={animateSec}
              markerD={items}
              changeCenter={s}
              login={z=>{
                setZommLevel(z);
                setOffset(offset+10);
              }}
              isHover={isHovered}
            />
          </div>
        </Fragment>
      )}

      {!listlayoutonly && (
        <div className={`col`} style={{paddingLeft:'0px',paddingRight:'0px'}}>
            {itemscount < 20 ? null : (<div className="listmap-showmore" style={listlayoutonly ? {marginTop:'1%'} : {marginTop: "0"}}><span className="btn btn-outline-info" onClick={()=>callLoadmore()}>{loading ? t('listings:loading')+"...":t('listings:load_more') } </span></div>  )}
            {!listlayoutonly && isLoggedIn && loginuserId !== null &&  
            <div className="scrollable-tag tag-map" style={itemInfodiv===true?{display: "none"}:null}>
            <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "all" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("all")}>{t('listings:all')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "my-listing" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("my-listing")}>{t('listings:my_listing')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "favourites" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("favourites")}>{t('listings:favourites')}</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className="tag">{t('listings:recommended')}</button>
              {/* <button style={{padding: "5px 10px",display: "flex",alignItems: "center"}} className={tag === "expired" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("expired")}>Expired</button>
              <button style={{padding: "5px 10px",display: "flex",alignItems: "center",marginRight: "0"}} className={tag === "reported" ? "tag tag-active" : "tag"} onClick={()=> secondFilter("reported")}>Reported</button> */}
            </div>
          }
            <Listingmap
              listlayout={listlayoutonly}
              animate={animateSec}
              markerD={items}
              changeCenter={s}
              login={z=>{
                setZommLevel(z);
                setOffset(offset+10);
              }}
              isHover={isHovered}
            />
          </div>
      )}
        
        
          
        
      </div>}
      <div>      
      </div>
    </div>
    </>
  );
};

export default Content;
