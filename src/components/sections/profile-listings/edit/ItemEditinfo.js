import React,{useState, useEffect, useContext, Fragment} from 'react';
//import { useritemsContext } from "../Content";
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom';
import { patchItem } from '../../../../slices/useritems/userItemSlice';
import { fetchItemImagesListData, itemImagesSelectors } from "./../../../../slices/items/itemImagesSlice";
import { imageOverlay } from 'leaflet';
import axios from 'axios';

const Itemdatamodal = (props) => {

//    const {isLoggedIn,setIsLoggedIn,loginuserId} = useContext(useritemsContext);

    const [uploadmsg, setUploadmsg] = useState();
    const [uploadingmsg, setUploadingmsg] = useState(false);
    const [uploadmsgstatus, setUploadingmsgstatus] = useState(false);
    const [loading, setLoading] = useState(false);

    //const [isLoggedin, setIsLoggedin] = useState(true);
    const [loggedinuser, setLoggedinuser] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [itemid, setItemid] = useState(props.item.id);
    const [addedUserId, setAddedUserId] = useState(props.item.added_user_id);
    const [title, setTitle] = useState(props.item.title);
    const [posttype, setPosttype] = useState(props.item.item_type_id);
    const [categoryiddata, setCategoryiddata] = useState(props.item.cat_id);
    const [subcategoryiddata, setSubcategoryiddata] = useState(props.item.sub_cat_id);
    const [description, setDescription] = useState(props.item.description);
    const [price, setPrice] = useState(props.item.price);
    const [area, setArea] = useState(props.item.area);
    const [areatype, setAreatype] = useState(props.item.area_type);
    const [listedby, setListedby] = useState(props.item.listed_by);
    const [latitude, setLatitude] = useState(props.item.lat == 0 ? ('') : (props.item.lat));
    const [longitude, setLongitude] = useState(props.item.lng == 0 ? ('') : (props.item.lng));
    const [city, setCity] = useState(props.item.item_location_id);
    const [address, setAddress] = useState(props.item.address);
    const [length, setLength] = useState(props.item.length);
    const [breadth, setBreadth] = useState(props.item.breadth);
    const [facing, setFacing] = useState(props.item.facing);

    const [rentType, setRentType] = useState(props.item.rent_collection_type);
    const [furnishing,setFurnishing] = useState(props.item.furnishing_id);
    const [itemCondition, setItemCondition] = useState(props.item.condition_of_item_id);
    const [floorNo, setFloorNo] = useState(props.item.floor_no);
    const [totalFloors, setTotalFloors] = useState(props.item.total_floors);
    const [bedrooms, setBedrooms] = useState(props.item.numberofbedrooms);
    const [carParking, setCarParking] = useState(props.item.car_parking);

    const [reraId, setReraId] = useState(props.item.rera_id);//rera_id
    const [lpNumber, setLpNumber] = useState(props.item.lp_number);
    const [plotType, setPlotType] = useState(props.item.plot_type);
    
    const [priceperSqYard, setPriceperSqYard] = useState(props.item.price_SqYard);
    const [files, setFiles] = useState([]);

    const oldimages = useSelector(itemImagesSelectors.selectAll);
    const [deleteimgaction, setDeleteimgaction] = useState(false);
    const [deleteimgid, setDeleteimgid] = useState([]);
    const dispatch = useDispatch()


    useEffect(() => {
      dispatch(fetchItemImagesListData(props.item.id));
      console.log(props.item);
    }, []);


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
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
        <Link className="btn btn-outline-danger" onClick={()=>removeImg(i)} style={uploadmsgstatus ? {display:'none'} : null}><i class="fas fa-trash"></i></Link>
        </>
    ));

    const removeImg = (i) =>{
        files.splice(i, 1);         
        //console.log(files)
    }

//    const [isLoggedin, setIsLoggedin] = useState(true);
//    const dispatch = useDispatch()
//    
//    const onsubmit = (e) =>{
//        e.preventDefault();
//       const id = item.id;
//        if(isLoggedin){
//            var postData = {
//                title:title,
//            };
//           // console.log(postData);
//            dispatch(patchItem(id,postData));           
//        }else{
//            alert('Please Login first.')
//        }
//    }

    const onsubmit = (e) =>{
        e.preventDefault();
        if(oldimages.length === 0 && files.length === 0 ){
            alert('Please upload Images(At least one Image)')
        }else{
            setUploadingmsg(true)
            var postData = {
                id:itemid,
                added_user_id:addedUserId,
                title:title,
                item_type_id:posttype,
                cat_id:categoryiddata,
                sub_cat_id:subcategoryiddata,
                description:description,
                price:price,
                area:area,
                car_parking: carParking,
                area_type:areatype,
                floor_no: floorNo,
                total_floors: totalFloors,
                rent_collection_type: rentType,
                condition_of_item_id: itemCondition,
                listed_by:listedby,
                lat:latitude,
                numberofbedrooms: bedrooms,
                lng:longitude,
                item_location_id:city,
                address:address,
                length:length,
                breadth:breadth,
                furnishing_id: furnishing,
                facing:facing,
                rera_id:reraId,
                lp_number:lpNumber,
                plot_type:plotType,
                price_SqYard:priceperSqYard,
            };
            //console.log(postData);
            //dispatch(fetchUserItemUploadData(postData));
            //setTimeout(() => {
            //    props.formChange()
            //}, 2000);
            JSON.stringify(postData)
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
    }

    const uploadimages = (itemid) =>{

        if(deleteimgaction){
            if(deleteimgid.length > 0){
                deleteOldImgApi()
            }
        }
        
        for (let i = 0; i < files.length; i++) {   
            const formData = new FormData();  
             formData.append("file", files[i]);
             formData.append("item_id", itemid);
             axios.post(process.env.REACT_APP_API_URL+'images/upload_item/api_key/'+process.env.REACT_APP_API_SECURITY_KEY+"/", formData
             ).then(res=>
               {
                 //console.log(res.data);
                 if (res.status === 200) {
                     setUploadingmsg(false) 
                     setUploadingmsgstatus(true) 
                     //setUploadmsg('Upload Success')
                     //alert('Upload Success')
                 }else{
                   setUploadmsg('Some Images are not uploaded check from mylistings')  
                   //alert('Something Went wrong. try again.');
                 }
               }
             );
        }
        if(itemid){
           if(files.length === 0){
            setUploadingmsg(false) 
            setUploadingmsgstatus(true) 
           } 
        }
        props.updateItem()
 
    }

    React.useEffect(() => {
        callSubategoryapi();
        calllocationsapi();
    }, []);

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
    
    const callSubategoryapi = () => {
        fetch(process.env.REACT_APP_API_URL+"subcategories/get/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/cat_id/"+categoryiddata+"/")
        .then(response => response.json())
        .then(data =>	setSubcategories(data))
        .catch(error => console.log(error));
    }

    const deleteOldImgApi = () =>{

        for (let i = 0; i < deleteimgid.length; i++) { 
            var deleteimgData = {'img_id':deleteimgid[i]};
            fetch(process.env.REACT_APP_API_URL+"images/delete_img/api_key/"+process.env.REACT_APP_API_SECURITY_KEY+"/", {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  }, 
                body: JSON.stringify(deleteimgData)
              })
              .then(response => response.json())
              .then(data => {if(data.status === 'success'){console.log(data.message)}else{console.log("something went wrong please try again.")}})
              .catch(error => console.log(error));  
              }
    }

    const removeOldImg = (id, i) =>{
        oldimages.splice(i, 1);
        setDeleteimgaction(true) 
        deleteimgid.push(id)
    }

  return (
    <>
    <div className="Container">
            <form onSubmit={onsubmit}> 
                <div className="row ">
                    <div className="col-md-12 form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Property Title" name="name" value={title} onChange={e =>setTitle(e.target.value)}/>
                    </div> 
                    {/* <div className="col-md-4 form-group">
                        <label>Add Type</label>
                        <select className="form-control" value={posttype} onChange={e =>setPosttype(e.target.value)} >
                            <option value="">Select Add Type</option>
                            <option value="1">Buy</option>
                            <option value="4">Sell</option>
                            <option value="2">Rent</option>
                            <option value="3">Lease</option>
                            <option value="5">Post</option>
                            <option value="6">Requirement</option>
                        </select>
                    </div> */}
                    {/* <div className="col-md-4 form-group">
                        <label>Category</label>
                        <select className="form-control"  onChange={e => callSubategoryapi(e)}>
                            <option value="">Select Category Type</option>
                            {categories.map(category => (<option value={category.cat_id}>{category.cat_name}</option>))}
                        </select>
                    </div> */}
                    <div className="col-md-4 form-group">
                        {
                            categoryiddata === "catfa070dd5cc2a2c9c6196159f85480ff7" ? (
                                <Fragment>
                                    <label>Subcategory</label>

                                    <select className="form-control"  onChange={e =>setSubcategoryiddata(e.target.value)}>
                                        <option value="">Select Subcategory Type</option>
                                        {subcategoryiddata === 'subcat89d510a83500e9ac2ecec99cd6b26c94' ?
                                        (<option value="subcat89d510a83500e9ac2ecec99cd6b26c94" selected >Apartments</option>): (<option value="subcat89d510a83500e9ac2ecec99cd6b26c94" >Apartments</option>)
                                        }

                                        {subcategoryiddata === 'subcatca64dc358e7737518a68ec88f7e3f99a' ?
                                        (<option value="subcatca64dc358e7737518a68ec88f7e3f99a" selected >Agricultural Land</option>): (<option value="subcatca64dc358e7737518a68ec88f7e3f99a">Agricultural Land</option>)
                                        }

                                        {subcategoryiddata === 'subcata6ca03906a86602a88fc7d9048105c67' ?
                                        (<option value="subcata6ca03906a86602a88fc7d9048105c67" selected >Commercial Plot</option>): (<option value="subcata6ca03906a86602a88fc7d9048105c67">Commercial Plot</option>)
                                        }

                                        {subcategoryiddata === 'subcat435c6e19f9dec97f559116c452cda562' ?
                                        (<option value="subcat435c6e19f9dec97f559116c452cda562" selected >Industrial Land</option>): (<option value="subcat435c6e19f9dec97f559116c452cda562">Industrial Land</option>)
                                        }                            
                                        
                                        {/* {subcategories.map(subcategory => (<option value={subcategory.id}>{subcategory.name}</option>))} */}
                                    </select>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <label>Subcategory</label>
                                    
                                    <select className="form-control"  onChange={e =>setSubcategoryiddata(e.target.value)}>
                                        <option value="">Select Subcategory Type</option>
                                        {subcategoryiddata === 'subcata533742b6f520075afa275fe3da21ce3' ?
                                        (<option value="subcata533742b6f520075afa275fe3da21ce3" selected >Residential Land</option>): (<option value="subcata533742b6f520075afa275fe3da21ce3" >Residential Land</option>)
                                        }

                                        {subcategoryiddata === 'subcat4ddefa6bbd2f86e6a3fa102d83ae1631' ?
                                        (<option value="subcat4ddefa6bbd2f86e6a3fa102d83ae1631" selected >House/Villa</option>): (<option value="subcat4ddefa6bbd2f86e6a3fa102d83ae1631">House/Villa</option>)
                                        }

                                        {subcategoryiddata === 'subcat83e59467ed17dd3c8ce2b22fc1876e2c' ?
                                        (<option value="subcat83e59467ed17dd3c8ce2b22fc1876e2c" selected >Building</option>): (<option value="subcat83e59467ed17dd3c8ce2b22fc1876e2c">Building</option>)
                                        }

                                        {subcategoryiddata === 'subcatc4b6928dd0ba7f1f4ffc5a4588cea59e' ?
                                        (<option value="subcatc4b6928dd0ba7f1f4ffc5a4588cea59e" selected >Others</option>): (<option value="subcatc4b6928dd0ba7f1f4ffc5a4588cea59e">Others</option>)
                                        }                            
                                        
                                        {/* {subcategories.map(subcategory => (<option value={subcategory.id}>{subcategory.name}</option>))} */}
                                    </select>
                                </Fragment>
                            )
                        }
                        
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Property Description</label>
                        <textarea name="content" rows={5} className="form-control" placeholder="Property Description" onChange={e =>setDescription(e.target.value)} />
                    </div>


                    <div className="col-md-4 form-group">
                        <label>Price</label>
                        <input type="text" className="form-control" placeholder="Enter Price" value={price} onChange={e =>setPrice(e.target.value)} />
                    </div>

                    <div className="col-md-4 form-group">
                        <label>Plot Area</label>
                        <div className="input-group">
                            <input type="text" className="form-control" name="Plot_Area" placeholder="Plot Area" value={area} onChange={e =>setArea(e.target.value)}  />
                            <div class="input-group-append">
                                <select className="input-group-text" name="type" onChange={e =>setAreatype(e.target.value)} >
                                    {areatype === 'Acres' ? (<option value="Acres">Acres</option>): (<option value="Acres">Acres</option>)} 
                                    {areatype === 'Sq.Ft' ? (<option value="Sq.Ft">Sq.Ft</option>): (<option value="Sq.Ft">Sq.Ft</option>)} 
                                    {areatype === 'Sq.Mt' ? (<option value="Sq.Mt">Sq.Mt</option>): (<option value="Sq.Mt">Sq.Mt</option>)} 
                                    {areatype === 'Sq.Yds' ? (<option value="Sq.Yds">Sq.Yds</option>): (<option value="Sq.Yds">Sq.Yds</option>)} 
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 form-group">
                        <label> Listed By</label>
                        <select className="form-control" name="type"  onChange={e =>setListedby(e.target.value)}>
                            <option value="">Select Listed By</option>
                            {listedby === 'Owner' ? (<option value="Owner" selected>Owner</option>): (<option value="Owner">Owner</option>)} 
                            {listedby === 'Dealer' ? (<option value="Dealer" selected>Dealer</option>): (<option value="Dealer">Dealer</option>)} 
                            {listedby === 'Builder' ? (<option value="Builder" selected>Builder</option>): (<option value="Builder">Builder</option>)} 
                        </select>
                    </div>

                    <div className="col-md-4 form-group">
                        <label>Facing</label>
                        <div className="form-control">
                        <select className="Content_arrow_spacing" name="type"  onChange={e =>setFacing(e.target.value)}>
                            <option value="">Select Facing</option>
                            {facing === "east" ? <option value="east" selected>East</option> : <option value="east">East</option>}
                            {facing === "west" ? <option value="west" selected>West</option> : <option value="west">West</option>}
                            {facing === "north" ? <option value="north" selected>North</option> : <option value="north">North</option>}
                            {facing === "south" ? <option value="south" selected>South</option> : <option value="south">South</option>}
                            
                        </select>
                        </div>
                    </div>

                    {
                        categoryiddata === "catfa070dd5cc2a2c9c6196159f85480ff7" ? (
                            <Fragment>
                                <div className="col-md-4 form-group">
                                    <label>Price per (Sq.Yds)</label>
                                    <input type="number" className="form-control" placeholder="Enter Price per (Sq.Yards)" value={priceperSqYard} onChange={e =>setPriceperSqYard(e.target.value)}  />
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
                                    <label>Plot Type</label>
                                    <div className="form-control">
                                    <select className="Content_arrow_spacing" name="type"  onChange={e =>setPlotType(e.target.value)}>
                                        <option value="">Select Plot Type</option>
                                        {plotType === "Open Plot" ? <option value="Open Plot" selected>Open Plot</option> : <option value="Open Plot">Open Plot</option>}
                                        {plotType === "Farm Land" ? <option value="Farm Land" selected>Farm Land</option> : <option value="Farm Land">Farm Land</option>}
                                        {/* <option value="HMDA">HMDA</option>
                                        <option value="DTCP">DTCP</option> */}
                                    </select>
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <label>Rera Id</label>
                                    <input type="text" className="form-control" placeholder="Enter Rera Id" value={reraId} onChange={e =>setReraId(e.target.value)}  />
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>LP Number</label>
                                    <input type="text" className="form-control" placeholder="Enter LP Number" value={lpNumber} onChange={e =>setLpNumber(e.target.value)}  />
                                </div>


                            </Fragment>
                        ) : (
                            <Fragment>
                                <div className="col-md-4 form-group">
                                <label>Furnishing</label>
                                    <div className="form-control">
                                        <select className="Content_arrow_spacing" name="type"  onChange={e =>setFurnishing(e.target.value)}>
                                            
                                            <option value="">Select Furnishing</option>
                                            {furnishing === "fur_26d602a6b84f799c487eafb604d4260a" ? <option value="fur_26d602a6b84f799c487eafb604d4260a" selected>Furnished</option> :<option value="fur_26d602a6b84f799c487eafb604d4260a">Furnished</option>}
                                            {furnishing === "fur_6b24b00443f4a2a8c96ffc282faaa457" ? <option value="fur_6b24b00443f4a2a8c96ffc282faaa457" selected>Semi-furnished</option> :<option value="fur_6b24b00443f4a2a8c96ffc282faaa457">Semi-furnished</option>}
                                            {furnishing === "fur_9fb1ee9824da0192ff19b4d99a4a83b8" ? <option value="fur_9fb1ee9824da0192ff19b4d99a4a83b8" selected>Unfurnished</option> :<option value="fur_9fb1ee9824da0192ff19b4d99a4a83b8">Unfurnished</option>}
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>Floor No</label>
                                    <input type="number" className="form-control" placeholder="Enter Floor No" value={floorNo} onChange={e =>setFloorNo(e.target.value)}  />
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>Total Floors</label>
                                    <input type="number" className="form-control" placeholder="Enter Total Floors" value={totalFloors} onChange={e =>setTotalFloors(e.target.value)}  />
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>House Type</label>
                                    <div className="form-control">
                                    <select className="Content_arrow_spacing" name="type"  onChange={e => setBedrooms(e.target.value)}>
                                        <option value="">Select House Type</option>
                                        { bedrooms==="1" ? (<option value={1} selected>1 BHK</option>) : (<option value={1}>1 BHK</option>)}
                                        { bedrooms==="2" ? (<option value={2} selected>2 BHK</option>) : (<option value={2}>2 BHK</option>)}
                                        { bedrooms==="3" ? (<option value={3} selected>3 BHK</option>) : (<option value={3}>3 BHK</option>)}
                                        { bedrooms==="4" ? (<option value={4} selected>4 BHK</option>) : (<option value={4}>4 BHK</option>)}
                                        { bedrooms==="5" ? (<option value={5} selected>5 BHK</option>) : (<option value={5}>5 BHK</option>)}
                                    </select>
                                    </div>
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>Rent collection type</label>
                                    <div className="form-control">
                                    <select className="Content_arrow_spacing" name="type"  onChange={e =>setRentType(e.target.value)}>
                                        {/* <option value="">Select Rent collection type</option> */}
                                        {/* <option value="day">Day</option> */}
                                        <option value="month">Month</option>
                                        {/* <option value="year">Year</option> */}
                                    </select>
                                    </div>
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>Condition of item</label>
                                    <div className="form-control">
                                    <select className="Content_arrow_spacing" name="type"  onChange={e =>setItemCondition(e.target.value)}>
                                        <option value="">Select Condition of item</option>
                                        {itemCondition === "1" ? <option value="1" selected>New</option> : <option value="1">New</option>}
                                        {itemCondition === "2" ? <option value="2" selected>Old</option> : <option value="2">Old</option>}
                                        {itemCondition === "3" ? <option value="3" selected>Ready To Move</option> : <option value="3">Ready To Move</option>}
                                        {itemCondition === "4" ? <option value="4" selected>Under Construction</option> : <option value="4">Under Construction</option>}
                                    </select>
                                    </div>
                                </div>

                                <div className="col-md-4 form-group">
                                    <label>Car Parking</label>
                                    <input type="number" className="form-control" placeholder="Enter Car Parking" value={carParking} onChange={e =>setCarParking(e.target.value)}  />
                                </div>

                                
                            </Fragment>
                        )
                    }

                    

                    {/*
                    <div className="col-md-6 form-group">
                        <label>Length</label>
                        <input type="text" className="form-control" placeholder="Length" onChange={e =>setTitle(e.target.value)} />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Breadth</label>
                        <input type="text" className="form-control" placeholder="Breadth" onChange={e =>setTitle(e.target.value)}  />
                    </div>
                    */}
                    {/* <div className="col-md-4 form-group">
                        <label>Latitude</label>
                        <input type="text" className="form-control" placeholder="Latitude" value={latitude} onChange={e =>setLatitude(e.target.value)}  />
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Longitude</label>
                        <input type="text" className="form-control" placeholder="Longitude" value={longitude} onChange={e =>setLongitude(e.target.value)}  />
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Select City</label>
                        <select className="form-control" name="city" onChange={e =>setCity(e.target.value)}>
                            <option value="">Select City Type</option>
                            {locations.map(location => (<option value={location.id}>{location.name}</option>))}
                        </select>
                    </div> */}
                    <div className="col-md-12 form-group">
                        <label>Property Address</label>
                        <textarea name="content" rows={5} className="form-control" placeholder="Enter Property Address" value={address} onChange={e =>setAddress(e.target.value)} />
                    </div>
                    <div className="col-md-12 form-group">
                        {oldimages.map((img, i) => (
                            <>
                            <img src={process.env.REACT_APP_BASE_URL+'/uploads/'+img.img_path} alt="img" className="img-thumbnail m-1" style={{height:'100px'}} />
                            <Link className="btn btn-outline-danger" onClick={()=>removeOldImg(img.img_id, i)}><i class="fas fa-trash"></i></Link>
                            </>
                        ))}
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Property Gallery</label>
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                <span className="dropzone-msg-desc">This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.</span>
                            </div>
                        </div>
                        <aside className="thumbsContainer">
                            {thumbs}
                        </aside>
                    </div>

                    {/*}
                    <div className="col-md-6 form-group">
                        <label>Select State</label>
                        <select className="form-control" name="state">
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Telangana">Telangana</option>
                        </select>
                    </div>
                    */}
 
                    <div className="mx-3">
                        <button type="submit"  className="btn-custom" name="submit">Update</button>
                        {uploadingmsg ? (<h5 className="text-center text-info">Updating...</h5>) : null}
                        {uploadmsgstatus ? (<h5 className="text-center text-success">Updating Success.</h5>) : null}
                    </div>
                </div>
            </form>
        </div>
    </>
  );
};

export default Itemdatamodal;

