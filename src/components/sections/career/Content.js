import React,{useState,Fragment, useEffect} from 'react';
import Wallpaper from "./img/search.jpg";
import "./css/styles.css";
import Item from './Item';
import axios from "axios"

const Content = () => {
    const [career,setCareer] = useState(0);
    const [data,setData] = useState("");

    // useEffect(() => {
    //     // fetch('https://api.test.takengo.risee.in/index.php/rest/Careers/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL/')
    //     // .then(data => console.log(data))
    //     // .catch(err => console.log(err));
    //     fetchData();
    // },[])

    // const fetchData = async () => {
    //     try {
    //         const details = await axios.get(`https://api.test.takengo.risee.in/index.php/rest/Careers/get/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL`);
    //         setData(details);
    //     } catch (err) {
    //         console.log(err);
    //         console.log("tt");
    //     }
    //    }

    useEffect(() => {
         fetchData();
     },[]);

    const fetchData = async () => {
         await axios.get(`${process.env.REACT_APP_API_URL}careers/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`)
         .then(response => {
            setData(response.data)
            console.log(response)
            console.log("responce")
           })
         .catch(error => {
            setData("")
             console.log(error)
        });

    }  



    return (
        <div className="career_section">
            <img src={process.env.PUBLIC_URL + "/assets/img/banner/career_banner.jpeg"} alt="career" />

            <div className="container my-3">
                <h3 className="container_title">Why Join Hello71?</h3> 
                <p>We are looking for some one who have entrepreneur mindset, who like challenging job. We want someone who can work in team and in a Startup Ecosystem.</p>              
            </div>
            <div className="section pt-0">
                <div className="container">
                    <h4 className="container_title">Current Opening</h4>
                    <div className="row">
                        <div className="col-lg-4">
                            {data !== "" &&
                               data.map((info, i)=>(
                                // <Item title={info.job_title} op1={info.job_location} op2={info.job_type}  detail={info.job_title} onClick={()=>setCareer(i)} />
                                <div onClick={()=>setCareer(i)} className={`${career === i ? "bg-grey" : null } career_option`}>
                                    <div className="option_title">
                                        {info.job_title}
                                    </div>
                                    <div className="option_details">
                                        <span>
                                            {info.job_location} 
                                        </span>
                                        <span>
                                            {info.job_type}
                                        </span>
                                    </div>
                                </div>
                               )) 
                            }
                        </div>
                        <div className="col-lg-8">
                            <div className="career_details">
                                {data !== "" && 
                                    data.map((des,i)=>(
                                        career === i && 
                                        (<Fragment>
                                             {des.job_description}
                                        </Fragment>)
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content;
