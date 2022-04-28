import React from 'react';
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
  //const [subcat, setSubcat] = React.useState('');
  //const [pricefilter, setPricefilter] = React.useState('');
  //const [minprice, setMinprice] = React.useState('');
  //const [maxprice, setMaxprice] = React.useState('');
  const [sort, setSort] = React.useState('new_listing');
  //const [order_by, setOrder_by] = React.useState('added_date');
  //const [order_type, setOrder_type] = React.useState('desc');
  const [searchstate, setsearchstate] = React.useState('');
  const [searchClickState, setsearchClickState] = React.useState('');


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
//  const sorting = (e) => {
//    alert(e.value);
//  };

const selectLocation = (e) =>{
    setSelectedLocation(e.value)
    props.selectLocation(e)
}

const handleSearchclick =(e)=>{
  setsearchClickState(searchstate);
  // setsearchstate('');
  props.DataFromChild(searchstate);
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
        <div className="my-5" style={{width:'300px'}}>
        {/* search input start */}
        <div className="my-2">
            <div class="input-group" style={{
            marginBottom:'5px',
            width:'300px',
            height: '10px !important',
            border: 'solid 1px hsl(0, 0%, 80%)',
            borderRadius:'5px',
            backgroundColor:'white'
            }}>
            <div class="form-outline">
              <input 
              type="text" 
              id="form1" 
              class="form-control" 
              name='search'
              onChange={e=>setsearchstate(e.target.value)} 
              value={searchstate}
              placeholder='Search Title Here..'
              style={{height:'36px', width:'236px',border:'none'}}
              />
            </div>
            <div className="" style={{width:'20px', height:'20px'}}>
              {!searchstate ? null :<button 
              style={{
                width:'20px', 
                height:'20px',
                border:'solid 1px transparent', 
                marginTop:'7px', 
                backgroundColor:'greenyellow', 
                borderRadius:'3px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                float:'right'}}
              onClick={()=>setsearchstate('')}><i>x</i> </button>}
              </div>
            <button 
            onClick={handleSearchclick} 
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

            <div className="my-2">
                <Select
                  placeholder="MinPrice - MaxPrice"
                  //value={priceOptions.find(obj => obj.value === pricefilter)} // set selected value
                  options={priceOptions}
                  onChange={props.selectpriceOptions}
                  isClearable
                />
            </div>

            <div className="my-2">
                <Select
                   placeholder="Sort Properties"
                   value={sortOptions.find(obj => obj.value === sort)} // set selected value
                   options={sortOptions}
                   onChange={props.sorting}
                   components={{
                     IndicatorSeparator: () => null
                   }}
                />
            </div>
        </div>
      
      </Modal>
    </>
  );
};

export default Mobilefilter;

