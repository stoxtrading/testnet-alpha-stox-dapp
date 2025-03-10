import { Link } from 'react-router-dom';



import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { HeaderMenuTypography } from '../../assets/elements/CustomTypography';


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
    { path: '/', label: 'Home'},
    { path: '/trading', label: 'Trade'  },
    { path: '/liquidity', label: 'Liquidity'  },
    { path: '/smart-contracts', label: 'Smart Contracts'  },
    { path: '/airdrop', label: 'Airdrop'  }, 
    { path: '/rewards', label: 'Rewards'  }, 
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
             <HeaderMenuTypography> {item.label} </HeaderMenuTypography>
         
        </MenuItem>
      ))}
     
    </Menu>
  )
}

