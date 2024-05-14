import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableComponent from '~/components/TableComponent/TableComponent';
import { useQuery } from 'react-query';
import * as UserServices from '~/services/useService';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useEffect, useState } from 'react';
import DrawerComponent from '~/components/DrawerComponent/DrawerComponent';
import InputComponent from '~/components/InputComponent/InputComponent';
import UploadComponent from '~/components/InputComponent/UploadComponent/UploadComponent';
import RadioProfile from '~/components/RadioProfile/RadioProfile';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as Toast from '~/utils/notification';
// import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';
function AdminUser() {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState('');
  const [otherAvatar, setOtherAvatar] = useState('');
  const [stateUser, setStateUser] = useState({
    email: '',
    name: '',
    gender: '',
    isAdmin: false,
    phone: '',
    address: '',
    avatar: '',
    city: ''
  });
  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };
  const userAccess = localStorage.getItem('access_token');

  const fetchUserAll = async () => {
    const res = UserServices.getUserAll(userAccess);
    return res;
  };

  const userQuery = useQuery(['users'], fetchUserAll);
  const { isLoading: loadingAllUser, isSuccess: succesAllUser, data: UserDatas } = userQuery;
  const dataRows = UserDatas && UserDatas?.data;
  const renderAction = () => {
    return (
      <Box
        gap={2}
        sx={{
          display: 'flex',
          mt: 2,
          // justifyContent: 'space-between',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: '2rem'
          }
        }}
      >
        <DeleteIcon sx={{ color: '#d63031' }} onClick={() => setOpenRemoveModal(true)}></DeleteIcon>
        <ModeEditIcon sx={{ color: '#74b9ff' }} onClick={() => setOpenDrawer(true)}></ModeEditIcon>
      </Box>
    );
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 230 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'userId', headerName: 'UserId', width: 100 },
    { field: 'isAdmin', headerName: 'IsAdmin', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 100 },
    {
      field: 'address',
      headerName: 'Address',
      width: 130
    },
    { field: 'email', headerName: 'Email', width: 230 },

    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => renderAction(params.row._id)
    }
  ];
  const handleClickTable = (e) => {
    setUserId(e.row);
  };

  //----------------------------cập nhật sửa đổi thông tin người giùm bằng các getDetailsUser để hiện thông tin từng người-----
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStateUser({
        ...stateUser,
        avatar: file
      });

      const reader = new FileReader();
      reader.onload = (event) => {
        setOtherAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const fetchUserDetails = async () => {
    const res = await UserServices.getDetailrUser(userId?._id, userAccess);
    if (res?.data) {
      setStateUser({
        email: res?.data.email || '',
        name: res?.data.name || '',
        gender: res?.data.gender || '',
        isAdmin: res?.data.isAdmin || false,
        phone: res?.data.phone || '',
        address: res?.data.address || '',
        avatar: res?.data.avatar || '',
        city: res?.data.city || ''
      });
    }
    return res;
  };
  useEffect(() => {
    if (userId?._id) {
      fetchUserDetails();
    }
  }, [userId]);

  const handleChangeUserDetails = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value
    });
  };
  const mutationUpdateUser = useMutationHook(async (data) => {
    const res = await UserServices.updateUser(userId?._id, data);
    return res;
  });
  const { isSuccess: successUpdate, isLoading: loadingUpdate, isError: errorUpdate } = mutationUpdateUser;
  useEffect(() => {
    if (successUpdate) {
      Toast.successToast({ title: 'Cập nhập người dùng thành công' });
    } else if (errorUpdate) {
      Toast.errorToast({ title: 'Cập nhập người dùng thất bại' });
    }
  }, [successUpdate, errorUpdate]);
  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();
    setOpenDrawer(false);
    const formdata = new FormData();
    formdata.append('avatar', stateUser.avatar);
    mutationUpdateUser.mutate(
      { ...stateUser, formdata },
      {
        onSettled: () => {
          userQuery.refetch();
        }
      }
    );
    setOtherAvatar('');
  };
  // ----------------------------cập nhật sửa đổi thông tin người giùm bằng các getDetailsUser để hiện thông tin từng người-----
  const mutationDeleteUser = useMutationHook((data) => {
    const res = UserServices.deleteUser(data?.userRemoveID, data?.userAccess);
    return res;
  });
  const userRemoveID = userId._id;
  const { isLoading: loadingRemove, isSuccess: successRemove, isError: errorRemove } = mutationDeleteUser;
  useEffect(() => {
    if (successRemove) {
      setOpenRemoveModal(false);
      Toast.successToast({ title: `Đã xóa người dùng ${userId?.name} có id ${userRemoveID}` });
    } else if (errorUpdate) {
      setOpenRemoveModal(false);
      Toast.errorToast({ title: 'Xóa người dùng thất bại' });
    }
  }, [successRemove, errorRemove]);
  const handleRemoveProduct = () => {
    mutationDeleteUser.mutate(
      { userRemoveID, userAccess },
      {
        onSettled: () => {
          userQuery.refetch();
        }
      }
    );
  };
  return (
    <>
      {/* {loadingAllUser || loadingUpdate || loadingRemove || <LoadingComponent time={2300}></LoadingComponent>} */}
      <Box sx={{ pt: 5 }}>
        <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Quản Lý Người Dùng
        </Typography>
        <Button
          disabled={true}
          sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }}
          // onClick={() => setOpenAddModal(true)}
        >
          <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
        </Button>
        <TableComponent
          columns={columns}
          rows={dataRows}
          getRowId={(table) => table._id}
          onRowClick={handleClickTable}
        ></TableComponent>

        <DrawerComponent anchor="right" openDrawer={openDrawer} closeDrawer={handleCloseDrawer}>
          <Box
            sx={{
              mt: 9,
              px: 4
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
                py: 1,
                borderBottom: '1px solid #ccc',
                '& .MuiTypography-root': {
                  fontSize: '1.6rem',
                  fontWeight: 700
                }
              }}
            >
              <Typography>Thông Tin Sản Phẩm {userId?.name}</Typography>
            </Box>
            <form onSubmit={handleSubmitUpdateForm}>
              <InputComponent
                label="Email"
                id="email"
                name="email"
                value={stateUser.email}
                handleChange={handleChangeUserDetails}
                width="350px"
                disabled={true}
              ></InputComponent>
              <InputComponent
                label="Name"
                id="name"
                name="name"
                value={stateUser.name}
                handleChange={handleChangeUserDetails}
                width="350px"
              ></InputComponent>
              <InputComponent
                label="Phone"
                id="phone"
                name="phone"
                value={stateUser.phone}
                handleChange={handleChangeUserDetails}
                width="350px"
              ></InputComponent>
              <InputComponent
                label="Address"
                id="address"
                name="address"
                value={stateUser.address}
                handleChange={handleChangeUserDetails}
                width="350px"
              ></InputComponent>
              <InputComponent
                label="City"
                id="city"
                name="city"
                value={stateUser.city}
                handleChange={handleChangeUserDetails}
                width="350px"
              ></InputComponent>
              <RadioProfile
                name="gender"
                value={stateUser.gender}
                handleChange={handleChangeUserDetails}
              ></RadioProfile>
              <FormControl
                fullWidth
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  mb: 2,
                  '& .MuiFormLabel-root': {
                    fontSize: '1.4rem',
                    fontWeight: 600,
                    mr: 2
                  }
                }}
              >
                <FormLabel id="radio-isAdmin">IsAdmin</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-isAdmin"
                  name="isAdmin"
                  value={String(stateUser.isAdmin)}
                  onChange={handleChangeUserDetails}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '1.4rem'
                    }
                  }}
                >
                  <FormControlLabel value="true" control={<Radio />} label="True" />
                  <FormControlLabel value="false" control={<Radio />} label="False" />
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mr: 12 }}>Image</Typography>
                <UploadComponent handleImageChange={handleImageChange}></UploadComponent>
                {otherAvatar ? (
                  <img src={otherAvatar} style={{ width: '33px', height: '33px', marginLeft: '10px' }}></img>
                ) : (
                  <img src={stateUser.avatar} style={{ width: '33px', height: '33px', marginLeft: '10px' }}></img>
                )}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '& .MuiButtonBase-root': {
                    ml: 1,
                    padding: '8px 16px',
                    fontSize: '1.2rem',
                    fontWeight: 600
                  }
                }}
              >
                <Button
                  disabled={
                    stateUser.name && stateUser.address && stateUser.phone && stateUser.gender && stateUser.phone
                      ? false
                      : true
                  }
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: '#34495e' }}
                >
                  Cập Nhật
                </Button>
              </Box>
            </form>
          </Box>
        </DrawerComponent>
      </Box>

      {/* Xóa Người dùng */}
      <Modal
        open={openRemoveModal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            sx={{
              fontSize: '1.6rem',
              fontWeight: 600
            }}
          >
            Bạn có chắc xóa người dùng {userId?.name} không?
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              '& .MuiButtonBase-root': {
                fontSize: '1.2rem',
                fontWeight: 500,
                ml: 1
              }
            }}
          >
            <Button variant="outlined" onClick={() => setOpenRemoveModal(false)}>
              Không
            </Button>
            <Button variant="contained" sx={{ backgroundColor: '#ff3838' }} onClick={handleRemoveProduct}>
              Xóa
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AdminUser;
