import React from 'react';
import { Link } from 'react-router-dom';
import {
 
  ListItemText,
 
} from '@mui/material';



import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


interface LeftSideMenuProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export default function LeftSideMenu({ anchorEl, setAnchorEl }: LeftSideMenuProps) {

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { path: '/test1', label: 'My test1'},
    { path: '/test2', label: 'My test2'  },
    { path: '/test3', label: 'My test3'  },
  ];


  return (

    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {menuItems.map((item) => (
        <MenuItem key={item.path} component={Link} to={item.path} onClick={handleClose}>
          <img src='./crown.png'  style={{ width: '5%', height: '5%',}}  ></img>
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
     
    </Menu>
  )
}

