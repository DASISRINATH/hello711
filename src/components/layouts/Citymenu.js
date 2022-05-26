import React, {Fragment, Component, useRef, useState, useEffect, useContext } from "react";
import { ItemsContext } from "./../../context/ItemsContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import DemoImg from "../../assets/img/demo/hello71-logo.png";
//import { Search } from '@material-ui/icons';
import Select from "react-select";
import { useTranslation } from 'react-i18next';

function NavMenu(){
  const { t, i18n } = useTranslation(['header']);
  const locations =[
    { value: 'itm_loca7b66748e03d457e976ca63a50e1bde0', label: t('header:hyderabad'), lat: "17.385000", lng: "78.486702" },
    { value: 'itm_loc32db8931aaf39e3dfb5c388799109d5b', label: t('header:bangalore'), lat: "12.971600", lng: "77.594597", },
    { value: 'itm_loc247387cc3640d1a88f3d9342d216dc13', label: t('header:chennai'), lat: "13.082700", lng: "80.270699",},
  ]
  const history = useHistory();
  const {selectedLocation, selectLocation, updateItemState, cat, changeCat,path} = useContext(ItemsContext);

  const customLocationStyles={
    control: (base, _state) => ({
      ...base,
      width: 120,
      marginTop: "7px",
      border: "none",
      paddingLeft: "5px",
      cursor: "pointer",
    }),
    option: (provided, state)=>({
      ...provided,
      display: state.isSelected && "none",
      cursor: "pointer"
    }),
    menu: (base) =>({
      ...base,
      zIndex: 9999
    })
  }

  useEffect(() => {
    console.log(cat);
    console.log(selectLocation);
  }, []);

  const pathName = window.location.pathname.split('/')[1];

  const buyOptions = [
    {value: "catfa070dd5cc2a2c9c6196159f85480ff7", label: "Plots"},
    {value: "cat445639833db3eff8b6cdb5510aa39faa", label: "Residential"}
  ]

  return (
    <>
      <Fragment>
        {/* Logo */}
        {/* <Link className="navbar-brand" to="/"> <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" /> </Link> */}
        <Link to="/" className="navbar-brand" onClick={() => updateItemState()}>
          {" "}
          <img src={DemoImg} alt="logo" />{" "}
        </Link>
        {/* Menu */}
        <ul className="navbar-nav">

          <li className="menu-item menu-item-has-children" style={{marginTop:"-4px"}}>
            <Select
              placeholder="City"
              value={locations.find(obj => obj.value === selectedLocation)}
              options={locations}
              onChange={e => selectLocation(e.value)}
              styles={customLocationStyles}
              components={{
                IndicatorSeparator: ()=>null
              }}
            />
          </li>
          
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/">Home</Link>
          </li> */}
          {/* <li className="menu-item menu-item-has-children" style={{marginTop:"-4px"}}>
            <Select
              placeholder="Buy"
              value={path === "properties" ? buyOptions.find(obj => obj.value === cat) : ""}
              options={buyOptions}
              onChange={e => {
                changeCat(e.value);
                history.push("/properties");
              }}
              styles={customLocationStyles}
              components={{
                IndicatorSeparator: ()=>null
              }}
            />
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/properties" onClick={() => pathName !== 'properties' && updateItemState()}>Buy</Link>
          </li> */}
          <li className="menu-item menu-item-has-children">
            <Link className={`${pathName==="properties" ? "navbar-highlight" : ""}`} to="/properties" onClick={() => pathName !== 'properties' && updateItemState()}>{t('header:options.buy')}</Link>
          </li>
          {/* <li className="menu-item menu-item-has-children">
            <Link className={`${pathName==="rent" ? "navbar-highlight" : ""}`} to="/rent" onClick={() => pathName !== 'rent' && updateItemState()}>{t('header:options.rent')}</Link>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/projects" onClick={() => pathName !== 'projects' && updateItemState()}>Projects</Link>
          </li> */}

          {/* <li className="menu-item menu-item-has-children">
            <Link to="/chat" onClick={() =>updateItemState()}>Chat</Link>
          </li> */}

          <li className="menu-item menu-item-has-children">
            <Link className={`${pathName==="blog" ? "navbar-highlight" : ""}`} to="/blog" onClick={() => pathName !== 'blog' && updateItemState()}>{t('header:options.blog')}</Link>
          </li>

          {/* <li className="menu-item menu-item-has-children">
            <Link className={`${pathName==="training" ? "navbar-highlight" : ""}`} to="/training" onClick={() => pathName !== 'training' && updateItemState()}>Training</Link>
          </li> */}

          <li className="menu-item menu-item-has-children">
            <a href="" target="_blank"><i className="fab fa-google-play" style={{marginRight:"5px"}}/>  {t('header:options.download_app')}</a>
          </li>
        </ul>
      </Fragment>

    </>
  );
};

export default NavMenu;

// <Link>{location === null ? "City" : location}</Link>
            // {locations.length > 0 && 
            // <ul className="submenu">
            //   {locations.map((city,i)=>
            //     <li className="menu-item">
            //       <Link  onClick={()=>selectingLocation(city)}>{city.label}</Link>
            //     </li>
            //   )}
            //   {/* <li className="menu-item">
            //     <Link to="/blog-grid">Blog Archive</Link>
            //   </li> */}
            // </ul>
            // }
{/* <Select
              placeholder="Select Option"
              value={cities.find(obj => obj.value === selectedLocation)} // set selected value
              options={cities}
              onChange={selectLocation}
              styles={customLocationStyles}
              /> */}
