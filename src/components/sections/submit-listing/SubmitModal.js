import React, { useState } from "react";
import 'react-responsive-modal/styles.css';
import {Modal} from 'react-responsive-modal'; 
import {Link} from 'react-router-dom';

const SubmitModal = ({refresh, uploadmsgstatus, allowed, close}) =>{
    const [open,setOpen] =  useState(false)

    return (
        <>
            <Modal
             open={allowed ? allowed : open} 
             onClose={() => close()}
             center
             showCloseIcon={false}
             styles={{modal:{
                padding: "0",
                width: "40%",
                borderRadius: "3%"
             }}}
            >
                <div className="text pt-4 px-4" style={{backgroundColor:`rgb(47,64,97)`, textAlign:"center"}}>
                    <i className="fas fa-check-circle fa-5x pt-5 mb-2" style={{color:"green"}} />
                    <br/>
                    {uploadmsgstatus ?
                     <h3 className="pt-3 pb-3" style={{color:"#FFFFFF", fontSize:'18px', fontWeight:'bold'}}>Your Listing is under preview!<br/>It will become live, once it is approved.</h3>
                     :
                     <h3 className="pt-3 pb-3" style={{color:"#FFFFFF", fontSize:'18px', fontWeight:'bold'}}>There was some problem in entering the data.<br/>Please, try again</h3>
                    }
                </div>
                <div className="pb-3">
                    <Link style={{fontWeight:'bold', float:'left'}} className="pl-4 pb-3" onClick={()=>refresh()}>+ Add New</Link>
                    <Link style={{fontWeight:'bold', float:'right'}} className="pr-4" to="/profile-listings">View Listings</Link>
                </div>
                
            </Modal>
        </>
    )
}

export default SubmitModal;