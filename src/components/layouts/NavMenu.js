import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import DemoImg from '../../assets/img/demo/test_1.jpg'
import DemoImg from "../../assets/img/demo/INDMLogo.png";
import { Modal } from "react-bootstrap";
import Dropzone from "react-dropzone";

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });
  render() {
    return (
      <Fragment>
        {/* Logo */}
        {/* <Link className="navbar-brand" to="/"> <img src={process.env.PUBLIC_URL + "/assets/img/logo.png"} alt="logo" /> </Link> */}
        <Link to="/" className="navbar-brand" >
          {" "}
          <img src={DemoImg} alt="logo" />{" "}
        </Link>
        {/* Menu */}
        <ul className="navbar-nav">
        <li className="menu-item menu-item-has-children">
            <Link to="/">Home</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/properties">Buy</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/rent">Rent</Link>
          </li>
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/projects">Projects</Link>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <a href="https://play.google.com/store/apps/details?id=com.proptech.risee" target="_blank"><i className="fab fa-google-play" style={{marginRight:"5px"}}/>  Download App</a>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/covidbeds">Covid Beds</Link>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/services">Services</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/services">Jobs</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/services">Requirements</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/services">Covid Resources *</Link>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/blogs">Blog</Link>
            {/* <ul className="submenu">
              <li className="menu-item menu-item-has-children">
                <Link to="/blog-grid">Blog Archive</Link>
                <ul className="submenu">
                  <li className="menu-item">
                    {" "}
                    <Link to="/blog-grid">Grid View</Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/blog-list">List View</Link>{" "}
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                <Link to="/blog-single">Blog Single</Link>
              </li>
            </ul> */}
          {/* </li>  */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/about">About Us</Link>
            <ul className="submenu">
              <li className="menu-item">
                <Link to="/about">About Us</Link>
              </li>
              <li className="menu-item">
                <Link to="/faq">FAQ's</Link>
              </li>
              <li className="menu-item">
                <Link to="/pricing">Pricing</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </li> */}
          
          {/* <li className="menu-item menu-item-has-children">
            <Link to="#">Listings</Link>
            <ul className="submenu">
              <li className="menu-item menu-item-has-children">
                <Link to="/listing-map">Listings Archive</Link>
                <ul className="submenu">
                  <li className="menu-item">
                    {" "}
                    <Link to="/listing-grid">Grid View</Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/listing-list">List View</Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/listing-map">Map View</Link>{" "}
                  </li>
                </ul>
              </li>
              <li className="menu-item menu-item-has-children">
                <Link to="/listing-details-v1">Listing Details</Link>
                <ul className="submenu">
                  <li className="menu-item">
                    {" "}
                    <Link to="/listing-details-v1">
                      Listing Details v1
                    </Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/listing-details-v2">
                      Listing Details v2
                    </Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/listing-details-v3">
                      Listing Details v3
                    </Link>{" "}
                  </li>
                </ul>
              </li>
              <li className="menu-item">
                {" "}
                <Link to="/submit-listing">Submit Listing</Link>{" "}
              </li>
              <li className="menu-item">
                {" "}
                <Link to="/compare-listings">Compare Listings</Link>{" "}
              </li>
            </ul>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/agent-archive">Agents</Link>
            <ul className="submenu">
              <li className="menu-item">
                {" "}
                <Link to="/agent-archive">Agents Archive</Link>{" "}
              </li>
              <li className="menu-item">
                {" "}
                <Link to="/agent-details">Agent Details</Link>{" "}
              </li>
              <li className="menu-item menu-item-has-children">
                <Link to="/profile">Agent Profile</Link>
                <ul className="submenu submenu-right">
                  <li className="menu-item">
                    {" "}
                    <Link to="/profile">My Account</Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/profile-listings">My Listings</Link>{" "}
                  </li>
                  <li className="menu-item">
                    {" "}
                    <Link to="/profile-saved-listings">
                      Saved Listings
                    </Link>{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/agency-archive">Agency</Link>
            <ul className="submenu">
              <li className="menu-item">
                {" "}
                <Link to="/agency-archive">Agency Archive</Link>{" "}
              </li>
              <li className="menu-item">
                {" "}
                <Link to="/agency-details">Agency Details</Link>{" "}
              </li>
            </ul>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/user">User</Link>
          </li>

          <li className="menu-item menu-item-has-children">
            <Link to="/user-live-location">Live Location</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/project-from-state">from-state</Link>
          </li>
          <li className="menu-item menu-item-has-children">
            <Link to="/redux">Get Projects</Link>
          </li> */}
          {/* <li className="menu-item menu-item-has-children">
            <Link to="/" onClick={this.handleShow}>From</Link>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ textAlign: "center" }}>
                  Add New Listing
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <form action="/action_page.php">
                    <div class="form-group">
                      <label for="email">Listing Title:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                      />
                    </div>
                    <label for="exampleFormControlTextarea1">
                      Property Description:{" "}
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">
                        Select City:
                      </label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option>Hyderabad</option>
                        <option>Andhra pradesh</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="pwd">Enter Location:</label>
                      <input
                        type="password"
                        class="form-control"
                        id="pwd"
                        placeholder="Kondapur.."
                        name="pswd"
                      />
                    </div>
                    <div class="form-group">
                      <label for="pwd">Area:</label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <div class="input-group-append">
                          <select class="input-group-text" name="type">
                            <option>Acres</option>
                            <option>Andhra pradesh</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlSelect1">Land Type:</label>
                      <select
                        class="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option>Hyderabad</option>
                        <option>Andhra pradesh</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="email">Address:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Adderss"
                        name="email"
                      />
                    </div>
                    <label>Browse Photos:</label>
                    <div className="dropzone">
                      <Dropzone
                        onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div className="dropzone-msg dz-message needsclick">
                                <i className="fas fa-cloud-upload-alt" />
                                <h5 className="dropzone-msg-title">
                                  Drop files here or click to upload.
                                </h5>
                              </div>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                    <div>
                      <span className="acr-form-notice">
                        *You can upload up to 5 images for your listing
                      </span>
                      <span className="acr-form-notice">
                        *Listing images should be atleast 620x480 in dimensions
                      </span>
                    </div>
                    <button type="submit" class="btn btn-primary">
                      Submit Listing
                    </button>
                    <button
                      type="submit"
                      variant="outline-primary"
                      style={{
                        borderBlock: "1px solid black",
                        marginLeft: "10px",
                      }}
                    >
                      Cancle
                    </button>
                  </form>
                </div>
              </Modal.Body>
            </Modal>
          </li> */}
        </ul>
      </Fragment>
    );
  }
}

export default NavMenu;
