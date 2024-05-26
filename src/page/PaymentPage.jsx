import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Modal, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import formatNumber from '~/utils/formatNumber';

import * as Toast from '~/utils/notification';
import * as OrderServices from '~/services/orderServices';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMutationHook } from '~/hooks/useMutationHook';
import { useNavigate } from 'react-router-dom';
import logo from '~/assets/img/logo.png';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { orderProductBuy, removeAll } from '~/redux/Silde/orderProductSlice';

const style = {
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

function PaymentPage() {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [modalSuccess, setModalSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState('GO_JEK');
  const [payment, setPayment] = useState('later_money');
  const [timeHome, setTimeHome] = useState(12);
  const [running, setRunning] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullname: '',
    address: '',
    phone: '',
    city: ''
  });

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTimeHome((prevCount) => {
          if (prevCount === 0) {
            clearInterval(interval);
            navigate('/');
            return prevCount;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    // Clear interval khi component unmount
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    setShippingAddress({
      fullname: user?.name || '',
      address: user?.address || '',
      phone: user?.phone || '',
      city: user?.city || ''
    });
  }, [user]);

  // useEffect(() => {
  //   dispatch(addOrderUser({ orderItemSelected: order?.orderItemSelected }));
  // }, []);

  const priceMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, item) => {
      return total + Number(item?.price) * item.amount;
    }, 0);

    return result;
  }, []);

  const discountMemo = useMemo(() => {
    const result = order?.orderItemSelected?.reduce((total, item) => {
      return total + item.discount * item.amount;
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, []);

  const deliveryMemo = useMemo(() => {
    if (priceMemo < 100 && priceMemo > 500) {
      return 100;
    } else if (priceMemo > 1000 && priceMemo < 15000) {
      return 200;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return Number(45000000 / 1000000);
    }
  }, []);
  const checkDelivery = useMemo(() => {
    if (delivery == 'FAST') {
      return Number(deliveryMemo + 26.0);
    } else {
      return Number(deliveryMemo);
    }
  }, [delivery]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(discountMemo) + Number(checkDelivery);
  }, [priceMemo, discountMemo, checkDelivery]);

  const handleChangeCheckbox = (e) => {
    setDelivery(e.target.value);
  };

  const handleChangePay = (e) => {
    if (e.target.name === 'laterMoney') {
      setPayment(e.target.value);
    } else if (e.target.name === 'payCoin') {
      setPayment(e.target.value);
    }
  };
  const mutationPayment = useMutationHook((data) => {
    const res = OrderServices.createOrder(data);
    return res;
  });
  const { isLoading, data } = mutationPayment;
  const ClickBuyProduct = () => {
    if (user?.name || user?.address || user?.phone || user?.city) {
      mutationPayment.mutate(
        {
          orderItems: order?.orderItemSelected,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: checkDelivery,
          totalPrice: totalPriceMemo,
          user: user?.id,
          shippingAddress: shippingAddress,
          email: user?.email
        },
        {
          onSuccess: (dataSuccess) => {
            if (dataSuccess?.status == 'OK') {
              Toast.successToast({ title: 'Đặt Hàng Thành Công' });
              const idProduct = order?.orderItemSelected?.map((order) => {
                return order.product;
              });
              dispatch(removeAll({ listChecked: idProduct }));
              dispatch(orderProductBuy(order?.orderItemSelected));
              setModalSuccess(true);
              setRunning(true);
            }
          }
        }
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography sx={{ mb: 2 }}>Thanh Toán</Typography>
      <div className="w-[1200px]">
        <Grid container>
          <Grid item xs={9}>
            {/* Thông Tin */}
            <Box sx={{ padding: '28px 30px 24px', mb: 2, backgroundColor: 'white', boxShadow: '0px 2px 6px #ccc' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: 1 }}>
                <LocationOnIcon sx={{ fontSize: '3rem', color: '#ee4d2d' }}></LocationOnIcon>
                <Typography sx={{ color: '#ee4d2d', fontSize: '1.8rem' }}>Địa Chỉ Nhận Hàng</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiTypography-root ': {
                    fontSize: '1.6rem'
                  }
                }}
              >
                <Box
                  sx={{
                    width: '200px',
                    '& .MuiTypography-root ': {
                      fontWeight: 700
                    }
                  }}
                >
                  <Typography>{user?.name}</Typography>
                  <Typography>{user?.phone}</Typography>
                </Box>
                <Box sx={{ marginLeft: '20px', flex: 1, overflow: 'hidden' }}>
                  <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {`${user?.address} , ${user?.city}`}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ backgroundColor: 'white', padding: '28px 30px 24px', boxShadow: '0px 2px 6px #ccc', mb: 2 }}>
              {/* sản phẩm */}
              {order?.orderItemSelected?.map((product) => (
                <Box
                  key={product.product}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    mb: 2,
                    border: '1px solid #ee4d2d',
                    borderRadius: '10px'
                  }}
                >
                  <Box sx={{ width: '50px', height: '50px', padding: '4px', border: '2px dashed #ee4d2d' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" src={product.image}></img>
                  </Box>
                  <Box sx={{ width: '200px', overflow: 'hidden', mx: 2 }}>
                    <Typography sx={{ fontSize: '1.4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {product.name}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Box>
                      <Typography
                        sx={{ fontSize: '1.2rem', color: '#929292', width: '150px' }}
                      >{`Loại: ${product.type}`}</Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontSize: '1.2rem', color: '#929292', width: '100px' }}
                      >{`Số Lương: ${product.amount}`}</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '1.2rem', color: '#929292', flex: 1 }}>{`Thành Tiền: ${formatNumber(
                        product.price * product.amount
                      )}đ`}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}

              {/* sản phẩm */}
            </Box>

            {/* Thanh toán */}
            <Box sx={{ backgroundColor: 'white', padding: '28px 30px 24px', boxShadow: '0px 2px 6px #ccc', mb: 2 }}>
              <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, mb: 1 }}>Chọn Phương Thức Giao Hàng</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 10px',
                    background: 'rgb(240, 248, 255)',
                    border: '1px solid rgb(194, 225, 255)',
                    borderRadius: '10px'
                  }}
                >
                  <FormControlLabel
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                        <Typography
                          sx={{
                            color: 'red',
                            mr: 1,
                            fontSize: '1.4rem',
                            fontWeight: 600,
                            width: '70px'
                          }}
                        >
                          GO_JEK
                        </Typography>
                        Giao Hàng Tiết Kiệm
                      </Box>
                    }
                    control={
                      <Checkbox value="GO_JEK" checked={delivery === 'GO_JEK'} onChange={handleChangeCheckbox} />
                    }
                  />
                  <FormControlLabel
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                        <Typography
                          sx={{
                            color: 'red',
                            mr: 1,
                            fontSize: '1.4rem',
                            fontWeight: 600,
                            width: '70px'
                          }}
                        >
                          FAST
                        </Typography>{' '}
                        Giao Hàng Nhanh Chóng
                      </Box>
                    }
                    control={<Checkbox value="FAST" checked={delivery === 'FAST'} onChange={handleChangeCheckbox} />}
                  />
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontSize: '1.6rem', fontWeight: 600, mb: 2 }}>Chọn Phương Thức Thanh Toán</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 10px',
                    background: 'rgb(240, 248, 255)',
                    border: '1px solid rgb(194, 225, 255)',
                    borderRadius: '10px'
                  }}
                >
                  <FormControlLabel
                    label={<Typography sx={{ fontSize: '1.4rem' }}>Thanh Toán Tiền Mặt Khi Nhận Hàng</Typography>}
                    control={
                      <Checkbox
                        checked={payment === 'later_money'}
                        name="laterMoney"
                        value="later_money"
                        onChange={handleChangePay}
                      />
                    }
                  />
                  {/* <FormControlLabel
                    disabled={user?.userCoin === undefined || user?.userCoin < totalPriceMemo}
                    label={<Typography sx={{ fontSize: '1.4rem' }}>Thanh Toán PayCoin TPhương </Typography>}
                    control={
                      <Checkbox
                        checked={payment === 'pay_coin'}
                        name="payCoin"
                        value="pay_coin"
                        onChange={handleChangePay}
                      />
                    }
                  /> */}
                </Box>
              </Box>
            </Box>
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
                <Typography sx={{ fontWeight: 600 }}>{priceMemo && formatNumber(priceMemo)}đ</Typography>
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
                <Typography sx={{ fontWeight: 600 }}>
                  {deliveryMemo && (delivery === 'FAST' ? formatNumber(deliveryMemo + 26) : formatNumber(deliveryMemo))}
                  .000đ
                </Typography>
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
                    {totalPriceMemo && formatNumber(totalPriceMemo)}đ
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
                Đặt Hàng
              </Button>
            </Box>
          </Grid>
        </Grid>
      </div>

      {/* modal */}
      <Modal open={modalSuccess} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          {/* logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box onClick={() => navigate('/')}>
              <Box
                sx={{
                  width: '70px',
                  height: '70px',
                  cursor: 'pointer',
                  '& img': {
                    width: '100%',
                    height: '100%'
                  }
                }}
              >
                <img src={logo}></img>
              </Box>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: '#cca77f',
                fontFamily: 'Rubik Maps'
              }}
            >
              PHUONG
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <ShoppingBagIcon sx={{ fontSize: '6rem' }}></ShoppingBagIcon>
            <Box
              sx={{ position: 'absolute', bottom: '-8px', right: '133px', background: 'white', borderRadius: '50%' }}
            >
              <CheckCircleIcon sx={{ fontSize: '3rem', color: '#cca77f' }}></CheckCircleIcon>
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: '1.6rem',
              fontWeight: 700,
              textAlign: 'center',
              mt: 3,
              pb: 2,
              borderBottom: '1px solid black'
            }}
          >
            Mua Hàng Thành Công
          </Typography>
          <Box sx={{ mt: 3 }}>
            timeHome
            <Typography sx={{ fontSize: '1.4rem', textAlign: 'center' }}>Cảm ơn bạn đã mua sắm tại website</Typography>
            <Typography
              sx={{ fontSize: '1.4rem', textAlign: 'center' }}
            >{`Quay trở lại trang chủ sau ${timeHome}`}</Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                '& .MuiButtonBase-root': {
                  flex: 1,
                  fontSize: '1rem',
                  fontWeight: 600,
                  padding: '12px 0'
                }
              }}
            >
              {/* <Button
                variant="outlined"
                sx={{ color: '#34495e', border: '1px solid #34495e' }}
                onClick={() => navigate('/payment/success')}
              >
                Theo dõi đơn hàng
              </Button> */}
              <Button variant="contained" sx={{ background: '#34495e' }} onClick={() => navigate('/')}>
                Tiếp tục mua sắm
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default PaymentPage;
