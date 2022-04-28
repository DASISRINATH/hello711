import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Content = ()=>{
  const [cookie_policy, setCookie_policy] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
    let res = await axios.get(`${process.env.REACT_APP_API_URL}abouts/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`);
    setCookie_policy(res.data[0].cookie_policy.split('*'));
    // console.log(res.data[0]);
    // console.log(res.data[0].about_privacy_policy.split('*'));
  }
  return(
    <>
      {/* <h3 className="custom-primary px-5 pt-2">Privacy Policy</h3> */}
      {/* <h3 className="custom-primary px-5 pt-2">{t('banner_title')}</h3> */}
      <div className="section">
          <div className="container">
              <div className="row">
                  <div className="col-lg-8">
                      <div className="post-content">
                      <h4>Cookie Policy</h4>
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
                          <p> {cookie_policy.map((a)=><p className="subtitle">{a}</p>)}</p>
                      </div>
                  </div>
                  {/* <div className="col-lg-4">
                      <Sidebar />
                  </div> */}
              </div>
          </div>
      </div>
    </>
  )
}

export default Content;
