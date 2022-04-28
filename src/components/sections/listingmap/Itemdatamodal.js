import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';
import Itemimgslide from './Itemimgslide';
import Iteminfo from './Iteminfo';

const Itemdatamodal = (props) => {
  
  const [open, setOpen] = React.useState(false);
  const [item, seItemid] = React.useState(props.itemData);
  //React.useEffect(() => {
  //   //alert(itemid);
  //    //dispatch(fetchItemListData(selectedLocation))
  //},[]);
  return (
    <>
      <Link
        //to="/listing-details-v1"
        onClick={() => setOpen(true)}
        className="btn-custom btn-sm secondary">
        View Details
      </Link>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        left
        classNames={{
          overlay: 'customOverlay',
        }}>
     
      <div className="my-5 items-view-modal" >
          {item.default_photo.img_path != '' && 
            <div>
              <Itemimgslide itemId={item.id} />
            </div>
          }
          <div className="my-4 mx-2">
            <Iteminfo item={item} />
          </div>
      </div>
      </Modal>
    </>
  );
};

export default Itemdatamodal;

