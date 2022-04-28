import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./../../../context/LoginContext";
import { Tab, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Locationtab from "./Locationtab";
import axios from "axios";
import SubmitModal from "./SubmitModal";
import InfoIcon from "@material-ui/icons/Info";
import GpsFixedIcon from "@material-ui/icons/GpsFixed";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import AppsIcon from "@material-ui/icons/Apps";
import "../../../assets/css/style.css";
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

  //const [isLoggedin, setIsLoggedin] = useState(false);
  //const [loggedinuserid, setLoggedinuserid] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const [uploadmsgstatus, setUploadingmsgstatus] = useState(false);
  const [uploadingmsg, setUploadingmsg] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [center, setCenter] = useState({ lat: 17.385, lng: 78.486702 });

  const [title, setTitle] = useState("");
  const [posttype, setPosttype] = useState("");
  const [categoryiddata, setCategoryiddata] = useState("");
  const [subcategoryiddata, setSubcategoryiddata] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [rentType, setRentType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [itemCondition, setItemCondition] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [carParking, setCarParking] = useState("");

  const [area, setArea] = useState("");
  const [areatype, setAreatype] = useState("");
  const [listedby, setListedby] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("itm_loca7b66748e03d457e976ca63a50e1bde0");
  const [address, setAddress] = useState("");
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
  const [files, setFiles] = useState([]);
  const [s, setS] = useState(false);

  const [pname, setPname] = useState("");
  const [text, setText] = useState(false);
  const [mapFlag, setMapFlag] = useState(false);
  //validations
  const [validations, setValidations] = useState({
    title: false,
    posttype: false,
    categoryiddata: false,
    subcategoryiddata: false,
    latitude: false,
    longitude: false,
    address: false,
    price: false,
    area: false,
    rentType: false,
    listedby: false,
    description: false,
    files: false,
  });

  const [err, setErr] = useState(false);
  const [tab_1, setTab_1] = useState(false);
  const [tab_2, setTab_2] = useState(true);
  const [tab_3, setTab_3] = useState(true);
  const [tab_4, setTab_4] = useState(true);
  const [tab_5, setTab_5] = useState(true);
  const [activeKey, setActiveKey] = useState("tab1");

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles = files.concat(acceptedFiles);
      setErr(false);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
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

  const numericVal = (val, fun, digit) => {
    if (val.length <= digit) fun(val);
  };

  const checkTab_3 = () => {
    if (posttype === "4") {
      if (categoryiddata === "catfa070dd5cc2a2c9c6196159f85480ff7") {
        if (
          subcategoryiddata !== "" &&
          title !== "" &&
          price !== "" &&
          area !== "" &&
          listedby !== "" &&
          description !== ""
        ) {
          setTab_3(false);
          setErr(false);
        } else {
          setTab_3(true);
        }
      } else if (categoryiddata === "cat445639833db3eff8b6cdb5510aa39faa") {
        if (
          subcategoryiddata !== "" &&
          title !== "" &&
          price !== "" &&
          area !== "" &&
          listedby !== "" &&
          itemCondition !== "" &&
          furnishing !== "" &&
          floorNo !== "" &&
          totalFloors !== "" &&
          bedrooms !== "" &&
          description !== ""
        ) {
          setTab_3(false);
          setErr(false);
        } else {
          setTab_3(true);
        }
      } else {
        setTab_3(true);
      }
    } else {
      if (
        subcategoryiddata !== "" &&
        title !== "" &&
        price !== "" &&
        area !== "" &&
        listedby !== "" &&
        itemCondition !== "" &&
        furnishing !== "" &&
        floorNo !== "" &&
        totalFloors !== "" &&
        bedrooms !== "" &&
        carParking !== "" &&
        description !== ""
      ) {
        setTab_3(false);
        setErr(false);
      } else {
        setTab_3(true);
      }
    }
  };

  const checkTab_5 = () => {
    if (!tab_3 && city !== "" && latitude !== "" && address !== "") {
      setTab_4(false);
      setErr(false);
    } else {
      setTab_4(true);
    }
  };

  const goTo = (tab, tabName) => {
    if (!tab) {
      setActiveKey(tabName);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isLoggedIn && loginuserId !== null) {
      if (title === "") {
        setValidations({ title: true });
      } else if (posttype === "") {
        setValidations({ posttype: true });
      } else if (categoryiddata === "") {
        setValidations({ categoryiddata: true });
      } else if (subcategoryiddata === "") {
        setValidations({ subcategoryiddata: true });
      } else if (city === "") {
        setValidations({ city: true });
      } else if (latitude === "" || longitude === "") {
        setValidations({ latitude: true });
        setValidations({ longitude: true });
      } else if (address === "") {
        setValidations({ address: true });
      } else if (price === "") {
        setValidations({ price: true });
      } else if (area === "") {
        setValidations({ area: true });
      } else if (listedby === "") {
        setValidations({ listedby: true });
      } else if (description === "") {
        setValidations({ description: true });
      } else if (files.length === 0) {
        setValidations({ files: true });
        setErr(true);
      } else {
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
        setUploadingmsgstatus(false);
        setUploadingmsg(true);
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
        // console.log(JSON.stringify(postData));
        //dispatch(fetchUserItemUploadData(postData));
        //JSON.stringify(postData)
        // console.log(postData);
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
              uploadimages(data.id);
              setActiveKey("tab1");
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
            ResetForm();
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
    setS(false);
  }, [center, window.location.pathname.split("/")[2]]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    checkTab_3();
  }, [
    price,
    area,
    listedby,
    itemCondition,
    furnishing,
    floorNo,
    description,
    totalFloors,
    bedrooms,
    carParking,
    title,
    categoryiddata,
    subcategoryiddata,
  ]);

  useEffect(() => {
    checkTab_5();
  }, [tab_3, city, latitude, address]);

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

  const ResetForm = () => {
    setTitle("");
    setPosttype("");
    setCategoryiddata("");
    setSubcategoryiddata("");
    setDescription("");
    setPlotType("");
    setPrice("");
    setArea("");
    setAreatype("");
    setListedby("");
    setRentType("");
    setFurnishing("");
    setItemCondition("");
    setFloorNo("");
    setTotalFloors("");
    setBedrooms("");
    setCarParking("");
    setCity("");
    setAddress("");
    setLength("");
    setBreadth("");
    setFacing("");
    setReraId("");
    setLpNumber("");
    setYoutubeLink("");
    setPriceperSqYard("");
    setDTCP("0");
    setHMDA("0");
    setBank("0");
    setRera("0");
    setGatedCommunity("0");
    setWaterSupply("0");
    setSwimmingPool("0");
    setGym("0");
    setPark("0");
    setJoggingTrack("0");
    setFiles([]);
    document.getElementById("submit-listing").reset();
    setCenter({ lat: 17.385, lng: 78.486702 });
    <Locationtab
      center={center}
      getAddressdata={getAddressdata}
      getlatlngdata={getlatlngdata}
    />;
  };

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

  const selectCity = (e) => {
    setCity(e.target.value);
    if (e.target.value === "itm_loca7b66748e03d457e976ca63a50e1bde0") {
      setCenter({ lat: 17.385, lng: 78.486702 });
    }
    if (e.target.value === "itm_loc32db8931aaf39e3dfb5c388799109d5b") {
      setCenter({ lat: 12.9716, lng: 77.594597 });
    }

    if (e.target.value === "itm_loc247387cc3640d1a88f3d9342d216dc13") {
      setCenter({ lat: 13.0827, lng: 80.270699 });
    }

    if (e.target.value === "itm_locc91e7fd5ffc739b26951228b0a564569") {
      setCenter({ lat: 17.968901, lng: 79.594101 });
    }
    if (e.target.value === "itm_loc0da9dce069f1f834f38f262ecc57ffd1") {
      setCenter({ lat: 18.871401, lng: 79.444298 });
    }
    if (e.target.value === "itm_loc892e3dbe2fbf07ae7b19455a4e75b28c") {
      setCenter({ lat: 18.438601, lng: 79.128799 });
    }
    setS(true);
  };

  const getlatlngdata = (data) => {
    setLatitude(data.lat);
    setLongitude(data.lng);
  };

  const getAddressdata = (data) => {
    setAddress(data);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="section" style={{ backgroundColor: "#F9F8F9" }}>
      <div className="container">
        <div className="row">
          <Tab.Container
            activeKey={activeKey}
            onSelect={(key) => setActiveKey(key)}
          >
            {/* Tabs Start */}

            <div className="col-md-3 mb-30">
              <div className="sticky-top shadow-submit">
                <div className="candidate-info">
                  <ul>
                    <Nav>
                      <li
                        className="candidate-submit-option"
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <Nav.Item>
                          <Nav.Link eventKey="tab1">
                            {" "}
                            <InfoIcon style={{ marginRight: "20px" }} />
                            Basic Information
                          </Nav.Link>
                        </Nav.Item>
                      </li>
                      <li
                        className="candidate-submit-option"
                        onClick={() => {
                          if (tab_3) setErr(true);
                        }}
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <Nav.Item>
                          <Nav.Link disabled={tab_3} eventKey="tab3">
                            <GpsFixedIcon style={{ marginRight: "20px" }} />
                            Location
                          </Nav.Link>
                        </Nav.Item>
                      </li>
                      {/* <li onClick={() => {
                                                if(tab_5) setErr(true);
                                            }} className="candidate-submit-option" style={{width:"100%",marginTop:'0px'}}><Nav.Item>
                                                <Nav.Link disabled={false} eventKey="tab5">Details</Nav.Link>
                                            </Nav.Item></li> */}
                      <li
                        className="candidate-submit-option"
                        onClick={() => {
                          if (tab_4) setErr(true);
                        }}
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <Nav.Item>
                          <Nav.Link disabled={tab_4} eventKey="tab4">
                            <AppsIcon style={{ marginRight: "20px" }} />
                            Features
                          </Nav.Link>
                        </Nav.Item>
                      </li>
                      <li
                        className="candidate-submit-option"
                        onClick={() => {
                          if (tab_4) setErr(true);
                        }}
                        style={{ width: "100%", marginTop: "0px" }}
                      >
                        <Nav.Item>
                          <Nav.Link disabled={tab_4} eventKey="tab2">
                            <PhotoLibraryIcon style={{ marginRight: "20px" }} />
                            Gallery
                          </Nav.Link>
                        </Nav.Item>
                      </li>
                    </Nav>
                  </ul>
                </div>
              </div>
            </div>
            {/* Tabs End */}
            {/* Tab Content Start */}
            <div className="col-md-9">
              <form
                style={{ borderRadius: "5px", overflow: "hidden" }}
                className="shadow-submit"
                id="submit-listing"
                onSubmit={onSubmit}
              >
                <Tab.Content className="m-0">
                  <Tab.Pane eventKey="tab1">
                    <div className="job-bx job-profile">
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Basic Information
                        </h5>
                        <Link
                          to={"./"}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                      <div className="row">
                        {/* {pname === "1" && (
                          <div className="col-md-6 form-group">
                            <label>
                              Category
                              <i
                                class="mandatory fa fa-asterisk"
                                aria-hidden="true"
                              ></i>
                            </label>
                            <div className="form-control">
                              <select
                                className="Content_arrow_spacing"
                                onChange={(e) => {
                                  setSubcategoryiddata(e.target.value);
                                }}
                              >
                                <option value="">
                                  Select Subcategory Type
                                </option>
                                <option value="subcata533742b6f520075afa275fe3da21ce3">
                                  Residential Land
                                </option>
                                <option value="subcat4ddefa6bbd2f86e6a3fa102d83ae1631">
                                  Agricultural Land
                                </option>
                                <option value="subcata6ca03906a86602a88fc7d9048105c67">
                                  Commercial Plot
                                </option>
                                <option value="subcat435c6e19f9dec97f559116c452cda562">
                                  Industrial Land
                                </option>
                              </select>
                            </div>
                          </div>
                        )} */}

                        {/* <div className="form-group col-md-6">
                                                <button onClick={(e) => csrfSubmitCheck(e)}>Click Me</button>
                                            </div> */}

                        <div className="form-group col-md-12">
                          <label>
                            Property Title
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
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
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) =>
                              numericVal(e.target.value, setPrice, 10)
                            }
                          />
                        </div>
                        {posttype === "2" && (
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
                                <option value="month">Month</option>
                              </select>
                            </div>
                          </div>
                        )}
                        {categoryiddata ===
                          "cat445639833db3eff8b6cdb5510aa39faa" && (
                          <>
                            <div className="col-md-4 form-group">
                              <label>
                                Furnishing
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <div className="form-control">
                                <select
                                  className="Content_arrow_spacing"
                                  name="type"
                                  onChange={(e) =>
                                    setFurnishing(e.target.value)
                                  }
                                >
                                  <option value="">Select Furnishing</option>
                                  <option value="fur_26d602a6b84f799c487eafb604d4260a">
                                    Furnished
                                  </option>
                                  <option value="fur_6b24b00443f4a2a8c96ffc282faaa457">
                                    Semi-furnished
                                  </option>
                                  <option value="fur_9fb1ee9824da0192ff19b4d99a4a83b8">
                                    Unfurnished
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Condition of item
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <div className="form-control">
                                <select
                                  className="Content_arrow_spacing"
                                  name="type"
                                  onChange={(e) =>
                                    setItemCondition(e.target.value)
                                  }
                                >
                                  <option value="">
                                    Select Condition of item
                                  </option>
                                  <option value="1">New</option>
                                  <option value="2">Old</option>
                                  <option value="3">Ready To Move</option>
                                  <option value="4">Under Construction</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Floor No
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Floor No"
                                value={floorNo}
                                onChange={(e) =>
                                  numericVal(e.target.value, setFloorNo, 3)
                                }
                              />
                            </div>
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
                            <div className="col-md-4 form-group">
                              <label>
                                Car Parking
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Car Parking"
                                value={carParking}
                                onChange={(e) =>
                                  numericVal(e.target.value, setCarParking, 2)
                                }
                              />
                            </div>
                          </>
                        )}
                        <div className="col-md-4 form-group">
                          <label>
                            Area
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="Plot_Area"
                              placeholder="Plot Area"
                              value={area}
                              onChange={(e) =>
                                numericVal(e.target.value, setArea, 6)
                              }
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
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div className="form-control">
                            <select
                              className="Content_arrow_spacing"
                              name="type"
                              onChange={(e) => setListedby(e.target.value)}
                            >
                              <option value="">Select Listed By</option>
                              <option value="Owner">Owner</option>
                              <option value="Dealer">Dealer</option>
                              <option value="Builder">Builder</option>
                            </select>
                          </div>
                        </div>

                        {categoryiddata ===
                          "catfa070dd5cc2a2c9c6196159f85480ff7" && (
                          <>
                            <div className="col-md-4 form-group">
                              <label>Price per (Sq.Yds)</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Price per (Sq.Yds)"
                                value={priceperSqYard}
                                onChange={(e) =>
                                  setPriceperSqYard(e.target.value)
                                }
                              />
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Length
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Length"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Breadth
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Breadth"
                                value={breadth}
                                onChange={(e) => setBreadth(e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        <div className="col-md-4 form-group">
                          <label>
                            Facing
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div className="form-control">
                            <select
                              className="Content_arrow_spacing"
                              name="type"
                              onChange={(e) => setFacing(e.target.value)}
                            >
                              <option value="">Select Facing</option>
                              <option value="east">East</option>
                              <option value="west">West</option>
                              <option value="north">North</option>
                              <option value="south">South</option>
                            </select>
                          </div>
                        </div>

                        {categoryiddata ===
                          "catfa070dd5cc2a2c9c6196159f85480ff7" && (
                          <>
                            <div className="col-md-4 form-group">
                              <label>
                                Plot Type
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <div className="form-control">
                                <select
                                  className="Content_arrow_spacing"
                                  name="type"
                                  onChange={(e) => setPlotType(e.target.value)}
                                >
                                  <option value="">Select Plot Type</option>
                                  <option value="Open Plot">Open Plot</option>
                                  <option value="Farm Land">Farm Land</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label>Rera Id</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Rera Id"
                                value={reraId}
                                onChange={(e) => setReraId(e.target.value)}
                              />
                            </div>

                            <div className="col-md-6 form-group">
                              <label>LP Number</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter LP Number"
                                value={lpNumber}
                                onChange={(e) => setLpNumber(e.target.value)}
                              />
                            </div>

                            <div className="col-md-6 form-group">
                              <label>Youtube Link</label>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Enter Youtube Link"
                                value={YoutubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        <div className="col-md-12 form-group">
                          <label>
                            Property Description
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <textarea
                            name="content"
                            rows={4}
                            className="form-control"
                            placeholder="Property Description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div class="col-md-12">
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              type="checkbox"
                              label="Show WhatsApp Number"
                              onChange={(e) =>
                                e.target.checked
                                  ? setWhatsappAllowed("1")
                                  : setWhatsappAllowed("0")
                              }
                            />
                          </Form.Group>
                        </div>
                        <div className="col-md-12 form-group">
                          <div
                            className="btn-custom"
                            onClick={() => goTo(tab_3, "tab3")}
                          >
                            Next
                          </div>
                          {/* <button onClick={() => console.log("gg")} className="btn-custom">Next</button> */}
                        </div>

                        {err && (
                          <div className="col-sm-12 form-group">
                            <h5 className="text-danger">
                              Fill all the mandatory fields
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="tab3">
                    <div className="job-bx job-profile">
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Location
                        </h5>
                        <Link
                          to={"./"}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label>
                            Select City
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
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
                        {mapFlag && (
                          <Locationtab
                            center={center}
                            getAddressdata={getAddressdata}
                            getlatlngdata={getlatlngdata}
                            changecenter={s}
                          />
                        )}

                        <div className="col-md-12 form-group">
                          <div
                            className="btn-custom"
                            onClick={() => goTo(tab_1, "tab1")}
                          >
                            Back
                          </div>
                          <div
                            className="btn-custom ml-10"
                            onClick={() => goTo(tab_4, "tab4")}
                          >
                            Next
                          </div>

                          {/* <button onClick={() => console.log("gg")} className="btn-custom">Back</button>
                                                    <button onClick={() => console.log("gg")} className="btn-custom ml-10">Next</button> */}
                        </div>
                        {err ? (
                          <div className="col-sm-12 form-group">
                            <h5 className="text-danger">
                              Fill all the mandatory fields
                            </h5>
                          </div>
                        ) : null}
                        {/* <div className="col-sm-12 form-group">{err && <h5 className="text-danger"><h5 className="text-danger">Fill all the mandatory fields</h5></h5>}</div> */}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab4">
                    <div className="job-bx job-profile">
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Features
                        </h5>
                        <Link
                          to={"./"}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                      <div className="row">
                        {categoryiddata ===
                          "catfa070dd5cc2a2c9c6196159f85480ff7" && (
                          <>
                            <div
                              style={{ marginBottom: "0px" }}
                              className="col-md-12 form-group"
                            >
                              <label>Property Facilities</label>
                            </div>
                            <div className="approval-details col-sm-12">
                              <label style={{ marginRight: "20px" }}>
                                <input
                                  type="checkbox"
                                  value={Bank}
                                  onClick={(e) =>
                                    e.target.checked
                                      ? setBank("1")
                                      : setBank("0")
                                  }
                                />
                                <span className="approval-check"></span>
                                <span className="approval-circle"></span>
                                <span>Bank Approved</span>
                              </label>
                              <label style={{ marginRight: "20px" }}>
                                <input
                                  type="checkbox"
                                  value={DTCP}
                                  onClick={(e) =>
                                    e.target.checked
                                      ? setDTCP("1")
                                      : setDTCP("0")
                                  }
                                />
                                <span className="approval-check"></span>
                                <span className="approval-circle"></span>
                                <span>DTCP Approved</span>
                              </label>
                              <label style={{ marginRight: "20px" }}>
                                <input
                                  type="checkbox"
                                  value={HMDA}
                                  onClick={(e) =>
                                    e.target.checked
                                      ? setHMDA("1")
                                      : setHMDA("0")
                                  }
                                />
                                <span className="approval-check"></span>
                                <span className="approval-circle"></span>
                                <span>HMDA Approved</span>
                              </label>
                              <label>
                                <input
                                  type="checkbox"
                                  value={Rera}
                                  onClick={(e) =>
                                    e.target.checked
                                      ? setRera("1")
                                      : setRera("0")
                                  }
                                />
                                <span className="approval-check"></span>
                                <span className="approval-circle"></span>
                                <span>RERA Approved</span>
                              </label>
                            </div>
                          </>
                        )}
                        {categoryiddata ===
                          "cat445639833db3eff8b6cdb5510aa39faa" && (
                          <>
                            <div
                              style={{ marginBottom: "0px" }}
                              className="col-md-12 form-group"
                            >
                              <label>Property Facilities</label>
                            </div>
                            <div
                              style={{ padding: "0px 25px" }}
                              className="row col-sm-12"
                            >
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={gatedCommunity}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setGatedCommunity("1")
                                        : setGatedCommunity("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={gatedIcon}
                                    alt="swimming pool"
                                  />
                                  Gated Community
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={waterSupply}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setWaterSupply("1")
                                        : setWaterSupply("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={waterIcon}
                                    alt="swimming pool"
                                  />
                                  24 water Supply
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={swimmingPool}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setSwimmingPool("1")
                                        : setSwimmingPool("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={swimIcon}
                                    alt="swimming pool"
                                  />
                                  Swimming Pool
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={gym}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setGym("1")
                                        : setGym("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={gymIcon}
                                    alt="swimming pool"
                                  />
                                  Gym
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={park}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setPark("1")
                                        : setPark("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={parkIcon}
                                    alt="swimming pool"
                                  />
                                  Park
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={joggingTrack}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setJoggingTrack("1")
                                        : setJoggingTrack("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={jogIcon}
                                    alt="swimming pool"
                                  />
                                  Jogging Track
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={tennisCourt}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setTennisCourt("1")
                                        : setTennisCourt("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={tennisIcon}
                                    alt="swimming pool"
                                  />
                                  Tennis Court
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={library}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setLibrary("1")
                                        : setLibrary("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={libraryIcon}
                                    alt="swimming pool"
                                  />
                                  Library
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={spa}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setSpa("1")
                                        : setSpa("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={spaIcon}
                                    alt="swimming pool"
                                  />
                                  Spa
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={indoorGame}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setIndoorGame("1")
                                        : setIndoorGame("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={indoorIcon}
                                    alt="swimming pool"
                                  />
                                  Indoor Games
                                </label>
                              </div>
                              <div className="col-lg-2_5 col-md-4 col-sm-6">
                                <label className="acr-listing-feature">
                                  <input
                                    type="checkbox"
                                    value={tour}
                                    onClick={(e) =>
                                      e.target.checked
                                        ? setTour("1")
                                        : setTour("0")
                                    }
                                  />
                                  <i className="acr-feature-check fas fa-check" />
                                  <img
                                    className="acr-listing-feature-icon flaticon-company"
                                    src={tourIcon}
                                    alt="swimming pool"
                                  />
                                  3D Tour
                                </label>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="mt-20 col-md-12 form-group">
                          <div
                            className="btn-custom"
                            onClick={() => goTo(tab_3, "tab3")}
                          >
                            Back
                          </div>
                          <div
                            className="btn-custom ml-10"
                            onClick={() => goTo(tab_4, "tab2")}
                          >
                            Next
                          </div>
                          {/* <button onClick={() => console.log("gg")} className="btn-custom">Back</button>
                                                    <button onClick={() => console.log("gg")} className="btn-custom ml-10">Next</button> */}
                        </div>
                        {err ? (
                          <div className="col-sm-12 form-group">
                            <h5 className="text-danger">
                              Fill all the mandatory fields
                            </h5>
                          </div>
                        ) : null}
                      </div>

                      {/* <div className="col-sm-12 form-group">{err && <h5 className="text-danger"><h5 className="text-danger">Fill all the mandatory fields</h5></h5>}</div> */}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab5">
                    <div className="job-bx job-profile">
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Details
                        </h5>
                        <Link
                          to={"./"}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                      <div className="row">
                        <div className="col-md-4 form-group">
                          <label>
                            Price
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                        {posttype === "2" && (
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
                        )}
                        {categoryiddata ===
                          "cat445639833db3eff8b6cdb5510aa39faa" && (
                          <>
                            <div className="col-md-4 form-group">
                              <label>
                                Furnishing
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <div className="form-control">
                                <select
                                  className="Content_arrow_spacing"
                                  name="type"
                                  onChange={(e) =>
                                    setFurnishing(e.target.value)
                                  }
                                >
                                  <option value="">Select Furnishing</option>
                                  <option value="fur_26d602a6b84f799c487eafb604d4260a">
                                    Furnished
                                  </option>
                                  <option value="fur_6b24b00443f4a2a8c96ffc282faaa457">
                                    Semi-furnished
                                  </option>
                                  <option value="fur_9fb1ee9824da0192ff19b4d99a4a83b8">
                                    Unfurnished
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Condition of item
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <div className="form-control">
                                <select
                                  className="Content_arrow_spacing"
                                  name="type"
                                  onChange={(e) =>
                                    setItemCondition(e.target.value)
                                  }
                                >
                                  <option value="">
                                    Select Condition of item
                                  </option>
                                  <option value="1">New</option>
                                  <option value="2">Old</option>
                                  <option value="3">Ready To Move</option>
                                  <option value="4">Under Construction</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Floor No
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Floor No"
                                value={floorNo}
                                onChange={(e) => setFloorNo(e.target.value)}
                              />
                            </div>
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
                                onChange={(e) => setTotalFloors(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Car Parking
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Car Parking"
                                value={carParking}
                                onChange={(e) => setCarParking(e.target.value)}
                              />
                            </div>
                          </>
                        )}
                        <div className="col-md-4 form-group">
                          <label>
                            Area
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="Plot_Area"
                              placeholder="Plot Area"
                              value={area}
                              onChange={(e) => setArea(e.target.value)}
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
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div className="form-control">
                            <select
                              className="Content_arrow_spacing"
                              name="type"
                              onChange={(e) => setListedby(e.target.value)}
                            >
                              <option value="">Select Listed By</option>
                              <option value="Owner">Owner</option>
                              <option value="Dealer">Dealer</option>
                              <option value="Builder">Builder</option>
                            </select>
                          </div>
                        </div>

                        {categoryiddata ===
                          "catfa070dd5cc2a2c9c6196159f85480ff7" && (
                          <>
                            <div className="col-md-4 form-group">
                              <label>Price per (Sq.Yds)</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Price per (Sq.Yds)"
                                value={priceperSqYard}
                                onChange={(e) =>
                                  setPriceperSqYard(e.target.value)
                                }
                              />
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Length
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Length"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4 form-group">
                              <label>
                                Breadth
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Breadth"
                                value={breadth}
                                onChange={(e) => setBreadth(e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        <div className="col-md-4 form-group">
                          <label>
                            Facing
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div className="form-control">
                            <select
                              className="Content_arrow_spacing"
                              name="type"
                              onChange={(e) => setFacing(e.target.value)}
                            >
                              <option value="">Select Facing</option>
                              <option value="east">East</option>
                              <option value="west">West</option>
                              <option value="north">North</option>
                              <option value="south">South</option>
                            </select>
                          </div>
                        </div>

                        {categoryiddata ===
                          "catfa070dd5cc2a2c9c6196159f85480ff7" && (
                          <>
                            <div className="col-md-4 form-group">
                              <label>
                                Plot Type
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <div className="form-control">
                                <select
                                  className="Content_arrow_spacing"
                                  name="type"
                                  onChange={(e) => setPlotType(e.target.value)}
                                >
                                  <option value="">Select Plot Type</option>
                                  {/* <option value="HMDA">HMDA</option>
                                                        <option value="DTCP">DTCP</option> */}
                                  <option value="Open Plot">Open Plot</option>
                                  <option value="Farm Land">Farm Land</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-4 form-group">
                              <label>
                                Rera Id
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Rera Id"
                                value={reraId}
                                onChange={(e) => setReraId(e.target.value)}
                              />
                            </div>

                            <div className="col-md-6 form-group">
                              <label>
                                LP Number
                                <i
                                  class="mandatory fa fa-asterisk"
                                  aria-hidden="true"
                                ></i>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter LP Number"
                                value={lpNumber}
                                onChange={(e) => setLpNumber(e.target.value)}
                              />
                            </div>

                            <div className="col-md-6 form-group">
                              <label>Youtube Link</label>
                              <input
                                type="url"
                                className="form-control"
                                placeholder="Enter Youtube Link"
                                value={YoutubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        <div className="col-md-12 form-group">
                          <label>Property Description</label>
                          <textarea
                            name="content"
                            rows={4}
                            className="form-control"
                            placeholder="Property Description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>

                        <div class="col-md-12">
                          <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                              type="checkbox"
                              label="Show WhatsApp Number"
                              onChange={(e) =>
                                e.target.checked
                                  ? setWhatsappAllowed("1")
                                  : setWhatsappAllowed("0")
                              }
                            />
                          </Form.Group>
                        </div>
                      </div>
                      {/* <div className="col-sm-12 form-group">{err && <h5 className="text-danger"><h5 className="text-danger">Fill all the mandatory fields</h5></h5>}</div> */}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tab2">
                    {/*
                                        <div className="form-group">
                                            <label>Property Thumbnail</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="propertyThumbnail" />
                                                <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                            </div>
                                        </div>
                                        */}
                    <div className="job-bx job-profile">
                      <div className="job-bx-title clearfix">
                        <h5 className="font-weight-700 pull-left text-uppercase">
                          Gallery
                        </h5>
                        <Link
                          to={"./"}
                          className="site-button right-arrow button-sm float-right"
                        >
                          Back
                        </Link>
                      </div>
                      <div className="row">
                        <div className="col-md-12 form-group">
                          <label>
                            Property Gallery
                            <i
                              class="mandatory fa fa-asterisk"
                              aria-hidden="true"
                            ></i>
                          </label>
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <div className="dropzone-msg dz-message needsclick">
                              <i className="fas fa-cloud-upload-alt" />
                              <h5 className="dropzone-msg-title">
                                Drop files here or click to upload.
                              </h5>
                              {/* <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span> */}
                            </div>
                          </div>
                          <aside className="thumbsContainer">{thumbs}</aside>
                          {/* <span className="acr-form-notice">*You can upload up to 5 images for your listing</span> */}
                          {/* <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span> */}
                        </div>
                        <div className="col-md-12 form-group">
                          <button
                            type="submit"
                            className="btn-custom"
                            name="submit"
                            onClick={() => setAllowed(true)}
                          >
                            Submit Listing
                          </button>
                          <div
                            className="btn-custom ml-10"
                            onClick={() => goTo(tab_4, "tab4")}
                          >
                            Back
                          </div>
                          {/* <button onClick={() => console.log("gg")} className="btn-custom ml-10">Back</button> */}
                        </div>
                        {uploadingmsg ? (
                          <h5 className="text-center text-info">
                            Uploading...
                          </h5>
                        ) : (
                          <SubmitModal
                            refresh={refreshPage}
                            uploadmsgstatus={uploadmsgstatus}
                            allowed={allowed}
                            close={closeSubmitModal}
                          />
                        )}
                        {err && (
                          <div className="col-sm-12 form-group">
                            <h5 className="text-danger">
                              Fill all the mandatory fields
                            </h5>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* {validations.title && <h6 className="text-danger">Title is Required.</h6>}
                                        {validations.subcategoryiddata && <h6 className="text-danger">Subcategory is Required.</h6>}
                                        {validations.description && <h6 className="text-danger">Description is Required.</h6>}
                                        {validations.price && <h6 className="text-danger">Price is Required.</h6>}
                                        {validations.area && <h6 className="text-danger">Area is Required.</h6>}
                                        {validations.listedby && <h6 className="text-danger">Listedby is Required.</h6>}
                                        {validations.latitude || validations.longitude  && <h6 className="text-danger">Select valid location on Map.</h6>}
                                        {validations.city && <h6 className="text-danger">City is Required.</h6>}
                                        {validations.address && <h6 className="text-danger">Address is Required.</h6>}
                                        {validations.files && <h6 className="text-danger">Images are Required.</h6>} */}
                  </Tab.Pane>
                </Tab.Content>
              </form>
            </div>
          </Tab.Container>
          {/* Tab Content End */}
        </div>
      </div>
    </div>
  );
}

export default Content;
