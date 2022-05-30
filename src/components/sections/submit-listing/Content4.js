import React, { useEffect, useState, useContext } from "react";

import { UserContext } from "./../../../context/LoginContext";
import { submitContext } from "./../../../context/SubmitListContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import ShowLocation from "./ShowLocation";

import { Tab, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Locationtab from "./Locationtab";
import axios from "axios";
import SubmitModal from "./SubmitModal";
import MapModal from "./MapModal";
import InfoIcon from "@material-ui/icons/Info";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AppsIcon from "@material-ui/icons/Apps";
import "../../../assets/css/style.css";
import "./css/Styles.css";
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
import Modalbox from "../../layouts/Modal";
import { Fragment } from "react";

// Features
const features = [
  { id: 1, icon: "bone", title: "Pet Friendly" },
  { id: 2, icon: "chair", title: "Furnished" },
  { id: 3, icon: "fan", title: "Cooling" },
  { id: 4, icon: "garage", title: "Parking" },
  { id: 5, icon: "mailbox", title: "Mailbox" },
  { id: 6, icon: "eye", title: "City View" },
];

function Content(props) {
  const { isLoggedIn, loginuserId, csrfToken, setCsrfToken } =
    useContext(UserContext);

  const {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    center,
    setCenter,
    city,
    setCity,
    s,
    setS,
    address,
    setAddress,
    selectCity,
    getlatlngdata,
    getAddressdata,
    setSValue,
    files,
    setFiles,
    phone,
    setPhone,
    countryCode,
    setCountryCode,
    price,
    setPrice,
    area,
    setArea,
    title,
    setTitle,
    description,
    setDescription,
    fillAll,
    setFillAll,
    bedrooms,
    setBedrooms,
    totalFloors,
    setTotalFloors,
    rentType,
    setRentType,
    validations,
    setValidations,
    resetSubmitListStates,
    numericVal,
    validateSellApartment,
  } = useContext(submitContext);

  //const [isLoggedin, setIsLoggedin] = useState(false);
  //const [loggedinuserid, setLoggedinuserid] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [uploadmsgstatus, setUploadingmsgstatus] = useState(false);
  const [uploadingmsg, setUploadingmsg] = useState(false);
  const [allowed, setAllowed] = useState(false);
  // const [center, setCenter] = useState({ lat: 17.385, lng: 78.486702 });

  // const [title, setTitle] = useState("");
  const [posttype, setPosttype] = useState("");
  const [categoryiddata, setCategoryiddata] = useState("");
  const [subcategoryiddata, setSubcategoryiddata] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");

  // const [rentType, setRentType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [floorNo, setFloorNo] = useState("");
  // const [totalFloors, setTotalFloors] = useState("");
  // const [bedrooms, setBedrooms] = useState("");
  const [carParking, setCarParking] = useState("");

  // const [area, setArea] = useState("");
  const [areatype, setAreatype] = useState("");
  const [listedby, setListedby] = useState("");
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const [city, setCity] = useState("itm_loca7b66748e03d457e976ca63a50e1bde0");
  // const [address, setAddress] = useState("");
  const [length, setLength] = useState("");
  const [breadth, setBreadth] = useState("");
  const [facing, setFacing] = useState("");
  const [reraId, setReraId] = useState(""); //rera_id
  const [lpNumber, setLpNumber] = useState("");
  const [plotType, setPlotType] = useState("");
  const [YoutubeLink, setYoutubeLink] = useState("");
  const [priceperSqYard, setPriceperSqYard] = useState("");
  const [DTCP, setDTCP] = useState("0");
  const [HMDA, setHMDA] = useState("0");
  const [Bank, setBank] = useState("0");
  const [Rera, setRera] = useState("0");
  const [gatedCommunity, setGatedCommunity] = useState("0");
  const [waterSupply, setWaterSupply] = useState("0");
  const [swimmingPool, setSwimmingPool] = useState("0");
  const [gym, setGym] = useState("0");
  const [park, setPark] = useState("0");
  const [joggingTrack, setJoggingTrack] = useState("0");
  const [tennisCourt, setTennisCourt] = useState("0");
  const [library, setLibrary] = useState("0");
  const [spa, setSpa] = useState("0");
  const [indoorGame, setIndoorGame] = useState("0");
  const [tour, setTour] = useState("0");
  const [whatsappAllowed, setWhatsappAllowed] = useState("0");
  const [selected, setSelected] = useState(false);
  //   const [files, setFiles] = useState([]);
  // const [s, setS] = useState(false);

  const [pname, setPname] = useState("");
  const [text, setText] = useState(false);
  const [mapFlag, setMapFlag] = useState(false);
  //validations
  // const [validations, setValidations] = useState({
  //   title: false,
  //   posttype: false,
  //   categoryiddata: false,
  //   subcategoryiddata: false,
  //   latitude: false,
  //   longitude: false,
  //   address: false,
  //   price: false,
  //   area: false,
  //   rentType: false,
  //   listedby: false,
  //   description: false,
  //   files: false,
  // });

  const [err, setErr] = useState(false);
  const [tab_1, setTab_1] = useState(false);
  const [tab_2, setTab_2] = useState(true);
  const [tab_3, setTab_3] = useState(true);
  const [tab_4, setTab_4] = useState(true);
  const [tab_5, setTab_5] = useState(true);
  const [activeKey, setActiveKey] = useState("tab1");

  const path = window.location.pathname.split("/")[2];

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      acceptedFiles = files.concat(acceptedFiles);
      setErr(false);
      if (acceptedFiles.length > 5) acceptedFiles = acceptedFiles.splice(0, 5);
      setFiles(
        acceptedFiles.map((file) => {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const thumbs = files.map((file, i) => (
    <>
      <div className="thumb" key={file.name}>
        <div className="thumbInner">
          <img src={file.preview} alt="img" />
        </div>
      </div>
      <Link
        style={{ height: "100px" }}
        className="btn btn-outline-danger"
        onClick={() => removeImg(i)}
      >
        <i class="fas fa-trash"></i>
      </Link>
    </>
  ));

  const removeImg = (i) => {
    files.splice(i, 1);
    //console.log(files)
  };

  // const numericVal = (val, fun, digit) => {
  //   if (val.length <= digit) fun(val);
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isLoggedIn && loginuserId !== null) {
      if (title === "") {
        setValidations((prev) => ({
          ...prev,
          title: true,
        }));
        setFillAll(true);
      } else if (area === "") {
        setValidations((prev) => ({
          ...prev,
          area: true,
        }));
        setFillAll(true);
      } else if (price === "") {
        setValidations((prev) => ({
          ...prev,
          price: true,
        }));
        setFillAll(true);
      } else if (description === "") {
        setValidations((prev) => ({
          ...prev,
          description: true,
        }));
        setFillAll(true);
      } else if (files.length === 0) {
        setValidations((prev) => ({
          ...prev,
          files: true,
        }));
        setFillAll(true);
      } else if (latitude === "") {
        setValidations((prev) => ({
          ...prev,
          latitude: true,
        }));
        setFillAll(true);
      } else if (longitude === "") {
        setValidations((prev) => ({
          ...prev,
          longitude: true,
        }));
        setFillAll(true);
      } else if (path !== "1" && validateSellApartment()) {
        setFillAll(true);
      } else {
        var postData = {
          added_user_id: loginuserId,
          title: title,
          item_type_id: posttype,
          cat_id: categoryiddata,
          sub_cat_id: subcategoryiddata,
          description: description,
          price: price,
          area: area,
          area_type: areatype,
          rent_collection_type: rentType,
          furnishing_id: furnishing,
          condition_of_item_id: itemCondition,
          floor_no: floorNo,
          total_floors: totalFloors,
          numberofbedrooms: bedrooms,
          car_parking: carParking,
          listed_by: listedby,
          lat: latitude,
          lng: longitude,
          item_location_id: city,
          address: address,
          length: length,
          breadth: breadth,
          facing: facing,
          rera_id: reraId,
          lp_number: lpNumber,
          plot_type: plotType,
          price_SqYard: priceperSqYard,
          youtube_url_link: YoutubeLink,
          is_bank_approval: Bank,
          is_dtcp: DTCP,
          is_hmda: HMDA,
          is_rera_approved: Rera,
          is_whatsapp_allowed: whatsappAllowed,
          is_gated_community: gatedCommunity,
          is_24_water_supply: waterSupply,
          is_swimming_pool: swimmingPool,
          is_gym: gym,
          is_park: park,
          is_jogging_track: joggingTrack,
          is_tennis_court: tennisCourt,
          is_library: library,
          is_spa_available: spa,
          is_indoor_games: indoorGame,
          is_3dtour_available: tour,
        };
        setUploadingmsgstatus(false);
        setUploadingmsg(true);
        setFillAll(false);
        setValidations({
          title: false,
          posttype: false,
          categoryiddata: false,
          subcategoryiddata: false,
          latitude: false,
          longitude: false,
          address: false,
          price: false,
          rentType: false,
          area: false,
          listedby: false,
          description: false,
          files: false,
        });
        fetch(
          process.env.REACT_APP_API_URL +
            "items/add/api_key/" +
            process.env.REACT_APP_API_SECURITY_KEY +
            "/",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.id != "") {
              console.log(postData);
              uploadimages(data.id);
              // setActiveKey("tab1");
              resetSubmitListStates();
              setFillAll(false);
            } else {
              alert("something went wrong please try again.");
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      alert("Please Login first.");
    }
  };

  const uploadimages = (itemid) => {
    // console.log(itemid);
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("item_id", itemid);
      console.log(formData.file);
      axios
        .post(
          process.env.REACT_APP_API_URL +
            "images/upload_item/api_key/" +
            process.env.REACT_APP_API_SECURITY_KEY +
            "/",
          formData
        )
        .then((res) => {
          if (res.status === 200) {
            setUploadingmsg(false);
            setUploadingmsgstatus(true);
            // ResetForm();
          } else {
            alert("Some Images are not uploaded check from mylistings");
          }
        });
    }
  };

  const loadCsrfToken = async () => {
    const domainURL = "http://localhost:5000";
    const response = await fetch(`${domainURL}/form`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const parsedData = await response.json();
    // console.log(parsedData.csrfToken);
    setCsrfToken(parsedData.csrfToken);
  };

  useEffect(() => {
    resetSubmitListStates();
  }, [window.location.pathname.split("/")[2]]);

  React.useEffect(() => {
    const pathname = window.location.pathname.split("/")[2];
    setPname(pathname);
    if (pathname === "1") {
      const subType = window.location.pathname.split("/")[3];
      setPosttype("4");
      setCategoryiddata("catfa070dd5cc2a2c9c6196159f85480ff7");
      switch (subType) {
        case "1":
          setSubcategoryiddata("subcata533742b6f520075afa275fe3da21ce3");
          break;
        case "2":
          setSubcategoryiddata("subcat4ddefa6bbd2f86e6a3fa102d83ae1631");
          break;
        case "3":
          setSubcategoryiddata("subcata6ca03906a86602a88fc7d9048105c67");
          break;
        case "4":
          setSubcategoryiddata("subcat435c6e19f9dec97f559116c452cda562");
          break;
        default:
      }
    } else if (pathname === "2") {
      setPosttype("4");
      setCategoryiddata("cat445639833db3eff8b6cdb5510aa39faa");
      setSubcategoryiddata("subcat89d510a83500e9ac2ecec99cd6b26c94");
    } else if (pathname === "3") {
      setPosttype("4");
      setCategoryiddata("cat445639833db3eff8b6cdb5510aa39faa");
      setSubcategoryiddata("subcatca64dc358e7737518a68ec88f7e3f99a");
    } else if (pathname === "4") {
      setPosttype("2");
      setCategoryiddata("cat445639833db3eff8b6cdb5510aa39faa");
      setSubcategoryiddata("subcat89d510a83500e9ac2ecec99cd6b26c94");
    } else if (pathname === "5") {
      setPosttype("2");
      setCategoryiddata("cat445639833db3eff8b6cdb5510aa39faa");
      setSubcategoryiddata("subcat83e59467ed17dd3c8ce2b22fc1876e2c");
    }
    // console.log(posttype,categoryiddata,subcategoryiddata);
    callCategoryapi();
    calllocationsapi();
    // setSValue(false);
  }, [center, window.location.pathname.split("/")[2]]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    loadCsrfToken();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMapFlag(true);
    }, 250);
  }, []);

  const csrfSubmitCheck = async (e) => {
    e.preventDefault();
    const domainURL = "http://localhost:5000";
    fetch(`${domainURL}/process`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "xsrf-token": csrfToken,
      },
      credentials: "include",
      mode: "cors",
    })
      .then((response) => {
        // console.log(response);
        if (response.status !== 200) {
          return true;
        } else {
          onSubmit(e);
          return false;
        }
      })
      .then((data) => setText(data))
      .catch((err) => console.log(err));
  };

  // const ResetForm = () => {
  //   setTitle("");
  //   setPosttype("");
  //   setCategoryiddata("");
  //   setSubcategoryiddata("");
  //   setDescription("");
  //   setPlotType("");
  //   setPrice("");
  //   setArea("");
  //   setAreatype("");
  //   setListedby("");
  //   setRentType("");
  //   setFurnishing("");
  //   setItemCondition("");
  //   setFloorNo("");
  //   setTotalFloors("");
  //   setBedrooms("");
  //   setCarParking("");
  //   setCity("");
  //   setAddress("");
  //   setLength("");
  //   setBreadth("");
  //   setFacing("");
  //   setReraId("");
  //   setLpNumber("");
  //   setYoutubeLink("");
  //   setPriceperSqYard("");
  //   setDTCP("0");
  //   setHMDA("0");
  //   setBank("0");
  //   setRera("0");
  //   setGatedCommunity("0");
  //   setWaterSupply("0");
  //   setSwimmingPool("0");
  //   setGym("0");
  //   setPark("0");
  //   setJoggingTrack("0");
  //   setFiles([]);
  //   document.getElementById("submit-listing").reset();
  //   setCenter({ lat: 17.385, lng: 78.486702 });
  //   <Locationtab
  //     center={center}
  //     getAddressdata={getAddressdata}
  //     getlatlngdata={getlatlngdata}
  //   />;
  // };

  const closeSubmitModal = () => {
    setAllowed(false);
  };

  const callCategoryapi = () => {
    fetch(
      process.env.REACT_APP_API_URL +
        "categories/get/api_key/" +
        process.env.REACT_APP_API_SECURITY_KEY +
        "/"
    )
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  };

  const calllocationsapi = () => {
    fetch(
      process.env.REACT_APP_API_URL +
        "itemlocations/get/api_key/" +
        process.env.REACT_APP_API_SECURITY_KEY +
        "/"
    )
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.log(error));
  };

  const callSubategoryapi = (e) => {
    setCategoryiddata(e.target.value);
    fetch(
      process.env.REACT_APP_API_URL +
        "subcategories/get/api_key/" +
        process.env.REACT_APP_API_SECURITY_KEY +
        "/cat_id/" +
        e.target.value +
        "/"
    )
      .then((response) => response.json())
      .then((data) => setSubcategories(data))
      .catch((error) => console.log(error));
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="section" style={{ backgroundColor: "#F9F8F9" }}>
      <div className="container">
        <form
          style={{ borderRadius: "5px", overflow: "hidden" }}
          className="shadow-submit"
          id="submit-listing"
          onSubmit={onSubmit}
        >
          <div className="job-bx job-profile">
            <div className="job-bx-title clearfix">
              <h5 className="font-weight-700 pull-left text-uppercase">
                Location Details
              </h5>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-8 form-group">
                <label>
                  Select City
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <div className="form-control">
                  <select
                    className="Content_arrow_spacing"
                    name="city"
                    onChange={selectCity}
                  >
                    <option value="itm_loca7b66748e03d457e976ca63a50e1bde0">
                      Hyderabad
                    </option>
                    <option value="itm_loc32db8931aaf39e3dfb5c388799109d5b">
                      Bengaluru
                    </option>
                    <option value="itm_loc247387cc3640d1a88f3d9342d216dc13">
                      Chennai
                    </option>
                    {/* {locations.map(location => (<option value={location.id}>{location.name}</option>))} */}
                  </select>
                </div>
              </div>

              <div className="col-lg-6 col-md-4 form-group submit-listing-modal">
                <MapModal />
              </div>
              <div className="col-lg-12">
                {latitude && longitude && <ShowLocation />}
              </div>
            </div>

            <div className="job-bx-title clearfix">
              <h5 className="font-weight-700 pull-left text-uppercase">
                Property Details
              </h5>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <label>
                  Property Title
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Property Title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="col-md-4 form-group">
                <label>
                  Price
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => numericVal(e.target.value, setPrice, 10)}
                />
              </div>

              <div className="col-md-4 form-group">
                <label>
                  Area
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="Plot_Area"
                    placeholder="Plot Area"
                    value={area}
                    onChange={(e) => numericVal(e.target.value, setArea, 6)}
                  />
                  <div class="input-group-append form-control">
                    <select
                      className="input-group-text Content_adjusting_arrow_acres Content_arrow_spacing"
                      name="type"
                      onChange={(e) => setAreatype(e.target.value)}
                    >
                      <option value="Acres">Acres</option>
                      <option value="Sq.Ft">Sq.Ft</option>
                      <option value="Sq.Mt">Sq.Mt</option>
                      <option value="Sq.Yds">Sq.Yds</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-md-4 form-group">
                <label>
                  {" "}
                  Listed By
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <div className="form-control">
                  <select
                    className="Content_arrow_spacing"
                    name="type"
                    onChange={(e) => setListedby(e.target.value)}
                  >
                    <option value="">Select Listed By</option>
                    <option value="Dealer">Student</option>
                    <option value="Owner">Trainer</option>
                    <option value="Builder">Organisation</option>
                  </select>
                </div>
              </div>

              {path !== "1" && (
                <Fragment>
                  <div className="col-md-4 form-group">
                    <label>
                      House Type
                      <i
                        class="mandatory fa fa-asterisk"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <div className="form-control">
                      <select
                        className="Content_arrow_spacing"
                        name="type"
                        onChange={(e) => setBedrooms(e.target.value)}
                      >
                        <option value="">Select House Type</option>
                        <option value={1}>1 BHK</option>
                        <option value={2}>2 BHK</option>
                        <option value={3}>3 BHK</option>
                        <option value={4}>4 BHK</option>
                        <option value={5}>5 BHK</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>
                      Total Floors
                      <i
                        class="mandatory fa fa-asterisk"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Total Floors"
                      value={totalFloors}
                      onChange={(e) =>
                        numericVal(e.target.value, setTotalFloors, 3)
                      }
                    />
                  </div>
                </Fragment>
              )}

              {(path === "4" || path === "5") && (
                <Fragment>
                  <div className="col-md-4 form-group">
                    <label>
                      Rent collection type
                      <i
                        class="mandatory fa fa-asterisk"
                        aria-hidden="true"
                      ></i>
                    </label>
                    <div className="form-control">
                      <select
                        className="Content_arrow_spacing"
                        name="type"
                        onChange={(e) => setRentType(e.target.value)}
                      >
                        {/* <option value="">Select Rent collection type</option> */}
                        {/* <option value="day">Day</option> */}
                        <option value="month">Month</option>
                        {/* <option value="year">Year</option> */}
                      </select>
                    </div>
                  </div>
                </Fragment>
              )}

              <div className="col-md-12 form-group">
                <label>
                  Property Description
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <textarea
                  name="content"
                  rows={4}
                  className="form-control"
                  placeholder="Property Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="job-bx-title clearfix">
              <h5 className="font-weight-700 pull-left text-uppercase">
                Add Image
              </h5>
            </div>

            <div className="imageUploadCont">
              <div>Upload max of 5 images with Max size of 2 MB.</div>
              <div
                {...getRootProps({ className: "dropzone" })}
                className="addImage"
              >
                <input {...getInputProps()} />+ Add Images {" " + files.length}
              </div>
            </div>
            {/* <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="dropzone-msg dz-message needsclick">
                <i className="fas fa-cloud-upload-alt" />
                <h5 className="dropzone-msg-title">
                  Drop files here or click to upload.
                </h5>
              </div>
            </div> */}
            <div className="job-bx-title clearfix">
              <h5 className="font-weight-700 pull-left text-uppercase">
                Contact Details
              </h5>
            </div>
            <div className="row">
              <div className="col-md-4 form-group">
                <label>
                  Login/SignUp:
                  <i class="mandatory fa fa-asterisk" aria-hidden="true"></i>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.value)}
                />
              </div>
              {isLoggedIn ? (
                <div className="col-md-2 form-group submit-listing-modal">
                  <button className="submit-button">Submit</button>
                </div>
              ) : (
                <div className="col-md-2 form-group submit-listing-modal">
                  <Modalbox btnType="submit" />
                </div>
              )}
              {fillAll && (
                <div className="col-sm-12 form-group">
                  <h5 className="text-danger">Fill all the mandatory fields</h5>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      {/* Tab Content End */}
    </div>
  );
}

export default Content;
