import { useState } from "react"
import {Modal} from "react-responsive-modal";
import { Link } from "react-router-dom";
import axios from "axios";
const ConfirmModal = ({show, setShow, ID, setID, category, setCategory})=>{
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const handleClose = ()=>{
    setShow(false);
    setID('');
    setCategory('');
  }

  const handleDelete = async ()=>{
    if(category==="Lines"){
      axios.delete(`https://webgis-web-app.herokuapp.com/line/deleteline/${ID}`)
      .then(res=>res.data)
      .then(data=>{
        console.log(data);
        setSuccess(true);
        window.location.reload();
      })
      .catch(err=>{
        console.log(err);
        setFailure(true);
      })
    }else{
      if(category==="Flats" || category==="Plots"){
        var deleteData = {map_layout_id: ID}
        await axios.post(`${process.env.REACT_APP_API_URL}items/project_delete/api_key/${process.env.REACT_APP_API_SECURITY_KEY}/`, deleteData)
          .then(response=>{
            setSuccess(true);
          })
          .catch(err=>{
            console.log(err);
            setFailure(true); 
          })
      }
      axios.delete(`https://webgis-web-app.herokuapp.com/layout/deletelayout/${ID}`)
        .then(res=>res.data)
        .then(data=>{
          console.log(data);
          setSuccess(true);
          window.location.reload();
        })
        .catch(err=>{
          console.log(err);
          setFailure(true);
        })
    }
  }
  return (
    <>
      <Modal
        open={show}
        onClose={handleClose}
        center
        showCloseIcon={false}
        styles={{modal:{
          padding: "0",
          width: "30%",
          borderRadius: "3%"
       }}}
      >
        <div className="text-center pt-4 px-4" style={{backgroundColor:`rgb(47,64,97)`}}>
          {success ? 
            <h3 className="pt-3 pb-3" style={{color:"#FFFFFF", fontSize:'18px', fontWeight:'bold'}}>You have successfully deleted the layout from the database</h3>
            :
            failure ? 
            <h3 className="pt-3 pb-3" style={{color:"#FFFFFF", fontSize:'18px', fontWeight:'bold'}}>There was some problem in deleting the layout</h3>
            :
            <h3 className="pt-3 pb-3" style={{color:"#FFFFFF", fontSize:'18px', fontWeight:'bold'}}>Are you sure you want to delete the item from the database?</h3>
          }
        </div>
        <div className="pb-3">
        <Link style={{fontWeight:'bold', float:'left'}} className="pl-4 pb-3" onClick={handleClose}>Cancel</Link>
        <Link style={{fontWeight:'bold', float:'right'}} className="pr-4" onClick={handleDelete}>Yes</Link>
        </div>
      </Modal>
    </>
  )
}

export default ConfirmModal