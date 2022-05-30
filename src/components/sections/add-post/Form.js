import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserItemUploadData, itemUploadSelectors } from "./../../../slices/useritems/itemAddSlice";
import { uploaditemImagesData, itemImagesuploadSelectors } from "./../../../slices/useritems/imagesUploadSlice";


function Form(props) {
    //const locationslist = useSelector((state) => state.fetchLocationsData);
    const uploadeditemdata = useSelector(itemUploadSelectors.selectAll);

    const [uploadmsg, setUploadmsg] = useState();
    const [uploadmsgstatus, setUploadingmsgstatus] = useState(false);
    const [loading, setLoading] = useState(false);

    const [isLoggedin, setIsLoggedin] = useState(true);
    const [loggedinuser, setLoggedinuser] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [locations, setLocations] = useState([]);

    const [title, setTitle] = useState('');
    const [posttype, setPosttype] = useState('');
    const [categoryiddata, setCategoryiddata] = useState('');
    const [subcategoryiddata, setSubcategoryiddata] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [areatype, setAreatype] = useState('');
    const [listedby, setListedby] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');

    const dispatch = useDispatch()


    const onsubmit = (e) =>{
        e.preventDefault();
        if(isLoggedin){
            setLoading(true)
            var postData = {
                id:'',
                added_user_id:'usrfbceafda0e2617e6152cf48a8013d9e2',
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
            };
            console.log(postData);
            dispatch(fetchUserItemUploadData(postData));
            setTimeout(() => {
                props.formChange()
            }, 2000);
            //JSON.stringify(postData)
//            fetch("https://api.test.takengo.risee.in/index.php/rest/items/add/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/ ", {
//                method: 'POST',
//                headers:{
//                    Accept: 'application/json',
//                    'Content-Type': 'application/json'
//                  }, 
//                body: JSON.stringify(postData)
//              })
//              .then(response => response.json())
//              .then(data => {if(data.id != ''){uploadimages(data.id)}else{alert("something went wrong please try again.")}} )
//              .catch(error => console.log(error));             
        }else{
            alert('Please Login first.')
        }
    }

//    const uploadimages = (itemid) =>{ 
//        console.log(itemid);
//        console.log(files);
//
//        for (let i = 0; i < files.length; i++) {   
//         const formData = new FormData();  
//          formData.append("file", files[i]);
//          formData.append("item_id", itemid);
//          axios.post('https://api.test.takengo.risee.in/index.php/rest/images/upload_item/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/', formData
//          ).then(res=>
//            {
//              //console.log(res.data);
//              if (res.status === 200) {
//                  setUploadingmsg(false) 
//                  setUploadingmsgstatus(true) 
//                  //setUploadmsg('Upload Success')
//                  //alert('Upload Success')
//              }else{
//                setUploadmsg('Some Images are not uploaded check from mylistings')  
//                //alert('Something Went wrong. try again.');
//              }
//            }
//          );
//        }
//
//    }


    React.useEffect(() => {
        callCategoryapi();
        calllocationsapi();
     }, []);
       

//      const checklogin = () =>{
//        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
//        {
//            //loginuserinfo != null && loginuserinfo.loginstatus != null ? 
//            //setuserinfo() :  this.setState({ isLoggedin: false })
//        }
//      }

//    const setuserinfo = () =>{
//        var loginuserinfo = JSON.parse(localStorage.getItem('userlogin'));
//        setIsLoggedin(loginuserinfo.loginstatus)
//        setLoggedinuser(loginuserinfo.loginuser)
//    }



    const callCategoryapi = () =>{
        fetch("https://api.test.takengo.risee.in/index.php/rest/categories/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/")
        .then(response => response.json())
        .then(data =>	setCategories(data))
        .catch(error => console.log(error));
    }

    const calllocationsapi = () =>{
        fetch("https://api.test.takengo.risee.in/index.php/rest/itemlocations/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/")
        .then(response => response.json())
        .then(data =>	setLocations(data))
        .catch(error => console.log(error));
    }

    const callSubategoryapi = (e) => {
        setCategoryiddata(e.target.value)
        fetch("https://api.test.takengo.risee.in/index.php/rest/subcategories/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/cat_id/"+e.target.value+"/")
        .then(response => response.json())
        .then(data =>	setSubcategories(data))
        .catch(error => console.log(error));
    }
    
    return (

            <form onSubmit={onsubmit}>   
                <div className="row ">
                    <div className="col-md-12 form-group">
                        <label>Property Title</label>
                        <input type="text" className="form-control" placeholder="Property Title" name="name" value={title} onChange={e =>setTitle(e.target.value)}/>
                    </div> 
                    <div className="col-md-4 form-group">
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
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Category</label>
                        <select className="form-control"  onChange={e => callSubategoryapi(e)}>
                            <option value="">Select Category Type</option>
                            {categories.map(category => (<option value={category.cat_id}>{category.cat_name}</option>))}
                        </select>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Subcategory</label>
                        <select className="form-control"  onChange={e =>setSubcategoryiddata(e.target.value)}>
                            <option value="">Select Subcategory Type</option>
                            {subcategories.map(subcategory => (<option value={subcategory.id}>{subcategory.name}</option>))}
                        </select>
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
                            <option value="Dealer">Student</option>
                            <option value="Owner">Trainer</option>
                            <option value="Builder">Organisation</option>
                        </select>
                    </div>
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
                    <div className="col-md-4 form-group">
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
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Property Address</label>
                        <textarea name="content" rows={5} className="form-control" placeholder="Enter Property Address" value={address} onChange={e =>setAddress(e.target.value)} />
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
                        {loading ? null : (<button type="submit"  className="btn-custom" name="submit">Next </button>)}
                        {loading ? (<h5 className="text-center text-info">Loading...</h5>) : null}
                        {uploadmsgstatus ? (<h5 className="text-center text-success">Uploading Success.</h5>) : null}
                    </div>
                </div>
            </form>
 
    );
}

export default Form;