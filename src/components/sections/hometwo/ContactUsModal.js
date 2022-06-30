import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';

const ContactUsModal = () => {
  const [open, setOpen] = useState(false);
  const [postdata, setpostdata] = useState({
    contact_name:'' ,
    contact_email: '',
    contact_phone:'' ,
    contact_message:''
  });
  const [formpost, setformpost] = useState({});
  const [formval, setformval] = useState('');

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  
  const handleOnChange=(e)=>{
    const{name,value}=e.target
    setpostdata((prev)=>{
      return{
        ...prev,
        [name]:value
      };
    });
  };
  
  var handleClick=(e)=>{
    e.preventDefault();
    postdata.contact_name ==='' ? setformval('warning'):
    postdata.contact_email ==='' ? setformval('warning'):
    postdata.contact_phone ==='' ? setformval('warning'):
    postdata.contact_message ==='' ? setformval('warning'):forPost();
  }
  
  var forPost =async()=>{
    axios.post(`${process.env.REACT_APP_API_URL}contacts/add/api_key/1fWwZNrzUiOW2pWEffgy3fXS1R7khL`,postdata)
    .then(res=>setformpost(res.data))
    .catch(error=>{console.log(error)});
    setpostdata({ contact_name:'',contact_email:'',contact_phone:'',contact_message:''});
    await setformval('yes')
  }
  
  var buttonHandleClick=()=>{
    setOpen(true);
    setpostdata({contact_name:'',contact_email:'',contact_phone:'',contact_message:''});
    setformpost({});
    setformval('')
  }
  
  return (
      <>
     <li style={{width:'100%'}} onClick={buttonHandleClick} >
     {/* <span style={{
       height:'35px', 
       width:'70px',
       paddingTop:'4px', 
       marginTop:'3px', 
       marginLeft:'10px', 
       marginRight:'11px',
       paddingLeft:'5px',
       borderRadius:'3px',
       fontSize:'16px',
       backgroundColor:'#666666',
       color:'white'}} className="fa-contact">Contact</span>  */}
       
     <div className="bottom-fab-icon-holder">
      <i className="fas fa-envelope" style={{fontSize:"15px"}}/> </div>
      <span className="fab-label">Contact</span>
     </li>
     
      <Modal open={open} onClose={onCloseModal} center>
      <form className="model_form" 
      style={{width:'350px', padding:'30px'}}>
         
        <h4 
        style={{marginBottom:'20px', color:'#404040'}}>Contact Us</h4>
        {formval === 'yes'? null : formval === 'warning' ? (<h5 style={{color:'orange',marginBottom:'5px'}}>Please enter all fields..</h5>):null }
        <input type="text" className='form-control' 
        style={{height:'30px',marginBottom:'20px', border:'solid 1px hsl(0, 0%, 80%)'}} 
        placeholder='Name'  required 
         name='contact_name'
        // onChange={e=>setpostdata({contact_name:e.target.value})}
         onChange={handleOnChange}
         value={postdata.contact_name}
        />

        <input type="email" className="form-control" 
        style={{height:'30px',marginBottom:'20px', border:'solid 1px hsl(0, 0%, 80%)'}} 
        placeholder="Email"
        name='contact_email'
        onChange={handleOnChange}
        value={postdata.contact_email}
        required
        ></input>

        <input type="number" className="form-control" 
        style={{height:'30px',marginBottom:'20px', border:'solid 1px hsl(0, 0%, 80%)'}} 
        placeholder="Phone Number"
        name='contact_phone'
        onChange={handleOnChange}
        value={postdata.contact_phone}
        required
        ></input>

        <textarea required class="form-control" 
        style={{height:'',marginBottom:'20px', border:'solid 1px hsl(0, 0%, 80%)'}} 
        placeholder='Enter The Details' rows="5"
        name='contact_message'
        onChange={handleOnChange}
        value={postdata.contact_message}
        ></textarea>

        <button onClick={handleClick} type="submit" class="btn-custom">Submit</button>
        {formval === 'warning' ? null :
        formpost.status==="success" ?( <h6 style={{color:'green',marginTop:'5px'}}>Thank you for contacting us, We will reply you back shortly.</h6>) : 
        formpost.status==="error" ? (<h6 style={{color:'orange',marginTop:'5px'}}>Please Try Again After Sometime.</h6>): null}

      </form>
      </Modal>
    </>
  );
};

export default ContactUsModal;