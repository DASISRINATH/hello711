import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from "./../../../context/LoginContext";
import { Tab, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import Locationtab from './Locationtab';
import axios from 'axios';
import '../../../assets/css/style.css'
// icons
import InfoIcon from '@material-ui/icons/Info';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AppsIcon from '@material-ui/icons/Apps';

// Features
const features = [
    { id: 1, icon: 'bone', title: 'Pet Friendly' },
    { id: 2, icon: 'chair', title: 'Furnished' },
    { id: 3, icon: 'fan', title: 'Cooling' },
    { id: 4, icon: 'garage', title: 'Parking' },
    { id: 5, icon: 'mailbox', title: 'Mailbox' },
    { id: 6, icon: 'eye', title: 'City View' },
];

function Content(props) {

    const {isLoggedIn,loginuserId} = useContext(UserContext);

    //const [isLoggedin, setIsLoggedin] = useState(false);
    //const [loggedinuserid, setLoggedinuserid] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [uploadmsg, setUploadmsg] = useState();
    const [uploadmsgstatus, setUploadingmsgstatus] = useState(false);
    const [uploadingmsg, setUploadingmsg] = useState(false);
    const [center, setCenter] = useState({ lat: 17.385000, lng: 78.486702 });
    const [s, setS] = useState(false);

    const [title, setTitle] = useState('');
    const [posttype, setPosttype] = useState(4);
    const [categoryiddata, setCategoryiddata] = useState('cat5dfc0138547b926dccc5ee269b1cd042');
    const [subcategoryiddata, setSubcategoryiddata] = useState('subcat005e166e76bfc175d52242279dadc597');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [areatype, setAreatype] = useState('');
    const [listedby, setListedby] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const [length, setLength] = useState('');
    const [breadth, setBreadth] = useState('');
    const [facing, setFacing] = useState('');
    const [reraId, setReraId] = useState('');//rera_id
    const [lpNumber, setLpNumber] = useState('');
    const [plotType, setPlotType] = useState('');
    const [priceperSqYard, setPriceperSqYard] = useState('');
    const [Bank, setBank] = useState("0");
    const [DTCP, setDTCP] = useState("0");
    const [HMDA, setHMDA] = useState("0");
    const [Rera, setRera] = useState("0");
    const [layoutId, setLayoutId] = useState();


    // Validation hooks
    const [err,setErr] = useState(false);
    const [tab_1,setTab_1] = useState(false);
    const [tab_2,setTab_2] = useState(true);
    const [tab_3,setTab_3] = useState(true);
    const [tab_4,setTab_4] = useState(true);
    const [tab_5,setTab_5] = useState(true);
    const [activeKey,setActiveKey] = useState("tab1");


    const [files, setFiles] = useState([]);

        //validations
    const [validations, setValidations] = useState({
            title:false,
            subcategoryiddata:false,
            latitude:false,
            longitude:false,
            address:false,
            price:false,
            area:false,
            listedby:false,
            description:false,
            files:false,
        });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            acceptedFiles = files.concat(acceptedFiles);
            setErr(false);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map((file, i )=> (
        <>
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img src={file.preview} alt="img" />
            </div>
        </div>
        <Link className="btn btn-outline-danger" onClick={()=>removeImg(i)}><i class="fas fa-trash"></i></Link>
        </>
    ));

    const checkTab_3 = () => {
        if(subcategoryiddata!==''&&title!==''&&price!==''&&area!==''&&listedby!==''&&description!=='') {
            setTab_3(false);
            setErr(false);
        } else {
            setTab_3(true);
        }
    }

    const checkTab_4 = () => {
        if(!tab_3&&city!==''&&latitude!=='' && address!=='') {
            setTab_4(false);
            setErr(false);
        } else {
            setTab_4(true);
        }
    }

    const goTo = (tab,tabName) => {
        console.log(latitude,longitude);
        if(!tab) {
            setActiveKey(tabName);
            setErr(false);
        } else {
            setErr(true);
        }
    }

    useEffect(() => {
        checkTab_3();
    },[subcategoryiddata,title,price,area,listedby,description]);

    useEffect(() => {
        checkTab_4();
    },[tab_3,city,latitude,address]);

    const removeImg = (i) =>{
        files.splice(i, 1);         
        //console.log(files)
    }

    React.useEffect(() => {
        callCategoryapi();
        calllocationsapi();
        setS(false);
      }, [center]);

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onSubmit = (e) =>{
        e.preventDefault();

        if(isLoggedIn && loginuserId !== null){
            if(title === ''){
                setValidations({title:true})
            }else if(subcategoryiddata === ''){
                setValidations({subcategoryiddata:true})
            }else if(city === ''){
                setValidations({city:true})
            }else if(latitude === '' || longitude === ''){
                setValidations({latitude:true})
                setValidations({longitude:true})
            }else if(address === ''){
                setValidations({address:true})
            }else if(price === ''){
                setValidations({price:true})
            }else if(area === ''){
                setValidations({area:true})
            }else if(listedby === ''){
                setValidations({listedby:true})
            }else if(description === ''){
                setValidations({description:true})
            }else if(files.length === 0){
                setValidations({files:true})
                setErr(true);
            }else{
                setValidations({
                   title:false,
                   subcategoryiddata:false,
                   latitude:false,
                   longitude:false,
                   address:false,
                   price:false,
                   area:false,
                   listedby:false,
                   description:false,
                   files:false,
                })
                setUploadingmsg(true)
                var postData = {
                    added_user_id:loginuserId,
                    title:title,
                    item_type_id:posttype,
                    cat_id:categoryiddata,
                    sub_cat_id:subcategoryiddata,
                    description:description,
                    price:price,
                    area:area,
                    area_type:areatype,
                    listed_by:listedby,
                    lat:latitude,
                    lng:longitude,
                    item_location_id:city,
                    address:address,
                    length:length,
                    breadth:breadth,
                    facing:facing,
                    rera_id:reraId,
                    lp_number:lpNumber,
                    plot_type:plotType,
                    price_SqYard:priceperSqYard,
                    map_layout_id: layoutId,
                    is_bank_approval: Bank,
                    is_dtcp: DTCP,
                    is_hmda: HMDA,
                    is_rera_approved: Rera,
                };
                //console.log(postData);
                //dispatch(fetchUserItemUploadData(postData));
                //JSON.stringify(postData)
                fetch(process.env.REACT_APP_API_URL+"items/add/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/", {
                    method: 'POST',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }, 
                    body: JSON.stringify(postData)
                  })
                  .then(response => response.json())
                  .then(data => {if(data.id != ''){uploadimages(data.id)}else{alert("something went wrong please try again.")}} )
                  .catch(error => console.log(error)); 
            }            
        }else{
            alert('Please Login first.')
        }
    }

    const uploadimages = (itemid) =>{ 
        console.log(itemid);
        console.log(files);

        for (let i = 0; i < files.length; i++) {   
         const formData = new FormData();  
          formData.append("file", files[i]);
          formData.append("item_id", itemid);
          axios.post(process.env.REACT_APP_API_URL+'images/upload_item/api_key/'+process.env.REACT_APP_API_SECURITY_KEY+"/", formData
          ).then(res=>
            {
              if (res.status === 200) {
                  setUploadingmsg(false) 
                  setUploadingmsgstatus(true) 
              }else{
                setUploadmsg('Some Images are not uploaded check from mylistings')  
              }
            }
          );
        }
    }

    const callCategoryapi = () =>{
        fetch(process.env.REACT_APP_API_URL+"categories/get/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/")
        .then(response => response.json())
        .then(data =>	setCategories(data))
        .catch(error => console.log(error));
    }

    const calllocationsapi = () =>{
        fetch(process.env.REACT_APP_API_URL+"itemlocations/get/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/")
        .then(response => response.json())
        .then(data =>	setLocations(data))
        .catch(error => console.log(error));
    }

    const callSubategoryapi = (e) => {
        setCategoryiddata(e.target.value)
        fetch(process.env.REACT_APP_API_URL+"subcategories/get/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/cat_id/"+e.target.value+"/")
        .then(response => response.json())
        .then(data =>	setSubcategories(data))
        .catch(error => console.log(error));
    }

    const selectCity = (e) =>{
      setCity(e.target.value)
      if(e.target.value === 'itm_loca7b66748e03d457e976ca63a50e1bde0'){
        setCenter({ lat: 17.385000, lng: 78.486702 })
      }
      if(e.target.value === 'itm_loc32db8931aaf39e3dfb5c388799109d5b'){
          setCenter({ lat: 12.971600, lng: 77.594597 })
      }

      if(e.target.value === 'itm_loc247387cc3640d1a88f3d9342d216dc13'){
          setCenter({ lat: 13.082700, lng: 80.270699 })
      }

      if(e.target.value === 'itm_locc91e7fd5ffc739b26951228b0a564569'){
        setCenter({ lat: 17.968901, lng: 79.594101 })
      }
      if(e.target.value === 'itm_loc0da9dce069f1f834f38f262ecc57ffd1'){
        setCenter({ lat: 18.871401, lng: 79.444298 }) 
      }
      if(e.target.value === 'itm_loc892e3dbe2fbf07ae7b19455a4e75b28c'){
        setCenter({ lat: 18.438601, lng: 79.128799 })  
      }
      setS(true);
    }

    const getlatlngdata = (data) =>{
        setLatitude(data.lat)
        setLongitude(data.lng)
    }

    const getAddressdata  = (data)=>{
        setAddress(data)
        console.log(data)
    }
    return (
        <div className="section" style={{backgroundColor: "rgb(249,248,249)"}}>
            <div className="container"> 
                <div className="row">
                    <Tab.Container activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                        {/* Tabs Start */}
                        <div className="col-md-3 mb-30">
                            <div className="sticky-top shadow-submit">
                                <div className="candidate-info">
                                    <ul>
                                        <Nav>
                                            <li className="candidate-submit-option" style={{width:"100%",marginTop:'0px'}}><Nav.Item>
                                                <Nav.Link eventKey="tab1"><InfoIcon style={{marginRight: "20px"}} />Basic Information</Nav.Link>
                                            </Nav.Item></li>
                                            <li className="candidate-submit-option" style={{width:"100%",marginTop:'0px'}} onClick={() => {
                                                if(tab_3) setErr(true);
                                            }}><Nav.Item>
                                                <Nav.Link disabled={tab_3} eventKey="tab3"><GpsFixedIcon style={{marginRight: "20px"}}/>Location</Nav.Link>
                                            </Nav.Item></li>
                                            {/* <li className="candidate-submit-option" style={{width:"100%",marginTop:'0px'}}><Nav.Item>
                                                <Nav.Link eventKey="tab5">Details</Nav.Link>
                                            </Nav.Item></li> */}
                                            <li className="candidate-submit-option" style={{width:"100%",marginTop:'0px'}} onClick={() => {
                                                if(tab_4) setErr(true);
                                            }}><Nav.Item>
                                                <Nav.Link disabled={tab_4} eventKey="tab4"><AppsIcon style={{marginRight: "20px"}}/>Features</Nav.Link>
                                            </Nav.Item></li>
                                            <li className="candidate-submit-option" style={{width:"100%",marginTop:'0px'}} onClick={() => {
                                                if(tab_4) setErr(true);
                                            }}><Nav.Item>
                                                <Nav.Link disabled={tab_4} eventKey="tab2"><PhotoLibraryIcon style={{marginRight: "20px"}}/>Gallery</Nav.Link>
                                            </Nav.Item></li>
                                        </Nav>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Tabs End */}
                        {/* Tab Content Start */}
                        <div className="col-md-9">
                            <form style={{borderRadius: "5px",overflow: "hidden"}} className="shadow-submit"  id="submit-listing" onSubmit={onSubmit}>
                                <Tab.Content className="m-0">
                                    <Tab.Pane eventKey="tab1">
                                    <div className="job-bx job-profile">
                                            <div className="job-bx-title clearfix">
                                                <h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
                                                <Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link>
                                            </div>


                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Property Title<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <input type="text" className="form-control" placeholder="Property Title" value={title} onChange={e =>setTitle(e.target.value)} />
                                            </div>
                                            {/* <div className="col-md-6 form-group">
                                                <label>Category</label>
                                                <select className="form-control"  onChange={e => callSubategoryapi(e)} required>
                                                    <option value="">Select Category Type</option>
                                                    {categories.map(category => (<option value={category.cat_id}>{category.cat_name}</option>))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Subcategory</label>
                                                <select className="form-control"  onChange={e =>setSubcategoryiddata(e.target.value)} required>
                                                    <option value="">Select Subcategory Type</option>
                                                    {subcategories.map(subcategory => (<option value={subcategory.id}>{subcategory.name}</option>))}
                                                </select>
                                            </div> */}
                                            <div className="col-md-6 form-group">
                                                <label>Subcategory<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <div className="form-control">
                                                <select 
                                                className="Content_arrow_spacing"  
                                                onChange={e =>{setSubcategoryiddata(e.target.value);}} >
                                                    <option value="">Select Subcategory Type</option>
                                                    <option value="subcat005e166e76bfc175d52242279dadc597">Land/Plots</option>
                                                </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Price<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <input type="number" className="form-control" placeholder="Enter Price" value={price} onChange={e =>setPrice(e.target.value)}  />
                                            </div>
                                            <div className="col-md-4 form-group">
                                            <label>Plot Area<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" name="Plot_Area" placeholder="Plot Area" value={area} onChange={e =>setArea(e.target.value)}  />
                                                    <div class="input-group-append">
                                                        <select className="input-group-text" name="type" onChange={e =>setAreatype(e.target.value)} >
                                                            <option value="Acres">Acres</option> 
                                                            <option value="Sq.Ft">Sq.Ft</option> 
                                                            <option value="Sq.Mt">Sq.Mt</option> 
                                                            <option value="Sq.Yds">Sq.Yds</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label>Listed By<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <select className="form-control" name="type"  onChange={e =>setListedby(e.target.value)}>
                                                    <option value="">Select Listed By</option>
                                                    <option value="Dealer">Student</option>
                                                    <option value="Owner">Trainer</option>
                                                    <option value="Builder">Organisation</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Price per (Sq.Yds)</label>
                                                <input type="number" className="form-control" placeholder="Enter Price per (Sq.Yds)" value={priceperSqYard} onChange={e =>setPriceperSqYard(e.target.value)}  />
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Length</label>
                                                <input type="number" className="form-control" placeholder="Enter Length" value={length} onChange={e =>setLength(e.target.value)}  />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label>Breadth</label>
                                                <input type="number" className="form-control" placeholder="Enter Breadth" value={breadth} onChange={e =>setBreadth(e.target.value)}  />
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Facing</label>
                                                <select className="form-control" name="type"  onChange={e =>setFacing(e.target.value)}>
                                                    <option value="">Select Facing</option>
                                                    <option value="east">East</option>
                                                    <option value="west">West</option>
                                                    <option value="north">North</option>
                                                    <option value="south">South</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Plot Type</label>
                                                <select className="form-control" name="type"  onChange={e =>setPlotType(e.target.value)}>
                                                    <option value="">Select Plot Type</option>
                                                    <option value="HMDA">HMDA</option>
                                                    <option value="DTCP">DTCP</option>
                                                    <option value="Open Plot">Open Plot</option>
                                                    <option value="Farm Land">Farm Land</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Rera Id</label>
                                                <input type="text" className="form-control" placeholder="Enter Rera Id" value={reraId} onChange={e =>setReraId(e.target.value)}  />
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>LP Number</label>
                                                <input type="text" className="form-control" placeholder="Enter LP Number" value={lpNumber} onChange={e =>setLpNumber(e.target.value)}  />
                                            </div>

                                            <div className="col-md-12 form-group">
                                                <label>Property Description<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <textarea name="content" rows={4} className="form-control" placeholder="Property Description" onChange={e =>setDescription(e.target.value)}  />
                                            </div>
                                            {/* <div className="col-md-6 form-group">
                                                <label>Subcategory</label>
                                                <select className="form-control"  onChange={e =>setSubcategoryiddata(e.target.value)} >
                                                    <option value="">Select Subcategory Type</option>
                                                    <option value="subcat005e166e76bfc175d52242279dadc597">Land/Plots</option>
                                                </select>
                                            </div> */}
                                            {/*
                                            <div className="col-md-6">
                                                <label>Property Type</label>
                                                <select className="form-control" name="type">
                                                    <option value="House">House</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Condo">Condo</option>
                                                    <option value="Townhome">Townhome</option>
                                                    <option value="Villa">Villa</option>
                                                    <option value="Duplex">Duplex</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Price</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">$</span>
                                                    </div>
                                                    <input type="text" className="form-control" name="price" placeholder="Property Price" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Rental Period</label>
                                                <select className="form-control" name="period">
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Space (Sqft)</label>
                                                <input type="text" className="form-control" placeholder="Property Space (Sqft)" name="space" />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label>Property Video</label>
                                                <input type="text" className="form-control" placeholder="Property Video URL" name="video" />
                                            </div>
                                            */}
                                            <div className="col-md-12 form-group">
                                                <div className="btn-custom" onClick={() => goTo(tab_3,"tab3")}>Next</div>
                                                {/* <button onClick={() => console.log("gg")} className="btn-custom">Next</button> */}
                                            </div>
                                                {err && <div className="col-sm-12 form-group"><h5 className="text-danger">Fill all the mandatory fields</h5></div> }
                                            </div>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="tab3">
                                    <div className="job-bx job-profile">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase">Location</h5>
                                            <Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>Select City<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <div className="form-control">
                                                <select className="Content_arrow_spacing" 
                                                name="city" 
                                                onChange={selectCity} >
                                                    <option value="itm_loca7b66748e03d457e976ca63a50e1bde0">Hyderabad</option>
                                                    <option value="itm_loc32db8931aaf39e3dfb5c388799109d5b">Bengaluru</option>
                                                    <option value="itm_loc247387cc3640d1a88f3d9342d216dc13">Chennai</option>
                                                    {/* {locations.map(location => (<option value={location.id}>{location.name}</option>))} */}
                                                </select>
                                                </div>
                                            </div>
                                            <Locationtab  center={center} getAddressdata={getAddressdata} getlatlngdata={getlatlngdata} changecenter = {s} getlayoutid={id=>setLayoutId(id)}/>
                                            <div className="col-md-12 form-group">
                                                    <div className="btn-custom" onClick={() => goTo(tab_1,"tab1")}>Back</div>
                                                    <div className="btn-custom ml-10" onClick={() => goTo(tab_4,"tab4")}>Next</div>
                                                
                                                    {/* <button onClick={() => console.log("gg")} className="btn-custom">Back</button>
                                                    <button onClick={() => console.log("gg")} className="btn-custom ml-10">Next</button> */}
                                                </div>
                                            {err && <div className="col-sm-12 form-group"><h5 className="text-danger">Fill all the mandatory fields</h5></div> }
                                        </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab4">
                                    <div className="job-bx job-profile">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase">Features</h5>
                                            <Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-2_5 col-md-4 col-sm-6">
                                                <label className="acr-listing-feature">
                                                <input type="checkbox" value={Bank} onClick={e=>(e.target.checked?setBank("1"):setBank("0")) } />
                                                <i className="acr-feature-check fas fa-check" />
                                                <i className="acr-listing-feature-icon flaticon-company" />
                                                Bank Approved
                                                </label>
                                            </div>
                                            <div className="col-lg-2_5 col-md-4 col-sm-6">
                                                <label className="acr-listing-feature">
                                                <input type="checkbox" value={DTCP} onClick={e=>(e.target.checked?setDTCP("1"):setDTCP("0")) } />
                                                <i className="acr-feature-check fas fa-check" />
                                                <i className="acr-listing-feature-icon flaticon-company" />
                                                DTCP Approved
                                                </label>
                                            </div>
                                            <div className="col-lg-2_5 col-md-4 col-sm-6">
                                                <label className="acr-listing-feature">
                                                <input type="checkbox" value={HMDA} onClick={e=>(e.target.checked?setHMDA("1"):setHMDA("0")) } />
                                                <i className="acr-feature-check fas fa-check" />
                                                <i className="acr-listing-feature-icon flaticon-company" />
                                                HMDA Approved
                                                </label>
                                            </div>
                                            <div className="col-lg-2_5 col-md-4 col-sm-6">
                                                <label className="acr-listing-feature">
                                                <input type="checkbox" value={Rera} onClick={e=>(e.target.checked?setRera("1"):setRera("0")) } />
                                                <i className="acr-feature-check fas fa-check" />
                                                <i className="acr-listing-feature-icon flaticon-company" />
                                                RERA Approved
                                                </label>
                                            </div>
                                            <div className="mt-20 col-md-12 form-group">
                                                    <div className="btn-custom" onClick={() => goTo(tab_3,"tab3")}>Back</div>
                                                    <div className="btn-custom ml-10" onClick={() => goTo(tab_4,"tab2")}>Next</div>
                                                    {/* <button onClick={() => console.log("gg")} className="btn-custom">Back</button>
                                                    <button onClick={() => console.log("gg")} className="btn-custom ml-10">Next</button> */}
                                                </div>
                                            {err && <div className="col-sm-12 form-group"><h5 className="text-danger">Fill all the mandatory fields</h5></div> }
                                        </div>
                                    </div>
                                      
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab5">
                                        <div className="row">
                                            <div className="col-md-4 form-group">
                                                <label>Price</label>
                                                <input type="number" className="form-control" placeholder="Enter Price" value={price} onChange={e =>setPrice(e.target.value)}  />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label>Plot Area</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" name="Plot_Area" placeholder="Plot Area" value={area} onChange={e =>setArea(e.target.value)}  />
                                                    <div class="input-group-append">
                                                        <select className="input-group-text" name="type" onChange={e =>setAreatype(e.target.value)} >
                                                            <option value="Acres">Acres</option> 
                                                            <option value="Sq.Ft">Sq.Ft</option> 
                                                            <option value="Sq.Mt">Sq.Mt</option> 
                                                            <option value="Sq.Yds">Sq.Yds</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label> Listed By</label>
                                                <select className="form-control" name="type"  onChange={e =>setListedby(e.target.value)}>
                                                    <option value="">Select Listed By</option>
                                                    <option value="Owner">Owner</option>
                                                    <option value="Dealer">Dealer</option>
                                                    <option value="Builder">Builder</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Price per (Sq.Yds)</label>
                                                <input type="number" className="form-control" placeholder="Enter Price per (Sq.Yds)" value={priceperSqYard} onChange={e =>setPriceperSqYard(e.target.value)}  />
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Length</label>
                                                <input type="number" className="form-control" placeholder="Enter Length" value={length} onChange={e =>setLength(e.target.value)}  />
                                            </div>
                                            <div className="col-md-4 form-group">
                                                <label>Breadth</label>
                                                <input type="number" className="form-control" placeholder="Enter Breadth" value={breadth} onChange={e =>setBreadth(e.target.value)}  />
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Facing</label>
                                                <select className="form-control" name="type"  onChange={e =>setFacing(e.target.value)}>
                                                    <option value="">Select Facing</option>
                                                    <option value="east">East</option>
                                                    <option value="west">West</option>
                                                    <option value="north">North</option>
                                                    <option value="south">South</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Plot Type</label>
                                                <select className="form-control" name="type"  onChange={e =>setPlotType(e.target.value)}>
                                                    <option value="">Select Plot Type</option>
                                                    <option value="HMDA">HMDA</option>
                                                    <option value="DTCP">DTCP</option>
                                                    <option value="Open Plot">Open Plot</option>
                                                    <option value="Farm Land">Farm Land</option>
                                                </select>
                                            </div>

                                            <div className="col-md-4 form-group">
                                                <label>Rera Id</label>
                                                <input type="text" className="form-control" placeholder="Enter Rera Id" value={reraId} onChange={e =>setReraId(e.target.value)}  />
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>LP Number</label>
                                                <input type="text" className="form-control" placeholder="Enter LP Number" value={lpNumber} onChange={e =>setLpNumber(e.target.value)}  />
                                            </div>

                                            <div className="col-md-12 form-group">
                                                <label>Property Description</label>
                                                <textarea name="content" rows={4} className="form-control" placeholder="Property Description" onChange={e =>setDescription(e.target.value)}  />
                                            </div>
                                            {/*
                                            <div className="col-md-6 form-group">
                                                <label>Bathrooms</label>
                                                <input type="text" className="form-control" placeholder="Number of Bathrooms" name="baths" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Condition</label>
                                                <input type="text" className="form-control" placeholder="Property Condition" name="condition" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Year Built</label>
                                                <input type="text" className="form-control" placeholder="Property Year Built" name="built" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Neighborhood</label>
                                                <input type="text" className="form-control" placeholder="Property Neighborhood" name="neighborhood" />
                                            </div>
                                            */}
                                        </div>
                                        {/*
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="termsAndConditions" />
                                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the terms &amp; Conditions of Property Submission</label>
                                            </div>
                                        </div>
                                        */}
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
												<h5 className="font-weight-700 pull-left text-uppercase">Details</h5>
												<Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link>
											</div>

                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Property Gallery<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <div className="dropzone-msg dz-message needsclick">
                                                        <i className="fas fa-cloud-upload-alt" />
                                                        <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                                        {/* <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span> */}
                                                    </div>
                                                </div>
                                                <aside className="thumbsContainer">
                                                    {thumbs}
                                                </aside>
                                                {/* <span className="acr-form-notice">*You can upload up to 5 images for your listing</span> */}
                                                {/* <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span> */}
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <button type="submit"  className="btn-custom" name="submit">Submit Project</button>
                                                <div className="btn-custom ml-10" onClick={() => goTo(tab_4,"tab4")}>Back</div>
                                            </div>
                                            
                                            {err && <div className="col-sm-12 form-group"><h5 className="text-danger">Fill all the mandatory fields</h5></div> }
                                        </div>
                                        {uploadingmsg ? (<h5 className="text-center text-info">Uploading...</h5>) : null}
                                        {uploadmsgstatus ? (<h5 className="text-center text-success">Uploading Success.</h5>) : null}
                                        
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