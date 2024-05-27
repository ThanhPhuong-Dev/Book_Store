import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';
import loginImage from '../../public/login.jpg';
import { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BaseButton from '~/components/baseButton/BaseButton';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as UserServices from '~/services/useService';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Toasts from '~/utils/notification';
import { jwtDecode } from 'jwt-decode';
import { updateUser } from '~/redux/Silde/userSilde';

function Login() {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassWord, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event?.target?.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassWord = () => {
    setShowPassword((eventShowPassword) => !eventShowPassword);
  };

  const mutation = useMutationHook((data) => {
    return UserServices.loginUser(data);
  });

  const { data, isSuccess, isError, error } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate('/');
      }

      Toasts.successToast({ title: 'Đăng Nhập Thành Công' });
      localStorage.setItem('access_token', data?.access_token);
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    } else if (isError) {
      Toasts.errorToast({ title: 'Đăng Nhập Thất Bại' });
      setDataError(error.response.data.message);
    } else if (data?.status == 'ERR') {
      Toasts.errorToast({ title: `${data?.message}` });
    }
  }, [isSuccess, isError]);

  const handleGetDetailUser = async (id, access_token) => {
    const res = await UserServices.getDetailrUser(id, access_token);
    // const storage = localStorage.getItem('refresh_token');
    // const refreshToken = JSON.parse(storage);
    dispatch(updateUser({ ...res?.data, access_token }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ email, password });
  };
  return (
    <div className=" flex items-center justify-center h-lvh">
      <div className=" flex items-center justify-center w-full h-full bg-black bg-opacity-40">
        <div className="w-[1000px] bg-white flex justify-between shadow-[1px_1px_10px_#ccc]">
          <div className="w-1/2 h-[600px]">
            <img className="w-full h-full" src={loginImage} alt=""></img>
          </div>
          <div className="w-1/2 px-6">
            <div className="flex flex-col justify-center h-full">
              <Typography className="text-center text-2xl !font-bold" variant="h4">
                Đăng Nhập
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    '.MuiInputBase-input': {
                      fontSize: '16px'
                    },
                    '.MuiFormLabel-root': {
                      fontSize: '16px',
                      color: '#16a34a'
                    },
                    '.css-1eed5fa-MuiInputBase-root-MuiInput-root::after': {
                      borderBottom: '2px solid #16a34a'
                    }
                  }}
                  className="flex flex-col px-8 justify-center gap-6"
                >
                  <TextField
                    onChange={handleEmailChange}
                    value={email}
                    id="email"
                    label="Tên tài khoản"
                    variant="standard"
                  />
                  <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                      onChange={handlePasswordChange}
                      value={password}
                      id="password"
                      type={showPassWord ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassWord}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassWord ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <BaseButton label="Đăng Nhập" type="submit"></BaseButton>
                </Box>
              </form>
              <div className="flex items-center justify-center mt-4 ">
                <p className="text-lg text-[#bdc3c7]">Chưa có tài khoản?</p>{' '}
                <span onClick={() => navigate('/sign-up')} className="text-[#3498db] text-lg underline">
                  Tạo tài khoản
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
