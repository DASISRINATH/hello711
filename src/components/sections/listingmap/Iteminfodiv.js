import React from 'react';
import 'react-responsive-modal/styles.css';
import { Link } from 'react-router-dom';
import Itemimgslide from './Itemimgslide';
import Iteminfo from './Iteminfo';
import { Button } from "react-bootstrap";

const Iteminfodiv = (props) => {
  
  const [item, seItemid] = React.useState(props.itemData);
  //React.useEffect(() => {
  //   //alert(itemid);
  //    //dispatch(fetchItemListData(selectedLocation))
  //},[]);
  return (
    <>     
      <div className="my-1 items-view-modal" >
          <div className="img-btn-container d-flex">
              {/* <div onClick={()=> this.setState({isSwitchOn: ''})} type="button" className="btn-custom-2 light-grey mx-2" ><i class="fas fa-chevron-left mr-2"></i>Back</div> */}
              <Button variant="outline-dark" size="sm" onClick={()=> props.clsItemInfodiv()}><i class="fas fa-chevron-left mr-2"></i>Back</Button>
              <div className="premium-button d-flex mr-2">
                  {/* <div style={{zIndex:'1',height:'30px',width:'80px',align:'center',fontSize:'25px',marginLeft:'460px',cursor:'pointer'}} className="div ">
                  <i  class="fas fa-chart-line bg-white text-dark"></i>
                  </div> */}
                  {/* <Button variant="outline-dark"><i  class="fas fa-chart-line bg-white text-dark"></i></Button> */}
                  {/* <button className="btn btn-danger"style={{backgroundColor:'#3CB371', color:'#ffff',height:'30px', width:'70px', textAlign:'center', borderRadius:'5px', zIndex:'1',cursor:'pointer'}}className="bg-danger text-light">
                      Premium
                  </button> */}
              </div>
          </div>
          {item.default_photo.img_path != '' && 
            <div>
              <Itemimgslide itemId={item.id} />
            </div>
          }
          <div className="mt-4  mx-2">
            <Iteminfo item={item} />
          </div>
          <Link to={{pathname: "/properties/"+item.title, state: { itemData: item, title: item.title}}} className="btn btn-success btn-sm">View More...</Link>
      </div>
    </>
  );
};

export default Iteminfodiv;

