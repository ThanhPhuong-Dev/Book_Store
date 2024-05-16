import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '~/components/InputComponent/InputComponent';
import OrderProductComponent from '~/components/OrderProductComponent/OrderProductComponent';
import { useMutationHook } from '~/hooks/useMutationHook';
import { removeAll, selectedOrder } from '~/redux/Silde/orderProductSlice';
import { updateUser } from '~/redux/Silde/userSilde';
import * as UserServices from '~/services/useService';
import formatNumber from '~/utils/formatNumber';
import * as Toast from '~/utils/notification';
const styleTitleHeader = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& .MuiTypography-root ': {
    fontSize: '1.4rem',
    fontWeight: 600
  }
};
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function OrderPage() {
  const [listChecked, setListChecked] = useState([]);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userFormUpdate, setUserFormUpdate] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  useEffect(() => {
    setUserFormUpdate({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || ''
    });
  }, [user]);

  const handleChangeCheckBoxAll = (e) => {
    if (e.target.checked) {
      let newListCheckAll = [];
      order?.orderItems?.forEach((item) => newListCheckAll.push(item.product));
      setListChecked(newListCheckAll);
    } else {
      setListChecked([]);
    }
  };
  const handleRemoveALl = () => {
    if (listChecked.length > 1) {
      dispatch(removeAll({ listChecked }));
      setListChecked([]);
    }
  };
  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    return result;
  }, [order]);

  const discountMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, item) => {
      return total + item.discount * item.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);
  const deliveryMemo = useMemo(() => {
    if (priceMemo < 10.0 && priceMemo > 1) {
      return 10.0;
    } else if (priceMemo > 10.0 && priceMemo < 500.0) {
      return 200;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 450000;
    }
  }, [order]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountMemo) + Number(deliveryMemo);
  }, [priceMemo, discountMemo, deliveryMemo]);
  console.log('disdfsadfsdaf', totalPriceMemo);

  const handleChangeUpdate = (e) => {
    setUserFormUpdate({
      ...userFormUpdate,
      [e.target.name]: e.target.value
    });
  };

  const mutationUpdate = useMutationHook(async (data) => {
    const res = await UserServices.updateUser(user?.id, data);
    return res;
  });

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    mutationUpdate.mutate(
      { ...userFormUpdate },
      {
        onSuccess: (user) => {
          dispatch(updateUser({ ...user?.data }));
          setOpenModal(false);
        }
      }
    );
  };
  const handleExit = () => {
    setUserFormUpdate({
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || ''
    });
    setOpenModal(false);
  };
  const ClickBuyProduct = () => {
    if (listChecked?.length < 1) {
      Toast.errorToast({ title: 'Hãy Chọn Sản Phẩm' });
    } else {
      navigate('/payment');
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography sx={{ mb: 2 }}>Giỏ Hàng</Typography>
      <div className="w-[1200px]">
        <Grid container>
          <Grid item xs={9}>
            <Grid
              container
              sx={{ p: 1, borderRadius: '10px', backgroundColor: 'white', boxShadow: ' 0px -2px 12px #ccc' }}
            >
              <Grid item xs={5}>
                <FormControlLabel
                  sx={{
                    marginLeft: '0',
                    '& .MuiTypography-root': {
                      fontSize: '1.4rem',
                      fontWeight: 600
                    }
                  }}
                  label={`Tất Cả (${order?.orderItems?.length} Sản Phẩm )`}
                  control={
                    <Checkbox
                      checked={listChecked?.length === order?.orderItems?.length}
                      onChange={handleChangeCheckBoxAll}
                    />
                  }
                />
              </Grid>
              <Grid container item xs={7}>
                <Grid item xs={4} sx={styleTitleHeader}>
                  <Typography sx={{}}>Đơn Giá</Typography>
                </Grid>
                <Grid item xs={3} sx={styleTitleHeader}>
                  <Typography>Số Lượng</Typography>
                </Grid>
                <Grid item xs={4} sx={styleTitleHeader}>
                  <Typography>Thành Tiền</Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeft: '1px solid #ccc',
                    '& .MuiSvgIcon-root ': {
                      fontSize: '2rem'
                    }
                  }}
                >
                  <IconButton aria-label="delete" onClick={handleRemoveALl}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            {/* headerAll end*/}

            {order?.orderItems?.map((item) => (
              <OrderProductComponent
                key={item.product}
                orderItem={item}
                listChecked={listChecked}
                setListChecked={setListChecked}
              ></OrderProductComponent>
            ))}
          </Grid>

          <Grid item xs={3}>
            <Box
              sx={{
                ml: 2,
                p: 2,
                width: '272px',
                backgroundColor: 'white',
                boxShadow: ' 0px -2px 12px #ccc',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                overflowY: 'auto',
                top: '110px',
                right: '172px'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '1.4rem', textDecoration: 'underline', fontWeight: 600 }}>
                  {user?.city}
                </Typography>
                <Typography
                  onClick={() => setOpenModal(true)}
                  sx={{ fontSize: '1.4rem', fontWeight: 500, color: '#3498db', cursor: 'pointer' }}
                >
                  Đổi Địa Chỉ
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem'
                  }
                }}
              >
                <Typography>Tạm Tính</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {priceMemo && Number(priceMemo / 100000).toLocaleString()}đ
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem'
                  }
                }}
              >
                <Typography>Giảm Giá</Typography>
                <Typography sx={{ fontWeight: 600 }}>{discountMemo}%</Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem'
                  }
                }}
              >
                <Typography>Thuế</Typography>
                <Typography sx={{ fontWeight: 600 }}>0</Typography>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem'
                  }
                }}
              >
                <Typography>Phí Giao Hàng</Typography>
                <Typography sx={{ fontWeight: 600 }}>{deliveryMemo && formatNumber(deliveryMemo)}đ</Typography>
              </Box>
              <Box
                sx={{
                  mt: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                  // justifyContent: 'space-between',
                }}
              >
                <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mb: 1 }}>Tổng Tiền</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, color: 'red', fontSize: '2.4rem' }}>
                    {totalPriceMemo && Number(totalPriceMemo / 100000).toLocaleString()}đ
                  </Typography>
                </Box>
              </Box>
              <Button
                onClick={ClickBuyProduct}
                variant="contained"
                disableElevation
                sx={{
                  mt: 3,
                  background: '#ee4d2d',
                  fontSize: '1.4rem',
                  padding: '0 60px',
                  fontWeight: 600,
                  height: '50px',
                  '&:hover': {
                    background: '#f05d40'
                  }
                }}
              >
                Mua Ngay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography sx={{ mb: 2, fontSize: '1.6rem', fontWeight: 700, textAlign: 'center' }}>
            Thông Tin Khách Hàng
          </Typography>
          <form onSubmit={handleSubmitUpdate}>
            <InputComponent
              label="Name"
              id="name"
              type="text"
              name="name"
              value={userFormUpdate.name}
              handleChange={handleChangeUpdate}
              width="250px"
            ></InputComponent>
            <InputComponent
              label="Phone"
              id="phone"
              type="text"
              name="phone"
              value={userFormUpdate.phone}
              handleChange={handleChangeUpdate}
              width="250px"
            ></InputComponent>
            <InputComponent
              label="City"
              id="city"
              type="text"
              name="city"
              value={userFormUpdate.city}
              handleChange={handleChangeUpdate}
              width="250px"
            ></InputComponent>
            <InputComponent
              label="Address"
              id="address"
              type="text"
              name="address"
              value={userFormUpdate.address}
              handleChange={handleChangeUpdate}
              width="250px"
            ></InputComponent>
            <Box
              sx={{
                gap: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                '& .MuiButtonBase-root': {
                  padding: '10px',
                  transition: '0.5s',
                  fontWeight: 600,

                  '&:hover': {
                    background: '#2c3e50',
                    color: 'white'
                  }
                }
              }}
            >
              <Button variant="outlined" sx={{ border: '1px solid #ee4d2d', color: '#ee4d2d' }} onClick={handleExit}>
                Thoát
              </Button>
              <Button
                disabled={
                  !userFormUpdate.city || !userFormUpdate.name || !userFormUpdate.address || !userFormUpdate.phone
                }
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#ee4d2d' }}
              >
                Cập Nhật
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default OrderPage;
