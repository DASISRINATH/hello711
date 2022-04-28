import React, { Fragment } from 'react';
import NavMenu from '../layouts/NavMenu';
import Mobilemenu from '../layouts/Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

class Headerthree extends HeaderComponent {
    render() {
        const stickyheader = this.state.isTop ? 'sticky' : '';
        return (
            <Fragment>
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": this.state.navtoggle })}>
                    <div className="aside-title">
                        <div className="aside-controls aside-trigger">
                            <h4>Menu</h4>
                            <div className="close-btn close-dark" onClick={this.navtoggleClass} >
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={this.navtoggleClass} />
                {/* Header Start */}
                <header className={`main-header header-fw can-sticky header-1 ${stickyheader}`}>
                    <nav className="navbar">
                        {/* Menu */}
                        <NavMenu />
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">
                                <li>
                                <Link to="/submit-listing"><Button variant="contained" color="primary">
  Submit Listing 
</Button> </Link>
                                </li>
                            </ul>
                            {/* Toggler */}
                            <div className="aside-toggler aside-trigger" onClick={this.navtoggleClass}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </nav>
                </header>
                {/* Header End */}
            </Fragment>
        );
    }
}

export default Headerthree;