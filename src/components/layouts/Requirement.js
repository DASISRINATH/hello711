import React from 'react';
import './css/modalstyle.css';
import { Link } from 'react-router-dom';




export default function Requirement() {

  return (
    <div className="requirementformdiv">
      <h4 className="text-center rq-title" style={{color:'#737171'}}>Add Requirement</h4>
      <div className="media sidebar-author listing-agent">
          <Link to="#" style={{marginRight:'0px'}}><img src={process.env.PUBLIC_URL + "/assets/img/people/profile_ex.jpg"} alt="agent" className="rounded-circle rq-ur-icon"  /></Link>
          <div className="media-body my-auto">
              <h6  style={{marginBottom:'-5px'}}> <Link to="#" className="rq-ur-name" style={{color:'#707070'}}>Venkatesh</Link> </h6>
              <p><span><i className="fas fa-map-marker-alt" style={{width:'2px'}}></i></span><span>Hyderabad</span></p>
          </div>
      </div>
      <form>
        <div className="form-group">
            <select className="form-control" name="city" style={{height:'38px'}}>
            <option value="">Select City</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Warangal">Warangal</option>
            </select>
        </div>
        <div className=" form-group">
           <textarea name="content" rows={5} className="form-control" placeholder="Enter Your Requirement" style={{backgroundColor:'#F8F8F8'}} />
        </div>
        <div className="text-right">
             <button className="btn btn-sm btn-outline-secondary mr-1" name="submit"><span className="font-weight-bold">Cancel</span></button>
             <button className="btn btn-sm btn-success ml-1" name="submit"><span className="font-weight-bold px-2">Post</span></button>
        </div>
      </form>
    </div>
  );
}