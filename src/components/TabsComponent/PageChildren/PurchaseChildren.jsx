import HelpIcon from '@mui/icons-material/Help';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box, Button, Typography } from '@mui/material';
import { Rate } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formatNumber from '~/utils/formatNumber';
import * as Toasts from '~/utils/notification';
import * as RatingServices from '~/services/ratingServices';
function PurchaseChildren({ product, onClick }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleChangeRating = (valueRating) => {
    const book = product.ISBN;
    const userID = user.userId;
    const rating = Number(valueRating * 2);
    submitRating(userID, book, rating);
    Toasts.successToast({ title: 'Đánh giá thành công' });
  };
  const submitRating = async (userID, ISBN, rating) => {
    const res = await RatingServices.evaluate({
      userID,
      ISBN,
      rating
    });
    if (res) {
      await RatingServices.loadData();
    } else {
      Toasts.errorToast({ title: 'Đánh giá thất bại' });
    }
    return res;
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          backgroundColor: 'white',
          boxShadow: '0px -1px 4px #ccc',
          padding: '24px 24px 12px 24px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            pb: 2,
            borderBottom: '1px solid #ccc',
            gap: 1,
            '& .MuiSvgIcon-root ': {
              fontSize: '1.6rem',
              color: '#26aa99'
            },
            '& .MuiTypography-root': {
              fontSize: '1.4rem',
              color: '#26aa99'
            }
          }}
        >
          <LocalShippingIcon></LocalShippingIcon>
          <Typography>Đơn hàng được giao thành công</Typography>
          <HelpIcon></HelpIcon>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100px', height: '100px', border: '1px solid red' }}>
            <img style={{ width: '100%', height: '100%' }} alt="" src={product?.image}></img>
          </Box>
          <Box
            sx={{
              width: '500px',
              ml: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start'
            }}
          >
            <Box
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                lineHeight: '1.2em',
                overflow: 'hidden',
                maxHeight: '48px',
                '& .MuiTypography-root': {
                  fontSize: '1.6rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  verticalAlign: 'middle'
                }
              }}
            >
              <Typography>{product?.name}</Typography>
            </Box>

            <Box
              sx={{
                mt: 1,
                '& .MuiTypography-root': {
                  fontSize: '1.2rem',
                  lineHeight: '1.6rem',
                  color: '#26aa99'
                }
              }}
            >
              <Typography>Phân loại</Typography>
              <Typography>x{product?.amount}</Typography>
              {/* <button onClick={handleRate}> */}
              <Rate onChange={handleChangeRating} allowHalf />
              {/* </button> */}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
            <Typography sx={{ fontSize: '1.4rem', color: 'red' }}>{formatNumber(product?.price)}</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: '#fffefb', pt: 2, borderTop: '1px solid #ccc', boxShadow: '0px 2px 4px #ccc' }}>
        <Box
          sx={{
            padding: '24px 24px 12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& .MuiSvgIcon-root': {
                fontSize: '2.6rem',
                color: 'red'
              }
            }}
          >
            <MonetizationOnIcon></MonetizationOnIcon>
            <Typography sx={{ fontSize: '1.4rem', mr: 2 }}>Thành Tiền:</Typography>
            <Typography
              sx={{
                fontSize: '2.4rem',
                color: 'red',
                fontWeight: 600
              }}
            >
              {formatNumber(product?.price * product?.amount)}đ
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* <Button
              onClick={onClick}
              variant="outlined"
              sx={{
                padding: '10px 20px',
                width: '170px',
                fontSize: '1.4rem',
                border: '1px solid #ee4d2d',
                color: '#ee4d2d'
              }}
            >
              Hủy Đơn hàng
            </Button> */}
            <Button
              onClick={() => navigate(`/product-details/${product.product}`)}
              variant="contained"
              sx={{
                padding: '10px 20px',
                width: '170px',
                fontSize: '1.4rem',
                backgroundColor: '#27ae61',
                color: 'white',
                ':hover': {
                  backgroundColor: '#87e7b1'
                }
              }}
            >
              Mua lại
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PurchaseChildren;
