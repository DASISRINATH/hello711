import React,{ useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Select from "react-select";


var options =[
  { value: 'itm_loca7b66748e03d457e976ca63a50e1bde0', label: 'Hyderabad' },
  { value: 'itm_loc32db8931aaf39e3dfb5c388799109d5b', label: 'Bengaluru' },
 //  { value: 'itm_locc91e7fd5ffc739b26951228b0a564569', label: 'Warangal' },
 //  { value: 'itm_loc0da9dce069f1f834f38f262ecc57ffd1', label: 'Mancherial' },
 //  { value: 'itm_loc892e3dbe2fbf07ae7b19455a4e75b28c', label: 'Karim Nagar' },
  ]

 var subCatoptions =[
    //{ value: '', label: 'All Categories' },
    { value: '', label: 'All' },
  { value: 'subcata533742b6f520075afa275fe3da21ce3', label: 'Residential' },
  { value: 'subcat4ddefa6bbd2f86e6a3fa102d83ae1631', label: 'Agricultural' },
  { value: 'subcata6ca03906a86602a88fc7d9048105c67', label: 'Commercial' },
  { value: 'subcat435c6e19f9dec97f559116c452cda562', label: 'Industrial' },
 ]

 var propertiesSubCatOptions =[
  { value: '', label: 'All' },
  { value: 'subcata533742b6f520075afa275fe3da21ce3', label: 'Residential' },
  { value: 'subcat4ddefa6bbd2f86e6a3fa102d83ae1631', label: 'Agricultural' },
  { value: 'subcata6ca03906a86602a88fc7d9048105c67', label: 'Commercial' },
  { value: 'subcat435c6e19f9dec97f559116c452cda562', label: 'Industrial' },
]

var rentSubCatOptions =[
  { value: '', label: 'All' },
  { value: 'subcat89d510a83500e9ac2ecec99cd6b26c94', label: 'Apartments' },
  { value: 'subcatca64dc358e7737518a68ec88f7e3f99a', label: 'House//Villa' },
  { value: 'subcat83e59467ed17dd3c8ce2b22fc1876e2c', label: 'Building' },
  { value: 'subcatc4b6928dd0ba7f1f4ffc5a4588cea59e', label: 'Others' },
]

 var priceOptions =[
   //{ value: 'all', label: 'All' },
   { value: '0Rs-50K', label: '0Rs - 50K' },
   { value: '50K-1Lac', label: '50K - 1Lac' },
   { value: '1Lac-25lac', label: '1Lac - 25lac' },
   { value: '25Lac-50Lac', label: '25Lac - 50Lac' },
   { value: '50Lac-75Lac', label: '50Lac - 75Lac' },
   { value: '75Lac-1cr', label: '75Lac - 1cr' },
   { value: '1cr-10cr', label: '1cr - 10cr' },
 ]

 var sortOptions =[
   { value: 'new_listing', label: 'New Listing' },
   { value: 'popular', label: 'Popular' },
   //{ value: '3', label: 'Relavance' },
   { value: 'low_to_high', label: 'Price Low to High' },
   { value: 'high_to_low', label: 'Price High to Low' },
 ]

const Mobilefilter = (props) => {
  
  const [open, setOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState('itm_loca7b66748e03d457e976ca63a50e1bde0');
  const [subcat, setSubcat] = React.useState('');
  const [cat,setCat] = React.useState('');
  const [pricefilter, setPricefilter] = React.useState('');
  const [minprice, setMinprice] = React.useState('');
  const [maxprice, setMaxprice] = React.useState('');
  const [sort, setSort] = React.useState('new_listing');
  const [order_by, setOrder_by] = React.useState('added_date');
  const [order_type, setOrder_type] = React.useState('desc');
  const [searchData, setSearchData] = React.useState('');
  const [pathname,setPathname] = React.useState(window.location.pathname.split("/")[1]);
  const [bedrooms,setBedrooms] = React.useState('');
  const resetFilters = () => {
    setSelectedLocation('itm_loca7b66748e03d457e976ca63a50e1bde0');
    setSubcat('');
    setCat('');
    setPricefilter('');
    setSort('new_listing');
    setOrder_by('added_date');
    setOrder_type('desc');
    setSearchData('');
    setBedrooms('');
    setOpen(false);
  }

  useEffect(() => {
    console.log(window.location.pathname.split("/")[1]);
    resetFilters();
  },[props.filterFlag]);

//  const selectLocation = (e) => {
//    props.mobileFilter(e)
//  };
//
//  const selectsubCat = (e) => {
//    alert(e.value);
//  };
//
//  const selectpriceOptions = (e) =>{
//    alert(e.value);
//  }
//
 const sorting = (e) => {
   setSort(e.value);
  //  props.sorting(e.value);
 };

const selectpriceOptions = (e) => {
  setPricefilter(e.value);
  // props.selectpriceOptions(e.value);
}

const selectsubCat = (e) => {
  setSubcat(e.value);
  // props.selectsubCat(e.value);
} 

const selectLocation = (e) =>{
  setSelectedLocation(e.value)
  // props.selectLocation(e.value)
}

const changeCat = (e) => {
  setCat(e.value);
}

const selectBedrooms = (e) => {
  setBedrooms(e.value);
}

const callSearching = (data) =>{
  if(data){
    setSearchData('')
    props.mobileSearch()
  }else{
    props.mobileSearch(searchData)
  }
}

const submitFilter = () => {
  callSearching();
  props.selectLocation(selectedLocation);
  props.selectsubCat(subcat);
  props.selectpriceOptions(pricefilter);
  props.sorting(sort);
  props.changeCat(cat);
  props.selectBedrooms(bedrooms);
  setOpen(false);
}

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="btn-custom-2 light-grey filter-trigger mx-1" style={{ color: "#fff", backgroundColor: "#848486" }}><i class="fas fa-filter pr-1"></i>Filter</button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{
          overlay: 'customOverlay',
        }}
      >
        <div className="my-5 wd-250" style={{width:'250px'}}>
        {/* search input start */}
            <div className="my-2">
            <div class="input-group wd-250" style={{
            marginBottom:'5px',
            width:'max-content',
            height: '10px !important',
            border: 'solid 1px hsl(0, 0%, 80%)',
            borderRadius:'5px',
            backgroundColor:'white'
            }}>
            <div class="form-outline">
              <input 
              type="text" 
              id="form1" 
              class="form-control wd-186" 
              name='search'
              onChange={e=>setSearchData(e.target.value)} 
              value={searchData}
              placeholder='Search Title Here..'
              style={{height:'36px', width:'188px',border:'none'}}
              />
            </div>
            <div className="" style={{width:'20px', height:'20px'}}>
              {searchData !== '' && <span 
               style={{
                 height:'32px',
                 width:'20px',
                 paddingLeft:'5px',
                 marginTop:'1px',
                 marginRight:'1px',
                 fontWeight: 'bold',
                 fontSize:'20px',
                 float:'right'}}
              onClick={()=> callSearching('clearsearch')}>x</span>}
              </div>
            <button 
            onClick={()=> callSearching()} 
            type="button" 
            class="btn btn-primary"
            style={{height:'37px', borderRadius:'0px 5px 5px 0px',float:'right'}}>
              <i class="fas fa-search"></i>
            </button>
          </div>
            </div>
           {/* search input end */}
            <div className="my-2">
                <Select
                  placeholder="Select Option"
                  value={options.find(obj => obj.value === selectedLocation)} // set selected value
                  options={options}
                  onChange={selectLocation}
                />
            </div>

            {/* {pathname==="properties" && (
              <div className="my-2">
                <Select
                  placeholder="Select Option"
                  value={props.propertiesCatOptions.find(obj => obj.value === cat)} // set selected value
                  options={props.propertiesCatOptions}
                  onChange={changeCat}
                />
            </div>
            )} */}

            <div className="my-2">
                <Select
                  placeholder="Select Category"
                  value={props.propertiesSubCatOptions.find(obj => obj.value === subcat)}
                  options={props.propertiesSubCatOptions}
                  onChange={selectsubCat}
                />
            </div>

            {/* {cat==="catfa070dd5cc2a2c9c6196159f85480ff7" ? (
              <div className="my-2">
                <Select
                  placeholder="Select Category"
                  value={props.propertiesSubCatOptions.find(obj => obj.value === subcat)}
                  options={props.propertiesSubCatOptions}
                  onChange={selectsubCat}
                />
            </div>
            ) : (
              <div className="my-2">
                <Select
                  placeholder="Select Category"
                  value={props.rentSubCatOptions.find(obj => obj.value === subcat)}
                  options={props.rentSubCatOptions}
                  onChange={selectsubCat}
                />
            </div>
            )} */}
            
            {pathname==="properties" ? (
              <div className="my-2">
                <Select
                  placeholder="MinPrice - MaxPrice"
                  value={props.buyPriceOptions.find(obj => obj.value === pricefilter)} // set selected value
                  options={props.buyPriceOptions}
                  onChange={selectpriceOptions}
                />
            </div>
            ) : (
              <div className="my-2">
                <Select
                  placeholder="MinPrice - MaxPrice"
                  value={props.rentPriceOptions.find(obj => obj.value === pricefilter)} // set selected value
                  options={props.rentPriceOptions}
                  onChange={selectpriceOptions}
                />
            </div>
            )}

            {pathname==="rent" && (
              <div className="my-2">
                <Select
                  placeholder="Select Bedrooms"
                  value={props.bedOptions.find(obj => obj.value === bedrooms)} // set selected value
                  options={props.bedOptions}
                  onChange={selectBedrooms}
                />
            </div>
            )}
            

            <div className="my-2">
                <Select
                   placeholder="Sort Properties"
                   value={props.sortOptions.find(obj => obj.value === sort)} // set selected value
                   options={props.sortOptions}
                   onChange={sorting}
                   components={{
                     IndicatorSeparator: () => null
                   }}
                />
            </div>
            <div style={{marginRight: "0"}} className="my-2 dp-flex">
              <button style={{marginRight: "10px",width: "100%"}} className="clear-filter" onClick={submitFilter}>Apply Filter</button>
              <button style={{width: "100%"}} className={props.filter ? "clear-filter-selected" : "clear-filter"} onClick={props.resetFilter}>Clear Filter</button>
            </div>
        </div>
      
      </Modal>
    </>
  );
};

export default Mobilefilter;

