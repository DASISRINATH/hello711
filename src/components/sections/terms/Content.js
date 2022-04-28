import axios from "axios";
import { useEffect, useState } from "react";

const Content = ()=>{
  const [about, setAbout] = useState([]);

  useEffect(()=>{
    fetchAbout();
  })

  const fetchAbout = async ()=>{
    let res = await axios.get(`${process.env.REACT_APP_API_URL}abouts/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`)
    setAbout(res.data[0].terms_and_conditions.split('*'));
    console.log(res);
  }
  
  return(
    <div className="section">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8">
                      <div className="post-content">
                          {/* <h3>Who are we</h3>
                          <p>Our website is: {data.about_website}</p> */}
                          {/* <h3>Privacy Policy</h3>
                          {data.about_privacy_policy.split("*").map((a)=>
                            <p className="subtitle">{a}</p>
                          )}
                          <h3>Cookie Policy</h3>
                          <h3>Listing Policy</h3>
                          <h3>Analytics</h3>
                          <h3>How Do We Store Your Data</h3> */}
                          <h4>Terms & Conditions</h4>
                          <p> {about.map((a)=><p className="subtitle">{a}</p>)}</p>
                          
                      </div>
                  </div>
                  {/* <div className="col-lg-4">
                      <Sidebar />
                  </div> */}
              </div>
          </div>
      </div>
  )
}

export default Content;
