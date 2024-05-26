// import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Box, Divider, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter';
import cutTheFirstLetter from '~/utils/cutTheFirstLetter';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import * as UserServices from '~/services/useService';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '~/redux/Silde/userSilde';
import { useNavigate } from 'react-router-dom';
// import LoadingComponent from '../LoadingComponent/LoadingComponent';
import StoreIcon from '@mui/icons-material/Store';
function AvatarComponent({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = async () => {
    setLoading(true);
    localStorage.removeItem('access_token');
    navigate('/login');
    dispatch(resetUser());
  };
  return (
    <>
      {/* {loading && <LoadingComponent time={2000}></LoadingComponent>} */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '2px solid #95a5a6',
          px: 2,
          gap: 1,
          borderRadius: '10px',
          cursor: 'pointer',
          transition: '0.5s',
          height: '37px',
          minWidth: '210px',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          '&:hover': {
            background: '#cca77f'
          },
          '& .MuiSvgIcon-root': {
            fontSize: '3rem',
            color: 'white'
          },
          '& .MuiTypography-root': {
            fontSize: '1.6rem',
            color: 'white'
          }
        }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {user?.avatar ? (
          <Avatar
            alt="Remy Sharp"
            src={user?.avatar}
            sx={{
              bgcolor: '#ef6c00',
              width: '30px',
              height: '30px',
              fontWeight: 700,
              fontSize: '1.5rem',
              textAlign: 'center'
            }}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: '#ef6c00',
              width: '30px',
              height: '30px',
              fontWeight: 700,
              fontSize: '1.5rem',
              textAlign: 'center'
            }}
          >
            {cutTheFirstLetter(user?.name)}
          </Avatar>
        )}
        <Typography
          variant="inherit"
          sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontWeight: 600 }}
        >
          {capitalizeFirstLetter(user?.name)}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '& .MuiMenuItem-root': {
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'flex-start'
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
              mr: 1
            },

            '& .MuiTypography-root': {
              fontSize: '1.3rem',
              fontWeight: 600
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <AccountCircleIcon></AccountCircleIcon>
          <Typography>Thông Tin Người Dùng</Typography>
        </MenuItem>
        <MenuItem onClick={() => navigate('/purchase')}>
          <StoreIcon></StoreIcon>
          <Typography>Thông Tin Mua Hàng</Typography>
        </MenuItem>
        {user?.isAdmin && (
          <MenuItem onClick={() => navigate('/system/admin')}>
            <AccountCircleIcon></AccountCircleIcon>
            <Typography>Quản Lý Hệ Thống</Typography>
          </MenuItem>
        )}
        <Divider />

        <MenuItem onClick={handleLogOut}>
          <LogoutIcon></LogoutIcon>
          <Typography>Đăng Xuất</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AvatarComponent;
