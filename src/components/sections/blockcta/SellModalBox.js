import React, {useState,useContext} from 'react';
import { Modal } from 'react-responsive-modal';
import {Link} from "react-router-dom";
import { ItemsContext } from '../../../context/ItemsContext';
import "./css/styles.css";


// Icons

import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import HomeIcon from '@material-ui/icons/Home';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BusinessIcon from '@material-ui/icons/Business';


const Modalbox = ({id,icon,title,text}) => {
    const [open, setOpen] = useState(false);
    const { changeCat, selectsubCat} = useContext(ItemsContext);
    const closeIcon = (
        <svg fill="currentColor" viewBox="0 0 20 20" width={0} height={0}>
        </svg>
      );
    return (
        <>
            <div /*onClick={() => setOpen(true)}*/ style={{cursor: "pointer"}} key={id} className="col-lg-4 cta-container">
                <div className={"cta cta-2 item" + id + ""}>
                    <i className={"flaticon-" + icon + ""} />
                    <div className="cta-body">
                        <h4>{title}</h4>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
            
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeOnOverlayClick={true}
        center
        closeIcon={closeIcon}
        classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}
      >
        <div className="modal_container">
            {/* <div className="modal_item_t1">Select Listing Type</div> */}
            <div className="modal_item_t2">Sell</div>
            <Link to="/properties">
              <div onClick={() => {
                changeCat("catfa070dd5cc2a2c9c6196159f85480ff7");
                }} className="modal_item_t3"><FilterHdrIcon className="type_icons" /> Lands/Plots</div>
            </Link>

            <Link to="/properties">
            <div onClick={() => {
              changeCat("cat445639833db3eff8b6cdb5510aa39faa");
              selectsubCat("subcat89d510a83500e9ac2ecec99cd6b26c94");
            }} className="modal_item_t3"><HomeIcon className="type_icons"/>Apartments</div>
            </Link>

            <Link to="/properties">
            <div onClick={() => {
              changeCat("cat445639833db3eff8b6cdb5510aa39faa");
              selectsubCat("subcatca64dc358e7737518a68ec88f7e3f99a");
            }} className="modal_item_t3"><HomeWorkIcon className="type_icons"/>House/Villa</div>
            </Link>
        </div>
      
      </Modal>
        </>
    )
}

export default Modalbox
