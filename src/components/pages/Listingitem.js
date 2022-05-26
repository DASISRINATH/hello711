import React, {Fragment, useState, useEffect, useContext } from 'react';
import { UserContext } from "./../../context/LoginContext";
import { ItemsContext } from "./../../context/ItemsContext";
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ContentProject from '../sections/listingitem/Itemdetails';
import ContentRent from "../sections/listingitem/ItemdetailsRent";
import ContentProperties from "../sections/listingitem/ItemdetailsProperties";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { cssNumber } from 'jquery';

function Listingitem({ match }){

    const {callfavouriteApi,viewProp,setViewProp, index, tag} = useContext(ItemsContext);

const {isLoggedIn, loginuserId} = useContext(UserContext);

    const [itemData, setItemData] = useState('');
    const [itemImages, setItemImages] = useState([]);
    const [recentListings, setRecentListings] = useState([]);
    const [similarListings, setSimilarListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      fetchItem()
      fetchimages()
    },[]);

      const fetchItem = async() =>{
        setLoading(true)
        var pathName = match.path.split('/')[1];
        var Category = '';
        console.log(pathName);
        if(pathName === 'properties'){
          Category = 'catfa070dd5cc2a2c9c6196159f85480ff7';
        }
        if(pathName === 'rent'){
          Category = 'cat445639833db3eff8b6cdb5510aa39faa';
        }
        if(pathName === 'projects'){
          Category = 'cat5dfc0138547b926dccc5ee269b1cd042';
        }
         
        var itemid = match.params.slug;
        var postData = {
          id:itemid,
          cat_id:Category,
          status:1,
        };
        //await axios.get(`https://api.prod.online.risee.in/index.php/rest/items/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/id/${match.params.slug}/cat_id/${Category}/`)
        // await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/app_list_id/app_c2384a045194a4e3f86572390edb6372`, postData)
        await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, postData)
        .then(response => {
          setItemData(response.data[0])
          fetchRecentListings(response.data[0])
          // const ind = items.findIndex(item => item.id === response.data[0].id)
          // setIndex(ind)
          // console.log(items)
          console.log(response.data[0])
        })
        .catch(error => {
          setLoading(false)
          setError(true)
        });
      }

      const fetchimages = async() =>{
         setLoading2(true)      
         var id = match.params.slug;
         await axios.get(`${process.env.REACT_APP_API_URL}images/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/img_parent_id/${id}/`)
         .then(response => {
            setItemImages(response.data)
            setLoading(false)
          })
         .catch(error => {
           setItemImages([])
           setLoading2(false)
        });
      }

      const fetchRecentListings = async(item) =>{
        console.log('testing fetch user Items')
        var postData = {
          cat_id:item.cat_id,
          sub_cat_id:item.sub_cat_id,
          status:1,
        };
        await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/4/`, postData)
        .then(response => {
          setRecentListings(response.data)
          setLoading(false)
        })
        .catch(error => {
          setRecentListings([])
          setLoading(false)
        });
      }

//      const fetchSimilarListings = async(data) =>{
//        var postData = {
//          cat_id:data.cat_id,
//          sub_cat_id:data.sub_cat_id,
//          status:1,
//        };
//        await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/2/`, postData)
//        .then(response => setSimilarListings(response.data))
//        .catch(error => setSimilarListings([]));
//      }


        return (
            <>
                { loading && loading2 && itemData === '' &&
                 <div className={`acr-preloader`}>
                    <div className="acr-preloader-inner">
                        <div className="lds-grid"><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
                    </div>
                  </div>
                }
               { !loading && !loading2 && error ?  (<Redirect to="/404" />) :
                itemData !== '' &&
                  <Fragment>
                      <MetaTags>
                          <title>Hello71 - Online Marketplace | Mobiles | Tablets | Accessories | Buy amd Sell | News </title>
                          <meta
                              name="description"
                              content="#"
                          />
                      </MetaTags>
                      {/* {console.log(match.params.slug)} */}
                      <Header/>
                      
                      {match.path.split('/')[1] === "properties" && <ContentProperties index={tag} callfavouriteApi={callfavouriteApi} itemData={itemData} images={itemImages} recentListings={recentListings} isLoggedIn={isLoggedIn}/>}
                      {match.path.split('/')[1] === "rent" && <ContentRent index={tag} callfavouriteApi={callfavouriteApi} itemData={itemData} images={itemImages} recentListings={recentListings} isLoggedIn={isLoggedIn}/>}
                      {match.path.split('/')[1] === "projects" && <ContentProject index={tag} callfavouriteApi={callfavouriteApi} itemData={itemData} images={itemImages} recentListings={recentListings} isLoggedIn={isLoggedIn}/>}
                      
                      <Footer/>
                  </Fragment>
              }
            </>
        );
}

export default Listingitem;