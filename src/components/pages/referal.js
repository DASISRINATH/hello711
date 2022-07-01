import React from 'react'
import "./referal.css";
import images from "./srinath.jpg";
import logo from "./hello71-logo.png";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
export const referal = () => {
  return (
    <React.Fragment>
        <Header/>
        <div>
<div class="image">
<img
src="https://png.pngtree.com/thumb_back/fh260/background/20220525/pngtree-isometric-concept-of-earning-on-staking-coins-with-copy-space-on-image_1401104.jpg"
alt="card image cap" style={{width: "100%" ,height:"400px"}} />
 <div class="top-left">
    <div class="text">
    <h1 class="widget-title"><img src={logo}
    style={{width:"100%"}}
    /></h1>
    </div>
    </div>
  <div class="bottom-left">
    <div class="text">
    <h2 style={{color:"white"}}>Earn.Refer.Repeat</h2>
    <h7 style={{color:"white"}}>Online language is soaring, and at preply,we're fostering both sides of the marketplace.<br/>
      Start growing your revenue by referring students or tutors to our platform.it's that simple!</h7><br/>
      <br/>
      <button class="button-1" role="button">Register now</button>
    </div>
    </div>

</div>
<br/>
     <div class="tittle text-center">
        <h3>How it works</h3>
        <div>
        <div class="Row">
    <div class="Column">
    <h1 class="widget-title"><img src="https://cdn-icons-png.flaticon.com/128/5455/5455877.png"
    style={{width:"10%"}}
    /></h1>
      <h5>1. Register as an affiliate</h5>
    <h7>Create apersonal profile to view all<br/>
    our payout offers and get started.
    </h7>
    </div>
    <div class="Column">
    <h1 class="widget-title"><img src="https://cdn-icons-png.flaticon.com/128/3094/3094428.png"
    style={{width:"10%"}}
    /></h1><h5>2.Start refering</h5>
    <h7>
        We'll provide you with a unique referal <br/>
        link to send to students and totors.
    </h7>
    </div>
    <div class="Column">
    <h1 class="widget-title"><img src="https://cdn-icons-png.flaticon.com/128/2260/2260831.png"
    style={{width:"10%"}}
    /></h1><h5>3. Get Earing</h5>
    <h7>Make a 70% commission on the first <br/>
    lesson for every student you bring in,<br/>
    or up $170(dependind on subject<br/>
     demand) for everyapproved tutor.
    </h7>
    </div>
</div>
<button class="button-1" role="button">Register now</button>
</div>
</div>
<br/>
<div class="cover">
<div class="tittle text-center">
  <h3>FAQ</h3>
  <div class="Row-1">
    <div class="Column-1">
       <h5>How do i register to become a Preply affiliate?</h5>
       <h7>Easy  you can register here.it takes only 3 minutes and all you need <br/>
       to provide is your contact information.Once you get approved (within<br/>
       a few hours), you will be given access to our offers and promotional <br/>
       traking links.</h7>

       <br/>
       <br/>
       <h5>
        How can i track my performance?
       </h5>
       <h7>
        Yours unique refeeral link will give you access to performance reports<br/>
        to track your earnings.
       </h7>
       </div>
    <div class="Column-2">
    <h5>
      How much can i earn?
    </h5>
    <h7>
    Referring students:Earn a 70% commission of the total price of a<br/>
    first lesson, purchased from your unique referal link.
    <br/>
      Referring tutors:Earn up to $170 (depending on subjectdemand) for<br/>
      every approved tutor you bring in to Preply.
    </h7>
    <br/>
    <br/>
    <h5>
      When do i get paid?
    </h5>
    <h7>
      We pay ou affilitates by the 10th of each month for the earning of <br/>
      the privious month. For example we will pay you what you earned in<br/>
      May by june 10.
    </h7>
    </div>
  </div>
</div>
</div>
</div>
<br/>
    <div className='container'>
    <div className="row container">
    <div class="col-3">
        <img src="https://wallpaperaccess.com/full/5849665.png" alt="image" 
        class="img-responsive"
        style={{width: "200px" , height:"200px"}}
        />
        </div>
    <div className="srinath col-8">
      <h3>
        <br/>
        Ready to start earning?
      </h3>
      <button class="button-1" role="button">Become an affiliate</button>
    </div>
    </div>
    </div>
<br/>
<div class="container-3">
  <div class text-center>
    <h7><br/>
    if you have any questions please contact
    <a href="url"> affiliate@preply.com</a>
    </h7>
    </div>
    </div>
        <Footer/>
    
    </React.Fragment>
  )
}
export default referal;