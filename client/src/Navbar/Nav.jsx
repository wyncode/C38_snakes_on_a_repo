import React, {useContext} from 'react';
import { AppContext } from '../context/AppContext';
import Logout from '../Login/Logout'
import './nav.css';
import '../colors.css';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PetsIcon from '@material-ui/icons/Pets';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Menu,
  MenuItem,
  AppBar,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles({
  list: {
    width: 250
  },
  drawer: {
    width: 250
  }
});

const Nav = () => {
  const { currentUser } = useContext(AppContext);

  //Required for conditional logic to hide Navbar on homepage
  const { pathname } = useLocation();

  // Materials UI Library to handle Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Materials UI Library to handle Drawer
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const anchor = 'left';
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const iconList = (text) => {
    switch (text) {
      case 'Home':
        return <HomeIcon />;
      case 'Search':
        return <SearchIcon />;
      case 'Location Search':
        return <PersonPinCircleIcon />;
      case 'Login':
        return <AccountCircle />;
      case 'User Profile':
        return <EmojiPeopleIcon />;
      case 'Pet Profile':
        return <PetsIcon />;
      default:
        return null;
    }
  };

  const list = (anchor) => (
    <>
      <Toolbar />
      <div
        className={clsx(classes.list)}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {[
            { text: 'Home', link: '/' },
            { text: 'Login', link: '/login' },
            { text: 'Search', link: '/search' },
            { text: 'Location Search', link: '/map' },
            { text: 'User Profile', link: '/userprofile' },
            { text: 'Pet Profile', link: '/petprofile' },
          ].map((el) => (
            <ListItem
              button
              key={el.text}
              className="drawer-text"
              to={el.link}
              component={Link}
            >
              <ListItemIcon className="drawer-icon">
                {iconList(el.text)}
              </ListItemIcon>
              <ListItemText primary={el.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );

  // Wrapped Navbar Return in If/Else so that it does NOT display on landing page
  if (pathname !== '/') {
    return (
      <div>
        <AppBar id="navbar">
          <Toolbar>
            {/* DRAWER BUTTON */}
            <IconButton
              className="navbar-menu"
              onClick={toggleDrawer(anchor, true)}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            {/* HOME BUTTON */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className="navbar-menu"
              to="/"
              component={Link}
            >
              <HomeIcon />
            </IconButton>

            {/* SEARCH BUTTON */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className="navbar-menu"
              to="/search"
              component={Link}
            >
              <SearchIcon />
            </IconButton>

            {/* LOGIN BUTTON */}
            <div id="login-icon">
              <IconButton
                className="navbar-menu"
                edge="end"
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                style={{ zIndex: '1500'}}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {currentUser ? (
                  <span>
                    <MenuItem style={{color: "black"}} component={Link} to="/account" onClick={handleClose}>
                      Account
                    </MenuItem>
                    <MenuItem style={{color: "black"}} component={Link} to="/profile" onClick={handleClose}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Logout styleType={{textTransform: "capitalize", padding: "0", marginLeft: "-5px", color: "black", fontSize: "1em"}} />
                    </MenuItem>
                </span>
                ) : (
                  <span>
                    <MenuItem component={Link} to="/login" onClick={handleClose}>
                      Login
                    </MenuItem>
                    <MenuItem component={Link} to="/register" onClick={handleClose}>
                      Sign Up
                    </MenuItem>
                  </span>
                )}         
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        {/* DRAWER */}
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          className={classes.drawer}
        >
          {list(anchor)}
        </Drawer>
      </div>
    );
  } else {
    return null;
  }
};

export default Nav;
