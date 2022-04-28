import React, { Component, useRef, useState, useEffect, useContext } from "react";
//import { UserContext } from "./../../../context/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

import { Link, useLocation } from "react-router-dom";


function Registerform(){ 

  //const {isLoggedIn,setIsLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [city, setCity] = useState()
  const [companyName, setCompanyName] = useState()
  const [password, setPassword] = useState()
  const [reEnterPassword, setReEnterPassword] = useState()

  const [idproof, setIdproof] = useState()
  const [files, setFiles] = useState([]);

  const [reEnterPasswordError, setReEnterPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [successmsg, setSuccessmsg] = useState(false)
  const [errormsg, setErrormsg] = useState(false)

  const [step2, setStep2] = useState(false)


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
    <Link className="btn btn-outline-danger" onClick={()=>removeImg(i)}><i class="fas fa-trash"></i></Link>
    </>
));

const removeImg = (i) =>{
    files.splice(i, 1);         
    //console.log(files)
}

  const onSubmit = (e) =>{
    e.preventDefault();

    if(files.length == '1'){
 
    setReEnterPasswordError(false)
    setSuccessmsg(false)
    setErrormsg(false)

    if(password !== reEnterPassword){
        setReEnterPasswordError(true)
    }else{
        setLoading(true)
        var registerData = {
            name:name,
            email:email,
            phone:phone,
            city:city,
            company_name:companyName,
            password:password,
            proof_type:idproof,
            file:files[0],
        };

        fetch(process.env.REACT_APP_API_URL+"business/business_register/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/", {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }, 
            body: JSON.stringify(registerData)
          })
          .then(response => response.json())
          .then(data => {if(data.status === 'success'){
                    setLoading(false)
                    setSuccessmsg(true)
                    setName('')
                    setEmail('')
                    setPhone('')
                    setCompanyName('')
                    setPassword('')
                    setReEnterPassword('')
                }else{
                    setLoading(false)
                    setErrormsg(true)                    
                }})
          .catch(error => {
                setLoading(false)
                setErrormsg(true)
            }); 
     }
    }else{
        alert("Upload One Image file")
    }  
  }
 
  
  return (
    <>
       <div className=""> 
          {successmsg && <h5 className="text-success">Registration Success. Risee Business team will contact You.</h5>}
          {errormsg && <h5 className="text-danger">Registration Failed. Try Again.</h5>}
          <form onSubmit={onSubmit}>
            <h3>Create Account for Business</h3> 
            {!step2 ? <>  
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={e =>setName(e.target.value)} required/>
            </div>  
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter Email" value={email} onChange={e =>setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>phone</label>
                <input type="text" className="form-control" placeholder="Enter Mobile Number" value={phone} onChange={e =>setPhone(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" placeholder="Enter City" value={city} onChange={e =>setCity(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="form-control" placeholder="Enter Company Name" value={companyName} onChange={e =>setCompanyName(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter Password" value={password} onChange={e =>setPassword(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Re-Enter Password</label>
                <input type="password" className="form-control" placeholder="Re-Enter Password" value={reEnterPassword} onChange={e =>setReEnterPassword(e.target.value)} required/>
                {reEnterPasswordError && <span className="text-danger">Enter valid password</span>}
            </div>
            </> :
            <>
            <div className="form-group">
                <label>Select any Company ID Proof</label>
                <select className="form-control" name="type"  onChange={e =>setIdproof(e.target.value)}>
                    <option value="">Select any Company ID Proof</option>
                    <option value="company_id">Company ID</option>
                    <option value="company_pan_card">Company pan card</option>
                </select>
            </div>
            <div className="form-group">
                <label>Property Gallery</label>
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
            </>
            }
            {step2 ?
            <>
             <button type="submit"  className="btn-custom" name="submit">Register</button>
             <Link className="btn-custom mx-2" onClick={()=>setStep2(false)}>Back</Link>
            </> : <Link className="btn-custom" onClick={()=>setStep2(true)}>Next</Link>
            }
            {loading && <h5 className="text-primary">Loading...</h5>}
          </form>
       </div> 
    </>
  );
};

export default Registerform;
