import { Avatar, Box, Button, FormControl, Grid, Input, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cutTheFirstLetter from '~/utils/cutTheFirstLetter';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as UserServices from '~/services/useService';
import { useNavigate } from 'react-router-dom';
import RadioProfile from './RadioProfile/RadioProfile';
import * as Toast from '~/utils/notification';
import { updateUser } from '~/redux/Silde/userSilde';
import ProfileUserGrid3 from '~/components/ProfileUserGrid3/ProfileUserGrid3';
function ProfileUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [avatar, setAvatar] = useState(user?.avatar);
  const [address, setAddress] = useState(user?.address);
  const [gender, setGender] = useState(user?.gender);
  const [city, setCity] = useState('');
  const [otherAvatar, setOtherAvatar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = user?.id;
  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAvatar(user?.avatar);
    setAddress(user?.address);
    setGender(user?.gender);
    setCity(user?.city);
  }, [user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOtherAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const mutation = useMutationHook((data) => {
    return UserServices.updateUser(userId, data);
  });
  const { isSuccess, isError, error, isLoading } = mutation;

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      dispatch(updateUser({ name, email, phone, avatar, address, gender, city }));
      Toast.successToast({ title: 'Cập Nhật Thành Công' });
    } else if (isError) {
      Toast.errorToast({ title: 'Cập Nhật Không Thành Công ' });
      setErrorMessage(error.response.data.message);
    }
  }, [isSuccess, isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('avatar', avatar);
    mutation.mutate({ name, email, phone, avatar: otherAvatar, address, gender, city });
  };
  return (
    <Grid container spacing={2} py={2}>
      <ProfileUserGrid3 user={user}></ProfileUserGrid3>
      <Grid item xs={8} md={8}>
        <Box
          sx={{
            paddingBottom: '18px',
            borderBottom: '2px solid #ccc',
            '& .MuiTypography-root': {
              fontSize: '1.5rem'
            }
          }}
        >
          <Typography>Hồ Sơ Của Tôi</Typography>
          <Typography variant="p" sx={{ mt: 2 }}>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} pt={4}>
            <Grid item xs={8} md={8}>
              <InputComponent
                label="Tên Người Dùng"
                id="name"
                value={name}
                type="text"
                handleChange={handleNameChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Email"
                id="email"
                value={email}
                type="text"
                handleChange={handleEmailChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Số Điện Thoại"
                id="phone"
                value={phone}
                type="text"
                handleChange={handlePhoneChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Địa chỉ"
                id="address"
                value={address}
                type="text"
                handleChange={handleAddressChange}
                width="400px"
              ></InputComponent>
              <InputComponent
                label="Thành Phố"
                id="city"
                value={city}
                type="text"
                handleChange={handleCityChange}
                width="400px"
              ></InputComponent>

              <RadioProfile name="Gender" value={gender} handleChange={handleGenderChange}></RadioProfile>

              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: '#ef6c00',
                  px: 2,
                  fontSize: '1.4rem',
                  textTransform: 'capitalize'
                }}
              >
                Lưu
              </Button>
              {errorMessage?.status === 'ERR' && (
                <span style={{ color: 'red', fontSize: '1.3rem', fontWeight: 500, marginLeft: '10px' }}>
                  {errorMessage?.message}
                </span>
              )}
            </Grid>

            <Grid item xs={4} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 2,
                    '& .MuiAvatar-root': {
                      bgcolor: '#ef6c00',
                      width: '100px',
                      height: '100px',
                      fontWeight: 700,
                      fontSize: '5rem',
                      textAlign: 'center'
                    }
                  }}
                >
                  {otherAvatar ? (
                    <Avatar alt="Selected Image" src={otherAvatar} />
                  ) : user?.avatar ? (
                    <Avatar alt="Remy Sharp" src={user?.avatar} />
                  ) : (
                    <Avatar>{cutTheFirstLetter(user?.name)}</Avatar>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ px: 2, fontSize: '1.4rem', textTransform: 'capitalize' }}
                >
                  Chọn Ảnh
                  <input
                    name="avatar"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

export default ProfileUser;
