import React,{useState, useEffect, useContext, Fragment} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { UserContext } from "./../../../context/LoginContext"
import { useDropzone } from 'react-dropzone';
import '../../../assets/css/style.css'
import 'react-responsive-modal/styles.css';
import './profile.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchloginuserListData, loginuserSelectors } from "./../../../slices/userprofile/loginuserdataSlice";
import CancelIcon from '@material-ui/icons/Cancel';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import verifyloading from "./verifyloading.gif";

const Editprofile = (props) => {

    const {isLoggedIn,
           loginuserId,
           updateLoginUserData,
           loading,
           setLoading,
           successMsg, 
           setSuccessMsg,
           errormsg, 
           setErrormsg,
           userVerification,
           csrfToken,
           setCsrfToken,
           verifyMsg,
		   setVerifyMsg
        } = useContext(UserContext);

    const [open, setOpen] = React.useState(false);
    //const [item, seItemid] = React.useState(props.item);
    const userData = useSelector(loginuserSelectors.selectAll);
    const dispatch = useDispatch();


    //const [isLoggedin, setIsLoggedin] = useState(false);
    const [user_name, setUser_name] = useState(props.userData.user_name);
    const [unique_name, setUnique_name] = useState(props.userData.unique_link);
    const [user_email, setUser_email] = useState(props.userData.user_email);
    const [user_whatsapp_number, setUser_whatsapp_number] = useState(props.userData.user_whatsapp_number);
    const [user_phone, setUser_phone] = useState(props.userData.user_phone);
    const [city, setCity] = useState(props.userData.city);
    const [user_address, setUser_address] = useState(props.userData.user_address);
    const [listing_by, setListing_by] = useState(props.userData.listing_by);
    const [verify,setVerify] = useState(false);
    const [verifyFile,setVerifyFile] = useState(props.userData.is_verification_file);
    const [proofType,setProofType] = useState("");
    const [files, setFiles] = useState([]);
    const [emailverifyloading,setEmailverifyloading] = useState(false);

    const [csrfFlag,setCsrfFlag] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            acceptedFiles = files.concat(acceptedFiles);
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
        <Link style={{height: "100px"}} className="btn btn-outline-danger" onClick={()=>removeImg(i)}><i class="fas fa-trash"></i></Link>
        </>
    ));

    const removeImg = (i) =>{
        files.splice(i, 1);         
        //console.log(files)
    }


    useEffect(() => {
        setLoading(false)
        setSuccessMsg(false)
        setErrormsg(false)

      },[]);

      useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const onSubmit = (e) =>{
        e.preventDefault();

        const email_valid = /^([a-zA-Z0-9_\.\-])+\@gmail\.com$/;
        var whatsapp_Num_valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
        // const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!email_valid.test(user_email)) {
          return alert("Enter vaild Email")
        }
        
        if(user_whatsapp_number !== ''){
            if(user_whatsapp_number.substring(0,3) === "+91"){
                var whatsapp_number = user_whatsapp_number.substring(3);
                if (!whatsapp_Num_valid.test(whatsapp_number)) {
                    return alert("Enter vaild Whats App Number")
                }
            }else{
                if (!whatsapp_Num_valid.test(user_whatsapp_number)) {
                    return alert("Enter vaild Whats App Number")
                }
            }
        }

        if(isLoggedIn){
            setSuccessMsg(false)
            setErrormsg(false)
            setLoading(true)
            var formData = {
                user_name:user_name,
                unique_link:unique_name,
                user_email:user_email,
                user_whatsapp_number:user_whatsapp_number,
                user_phone:user_phone,
                city:city,
                user_address:user_address,
                listing_by:listing_by
            };
            updateLoginUserData(formData)
//            fetch("https://api.test.takengo.risee.in/index.php/rest/users/profile_update/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/ ", {
//                method: 'POST',
//                headers:{
//                    Accept: 'application/json',
//                    'Content-Type': 'application/json'
//                  }, 
//                body: JSON.stringify(formData)
//              })
//              .then(response => response.json())
//              .then(data => successMsg(data) )
//              .catch(error => console.log(error));  
        }else{
            alert('Please Login first.')
        }
    }

    const onSubmitVerify = (e) =>{
        e.preventDefault();
        if(isLoggedIn) {
            if(verifyFile === "1") {
                alert("Proof already submitted.");
            }
            else if(files.length === 0) {
                setErrormsg(true);
            }
            else if(proofType === "") {
                setErrormsg(true);
            }
            else {
                setVerifyFile("1");
                setSuccessMsg(false);
                setErrormsg(false);
                setLoading(true);
                var formData = new FormData();
                formData.append("user_id",props.userData.user_id);
                formData.append("proof_type", proofType);
                formData.append("file",files[0]);
                console.log(formData);
                setFiles([]);
                setProofType("");
                userVerification(formData);
            }
        } else {
            alert('Please Login first.');
        }
    }

    const emailVerifyCall = async(id)=>{
        if(id){
            setEmailverifyloading(true)
            var formData = {
                user_id:id,
            };
            await fetch("https://api.prod.online.risee.in/index.php/rest/users/email_verification/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/", {
                    method: 'POST',
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      }, 
                    body: JSON.stringify(formData)
                  })
                  .then(response => response.json())
                  .then(data => {
                      if(data.status === "success"){
                        setEmailverifyloading(false)  
                        alert("Email verification link has been send successfully")
                      }else{
                        setEmailverifyloading(false)  
                        alert("Something went wrong plz try Again later.")
                      }
                  } )
                  .catch(error => {
                      setEmailverifyloading(false)
                      alert("Something went wrong plz try Again later.")
                    }); 
        }
    }

    // const loadCsrfToken = async () => {
    //     const domainURL = "http://localhost:5000";
    //     const response = await fetch(`${domainURL}/form`,{
    //         method: "GET",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         credentials: "include",
    //         mode: "cors"
    //     });

    //     const parsedData = await response.json();
    //     console.log(parsedData.csrfToken);
    //     setCsrfToken(parsedData.csrfToken)
    // }

    // useEffect(() => {
    //     loadCsrfToken();
    // },[]);

    const csrfSubmitCheck = async (e) => {
        e.preventDefault();
        // const domainURL = "http://localhost:5000";
        // fetch(`${domainURL}/process`,{
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "xsrf-token": csrfToken
        //     },
        //     credentials: "include",
        //     mode: "cors"
        // })
        // .then(response => {
        //     if(response.status !== 200) {
        //         return true;
        //     } else {
        //         onSubmit(e);
        //         return false;
        //     }
        // })
        // .then(data => setCsrfFlag(data))
        // .catch(err => console.log(err));
        onSubmit(e);
    }


  return (
    <>
        <div>
            
            
            {!verify ? <Fragment>
                <form onSubmit={(e) => onSubmit(e)}>
                {successMsg ? verify ? (<h5 className="text-success">Verification Details Successfully Uploaded.</h5>) : (<h5 className="text-success">User Profile Successfully Updated.</h5>) : null}
                {errormsg || csrfFlag===true ? (<h5 className="text-danger">Operation Failed try Again.</h5>) : null}
                {/* {csrfFlag !== null && ( !csrfFlag ? <h5 className="text-success">User Profile Successfully Updated.</h5> : <h5 className="text-danger">Operation Failed try Again.</h5>)} */}
                <div className="row m-b30">
                    {props.userData.is_user_verified === "0" && verifyFile === "0" && (
                    <div className="dp-flex mb-30 col-sm-12">
                        <span><CancelIcon /></span>
                        <span>Profile Not Verified </span>
                        <span onClick={() => setVerify(true)}>Verify</span>
                    </div>)}
                    
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" className="form-control" value={user_name} onChange={e =>setUser_name(e.target.value)} placeholder="Your Name" name="user_name" required /> 
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>User Profile URL</label>
                            <input type="text" className="form-control" value={unique_name} onChange={e =>setUnique_name(e.target.value)} placeholder="User Profile URL" name="unique_name" required /> 
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Your Email</label>
                              {props.userData.role_id === "4" && props.userData.user_email !== "" && props.userData.email_verify === "1" &&  props.userData.user_email === user_email && <> 
                                  <VerifiedUserIcon className="candidate-vlogo ml-2" />
                                  <span className="pl-1" style={{fontSize:"12px",fontWeight:"500",color:"#299241"}}>Verified</span>
                                </>
                              } 
                            <input type="text" className="form-control" value={user_email} onChange={e =>setUser_email(e.target.value)} placeholder="Email Address" name="user_email" required/>
                            {props.userData.role_id === "4" && props.userData.user_email !== "" && props.userData.email_verify === "0" && props.userData.user_email === user_email && <>
                                <CancelIcon className="candidate-clogo" />
                                <span className="text-danger pl-1" style={{fontSize:"12px",fontWeight:"500"}}>Not Verified</span> 
                                <span className="pl-1" style={{fontSize:"13.5px",fontWeight:"500"}}> <Link onClick={()=>emailVerifyCall(loginuserId)} style={{borderBottom:"1.4px solid"}}>click</Link> to Verify {emailverifyloading &&  <img src={verifyloading} alt="Loading" style={{float:"center",height:"26px",marginLeft:"-4px",marginTop:"3px"}}/> } </span> 
                            </>}
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Your Whatsapp Number</label>
                            <input type="text" className="form-control" value={user_whatsapp_number} onChange={e =>setUser_whatsapp_number(e.target.value)} placeholder="WhatsApp Number" name="user_whatsapp_number"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>Mobile Number</label>
                            <input type="text" className="form-control" value={user_phone} onChange={e =>setUser_phone(e.target.value)} placeholder="Mobile Number" name="user_phone"  readOnly required/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" value={city} onChange={e =>setCity(e.target.value)} placeholder="Your City" name="city" required/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                            <label>You are a</label>
                            <div className="form-control">
                                <select 
                                className="Editprofile_arrow_spacing" 
                                name="listing_by" 
                                onChange={e =>setListing_by(e.target.value)}
                                >
                                    <option value=""  >Select You are</option>
                                    {listing_by == 'Dealer' ? (<option value="Dealer" selected>Student</option>): (<option value="Dealer">Student</option>)}
                                    {listing_by == 'Owner' ? (<option value="Owner" selected>Trainer</option>): (<option value="Owner">Trainer</option>)}
                                    {listing_by == 'Builder' ? (<option value="Builder" selected>Organisation</option>): (<option value="Builder">Organisation</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                            <label>Address</label>
                            <textarea name="user_address" rows={4} value={user_address} onChange={e =>setUser_address(e.target.value)} className="form-control" placeholder="Address"/>
                        </div>
                    </div>
                    
                </div>
                <button className="site-button m-b30">Save</button>
            </form>
            {loading ? (<h5 className="text-info">Loading...</h5>) : null}
            </Fragment> : <Fragment>
            <form>
            {successMsg && verify && (<h5 className="text-success">Verification Details Successfully Uploaded.</h5>)}
                <div className="row m-b30">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Select Any Identity Proof:<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
                            <div className="form-control">
                                <select 
                                className="Editprofile_arrow_spacing" 
                                name="listing_by" 
                                onChange={e => setProofType(e.target.value)}
                                >
                                    <option value="">eg: Aadhar</option>
                                    <option value="addhar">Aadhar</option>
                                    <option value="pancard">Pan Card</option>
                                    <option value="voterid">Voter ID</option>
                                    <option value="drivinglicense">Driving License</option>
                                </select>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>ID Proof Gallery<i class="mandatory fa fa-asterisk" aria-hidden="true"></i></label>
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
                    </div>
                    
                </div>
                <button onClick={(e) => onSubmitVerify(e)} type="submit" className="site-button m-b30">Save</button>
                <button onClick={() => {
                    setVerify(false);
                    setSuccessMsg(false);
                }} style={{marginLeft: "10px",backgroundColor: "#20efef"}} className="site-button m-b30">Close</button>
            </form>
            {errormsg ? (<h5 className="text-danger">Please fill all the mandatory fields.</h5>) : null}
            {loading ? (<h5 className="text-info">Loading...</h5>) : null}
            </Fragment> }
            
        </div>
    </>
  );
};

export default Editprofile;

