import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, Button, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/cart.svg';
import useStyles from './styles';

const PrimarySearchAppBar = ({ totalItems, isEditingInvMethod, isEditing }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const classes = useStyles();
  const location = useLocation();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit"  style={{backgroundColor: '#044D8C'}}>
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} style={{color: 'whitesmoke'}}>
            <img src={logo} alt="commerce.js" height="25px" className={classes.image}/> My Digi-Shop
          </Typography>
          {
            location.pathname === '/'
            ? <>
                <Button 
                  variant='contained' 
                  onClick={isEditingInvMethod}
                  style={{marginRight: 10, backgroundColor: '#F2CC39'}}
                >
                  {
                    isEditing ? 'Cancel' : 'Edit Inventory'
                  }
                </Button>
                <Button 
                  variant='contained' 
                  onClick={() => window.open('https://dashboard.chec.io/products/add', '_self')}
                  style={{marginRight: 10, backgroundColor: '#F2CC39'}}
                >
                  Add Item
                </Button>
              </>
            : null
          }
          <div className={classes.grow} />
          {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
