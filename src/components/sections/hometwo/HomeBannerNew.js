import React from 'react'
import images from "../../../assets/img/demo/test_1.jpg";
import "./HomeBannerNew.css"
export const HomeBannerNew = () => {
  return (
    <React.Fragment>
      <div className="cover">
    <div className="container text-center">
      <div className="text-subtitle">
    <h6>Making ease for everyone</h6>
    </div>
    <h3>We made it in easy way</h3>
    <p className="text-subtitle">
accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptum deleniti atque correupti quoes et
<p>quas molestias excepturi sint occaecati cupidittate non provident</p>
    </p>
    <div className="container">
  <div className="row">
    <div className="col-sm">
      <div class="card mb-4">
      <div style={{ height: "10rem" }}>
                    <img
                      src={images}
                      alt="card image cap"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
  <div class="card-body">
  <button class="button-1" role="button">STEP 01</button>
    <h5 class="card-title">Post a tuition job</h5>
    <p class="card-text">Aeccusamus et iusto odiomae dignissimos 
ducimus quistames blanditiis praesentium 
voluptatum loramkes anuten.</p>
  </div>
</div></div>
    <div className="col-sm">
      <div class="card mb-4">
      <div style={{ height: "10rem" }}>
                    <img
                      src={images}
                      alt="card image cap"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
  <div class="card-body">
  <button class="button-2" role="button">STEP 02</button>
    <h5 class="card-title">Hire your best match</h5>
    <p class="card-text">Aeccusamus et iusto odiomae dignissimos 
ducimus quistames blanditiis praesentium 
voluptatum loramkes anuten.</p>
  </div>
</div></div>
<div className="col-sm">
      <div class="card mb-4">
      <div style={{ height: "10rem" }}>
                    <img
                      src={images}
                      alt="card image cap"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
  <div class="card-body">
  <button class="button-3" role="button">STEP 03</button>
    <h5 class="card-title">Get it done on time</h5>
    <p class="card-text">Aeccusamus et iusto odiomae dignissimos 
ducimus quistames blanditiis praesentium 
voluptatum loramkes anuten</p>
  </div>
</div></div>
  </div>
</div>
</div>
<br/>
<div class="card">
  <div class="row">
    <div class="col-md-7">
      <img src={images} class="img-fluid"/>
    </div>
    <div class="col-md-4">
    <div className="text-subtitle">
    <h6>Why our working is so unique</h6>
    </div>
<h3 class="card-tittle mt-2">See how our working process

easily adapt your need</h3>

<div className="text-subtitle">
    <h5>User friendly hiring process
</h5>
<p className="text-subtitle">
Aeccusamus etmaes iusto odiomae dignissimos ducimus quistames 
blanditiis praesentium voluptatum loramkes anuten.
    </p>

    </div>
    <div className="text-subtitle">
    <h5>Verified process with ease</h5>
    </div>
    <p className="text-subtitle">
Aeccusamus etmaes iusto odiomae dignissimos ducimus quistames 
blanditiis praesentium voluptatum loramkes anuten.
    </p>
    <div className="text-subtitle">
    <h5>Secure payment gateway integrated</h5>
    </div>
    <p className="text-subtitle">
Aeccusamus etmaes iusto odiomae dignissimos ducimus quistames 
blanditiis praesentium voluptatum loramkes anuten.
    </p>

    </div>
  </div>
</div>

<br/>
<div className="container text-center">
      <div className="text-subtitle">
    <h6>We guarantee quality process</h6>
    </div>
    <h3>Let's join our community today</h3>
    <p className="text-subtitle">
    accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident
    </p>
    <div class="buttoonred">
    <button class="button-4" role="button">Start as student</button>
    <div class="space"></div>                                         
    <button class="button-5" role="button">Join as Instructor <a href="url">it's free!</a></button>
    </div>
    < br/>

</div>
</div>
    </React.Fragment>
)
}
export default HomeBannerNew;