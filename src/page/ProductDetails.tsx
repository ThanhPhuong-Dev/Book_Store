import { Box, Button, Grid, Typography } from '@mui/material';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import BaseButton from '~/components/baseButton/BaseButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as ProductServices from '~/services/productService';
import { useQuery } from 'react-query';
import * as ProductService from '~/services/productService';
import CardComponent from '~/components/CardComponent/CardComponent';
import { dataContentBased, dataDefault } from '~/utils/setData';
import BaseRadio from '~/components/baseRadio/BaseRadio';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct, orderProductBuy } from '~/redux/Silde/orderProductSlice';
import * as Toasts from '~/utils/notification';

function ProductDetails() {
  const { id: idBook } = useParams();
  const [dataBook, setDataBook] = useState(null);
  const [amount, setAmount] = useState(1);
  const [limit, setLimit] = useState(24);
  const [itemBased, setItemBased] = useState(null);
  const [contentBased, setContentBased] = useState(null);
  const [dataResult, setDataResult] = useState(null);
  const [dataContent, setDataContent] = useState(null);
  const [radio, setRadio] = useState('item_base');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const fetchProductDetail = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    const res = await ProductServices.getProductDetails(id);

    setDataBook(res);
    return res;
  };

  const { data: productDetail, isLoading } = useQuery(['productDetail', idBook], fetchProductDetail, {
    enabled: !!idBook
  });

  const {
    'Image-URL-L': imagee,
    'Book-Title': bookTitle,
    'Book-Author': bookAuthor,
    Publisher,
    'Year-Of-Publication': year,
    ISBN: price
  } = productDetail?.data || {};

  console.log('radio', radio);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await ProductServices.itemBased(bookTitle);
        if (res) {
          setItemBased(res);
          return res;
        }
        setItemBased(dataDefault);
      };
      const fetchContentData = async () => {
        const res = await ProductServices.contentBased(bookTitle);
        if (res) {
          setContentBased(res);
          return res;
        }
        setContentBased(dataContentBased);
      };
      fetchData();
      fetchContentData();
    } catch (error) {
      console.log(error);
    }
  }, [bookTitle]);

  useEffect(() => {
    const fetchTypeProduct = async (context) => {
      const limitProduct = context?.queryKey[1].limit;
      const pageProduct = context?.queryKey[1].page;
      if (itemBased) {
        const res = await ProductServices.mongoRecommend(limitProduct, pageProduct, itemBased);

        if (res?.status === 'OK') {
          setDataResult(res?.data);
        }
        return res;
      }
    };

    fetchTypeProduct({ queryKey: ['product-type', limit, 1] });
  }, [itemBased]);

  useEffect(() => {
    const fetchTypeProduct = async (context) => {
      const limitProduct = context?.queryKey[1].limit;
      const pageProduct = context?.queryKey[1].page;
      if (contentBased) {
        const res = await ProductServices.mongoRecommend(limitProduct, pageProduct, contentBased);

        if (res?.status === 'OK') {
          setDataContent(res?.data);
        }
        return res;
      }
    };

    fetchTypeProduct({ queryKey: ['product-content', limit, 1] });
  }, [contentBased]);

  const handleBuyNow = () => {
    if (user?.name && user?.city && user?.address && user?.phone) {
      dispatch(
        orderProductBuy([
          {
            name: bookTitle,
            amount: amount,
            image: imagee,
            price: !isNaN(price)
              ? Number(price / 1000)
                  .toLocaleString()
                  .split(',')[0]
              : 120.0,
            product: productDetail?.data._id
          }
        ])
      );
      navigate('/payment');
    } else {
      Toasts.errorToast({ title: 'Cập nhập thông tin người dùng' });
    }
  };
  const handleAddCart = () => {
    if (!user?.id) {
      navigate('/login', { state: location.pathname });
    } else {
      console.log('teirwerw', Number(price / 1000).toLocaleString());

      dispatch(
        addOrderProduct({
          orderItem: {
            name: bookTitle,
            amount: amount,
            image: imagee,
            price: !isNaN(price)
              ? Number(price / 1000)
                  .toLocaleString()
                  .split(',')[0]
              : 120.0,
            product: productDetail?.data?._id
          }
        })
      );
    }
  };

  return (
    <>
      <div className="bg-[#f5f5f5] h-svh">
        <h1 className="ml-[160px] !mt-6 text-left text-lg font-medium">Thông tin sách</h1>
        <div className="w-[1200px] mt-[20px] m-auto bg-white p-6 shadow-[1px_1px_10px_#ccc]">
          <Grid container spacing={2}>
            <Grid className="flex justify-center items-center border-r-2" item xs={5}>
              <div className="border-[4px] border-[#ccc] w-[340px] h-[500px] overflow-hidden">
                <Image width={340} height={500} className="w-full h-full object-cover" src={imagee} alt="" />
              </div>
            </Grid>
            <Grid item xs={7}>
              <Typography className="!font-bold text-primary pb-6 border-b border-[#ccc]" variant="h4">
                {bookTitle}
              </Typography>
              <div className="flex items-center justify-between gap-20 py-6 border-b  border-[#ccc]">
                <p className="text-2xl text-[#2c3e50] font-bold w-[400px]">Tác Giả: {bookAuthor}</p>
                <p className="text-2xl text-center text-primary font-bold w-full">
                  Giá: {!isNaN(price) ? Number(price / 1000).toLocaleString() : '120.000'}VND
                </p>
              </div>
              <div className="flex py-6 items-center">
                <p className="text-2xl text-[#2c3e50] font-bold w-[400px]">Nhà Xuất bản: {Publisher}</p>
                <p className="text-2xl text-[#2c3e50] font-bold ">Năm: {year}</p>
              </div>
              <Box
                sx={{
                  mt: 2,
                  py: 2,
                  borderTop: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiTypography-root': {
                    fontSize: '1.4rem'
                  }
                }}
              >
                <Typography>Số Lượng</Typography>
                <Box
                  sx={{
                    ml: 4,
                    display: 'flex',
                    '& .MuiButton-outlined': {
                      fontSize: '1.3rem',
                      height: '32px',
                      width: '32px',
                      p: 0,
                      border: '1px solid #ccc'
                    },
                    '& .MuiTypography-root': {
                      fontSize: '1.4rem',
                      height: '32px',
                      width: '64px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid #ccc',
                      borderRadius: '5px'
                    }
                  }}
                >
                  <Button variant="outlined" onClick={handleDecrement}>
                    <RemoveIcon></RemoveIcon>
                  </Button>
                  <Typography>{amount}</Typography>
                  <Button variant="outlined" onClick={handleIncrement}>
                    <AddIcon></AddIcon>
                  </Button>
                </Box>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  gap: 2,
                  display: 'flex',
                  '& .MuiButtonBase-root': {
                    fontSize: '1.4rem',
                    height: '50px'
                  }
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<AddShoppingCartIcon></AddShoppingCartIcon>}
                  onClick={handleAddCart}
                  sx={{
                    color: '#27ae61',
                    background: 'white',
                    border: '1px solid #27ae61',
                    '&:hover': {
                      background: 'rgba(39,174,97,0.181)',
                      border: '1px solid #27ae61'
                    }
                  }}
                >
                  Thêm Vào Giỏ Hàng
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="contained"
                  disableElevation
                  sx={{
                    background: '#27ae61',
                    fontSize: '1.4rem',
                    padding: '0 60px',
                    '&:hover': {
                      background: '#da8170'
                    }
                  }}
                >
                  Mua Ngay
                </Button>
              </Box>
            </Grid>
          </Grid>
        </div>

        <div className="flex justify-center mt-6">
          <BaseRadio setRadio={setRadio} radio={radio}></BaseRadio>
        </div>

        {radio === 'item_base' && (
          <div className="flex justify-center mt-6">
            <div className="w-[1200px]">
              <div className="flex justify-center">
                <h2 className=" bg-primary bg-opacity-20 p-4 text-3xl font-bold text-primary border border-primary rounded-md">
                  Sách đề xuất theo Item_Base
                </h2>
              </div>

              <div className="w-full grid grid-cols-[repeat(5,_1fr)] gap-3 px-[0] pb-[50px] mt-2">
                {dataResult?.map((item) => (
                  <CardComponent key={item._id} books={item}></CardComponent>
                ))}
              </div>
            </div>
          </div>
        )}

        {radio === 'content_base' && (
          <div className="flex justify-center mt-6">
            <div className="w-[1200px]">
              <div className="flex justify-center">
                <h2 className=" bg-primary bg-opacity-20 p-4 text-3xl font-bold text-primary border border-primary rounded-md">
                  Sách đề xuất theo Content_Based
                </h2>
              </div>

              <div className="w-full grid grid-cols-[repeat(5,_1fr)] gap-3 px-[0] pb-[50px] mt-2">
                {dataContent?.map((item) => (
                  <CardComponent key={item._id} books={item}></CardComponent>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
