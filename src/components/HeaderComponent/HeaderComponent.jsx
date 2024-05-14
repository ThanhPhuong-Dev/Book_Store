import logo from '../../assets/img/logo.png';
import styles from '../CssComponents/HeaderComponent.module.scss';
import { FaShoppingCart } from 'react-icons/fa';
import SearchComponent from './SearchComponent';
import { useNavigate } from 'react-router-dom';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import PersonIcon from '@mui/icons-material/Person';

function HeaderComponent() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className={styles.headers}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={() => navigate('/')}>
            <div className={styles.image}>
              <img src={logo} alt=""></img>
            </div>
            <h1 className={styles.nameStore}>Phuong Book</h1>
          </div>

          <SearchComponent></SearchComponent>

          <div className={styles.action}>
            <h1 className={styles.home}>Trang Chủ</h1>
            {user?.name ? (
              <AvatarComponent user={user}></AvatarComponent>
            ) : (
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
              >
                <PersonIcon></PersonIcon>
                <Typography variant="inherit" onClick={() => navigate('/login')}>
                  Tài Khoản
                </Typography>
              </Box>
            )}
            <FaShoppingCart className={styles.shoppingCart}></FaShoppingCart>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;
