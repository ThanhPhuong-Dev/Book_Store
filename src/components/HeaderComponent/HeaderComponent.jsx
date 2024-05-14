import logo from '../../assets/img/logo.png';
import styles from '../CssComponents/HeaderComponent.module.scss';
import { useNavigate } from 'react-router-dom';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import { Badge, Box, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { Button, Typography } from 'antd';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useEffect, useState } from 'react';
import UseDebounce from '~/utils/Debounce';
import * as ProductService from '~/services/productService';
import TippyComponent from '../TippyComponent/TippyComponent';
function HeaderComponent() {
  const navigate = useNavigate();
  const orderProduct = useSelector((state) => state.order);

  const user = useSelector((state) => state.user);

  const [searchValue, setSearchValue] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const searchDebounce = UseDebounce(searchValue, 500);
  useEffect(() => {
    if (!searchDebounce.trim()) {
      return setResultSearch([]);
    }
    const fetchSearchProduct = async () => {
      const res = await ProductService.searchProduct(searchDebounce);
      console.log('res', res);
      setResultSearch(res);
    };
    fetchSearchProduct();
  }, [searchDebounce]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  const handleFocus = () => {
    setShowResult(true);
  };

  const onHide = () => {
    setShowResult(false);
    setSearchValue('');
  };
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

          <TippyComponent resultSearch={resultSearch} handleHide={onHide} showResult={showResult}>
            <Box
              sx={{
                display: 'flex',
                flex: 1,
                maxWidth: '50%',
                ml: 2,
                '& .MuiTextField-root': {
                  bgcolor: '#00000033',
                  outline: 'none',
                  borderRadius: '5px 0 0 5px',
                  fontSize: '2rem',
                  '&:focus': {
                    outline: 'none',
                    border: 'none',
                    color: 'red'
                  },

                  '& .MuiInputLabel-root': {
                    color: '#95a5a6',
                    fontSize: '1.4rem'
                  },
                  '& .MuiInputBase-root': {
                    fontSize: '1.4rem'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    color: 'blue',
                    border: '1px'
                  }
                }
              }}
            >
              <TextField
                sx={{
                  bgcolor: '#00000033'
                }}
                value={searchValue}
                size="small"
                fullWidth
                id="outlined-search"
                label="Search Product"
                type="search"
                onChange={handleSearch}
                onFocus={handleFocus}
              />
              {/* <Button
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: '#f57224',
                  color: 'white',
                  borderRadius: '0 5px 5px 0',

                  '&:hover': {
                    background: '#cca77f'
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '2.5rem'
                  }
                }}
              >
                <SearchIcon />
              </Button> */}
            </Box>
          </TippyComponent>

          <div className={styles.action}>
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

            <Box
              onClick={() => navigate('/order')}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '1.3rem',
                    fontWeight: 600
                  }
                }}
                badgeContent={orderProduct?.orderItems?.length}
                color="primary"
                max={99}
              >
                <ShoppingCartIcon
                  sx={{
                    fontSize: '3rem',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                ></ShoppingCartIcon>
              </Badge>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;
