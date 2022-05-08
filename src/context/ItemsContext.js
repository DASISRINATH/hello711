import React, { createContext, useState, useContext } from "react";
import axios from 'axios';
import locations from "./../data/location.json";
import { UserContext } from "./LoginContext";


export const ItemsContext = createContext({})

export default function ItemContext({ children }) {

    const {isLoggedIn, loginuserId,} = useContext(UserContext);

	const [locationName, setLocationName] = useState('Hyderabad');
    const [selectedLocation, setSelectedLocation] = useState('itm_loca7b66748e03d457e976ca63a50e1bde0');
    const [center, setCenter] = useState({ lat: 17.385000, lng: 78.486702 });
    const [zoomLevel, setZommLevel] = useState(10);
    const [offset, setOffset] = useState(0)
    const [items, setItems] = useState([])
    const [itemscount, setItemscount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [s, setS] = useState(false);
    const [viewProp,setViewProp] = useState({ id: "", index: null});
    const [index, setIndex] = useState();
    const [cat, setCat] = useState("")

    const [filterFlag,setFilterFlag] = useState(true);

    const [subcat, setSubcat] = useState('');
    const [pricefilter, setPricefilter] = useState('');
    const [minprice, setMinprice] = useState('');
    const [maxprice, setMaxprice] = useState('');
    const [sort, setSort] = useState('new_listing');
    const [order_by, setOrder_by] = useState('added_date');
    const [order_type, setOrder_type] = useState('desc');
    const [listlayoutonly, layouttoggle] = useState(true);
    const [maplayoutonly,maplayouttoggle] = useState(false);
    const [animateSec, setAnimateSec] = useState(20);
    const [favorite, setFavorite] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [searching, setSearching] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [path, setPath] = useState('');

    const [tag,setTag] = useState("all");
    const [itemInfodiv, setItemInfodiv] = React.useState(false);
    const [itemdata, setItemdata] = React.useState('');
    const [isHovered, setIsHovered] = useState();
    const[filter, setFilter] = useState(false);
    const [homeItem,setHomeItem] = useState([]);



	const checkCenterZoom = () =>{
		setOffset(0);
		setItems([]);
		const found = locations.find(city=>city.id===selectedLocation);
		setCenter({ lat: found.lat, lng: found.lng });
		setZommLevel(10);  
    setS(true);
	}

	const updateItemState = () =>{
		setOffset(0);
		setItems([]);
    setTag('all')
    clsItemInfodiv()
    //setItemInfodiv(false)
    //setItemdata('')
    //setS(true);
	}


    const fetchItems = async ()=>{
      console.log("testing fetch api functions")
      setError(false)
      setLoading(true)

      const pathName = window.location.pathname.split('/')[1];

      var postData = {
        item_location_id:selectedLocation,
        // item_type_id:itemtype,
        // cat_id:catid,
        // sub_cat_id: pathName === 'projects' ? subcatid : subcat,
        min_price:minprice,
        max_price:maxprice,
        order_by:order_by,
        order_type:order_type,
        bedrooms: bedrooms,
        // login_user_id:loginuserId,
        status:1,
        searchterm:searchData
      };
      
      if(pathName === 'properties'){
          var itemtype = '4';
          //console.log(cat);
          postData = {
            ...postData,
            item_type_id:itemtype,
            // cat_id:cat,
            cat_id:'catfa070dd5cc2a2c9c6196159f85480ff7',
            // cat_one:'catfa070dd5cc2a2c9c6196159f85480ff7',
            // cat_second:'cat445639833db3eff8b6cdb5510aa39faa',
            sub_cat_id: subcat,
            bedrooms: ''
          };
          setBedrooms('');
      }else if(pathName === 'rent'){
          var itemtype = '2';
          var catid = 'cat445639833db3eff8b6cdb5510aa39faa';
          postData = {
            ...postData,
            item_type_id:itemtype,
            cat_id:catid,
            sub_cat_id: subcat,
          };
          setCat('');
      }else if(pathName === 'projects'){
          var itemtype = '';
          var catid = 'cat5dfc0138547b926dccc5ee269b1cd042';
          var subcatid = 'subcat005e166e76bfc175d52242279dadc597';
          postData = {
            ...postData,
            item_type_id:itemtype,
            cat_id:catid,
            sub_cat_id: subcatid,
            bedrooms: ''
          };
          setBedrooms('');
          setCat('');
      }

      console.log(postData);

      if(tag==="all"){
        postData = {
          ...postData,
          login_user_id:loginuserId
        }
//         var postData = {
//           item_location_id:selectedLocation,
//           item_type_id:itemtype,
//           cat_id:catid,
//           sub_cat_id: pathName === 'projects' ? subcatid : subcat,
//           min_price:minprice,
//           max_price:maxprice,
//           order_by:order_by,
//           order_type:order_type,
//           bedrooms: bedrooms,
//           login_user_id:loginuserId,
//           status:1,
//           searchterm:searchData
//         };
      }else if(tag==="my-listing"){
        if(isLoggedIn && loginuserId !== null){ 
          postData = {
            ...postData,
            added_user_id:loginuserId
          }
//           var postData = {
//             item_location_id:selectedLocation,
//             item_type_id:itemtype,
//             cat_id:catid,
//             sub_cat_id: pathName === 'projects' ? subcatid : subcat,
//             min_price:minprice,
//             max_price:maxprice,
//             order_by:order_by,
//             bedrooms: bedrooms,
//             order_type:order_type,
//             added_user_id:loginuserId,
//             status:1,
//             searchterm: searchData
//           };
        }
      }
      else if(tag==="favourites"){
        if(isLoggedIn && loginuserId !== null){ 
          await axios.get(`${process.env.REACT_APP_API_URL}items/get_favourite/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/20/offset/${offset}/login_user_id/${loginuserId}/`)
          .then(response => updateItemsState(response.data))
          .then(setS(false))
          .catch(error => callError());
        }else{
          callError()
          alert('Please Login first...')
        }
      }
      else if(tag==="expired") {
        if(isLoggedIn && loginuserId !== null) {
          postData = {
            ...postData,
            status: 5,
          };
        }
      }
      else if(tag==="reported") {
        if(isLoggedIn && loginuserId !== null) {
          postData = {
            ...postData,
            status: 6,
          };
        }
      }

      if(tag!=="favourites"){
        if(postData){
          await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/20/offset/${offset}/rappikey/app_list_id/2`, postData)
          .then(response => updateItemsState(response.data))
          .then(setS(false))
          .catch(error => {callError();
          console.log(error)});
        }else{
          callError()
          alert('Please Login first...')
        }
      }

      // console.log(items);
    }

    const fetchNewListing = async () => {
      setItems([]);
      var postData = {
        status:1
      };
      await axios.post(`${process.env.REACT_APP_API_URL}items/search/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/limit/8/offset/8/`, postData)
      .then(response => setHomeItem(response.data))
      .catch(err => console.log(err));
    }
      
    const callError = ()=>{
      setLoading(false)
      setError(true)
      setItems([])
      setItemscount(0)
      setOffset(0)
    }
    
    const resetFilter = () =>{   
      setItems([])
      setItemscount(0)
      setOffset(0)
      setLocationName('Hyderabad')
      setSelectedLocation('itm_loca7b66748e03d457e976ca63a50e1bde0')
      setCenter({ lat: 17.385000, lng: 78.486702 })
      setZommLevel(10)
      setCat('')
      setSubcat('')
      setPricefilter('all')
      setBedrooms('')
      setMinprice('')
      setMaxprice('')
      setSort('new_listing') 
      setOrder_by('added_date') 
      setOrder_type('desc')
      fetchItems()
      setSearchData('')
      setFilter(false);
      setFilterFlag(!filterFlag);
    }

    // const clearFilterRent = () => {
    //   const pathName = window.location.pathname.split('/')[1];

    //   if(pathName==="rent") {
    //     setItems([])
    //     setItemscount(0)
    //     setOffset(0)
    //     setSubcat('')

    //   }
    // }
    
    const updateItemsState = (data) =>{
      setLoading(false)
      setItems(items.concat(data))
      setItemscount(data.length)
      console.log(data)
    }
    
    const switchLocation = (lat, lng) => {
      if(lat !== '' || lat !== '0.000000' || lng !== '' || lng !== '0.000000'){
         setCenter({ lat: lat, lng: lng });
         setZommLevel(15);
         setAnimateSec(3);
         setS(true);
      }

//      if (1 == 1) {
//        //const { current = {} } = mapRef;
//        // const { leafletElement: map } = current;
//        // map.flyTo([16, 80], ZOOM_LEVEL, { animate: true, duration: 3 });
//        setCenter({ lat: lat, lng: lng });
//        setZommLevel(15);
//        setAnimateSec(3);
//        setS(true);
//      } else {
//        alert("wqdef");
//      }
    };

    const setProperty = (id,index) => {
      setViewProp({
        id: id,
        index: index
      });
      //console.log(viewProp);
    };
    
    const selectLocation = (locationId) => {
      setSelectedLocation(locationId);
      setOffset(0);
      setItems([]);
      const found = locations.find(city=>city.id=== locationId);
      setLocationName(found.name);
      setCenter({ lat: found.lat, lng: found.lng });
      setZommLevel(10);
      setS(true);
    };
    
    const changeCat = (val) => {
      if(val === '') {
        setOffset(0);
        setItems([]);
        setCat("");
      } else {
        setOffset(0);
        setItems([]);
        setCat(val);
        setFilter(true);
      }
    }
    
    const selectsubCat = (val) => {
      
      if(val === ''){
        setOffset(0)
        setItems([])
        setSubcat('')
      }else{
        setOffset(0)
        setItems([])
        setSubcat(val)
        setFilter(true);
      }
    };
    
    const sorting = (val) => {
      setSort(val)
      setOffset(0)
      setItems([])
      if(val === 'new_listing'){
        setOrder_by('added_date')
        setOrder_type('desc')
      }
      if(val === 'popular'){
        setOrder_by('touch_count')
        setOrder_type('desc')
      }
      if(val === 'low_to_high'){
        setOrder_by('price')
        setOrder_type('asc')
      }
      if(val === 'high_to_low'){
        setOrder_by('price')
        setOrder_type('desc')
      }
      setFilter(true);
    };
    
    const selectpriceOptions = (val) =>{
      if(val === ''){
        setOffset(0)
        setItems([])
        setPricefilter('')
      }else{
        if(pricefilter != val){
          setOffset(0)
          setItems([])
          setPricefilter(val)
          setFilter(true);
        }
      }
      if(val === ''){
        setMinprice('')
        setMaxprice('')
      }else{ 
        if(pricefilter != val){
          if(val === ''){
            setMinprice('')
            setMaxprice('')
          }
          if(val==="5K-10K"){
            setMinprice(5000)
            setMaxprice(10000)
          }
          if(val==="10K-15K"){
            setMinprice(10000)
            setMaxprice(15000)
          }
          if(val==="15K-20K"){
            setMinprice(15000)
            setMaxprice(20000)
          }
          if(val==="20K-25K"){
            setMinprice(20000)
            setMaxprice(25000)
          }
          if(val==="25K-30K"){
            setMinprice(25000)
            setMaxprice(30000)
          }
          if(val==="30K-40K"){
            setMinprice(30000)
            setMaxprice(40000)
          }
          if(val==="40K-50K"){
            setMinprice(40000)
            setMaxprice(50000)
          }
          if(val === '0Rs-50K'){
            setMinprice(0)
            setMaxprice(50000)
          }
          if(val === '50K-1Lac'){
            setMinprice(50000)
            setMaxprice(100000)
          }
          if(val === '1Lac-25lac'){
            setMinprice(100000)
            setMaxprice(2500000)
          }
          if(val === '25Lac-50Lac'){
            setMinprice(2500000)
            setMaxprice(5000000)
          }
          if(val === '50Lac-75Lac'){
            setMinprice(5000000)
            setMaxprice(7500000)
          }
          if(val === '75Lac-1cr'){
            setMinprice(7500000)
            setMaxprice(10000000)
          }
          if(val === '1cr-10cr'){
            setMinprice(10000000)
            setMaxprice(100000000)
          }
        }
      }  
    }

    const selectBedrooms = (val) => {
      if(val === ''){
        setItems([])
        setBedrooms('')
      } else {
          setItems([])
          if(val === "") {
            setBedrooms("");
          }
          if(val === "1") {
            setBedrooms(1);
          }
          if(val === "2") {
            setBedrooms(2);
          }
          if(val === "3") {
            setBedrooms(3);
          }
          if(val === "4") {
            setBedrooms(4);
          }
          if(val === "5") {
            setBedrooms(5);
          }
      }
      setFilter(true);
    }
    
    const callLoadmore = () =>{
      setOffset(offset + 20)
    }
    
    const callfavouriteApi = async (id,key) =>{
      if(isLoggedIn && loginuserId !== null){
        if(items[key].is_favourited === '1'){
          items[key].is_favourited = '0'
        }else{
          items[key].is_favourited = '1'
        }
        var Data = {
          item_id:id,
          user_id:loginuserId,
        };
        //await axios.post(`${API_URL.BASE_URL}/favourites/press/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, Data)
        await axios.post(`${process.env.REACT_APP_API_URL}favourites/press/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, Data)
            .then(response => {
              items[key].is_favourited = response.data.is_favourited;
              if(items[key].is_favourited === '1') alert(items[key].title+" added to favourites");
              else alert(items[key].title+" removed from favourites");
            })
            .catch(error => {
              console.log(error)
              if(items[key].is_favourited === '1'){
                items[key].is_favourited = '0'
              }else{
                items[key].is_favourited = '1'
              }
              if(favorite){
                setFavorite(false)
              }else{
                setFavorite(true)
              }
            });
      }else{
        alert('Please Login...')
      }
    }
    
    const callUserFollowingApi = async (id,key) =>{
      if(isLoggedIn && loginuserId !== null){
        if(items[key].is_favourited === '1'){
          items[key].is_favourited = '0'
        }else{
          items[key].is_favourited = '1'
        }
        var Data = {
          item_id:id,
          user_id:loginuserId,
        };
        //await axios.post(`${API_URL.BASE_URL}/favourites/press/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, Data)
        await axios.post(`${process.env.REACT_APP_API_URL}favourites/press/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, Data)
            .then(response => {items[key].is_favourited = response.data.is_favourited})
            .catch(error => {
              console.log(error)
              if(items[key].is_favourited === '1'){
                items[key].is_favourited = '0'
              }else{
                items[key].is_favourited = '1'
              }
              if(favorite){
                setFavorite(false)
              }else{
                setFavorite(true)
              }
            });
      }else{
        alert('Please Login...')
      }
    }
    
    const mobileSearch = (data) => {
      if(data){
        setOffset(0)
        setItems([])
        setSearchData(data)
        setSearching(data)
      }else{
        setOffset(0)
        setItems([])
        setSearchData('')
        setSearching('') 
      }
    }
    
    const callSearch = () =>{
        setOffset(0)
        setItems([])
        setSearching(searchData)
    }
    
    const clearSearch = () =>{
        setOffset(0)
        setItems([])
        setSearchData('')
        setSearching('') 
    }
    
    const secondFilter = (type)=>{
      setOffset(0)
      setItems([])
      setTag(type)
    }


    const openItemInfodiv = (item, lat, lng) =>{
      setItemInfodiv(true)
      setItemdata(item)
      switchLocation(lat, lng)
    }

    const clsItemInfodiv = () =>{
      setItemInfodiv(false)
      setItemdata('')
      const found = locations.find(city=>city.id=== selectedLocation);
      setCenter({ lat: found.lat, lng: found.lng });
      setZommLevel(10);
      setS(true);
    }
    

	return (
		<ItemsContext.Provider
			value={{
				locationName,
				setLocationName,
				selectedLocation,
                setSelectedLocation,
                center,
                setCenter,
                zoomLevel,
                setZommLevel,
				updateItemState,
				offset, 
				setOffset,
				items, 
				setItems,
				checkCenterZoom,     
				s,
				setS,
        viewProp,setViewProp,

                itemscount, 
                setItemscount,
                loading, setLoading,
                error, setError,
                
                subcat, setSubcat,
                pricefilter, setPricefilter,
                minprice, setMinprice,
                maxprice, setMaxprice,
                sort, setSort,
                order_by, setOrder_by,
                order_type, setOrder_type,
                bedrooms, setBedrooms,
                listlayoutonly, layouttoggle,
                maplayoutonly,maplayouttoggle,
                animateSec, setAnimateSec,
                favorite, setFavorite,
                searchData, setSearchData,
                searching, setSearching,
                tag,setTag,

                filterFlag,setFilterFlag,

                itemInfodiv, setItemInfodiv,
                itemdata, setItemdata,
                isHovered, setIsHovered,
                filter,setFilter,

                index, setIndex,
                cat, setCat,
                path, setPath,

                fetchItems,
                resetFilter,
                switchLocation,
                selectLocation,
                selectsubCat,
                sorting,
                selectpriceOptions,
                selectBedrooms,
                callfavouriteApi,
                callUserFollowingApi,
                mobileSearch,
                callSearch,
                clearSearch,
                secondFilter,
                callLoadmore,
                openItemInfodiv,
                clsItemInfodiv,
                setProperty,
                changeCat,
                fetchNewListing,
                homeItem
			}}
		>
			{children}
		</ItemsContext.Provider>
	)
}