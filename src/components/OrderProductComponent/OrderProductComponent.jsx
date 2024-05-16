import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import formatNumber from '~/utils/formatNumber';
import { useDispatch } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '~/redux/Silde/orderProductSlice';
function OrderProductComponent({ orderItem, listChecked, setListChecked }) {
  const dispatch = useDispatch();
  const styleTitleHeader = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .MuiTypography-root ': {
      fontSize: '1.4rem',
      fontWeight: 600
    }
  };
  const handleChangecheck = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListCheck = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListCheck);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleChangeCrement = (type, idProduct) => {
    if (type === 'decrement') {
      if (orderItem?.amount > 1) {
        dispatch(decreaseAmount({ idProduct }));
      }
    } else if (orderItem?.countInStock > orderItem?.amount) {
      dispatch(increaseAmount({ idProduct }));
    }
  };

  const handleRemoveProduct = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  return (
    <Grid
      container
      sx={{ mt: 2, p: 1, borderRadius: '10px', backgroundColor: 'white', boxShadow: ' 0px -2px 12px #ccc' }}
    >
      <Grid item xs={5}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={listChecked.includes(orderItem?.product)}
            value={orderItem?.product}
            // indeterminate={checked[0] !== checked[1]}
            onChange={handleChangecheck}
          />
          <Box sx={{ width: '80px', height: '80px' }}>
            <img style={{ width: '100%', height: '100%' }} src={orderItem?.image} alt="" />
          </Box>
          <Box
            sx={{
              ml: 1,
              width: '200px',
              overflow: 'hidden',
              //   whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              // '-webkit-line-clamp': 2,
              // '-webkit-box-orient': 'vertical',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
              lineHeight: '1.5' // Khoảng cách giữa các dòng
            }}
          >
            <Typography
              sx={{
                fontSize: '1.6rem'
              }}
            >
              {orderItem?.name}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid container item xs={7}>
        <Grid item xs={4} sx={styleTitleHeader}>
          <Typography>{(orderItem?.price / 100000).toLocaleString()}đ</Typography>
        </Grid>
        <Grid item xs={3} sx={styleTitleHeader}>
          <Box
            sx={{
              display: 'flex',
              '& .MuiButton-outlined': {
                fontSize: '1.3rem',
                height: '30px',
                minWidth: '30px',
                p: 0,
                border: '1px solid #ccc',
                borderRadius: '0'
              },
              '& .MuiTypography-root': {
                fontSize: '1.4rem',
                height: '30px',
                width: '30px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #ccc'
                // borderRadius: '5px'
              }
            }}
          >
            <Button variant="outlined" onClick={() => handleChangeCrement('decrement', orderItem?.product)}>
              <RemoveIcon></RemoveIcon>
            </Button>
            <Typography>{orderItem?.amount}</Typography>
            <Button variant="outlined" onClick={() => handleChangeCrement('increment', orderItem?.product)}>
              <AddIcon></AddIcon>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={4} sx={styleTitleHeader}>
          <Typography>{Number((orderItem?.price * orderItem?.amount) / 100000).toLocaleString()}đ</Typography>
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
          <IconButton aria-label="delete" onClick={() => handleRemoveProduct(orderItem?.product)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OrderProductComponent;
