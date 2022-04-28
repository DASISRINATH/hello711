import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Loader from '../../layouts/Loader';
const Content = ()=>{
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);
  async function fetchData(){
    await axios.get(`${process.env.REACT_APP_API_URL}feeds/get/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`)
    .then(res=>{
      setItems(res.data);
    })
    .catch(err=>console.log(err))
  }


  return(
    <div>
      {items.length > 0  ? (
        <>
          <Pagination
            data={items}
            pageLimit={4}
            dataLimit={2}
          />
        </>
      ) : <Loader/>}
    </div>
  )
}

export default Content;