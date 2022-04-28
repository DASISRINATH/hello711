//import React, { Component } from 'react';
//
//class Formbox extends Component {
//    render() {
//        return (
//            <form>
//                <div className="row">
//                    <div className="col-md-6 form-group">
//                        <label>Full Name</label>
//                        <input type="text" className="form-control" placeholder="Full Name" name="fname" />
//                    </div>
//                    <div className="col-md-6 form-group">
//                        <label>Email Address</label>
//                        <input type="email" className="form-control" placeholder="Email Address" name="email" />
//                    </div>
//                    <div className="col-md-12 form-group">
//                        <label>Your Message</label>
//                        <textarea className="form-control" placeholder="Type your message..." name="comment" rows={7} />
//                    </div>
//                </div>
//                <button type="submit" className="btn-custom primary" name="button">Send Message</button>
//            </form>
//        );
//    }
//}
//
//export default Formbox;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


function Formbox(props) {
    const [uploadmsg, setUploadingmsg] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [msg, setMsg] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();
            setUploading(true)
            setUploadingmsg(false)
            setError(false)
            var postData = {
                contact_name: name,
                contact_email:email,
                contact_phone:phone,
                contact_message:msg,
            };
            fetch("https://api.test.takengo.risee.in/index.php/rest/contacts/add/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/ ", {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  }, 
                body: JSON.stringify(postData)
              })
              .then(response => response.json())
              .then(data => updateMsg(data))
              .catch(error => console.log(error));             
    }

    const updateMsg = (data) =>{
        if(data.status === "success"){
            setUploading(false)
            setUploadingmsg(true)
             setName('') 
             setEmail('') 
             setPhone('') 
             setMsg('')
        }else{
            setUploading(false)
            setError(true)
        }
    }

    return (

        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-md-6 form-group">
                    <label>Full Name</label>
                    <input type="text" className="form-control" placeholder="Full Name" value={name} onChange={e =>setName(e.target.value)} required/>
                </div>
                <div className="col-md-6 form-group">
                    <label>Email Address</label>
                    <input type="email" className="form-control" placeholder="Email Address" value={email} onChange={e =>setEmail(e.target.value)} required/>
                </div>
                <div className="col-md-6 form-group">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" placeholder="Phone Number" value={phone} onChange={e =>setPhone(e.target.value)} required/>
                </div>
                <div className="col-md-12 form-group">
                    <label>Your Message</label>
                    <textarea className="form-control" placeholder="Type your message..." value={msg} rows={7} onChange={e =>setMsg(e.target.value)} required/>
                </div>
            </div>
            <button type="submit" className="btn-custom primary" name="submit">Send Message</button>
            {/* <button type="submit"  className="btn-custom" name="submit">Submit Listing</button> */}
            {uploading ? (<h5 className="text-center text-info">sending message...</h5>) : null}
            {uploadmsg ? (<h5 className="text-center text-success">Message Sent Successfully.</h5>) : null}
            {error ? (<h5 className="text-center text-danger">Something went wrong try again later</h5>) : null}
        </form>
   
    );
}

export default Formbox;