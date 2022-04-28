import axios from 'axios';
import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Contact_Us from './Contact_Us';
import Business_Enquiry from './Business_Enquiry';
import Feedback from './Feedback';

const Contactform = ()=> {
//	const [postdata, setpostdata] = useState({
//		contact_name:'',
//		contact_email:'',
//		contact_phone:'',
//		contact_message:''
//	});
//	const [formval, setformval] = useState("");
//	const [formpost, setformpost] = useState({});
//
	const [form_section, setForm_section] = useState("contact_us");
//
//
//	const handleChange = (e)=>{
//		const {name, value} = e.target;
//		setpostdata((prev)=>{
//			return{
//				...prev,
//				[name]:value
//			};
//		});
//	};

//	const handleClick = (e)=>{
//		e.preventDefault();
//		postdata.contact_name==="" ? setformval('warning'):
//		postdata.contact_email==="" ? setformval('warning'):
//		postdata.contact_phone==="" ? setformval('warning'):
//		postdata.contact_message==="" ? setformval('warning'):sendData();
//	}

//	const sendData = async ()=>{
//		await axios.post(`${process.env.REACT_APP_API_URL}contacts/add/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postdata)
//		.then(res=>setformpost(res.data))
//		.catch(err=>console.log(err));
//		setpostdata({contact_name:"", contact_phone:"", contact_email:"", contact_message:""});
//		setformval('yes');	
//	}

	const changeForm = (form)=>{
		setForm_section(form)
	}


	return (
		<div className="section pt-0">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 mb-lg-30">
						<div className="acr-locations bg-bottom bg-norepeat" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png)" }}>
							{/* <img src={process.env.PUBLIC_URL + "/assets/img/contact.jpg"} alt="" /> */}
							<div className="row">
								<div className="col-sm-6">
									<div className="acr-location">
										<h5>Hyderabad</h5>
										{/* <h5>USA</h5> */}
										<div className="acr-location-address">
											{/* <p>Kondapur</p> */}
											<p>6, City Mall, Mytri Square, 2-41/11, 2, Gachibowli - Miyapur Rd, opp. Sharath Capital, Prashanth Nagar Colony, Hyderabad, Telangana 500084</p>
											{/* <Link to="tel:+123456789">+91(8688) 932 501</Link> */}
										</div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="acr-location">
										<h5>Bangalore</h5>
										{/* <h5>Georgia</h5> */}
										<div className="acr-location-address">
											<p>4th Floor, No 22, Salarpuria Towers-I Industrial Layout, Hosur Rd, 7th Block, Koramangala, Bengaluru, Karnataka 560095</p>
											{/* <Link to="tel:+123456789">(134) 984 438</Link> */}
										</div>
									</div>
								</div>
								{/* <div className="col-sm-6">
									<div className="acr-location">
										<h5>Moscow</h5>
										<h5>Russia</h5>
										<div className="acr-location-address">
											<p>Lawrence Moreno 935-9940 Tortor. Street</p>
											<Link to="tel:+123456789">(443) 893 109</Link>
										</div>
									</div>
								</div>
								<div className="col-sm-6">
									<div className="acr-location">
										<h5>Cairo</h5>
										<h5>Egypt</h5>
										<div className="acr-location-address">
											<p>Aaron Hawkins 5587 Nunc. Avenue</p>
											<Link to="tel:+123456789">(009) 338 148</Link>
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="section-title-wrap section-header">
							<div className="row">
							    <div className="col-4 p-0">
									
							        <h5 className="text-center">
										<span className={`${form_section === "contact_us" ? "custom-primary font-weight-bold btn" : "font-weight-bold btn"}`} onClick={()=>changeForm("contact_us")}  style={{fontSize:'18px'}}>Contact Us</span>
									</h5>
									{/* <p>Got Any Questions?</p> */}
							    </div>
							    <div className="col-4 p-0">
							        <h5 className="text-center"><span className={`${form_section === "business_enquiry" ? "custom-primary font-weight-bold btn" : "font-weight-bold btn"}`} onClick={()=>changeForm("business_enquiry")} style={{fontSize:'18px'}}>Business Enquiry</span></h5>
							    </div>
							    <div className="col-4 p-0">
							        <h5 className="text-center"><span className={`${form_section === "feedback" ? "custom-primary font-weight-bold btn" : "font-weight-bold btn"}`} onClick={()=>changeForm("feedback")} style={{fontSize:'18px'}}>Feedback</span></h5>
							    </div>
							</div>
						</div>
                        <div>
							{form_section === "contact_us" && <Contact_Us/>}
							{form_section === "business_enquiry" && <Business_Enquiry/>}
							{form_section === "feedback" && <Feedback/>}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contactform;