import React,{ useState, useEffect,Fragment, useContext } from 'react';
import { UserContext } from "./../../context/LoginContext";
import 'react-responsive-modal/styles.css';
import './css/modalstyle.css';
import { Modal } from 'react-responsive-modal';
import { Link } from 'react-router-dom';




const Businessloginmodal = () => {
  const {isLoggedIn,loginuserId,loginuserData,fetchLoginUserData} = useContext(UserContext);
  //const [isLoggedin, setIsLoggedin] = React.useState(false); setFirstLogin
  const [open, setOpen] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [company_name, setCompany_name] = useState();
  const [phone_number, setPhone_number] = useState();




  return (
    <>
        <Link /*onClick={() => setOpen(true)}*/  style={{fontSize:'15px', color:'#424762'}}><i class="fas fa-file-contract pr-2" style={{fontSize:'15px',}} ></i>Business Account</Link>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          center
          classNames={{
            overlay: 'customOverlay',
          }}
        >
          <div className="phoneformdiv">
            <form /*onSubmit={onSubmit}*/ >
                <div className=" form-group">
                    <label>Your Name</label>
                    <input type="text" className="form-control" value={name} onChange={e =>setName(e.target.value)} placeholder="Your Name" name="name" required />
                </div>

                <div className=" form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e =>setEmail(e.target.value)} placeholder="Email" name="email" required />
                </div>

                <div className=" form-group">
                    <label>Company Name</label>
                    <input type="text" className="form-control" value={company_name} onChange={e =>setCompany_name(e.target.value)} placeholder="Company Name" name="company_name" required />
                </div>

                <div className=" form-group">
                    <label>Phone Number</label>
                    <input type="tel" className="form-control" value={phone_number} onChange={e =>setPhone_number(e.target.value)} placeholder="Phone Number" name="phone_number" required />
                </div>

                <div style={{paddingTop:"12px",paddingBottom:"12px",}}>
                  <button type="submit"  className="btn modalbtn" ><span style={{color:'aliceblue',fontWeight:'800'}}>Login</span></button>
                </div>
            </form>
          </div>
        </Modal>
    </>
  );
};

export default Businessloginmodal;

