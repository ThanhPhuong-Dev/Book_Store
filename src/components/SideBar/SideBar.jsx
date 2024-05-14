import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonIcon from '@mui/icons-material/Person';
import ListItemComponent from './ListItemComponent/ListItemComponent';
import logo from '~/assets/img/logo.png';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter';
import { useNavigate } from 'react-router-dom';
import StoreIcon from '@mui/icons-material/Store';
import AdminUser from '~/page/AdminPage/AdminComponent/AdminUser';
import AdminProduct from '~/page/AdminPage/AdminComponent/AdminProduct';
import AdminOrder from '~/page/AdminPage/AdminComponent/AdminOrder';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

function SideBar() {
  const user = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menudata, setMenudata] = useState('AdminUser');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#34495e', boxShadow: '1px 1px 1px #ccc' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              fontSize: '2rem',
              ...(open && { display: 'none' })
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Quản Lý Người Dùng
          </Typography>
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              // border: '2px solid #95a5a6',
              flex: 1,
              px: 2,
              gap: 1,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: '0.5s',
              height: '37px',
              minWidth: '180px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              justifyContent: 'center',
              // '&:hover': {
              //   background: '#cca77f'
              // },
              '& .MuiSvgIcon-root': {
                fontSize: '3rem',
                color: 'white'
              },
              '& .MuiTypography-root': {
                fontSize: '1.6rem',
                color: 'white'
              }
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={user?.avatar}
              sx={{
                bgcolor: '#ef6c00',
                width: '30px',
                height: '30px',
                fontWeight: 700,
                fontSize: '1.5rem',
                textAlign: 'center',
                border: '2px solid #95a5a6'
              }}
            />
            <Typography
              variant="inherit"
              sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: 600 }}
            >
              {capitalizeFirstLetter(user?.name)}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Box sx={{ width: '60px', height: '60px' }}>
              <img src={logo} alt="" style={{ width: '100%', height: '100%' }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: '#cca77f',
                fontFamily: 'Rubik Maps'
              }}
            >
              Phương
            </Typography>
          </Box>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemComponent
            primary="Người Dùng"
            icon={<PersonIcon></PersonIcon>}
            open={open}
            handleClick={() => setMenudata('AdminUser')}
          ></ListItemComponent>

          <ListItemComponent
            primary="Sản Phẩm"
            icon={<InventoryIcon></InventoryIcon>}
            open={open}
            handleClick={() => setMenudata('AdminProduct')}
          ></ListItemComponent>
          <ListItemComponent
            primary="Đơn Mua"
            icon={<StoreIcon></StoreIcon>}
            open={open}
            handleClick={() => setMenudata('AdminOrder')}
          ></ListItemComponent>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: '100vh' }}>
        {menudata === 'AdminUser' && <AdminUser></AdminUser>}
        {menudata === 'AdminProduct' && <AdminProduct></AdminProduct>}
        {menudata === 'AdminOrder' && <AdminOrder></AdminOrder>}
      </Box>
    </Box>
  );
}

export default SideBar;
