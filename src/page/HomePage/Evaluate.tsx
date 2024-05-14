import React, { useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import CardComponent from '~/components/CardComponent/CardComponent';
import * as ProductServices from '~/services/productService';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

function Evaluate() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [arrProduct, setArrProduct] = useState([]);
  const [dataMongo, setDataMongo] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setloading] = useState(false);
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 0
  });

  useEffect(() => {
    const dataArrayRcm = async () => {
      const res = await ProductServices.recommend(user?.userId);
      setArrProduct(res);
      return res;
    };
    dataArrayRcm();
  }, []);
  useEffect(() => {
    const fetchTypeProduct = async (context) => {
      setloading(true);

      const limitProduct = context?.queryKey[1].limit;
      const pageProduct = context?.queryKey[1].page;
      if (arrProduct.length > 0) {
        handleChangePage;
        const res = await ProductServices.mongoRecommend(limitProduct, pageProduct, arrProduct);
        setloading(false);

        setResult(res);
        if (res?.status === 'OK') {
          setDataMongo(res?.data);
        }
        return res;
      }
    };

    fetchTypeProduct({ queryKey: ['product-type', pagination, location?.state] });
  }, [arrProduct, pagination, location?.state]);

  const handleChangePage = (e, pageCurrnet) => {
    setloading(true);
    setPagination({
      ...pagination,
      limit: 10,
      page: pageCurrnet - 1
    });
    setTimeout(() => {
      setloading(false);
    }, 1500);
  };
  return (
    <Box>
      <Spin spinning={loading}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: 'calc( 100vh - 80px )',
            justifyContent: 'space-between'
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 2
            }}
          >
            {dataMongo?.map((product, index) => (
              <CardComponent key={index} books={product}></CardComponent>
            ))}
          </Box>
          <Pagination
            defaultPage={pagination?.page + 1}
            count={result?.totalPage}
            variant="outlined"
            color="secondary"
            size="large"
            page={Number(pagination?.page + 1)}
            onChange={handleChangePage}
            sx={{
              my: 2,
              textAlign: 'center'
            }}
          />
        </Box>
      </Spin>
    </Box>
  );
}

export default Evaluate;
