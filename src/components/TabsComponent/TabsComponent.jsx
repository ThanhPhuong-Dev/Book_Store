import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Box from '@mui/material/Box';
import TabPanelComponent from './TabPanelComponent/TabPanelComponent';
import PurchaseChildren from './PageChildren/PurchaseChildren';
import { useQuery } from 'react-query';
import * as OrderServices from '~/services/orderServices';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Typography } from '@mui/material';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as Toasts from '~/utils/notification';
function TabsComponent() {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.user);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrderUser = () => {
    const res = OrderServices.getOrderUser(user?.id);
    return res;
  };
  const orderUser = useQuery(['order-user'], fetchOrderUser, { enabled: !!user?.id });
  const mutationCancel = useMutationHook((data) => {
    const res = OrderServices.orderCancel(data?.id);
    return res;
  });
  const handleCancel = (id) => {
    mutationCancel.mutate(
      { id },
      {
        onSettled: () => {
          Toasts.successToast({ title: 'Xóa thành công' });
          orderUser.refetch();
        }
      }
    );
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'white' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tất Cả" />
        </Tabs>
      </Box>
      <TabPanelComponent value={value} index={0}>
        {orderUser.status === 'success' &&
          (orderUser?.data?.totalOrderUser.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto',
                height: '90vh',
                '& .MuiTypography-root': { fontSize: '1.6rem' }
              }}
            >
              <Typography>Chưa Có Đơn Hàng</Typography>
            </Box>
          ) : (
            orderUser?.data?.totalOrderUser.map((product) => (
              <PurchaseChildren
                key={product._id}
                product={product}
                onClick={() => handleCancel(product._id)}
              ></PurchaseChildren>
            ))
          ))}
      </TabPanelComponent>
    </Box>
  );
}

export default TabsComponent;
