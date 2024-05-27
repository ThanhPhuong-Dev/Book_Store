import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import TableComponent from '~/components/TableComponent/TableComponent';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as OrderServices from '~/services/orderServices';
import formatNumber from '~/utils/formatNumber';
import * as Toast from '~/utils/notification';
function AdminOrder() {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userId, setUserId] = useState('');
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

  const fetchOrderAll = async () => {
    const res = OrderServices.getAllOrder();
    return res;
  };

  const userQuery = useQuery(['order'], fetchOrderAll);

  const { data: dataOrderAll } = userQuery;

  const dataRows = dataOrderAll && dataOrderAll?.data;
  const columns = [
    {
      field: 'email',
      headerName: 'Email',
      width: 300
    },

    {
      field: 'shippingAddress',
      headerName: 'name',
      width: 150,
      valueGetter: (params) => params?.fullname
    },
    // {
    //   field: 'shippingAddress',
    //   headerName: 'Address',
    //   width: 200,
    //   valueGetter: (params) => params?.address || ''
    // },
    {
      field: 'orderItems',
      headerName: 'Đơn Hàng',
      width: 100,
      valueGetter: (params) => {
        return params?.length;
      }
    },
    {
      field: 'totalPrice',
      headerName: 'Total-Price',
      width: 150
      // valueGetter: (params) => params?.row?.totalPrice || ''
    },

    {
      field: 'paymentMethod',
      headerName: 'PaymentMethod',
      width: 200,
      valueGetter: (params) => {
        return params === 'later_money'
          ? 'Thanh toán tiền mặt khi nhận hàng'
          : params.row?.paymentMethod === 'pay_coin'
          ? 'Thanh toán bằng PayCoin'
          : '';
      }
    },
    { field: 'createdAt', headerName: 'Thời Gian Mua', width: 230 }
  ];
  const handleClickTable = (e) => {
    setUserId(e.row);
  };

  // const mutationDeleteUser = useMutationHook((data) => {
  //   const res = UserServices.deleteUser(data?.userRemoveID, data?.userAccess);
  //   return res;
  // });
  // const userRemoveID = userId._id;
  // const { isLoading: loadingRemove, isSuccess: successRemove, isError: errorRemove } = mutationDeleteUser;
  // useEffect(() => {
  //   if (successRemove) {
  //     setOpenRemoveModal(false);
  //     Toast.successToast({ title: `Đã xóa người dùng ${userId?.name} có id ${userRemoveID}` });
  //   } else if (errorUpdate) {
  //     setOpenRemoveModal(false);
  //     Toast.errorToast({ title: 'Xóa người dùng thất bại' });
  //   }
  // }, [successRemove, errorRemove]);
  // const handleRemoveProduct = () => {
  //   mutationDeleteUser.mutate(
  //     { userRemoveID, userAccess },
  //     {
  //       onSettled: () => {
  //         userQuery.refetch();
  //       }
  //     }
  //   );
  // };
  return (
    <>
      <Box sx={{ pt: 5 }}>
        <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Quản Lý Đơn Đặt Hàng
        </Typography>
        {/* <Box sx={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PieCharts order={dataOrderAll}></PieCharts>
        </Box> */}
        {/* <Button
          sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }}
          // onClick={() => setOpenAddModal(true)}
        >
          <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
        </Button> */}
        <TableComponent
          columns={columns}
          rows={dataRows}
          getRowId={(table) => table._id}
          onRowClick={handleClickTable}
        ></TableComponent>
      </Box>

      {/* Xóa Người dùng */}
      {/* <Modal
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
      </Modal> */}
    </>
  );
}

export default AdminOrder;
