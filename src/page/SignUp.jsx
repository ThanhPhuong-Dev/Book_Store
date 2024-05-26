import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '~/components/InputForm/InputForm';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as UserServices from '~/services/useService';
import * as Toasts from '~/utils/notification';

function SignUp() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassWord, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(null);
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassWord = () => {
    setShowPassword((eventShowPassword) => !eventShowPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleconfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const mutation = useMutationHook((data) => {
    return UserServices.registerUser(data);
  });
  const { data, isSuccess, isError, error } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      navigate('/login');
      Toasts.successToast({ title: 'Đăng ký thành công' });
    } else if (isError) {
      setDataError(error?.response?.data?.message);
      Toasts.errorToast({ title: `${error?.response?.data?.message}` });
    } else if (data?.status == 'ERR') {
      Toasts.errorToast({ title: `${data?.message}` });
    }
  }, [isSuccess, isError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({ email, password, confirmPassword });
  };

  return (
    <div className=" flex items-center justify-center h-lvh">
      <div className=" flex items-center justify-center w-full h-full bg-black bg-opacity-40">
        <div className="w-[1000px] bg-white flex justify-between shadow-[1px_1px_10px_#ccc]">
          <div className="w-1/2 h-[600px]">
            <img
              className="w-full h-full"
              src="https://vietsach.net/wp-content/uploads/2021/07/2a1a06e8-99c7-11e7-81b0-2e995a9a3302-1.jpg"
              alt=""
            ></img>
          </div>
          <div className="w-1/2 px-6">
            <div className="flex flex-col justify-center h-full">
              <Typography className="text-center text-2xl !font-bold" variant="h4">
                Tạo Tài Khoản
              </Typography>
              <form onSubmit={handleSubmit}>
                <InputForm
                  label="Email"
                  id="email"
                  type="text"
                  value={email}
                  handleChange={handleEmailChange}
                ></InputForm>
                <InputForm
                  label="Mật Khẩu"
                  id="password"
                  type={!showPassWord ? 'password' : 'text'}
                  value={password}
                  handleChange={handlePasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassWord}>
                        {!showPassWord ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                      </IconButton>
                    </InputAdornment>
                  }
                ></InputForm>
                <InputForm
                  label="Xác Minh lại Mật Khẩu"
                  id="confirmPassword"
                  type={!showPassWord ? 'password' : 'text'}
                  value={confirmPassword}
                  handleChange={handleconfirmPasswordChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassWord}>
                        {!showPassWord ? <VisibilityIcon></VisibilityIcon> : <VisibilityOffIcon></VisibilityOffIcon>}
                      </IconButton>
                    </InputAdornment>
                  }
                ></InputForm>
                <Button
                  disabled={!email || !password || !confirmPassword}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  onClick={handleLoading}
                  sx={{
                    mt: 3,
                    position: 'relative',
                    // padding: '12px 0',
                    color: ' white',
                    background: '#27ae61',
                    fontSize: '1.6rem',
                    height: '45px',
                    textTransform: 'capitalize',
                    fontWeight: 700,
                    '&:focus': {
                      background: 'red',
                      outline: 'none'
                    },
                    '&:hover': {
                      background: 'red',
                      opacity: 0.7
                    }
                  }}
                >
                  Tạo Tài Khoản
                  {dataError?.status === 'ERR' && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: '103%',
                        color: 'red',
                        fontSize: '1rem'
                      }}
                    >
                      {dataError?.message}
                    </span>
                  )}
                </Button>
              </form>
              <div className="flex items-center justify-center mt-4 gap-4">
                <p className="text-lg text-[#bdc3c7]">Đã có tài khoản</p>{' '}
                <span onClick={() => navigate('/login')} className="text-[#3498db] text-lg underline">
                  Đăng nhập
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
