import axios from 'axios';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

const Feedback = ()=> {
	const [postdata, setpostdata] = useState({
		contact_name:'',
		contact_email:'',
		contact_phone:'',
        category_id:'',
        priority:'',
		feedback_details:''
	});
	const [formval, setformval] = useState("");
	const [formpost, setformpost] = useState({});


	const handleChange = (e)=>{
		const {name, value} = e.target;
		setpostdata((prev)=>{
			return{
				...prev,
				[name]:value
			};
		});
	};

	const handleClick = (e)=>{
		e.preventDefault();
		postdata.contact_name==="" ? setformval('warning'):
		postdata.contact_email==="" ? setformval('warning'):
		postdata.contact_phone==="" ? setformval('warning'):
        postdata.category_id==="" ? setformval('warning'):
        postdata.priority==="" ? setformval('warning'):
		postdata.feedback_details==="" ? setformval('warning'):sendData();
	}

	const sendData = async ()=>{
		await axios.post(`${process.env.REACT_APP_API_URL}contacts/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postdata)
		.then(res=>setformpost(res.data))
		.catch(err=>console.log(err));
		setpostdata({contact_name:"", contact_phone:"", contact_email:"", category_id:"", priority:"", feedback_details:"",});
		setformval('yes');	
	}


	return (
        <div className="comment-form">
            <h5>{formval === 'yes'? null : formval === 'warning' ? (<h5 style={{color:'orange'}}>Please enter all fields..</h5>):null }</h5>
            <form onSubmit={handleClick}>
                <div className="row">
                    <div className="col-md-6 form-group">
                        <label>Full Name</label>
                        <input
                         type="text" 
                         className="form-control" 
                         placeholder="Full Name" 
                         name="contact_name"
                         value={postdata.contact_name}
                         onChange={handleChange}
                         required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Phone Number</label>
                        <input
                         type="number" 
                         className="form-control" 
                         placeholder="Phone Number" 
                         name="contact_phone"
                         value={postdata.contact_phone}
                         onChange={handleChange} 
                         required
                        />
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Email Address</label>
                        <input
                         type="email" 
                         className="form-control" 
                         placeholder="Email Address" 
                         name="contact_email"
                         value={postdata.contact_email}
                         onChange={handleChange}
                         required
                        />
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Category</label>
                        <select className="form-control" name="category_id" value={postdata.category_id}  onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="Problems related to website">Problems related to website</option>
                            <option value="Problems related to listings">Problems related to listings</option>
                            <option value="Problems related to Suggestions">Problems related to Suggestions</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Priority</label>
                        <select className="form-control" name="priority" value={postdata.priority} onChange={handleChange}>
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Suggestions/Feedback</label>
                        <textarea
                         className="form-control" 
                         placeholder="Suggestions/Feedback" 
                         name="feedback_details"
                         value={postdata.contact_message} 
                         onChange={handleChange}
                         rows={5} 
                         required
                        />
                    </div>
                </div>
                <button type="submit" className="btn-custom primary">Submit</button>
                {formval === 'warning' ? null :
                formpost.status==="success" ?( <h6 style={{color:'green',marginTop:'5px'}}>Thank you for Feedback, We will reply you back shortly.</h6>) : 
                formpost.status==="error" ? (<h6 style={{color:'orange',marginTop:'5px'}}>Please Try Again After Sometime.</h6>): null}
            </form>
        </div>
	);
}

export default Feedback;