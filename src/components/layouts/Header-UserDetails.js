import React, { useState, useEffect,Fragment } from 'react';
import NavMenu from '../layouts/NavMenu';
import Mobilemenu from '../layouts/Mobilemenu';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import { shadows } from '@material-ui/system';
import { useDispatch } from 'react-redux';
import { fetchItemListData } from '../../slices/items/itemSlice';
import { ButtonGroup,DropdownButton, Dropdown} from 'react-bootstrap';


    const useStyles = makeStyles((theme) => ({
        root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        },
        extendedIcon: {
        marginRight: theme.spacing(1),
        },
    }));
    const StyledMenu = withStyles({
        paper: {
        border: '1px solid #d3d4d5',
        },
    })((props) => (
        <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
        />
    ));
    
    const StyledMenuItem = withStyles((theme) => ({
        root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
            },
        },
        },
    }))(MenuItem);

 
export default function Header(props) {
    const dispatch = useDispatch();

    const classes = useStyles();
    const [navtoggle, navtoggleClass] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleProfileClick = (event) => {
        setAnchorProfileEl(event.currentTarget);
      };
    
    const handleProfileClose = () => {
        setAnchorProfileEl(null);
    };


    useEffect(() => {
        window.addEventListener('scroll', () => {
            navtoggleClass({
                isTop: window.scrollY > 100
            });
        }, false);
        return () => {
            <Fragment/>
        }
    }, [])

    return (
        <div>
         <Fragment>
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": navtoggle })}>
                    <div className="aside-title">
                        <div className="aside-controls aside-trigger">
                            <h4>Menu</h4>
                            <div className="close-btn close-dark" onClick={navtoggleClass} >
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={navtoggleClass} />
                {/* Header Start */}
                <header className="main-header header-fw">
                    <nav className="navbar">
                        {/* Menu */}
                        <NavMenu />
                        <div className="header-controls">
                            <ul className="header-controls-inner d-none d-lg-flex">
                                <li>
                                    <div>
                                    <li>
                                        <div>
                                        <ButtonGroup vertical>
                                            {/* <DropdownButton as={ButtonGroup} title="+ Create" id="bg-vertical-dropdown-1"> */}
                                            <DropdownButton as={ButtonGroup} title="+" >
                                            <Dropdown.Item eventKey="1"><i class="far fa-user-circle pr-2" style={{fontSize:'22px',}} ></i>New Listing</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">New Requirement</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">New Service</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">New Job</Dropdown.Item>
                                            <Dropdown.Item eventKey="2">New Project</Dropdown.Item>
                                            </DropdownButton>
                                        </ButtonGroup>
                                        </div>
                                    </li>
                                        {/* <Fab variant="extended" size="small" aria-label="add" onClick={handleClick}>
                                         <AddIcon/>
                                            Add
                                        </Fab> */}
                                        {/* <Fab variant="extended">
                                        <NavigationIcon className={classes.extendedIcon} />
                                        Navigate
                                        </Fab> */}
                                          {/* <Button variant="contained" disableElevation  onClick={handleClick}>Add + </Button>  */}
                                          {/* <StyledMenu
                                            id="customized-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <StyledMenuItem
                                                //  component={RouterLink} to="/submit-listing"
                                                 className='user-btn'    
                                                 >
                                                <ListItemIcon>
                                                    <SendIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Listing" />
                                            </StyledMenuItem>
                                            
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <DraftsIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Add Requirement" />
                                            </StyledMenuItem>
                                            
                                            <StyledMenuItem>
                                            <ListItemIcon>
                                                <InboxIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="Add Project" />
                                            </StyledMenuItem>
                                        </StyledMenu> */}
                                    </div>
                                </li>

                                <li>
                                    <div>
                                        <Fab size="small" aria-label="add"  onClick={handleProfileClick}>
                                            <img src={process.env.PUBLIC_URL + "/assets/img/people/profile_ex.jpg"} alt="profile img" style={{borderRadius: "50%", padding:'1px'}}  />
                                        </Fab>   
                                          <StyledMenu
                                            id="customized-menu"
                                            anchorEl={anchorProfileEl}
                                            keepMounted
                                            open={Boolean(anchorProfileEl)}
                                            onClose={handleProfileClose}
                                        >
                                              <StyledMenuItem
                                                //   component={RouterLink} to="profile-listings"
                                              >
                                                <ListItemIcon>
                                                    <DraftsIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="My Listings" />
                                            </StyledMenuItem>
         
                                            <StyledMenuItem 
                                                component={RouterLink} to="myprofile"
                                             >
                                                <ListItemIcon>
                                                    <AddIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="My Profile" />
                                            </StyledMenuItem>

                                            <StyledMenuItem
                                            // component={RouterLink} to="/profile-saved-listings"
                                            >
                                                <ListItemIcon>
                                                    <DraftsIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="My Favorites" />
                                            </StyledMenuItem>
                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <AddIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Post Listing" />
                                            </StyledMenuItem>

                                            <StyledMenuItem>
                                                <ListItemIcon>
                                                    <DraftsIcon fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Logout" />
                                            </StyledMenuItem>
                                            
                                        </StyledMenu>
                                    </div>
                                </li>

                            </ul>
                            {/* Toggler */}
                            <div className="aside-toggler aside-trigger" onClick={navtoggleClass}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </nav>
                </header>
                {/* Header End */}
            </Fragment>

            
        </div>
    )
}

