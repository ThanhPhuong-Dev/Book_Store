// import {
//   Box,
//   Button,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Modal,
//   Radio,
//   RadioGroup,
//   Typography
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import TableComponent from '~/components/TableComponent/TableComponent';
// import { useQuery } from 'react-query';
// import * as OrderServices from '~/services/orderService';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import { useEffect, useState } from 'react';
// import DrawerComponent from '~/components/DrawerComponent/DrawerComponent';
// import InputComponent from '~/components/InputComponent/InputComponent';
// import UploadComponent from '~/components/InputComponent/UploadComponent/UploadComponent';
// import RadioProfile from '~/pages/ProfileUser/RadioProfile/RadioProfile';
// import { useMutationHook } from '~/hooks/useMutationHook';
// import * as Toast from '~/utils/notification';
// import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';
// import PieCharts from '~/components/PieCharts/PieCharts';
// import formatNumber from '~/utils/formatNumber';
// function AdminOrder() {
//   const [openRemoveModal, setOpenRemoveModal] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [userId, setUserId] = useState('');
//   const [stateUser, setStateUser] = useState({
//     email: '',
//     name: '',
//     gender: '',
//     isAdmin: false,
//     phone: '',
//     address: '',
//     avatar: '',
//     city: ''
//   });
//   const styleModal = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     maxWidth: 550,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4
//   };
//   const userAccess = localStorage.getItem('access_token');

//   const fetchOrderAll = async () => {
//     const res = OrderServices.getAllOrder(userAccess);
//     return res;
//   };

//   const userQuery = useQuery(['order'], fetchOrderAll);

//   const { data: dataOrderAll } = userQuery;

//   const dataRows = dataOrderAll && dataOrderAll?.data;
//   const renderAction = () => {
//     return (
//       <Box
//         gap={2}
//         sx={{
//           display: 'flex',
//           // justifyContent: 'space-between',
//           alignItems: 'center',
//           '& .MuiSvgIcon-root': {
//             fontSize: '2rem'
//           }
//         }}
//       >
//         <DeleteIcon sx={{ color: '#d63031' }} onClick={() => setOpenRemoveModal(true)}></DeleteIcon>
//         <ModeEditIcon sx={{ color: '#74b9ff' }} onClick={() => setOpenDrawer(true)}></ModeEditIcon>
//       </Box>
//     );
//   };

//   const columns = [
//     {
//       field: 'user',
//       headerName: 'User',
//       width: 230,
//       valueGetter: (params) => params.row?.shippingAddress?.fullname || ''
//     },
//     {
//       field: 'phone',
//       headerName: 'Phone',
//       width: 150,
//       valueGetter: (params) => params.row?.shippingAddress?.phone || ''
//     },
//     {
//       field: 'address',
//       headerName: 'Address',
//       width: 200,
//       valueGetter: (params) => params.row?.shippingAddress?.address || ''
//     },
//     {
//       field: 'totalOrder',
//       headerName: 'Đơn Hàng',
//       width: 100,
//       valueGetter: (params) => params.row?.orderItems?.length || ''
//     },
//     {
//       field: 'totalPrice',
//       headerName: 'Total-Price',
//       width: 200,
//       valueGetter: (params) => `${formatNumber(params.row?.totalPrice)}đ` || ''
//     },

//     {
//       field: 'paymentMethod',
//       headerName: 'PaymentMethod',
//       width: 260,
//       valueGetter: (params) => {
//         return params.row?.paymentMethod === 'later_money'
//           ? 'Thanh toán tiền mặt khi nhận hàng'
//           : params.row?.paymentMethod === 'pay_coin'
//           ? 'Thanh toán bằng PayCoin'
//           : '';
//       }
//     },
//     { field: 'createdAt', headerName: 'Thời Gian Mua', width: 230 }
//   ];
//   const handleClickTable = (e) => {
//     setUserId(e.row);
//   };

//   //  ----------------------------cập nhật sửa đổi thông tin người giùm bằng các getDetailsUser để hiện thông tin từng người-----
//   // const mutationDeleteUser = useMutationHook((data) => {
//   //   const res = UserServices.deleteUser(data?.userRemoveID, data?.userAccess);
//   //   return res;
//   // });
//   // const userRemoveID = userId._id;
//   // const { isLoading: loadingRemove, isSuccess: successRemove, isError: errorRemove } = mutationDeleteUser;
//   // useEffect(() => {
//   //   if (successRemove) {
//   //     setOpenRemoveModal(false);
//   //     Toast.successToast({ title: `Đã xóa người dùng ${userId?.name} có id ${userRemoveID}` });
//   //   } else if (errorUpdate) {
//   //     setOpenRemoveModal(false);
//   //     Toast.errorToast({ title: 'Xóa người dùng thất bại' });
//   //   }
//   // }, [successRemove, errorRemove]);
//   // const handleRemoveProduct = () => {
//   //   mutationDeleteUser.mutate(
//   //     { userRemoveID, userAccess },
//   //     {
//   //       onSettled: () => {
//   //         userQuery.refetch();
//   //       }
//   //     }
//   //   );
//   // };
//   return (
//     <>
//       {<LoadingComponent time={2000}></LoadingComponent>}
//       <Box sx={{ pt: 5 }}>
//         <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
//           Quản Lý Đơn Đặt Hàng
//         </Typography>
//         <Box sx={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <PieCharts order={dataOrderAll}></PieCharts>
//         </Box>
//         {/* <Button
//           sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }}
//           // onClick={() => setOpenAddModal(true)}
//         >
//           <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
//         </Button> */}
//         <TableComponent
//           columns={columns}
//           rows={dataRows}
//           getRowId={(table) => table._id}
//           onRowClick={handleClickTable}
//         ></TableComponent>
//       </Box>

//       {/* Xóa Người dùng */}
//       {/* <Modal
//         open={openRemoveModal}
//         // onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={styleModal}>
//           <Typography
//             sx={{
//               fontSize: '1.6rem',
//               fontWeight: 600
//             }}
//           >
//             Bạn có chắc xóa người dùng {userId?.name} không?
//           </Typography>
//           <Box
//             sx={{
//               mt: 4,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'flex-end',
//               '& .MuiButtonBase-root': {
//                 fontSize: '1.2rem',
//                 fontWeight: 500,
//                 ml: 1
//               }
//             }}
//           >
//             <Button variant="outlined" onClick={() => setOpenRemoveModal(false)}>
//               Không
//             </Button>
//             <Button variant="contained" sx={{ backgroundColor: '#ff3838' }} onClick={handleRemoveProduct}>
//               Xóa
//             </Button>
//           </Box>
//         </Box>
//       </Modal> */}
//     </>
//   );
// }

// export default AdminOrder;

function AdminOrder() {
  return <div>fsdfds</div>;
}

export default AdminOrder;
