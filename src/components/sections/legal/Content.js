import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import Sidebar from '.././../layouts/Blogsidebar';

const Content = () => {
const [data, setData] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
    let res = await axios.get(`${process.env.REACT_APP_API_URL}abouts/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`);
    setData(res.data[0]);
    console.log(res.data[0]);
    // console.log(res.data[0].about_privacy_policy.split('*'));
  }

  return (
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
                          <h4>Refund Policy</h4>
                          <p>{data.about_refund_policy}</p>
                          
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

// class Content extends Component {
//     render() {
//         return (
//             <div className="section">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-8">
//                             <div className="post-content">
//                                 <h3>Who are we</h3>
//                                 <p>Our website is: http://androthemes.com/themes/react/acres</p>
//                                 <h3>Privacy Policy</h3>
//                                 <p>
//                                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
//                                     of type and scrambled it to make a type specimen book. It has survived not only five centuries
//           </p>
//                                 <h3>Cookie Policy</h3>
//                                 <p>
//                                     Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
//                                     of type and scrambled it to make a type specimen book. It has survived not only five centuries
//           </p>
//                                 <p>but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
//                                 and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
//           </p>
//                                 <h3>Listing Policy</h3>
//                                 <p>
//                                     There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
//                                     If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text
//           </p>
//                                 <p>
//                                     All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
//                                     combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
//                                     The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
//           </p>
//                                 <p>
//                                     There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
//                                     If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text
//           </p>
//                                 <h3>Analytics</h3>
//                                 <p>
//                                     All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
//                                     combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
//                                     The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
//           </p>
//                                 <p>
//                                     There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
//                                     If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text
//           </p>
//                                 <h3>How Do We Store Your Data</h3>
//                                 <p>
//                                     All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words,
//                                     combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
//                                     The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
//           </p>
//                             </div>
//                         </div>
//                         <div className="col-lg-4">
//                             <Sidebar />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }

export default Content;