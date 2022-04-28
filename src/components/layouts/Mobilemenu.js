// import { Dropdown } from 'bootstrap';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/LoginContext';
import navigation from '../../data/navigation(2).json';
import Modalbox from './Modal';


const Mobilemenu = () => {
   
    const {isLoggedIn,logoutAction} = useContext(UserContext);
    //constructor() {
    //    super();
    //    this.state = {
    //      isLoggedin: false,
    //      loggedinUser:[],
    //      profilemenudrop:false,
    //    }
    //}

    const getNextSibling = function (elem, selector) {
        // Get the next sibling element
        var sibling = elem.nextElementSibling;
        // If there's no selector, return the first sibling
        if (!selector) return sibling;
        // If the sibling matches our selector, use it
        // If not, jump to the next sibling and continue the loop
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    }




    const triggerChild = (e) => {
        let subMenu = '';
        subMenu = (getNextSibling(e.target, '.submenu') !== undefined) ? getNextSibling(e.target, '.submenu') : null;
        if (subMenu !== null && subMenu !== undefined && subMenu !== '') {
            subMenu.classList = subMenu.classList.contains('d-block') ? 'submenu' : 'submenu d-block';
        }
    }



    
    const profilemenudroptoggle = (e) => {
         this.setState({profilemenudrop: this.state.profilemenudrop ? false : true})
    }
    // render() {
        //const {profilemenudrop} = this.state;
        return (
            <div className="aside-scroll">
                <ul>
                    {/* Pages Start */}
                    <li className="menu-item"> <Link to="/"> <i className="flaticon-home" /> Home</Link> </li>
                    <li className="menu-section-title">Pages</li>
                    <li className="menu-item"> <Link to="/properties"> <i className="flaticon-checklist" /> Buy</Link> </li>
                    {/* <li className="menu-item"> <Link to="/rent"> <i className="flaticon-checklist" /> Rent</Link> </li> */}
                    {/* <li className="menu-item"> <Link to="/projects"> <i className="flaticon-company-1" /> Projects</Link> </li> */}
                    <li className="menu-item"> <Link to="/blog"> <i className="flaticon-writing-1" />Blog</Link> </li>
                    <li className="menu-item"> <Link to="/submit-listing"> <i className="flaticon-list" />Submit Listing</Link> </li>
                    

                    
                    

                    {/* {isLoggedIn ? (
                            <>
                                <li className="menu-item"> <Link to="/" onClick={logoutAction}><i class="fas fa-sign-out-alt pr-2"></i> Logout</Link> </li>          
                            </>
                        ) : (<Modalbox />) } */}



                    {/* <li className="menu-item"> <Link to="/services"> <i className="flaticon-sales-agent" /> Services</Link> </li> */}
                    {/* <li className="menu-item"> <Link to="/services"> <i className="flaticon-sales-agent" /> Jobs</Link> </li> */}
                    {/* <li className="menu-item"> <Link to="/services"> <i className="flaticon-sales-agent" /> Requirements</Link> </li> */}

                    {/* {navigation.length > 0 ? navigation.slice(0,navigation.length-1).map((item, i) => (
                        <li key={i} className={`menu-item ${item.child ? 'menu-item-has-children' : ''} `} onClick={(e) => triggerChild(e)}>
                            {item.child ? <Link to="/" onClick={e => e.preventDefault()} > <i className={"flaticon-" + item.icon + ""} /> {item.linkText} </Link> : null}
                            {item.child ?
                                <ul className="submenu" role="menu">
                                    {item.submenu.map((sub_item, i) => (
                                        <li key={i} className={`menu-item ${sub_item.child ? 'menu-item-has-children' : ''} `}>
                                            {sub_item.child ? <Link to="/" onClick={e => e.preventDefault()} > {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                            {sub_item.submenu ?
                                                <ul className="submenu">
                                                    {sub_item.submenu.map((third_item, i) => (
                                                        <li className="menu-item" key={i}><Link to={third_item.link}>{third_item.linkText}</Link>
                                                        </li>
                                                    ))}
                                                </ul> : null}
                                        </li>
                                    ))}
                                </ul>
                                : null
                            }
                        </li>
                    )) : null} */}

                    {isLoggedIn && (
                        <li key={navigation[navigation.length-1].id} className={`menu-item ${navigation[navigation.length-1].child ? 'menu-item-has-children' : ''} `} onClick={(e) => triggerChild(e)}>
                            {navigation[navigation.length-1].child ? <Link to="/" onClick={e => e.preventDefault()} > <i className={"flaticon-" + navigation[navigation.length-1].icon + ""} /> {navigation[navigation.length-1].linkText} </Link> : <Link to="/">  </Link>}
                            {navigation[navigation.length-1].child ?
                                <ul className="submenu" role="menu">
                                    {navigation[navigation.length-1].submenu.map((sub_item, i) => (
                                        <li key={i} className={`menu-item ${sub_item.child ? 'menu-item-has-children' : ''} `}>
                                            {sub_item.child ? <Link to="/" onClick={e => e.preventDefault()} > {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                            {sub_item.submenu ?
                                                <ul className="submenu">
                                                    {sub_item.submenu.map((third_item, i) => (
                                                        <li className="menu-item" key={i}><Link to={third_item.link}>{third_item.linkText}</Link>
                                                        </li>
                                                    ))}
                                                </ul> : null}
                                        </li>
                                    ))}
                                </ul>
                                : null
                            }
                        </li>
                    )}

                    {/* {navigation.length > 0 ? navigation.map((item, i) => (
                        <li key={i} className={`menu-item ${item.child ? 'menu-item-has-children' : ''} `} onClick={this.triggerChild}>
                            {item.child ? <Link to="/" onClick={e => e.preventDefault()} > <i className={"flaticon-" + item.icon + ""} /> {item.linkText} </Link> : <Link to="/">  </Link>}
                            {item.child ?
                                <ul className="submenu" role="menu">
                                    {item.submenu.map((sub_item, i) => (
                                        <li key={i} className={`menu-item ${sub_item.child ? 'menu-item-has-children' : ''} `}>
                                            {sub_item.child ? <Link to="/" onClick={e => e.preventDefault()} > {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                            {sub_item.submenu ?
                                                <ul className="submenu">
                                                    {sub_item.submenu.map((third_item, i) => (
                                                        <li className="menu-item" key={i}><Link to={third_item.link}>{third_item.linkText}</Link>
                                                        </li>
                                                    ))}
                                                </ul> : null}
                                        </li>
                                    ))}
                                </ul>
                                : null
                            }
                        </li>
                    )) : null} */}
                    {/* Pages End */}

                   {/* Login  */}
                   {/*
                   <li class="menu-item menu-item-has-children ">
                        <a onClick={this.profilemenudroptoggle}> <i class="far fa-user-circle"></i> Profile </a>
                        <ul class={profilemenudrop ? ("submenu d-block") : ("submenu")}  role="menu">
                            <li class="menu-item"><a href="/agency-archive"> Menu 1 </a></li>
                            <li class="menu-item"><a href="/agency-details"> Menu 2 </a></li>
                        </ul>
                   </li>
                   */}

                   {/*
                   <li class="menu-item menu-item-has-children ">
                        <a onClick={this.profilemenudroptoggle}> <i class="far fa-user-circle"></i> Profile </a>
                        <ul class={profilemenudrop ? ("submenu d-block") : ("submenu")}  role="menu">
                            <li class="menu-item"><a href="/agency-archive"> Menu 1 </a></li>
                            <li class="menu-item"><a href="/agency-details"> Menu 2 </a></li>
                        </ul>
                   </li>
                   */}
                    {/* Login END */}

                    {/* Social Media Start */}
                    <li className="menu-section-title">Get Social</li>
                    <li className="menu-item"> <Link to="https://www.facebook.com/propyaar/" target="_blank"> <i className="flaticon-facebook" />Facebook</Link> </li>
                    <li className="menu-item"> <Link to="https://www.instagram.com/propyaar/" target="_blank"> <i className="flaticon-instagram"/> Instagram </Link> </li>
                    <li className="menu-item"> <Link to="https://twitter.com/propyaar" target="_blank"> <i className="flaticon-twitter" /> Twitter </Link> </li>
                    <li className="menu-item"> <Link to="https://www.youtube.com/channel/UC6hj6GKbSTlH0EKEBh1Vu_A" target="_blank"> <i className="fab fa-youtube" /> Yotube </Link> </li>
                    {/* Social Media End */}

                    {isLoggedIn && (
                            <>
                                <li className="menu-item"> <Link to="/" onClick={logoutAction}><i class="fas fa-sign-out-alt pr-2"></i> Logout</Link> </li>          
                            </>
                    )}
                </ul>
                
            </div>
        );
    }


export default Mobilemenu;