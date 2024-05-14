import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import CardComponent from '~/components/CardComponent/CardComponent';
import SwiperComponent from '~/components/Swiper/SwiperComponent';
// import styles from '~/components/CssComponents/Home.module.scss';
import BaseRadio from '~/components/baseRadio/BaseRadio';
import * as ProductService from '~/services/productService';
import { Spin } from 'antd';
function MainPage() {
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const timeOutLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const fetchDataProductAll = async (context) => {
    try {
      timeOutLoading();
      const limitt = context?.queryKey && context?.queryKey[1];
      const res = await ProductService.getAllProduct(limitt);
      return res;
    } catch (error) {
      console.log('error', error);
    }
  };

  const productAll = useQuery(['product', limit], fetchDataProductAll, { retry: 3, retryDelay: 1000 });
  const { data: ProductData, isLoading } = productAll;

  return (
    <div>
      <SwiperComponent></SwiperComponent>
      <Spin spinning={loading}>
        <div className="mt-10 flex flex-col items-center justify-center">
          <h1 className="bg-primary bg-opacity-20 p-4 text-3xl font-bold text-primary border border-primary rounded-md">
            Tổng hợp sách
          </h1>
          <div className="w-full grid grid-cols-[repeat(5,_1fr)] gap-6 px-[0] py-[50px]">
            {ProductData?.data?.map((book) => (
              <CardComponent key={book._id} books={book}></CardComponent>
            ))}
          </div>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2
            }}
          >
            <Button
              disabled={ProductData?.data.length === ProductData?.totalProduct}
              sx={{
                width: '400px',
                height: '40px',
                fontSize: '1.2rem'
              }}
              variant="outlined"
              onClick={() => setLimit((prev) => prev + 5)}
            >
              Xem Thêm
            </Button>
          </Box>
        </div>
      </Spin>
    </div>
  );
}

export default MainPage;
