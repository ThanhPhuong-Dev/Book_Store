import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import DrawerComponent from '~/components/DrawerComponent/DrawerComponent';
import InputComponent from '~/components/InputComponent/InputComponent';
import UploadComponent from '~/components/InputComponent/UploadComponent/UploadComponent';
import TableComponent from '~/components/TableComponent/TableComponent';
import { useMutationHook } from '~/hooks/useMutationHook';
import * as ProductServices from '~/services/productService';
import * as Toasts from '~/utils/notification';

function AdminProduct() {
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRemoveAll, setOpenRemoveAll] = useState(false);
  const [arrayProduct, setArrayProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [otherImage, setOtherImage] = useState('');
  const [imageForm, setImageForm] = useState('');
  const [otherType, setOtherType] = useState('');
  const [otherUpdateType, setOtherUpdateType] = useState('');

  const [stateProduct, setStateProduct] = useState({
    ISBN: '',
    bookTitle: '',
    bookAuthor: '',
    yearPublication: '',
    Publisher: '',
    image: ''
  });
  const [stateUpdateProduct, setStateUpdateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    description: '',
    rating: '',
    location: '',
    discount: '',
    sold: '',
    image: ''
  });
  const userAccess = localStorage.getItem('access_token');

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  //1-----------------Lấy Dữ liệu Data đưa về table-----------------
  const fetchGetDataProduct = async () => {
    setLoading(true);
    try {
      const res = await ProductServices.getAllProduct(10000);
      setLoading(false);
      return res;
    } catch (error) {
      console.log('erre', error);
    }
  };

  const ProductQuery = useQuery(['products'], fetchGetDataProduct);
  const { isLoading: LoadingProduct, data: productData } = ProductQuery;

  const dataTable = productData && productData?.data;

  const renderAction = () => {
    return (
      <Box
        gap={2}
        sx={{
          display: 'flex',
          mt: 2,
          // justifyContent: 'space-between',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: '2rem'
          }
        }}
      >
        <ModeEditIcon sx={{ color: '#74b9ff' }} onClick={handleEditClick}></ModeEditIcon>
        <DeleteIcon sx={{ color: '#d63031' }} onClick={() => setOpenRemoveModal(true)}></DeleteIcon>
      </Box>
    );
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'Book-Title', headerName: 'BookTitle', width: 200 },
    { field: 'Book-Author', headerName: 'BookAuthor', width: 200 },
    { field: 'Year-Of-Publication', headerName: 'Year', width: 130 },
    { field: 'ISBN', headerName: 'ISBN', width: 100 },
    {
      field: 'Publisher',
      headerName: 'Publisher',
      width: 200
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => renderAction(params.row._id)
    }
  ];
  //1end----------------- Lấy Dữ liệu Data đưa về table-----------------

  //2------------Xử Lý khi bấm vào chỉnh sửa sản phẩm gồm :hiện thanh drawer và get lại productDetail và submit

  const handleCloseDrawer = () => {
    setStateUpdateProduct({
      Publisher: '',
      bookTitle: '',
      bookAuthor: '',
      yearPublication: '',
      ISBN: '',
      image: ''
    });
    setOpenDrawer(false);
    setImageForm('');
  };

  //onChangeInput
  const handleChangeProductDetails = (e) => {
    setStateUpdateProduct({
      ...stateUpdateProduct,
      [e.target.name]: e.target.value
    });
  };

  //upload image
  const handleImageChangeDetails = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStateUpdateProduct({
        ...stateUpdateProduct,
        image: file
      });
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageForm(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const fetchDataProductDetail = async () => {
    const res = await ProductServices.getProductDetails(selectedRows);
    const {
      ISBN,
      'Book-Title': bookTitle,
      'Book-Author': bookAuthor,
      'Year-Of-Publication': yearPublication,
      Publisher,
      'Image-URL-L': image
    } = res.data;
    if (res?.data) {
      setStateUpdateProduct({
        ISBN: ISBN || '',
        Publisher: Publisher || '',
        bookTitle: bookTitle || '',
        yearPublication: yearPublication || '',
        bookAuthor: bookAuthor || '',
        image: image || ''
      });
    }
    return res;
  };
  const handleEditClick = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    if (selectedRows) {
      fetchDataProductDetail();
    }
  }, [selectedRows, openDrawer]);

  const handleClickTable = (selectionModel) => {
    setSelectedName(selectionModel.row.name);
    setSelectedRows(selectionModel.id);
  };

  //Xử lý submit update dữ liệu vào data bằng useMutation

  const mutationUpdate = useMutationHook(async (data) => {
    const res = await ProductServices.updateProduct(selectedRows, data);
    return res;
  });

  const { isSuccess: successUpdate, isError: errorUpdate, data } = mutationUpdate;
  useEffect(() => {
    if (successUpdate && data?.status !== 'ERR') {
      setOpenDrawer(false);
      Toasts.successToast({ title: 'Cập nhật thành công ' });
    } else if (errorUpdate) {
      Toasts.errorToast({ title: 'Cập nhật thất bại ' });
    } else if (data?.status === 'ERR') {
      Toasts.errorToast({ title: data?.message });
    }
  }, [successUpdate, errorUpdate]);
  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();

    mutationUpdate.mutate(
      { ...stateUpdateProduct },
      {
        onSettled: () => {
          ProductQuery.refetch();
        }
      }
    );
    setOtherUpdateType('');

    setImageForm('');
  };
  //2end---------Xử Lý khi bấm vào chỉnh sửa sản phẩm gồm :hiện thanh drawer và get lại productDetail và submit

  //3-------------Xử lý khi bấm nút xóa sản phẩm : Hiện thanh modal và bấm có----------

  const mutationRemove = useMutationHook(async (data) => {
    const res = await ProductServices.removeProduct(data?.selectedRows, data?.userAccess);
    return res;
  });

  const { isLoading: loadingRemove, isSuccess: successRemove, isError: errorRemove } = mutationRemove;

  useEffect(() => {
    if (successRemove) {
      Toasts.successToast({ title: `Xóa sản phẩm ${selectedName} thành công` });
      setOpenRemoveModal(false);
    } else if (errorRemove) {
      Toasts.errorToast({ title: `Xóa sản phẩm ${selectedName} thất bại` });
      setOpenRemoveModal(false);
    }
  }, [successRemove, errorRemove]);

  const handleRemoveProduct = () => {
    mutationRemove.mutate(
      { selectedRows, userAccess },
      {
        onSettled: () => {
          ProductQuery.refetch();
        }
      }
    );
  };
  //3end-------------Xử lý khi bấm nút xóa sản phẩm : Hiện thanh modal và bấm có----------

  //4start-------------Xử lý khi bấm nút tất cả xóa sản phẩm :

  const handleRowSelectionChange = (e) => {
    setArrayProduct(e);
  };

  const mutationRemoveAll = useMutationHook(async (data) => {
    const res = await ProductServices.removeProductAll(data?.arrayProduct, data?.userAccess);
    return res;
  });
  const { isLoading: loadingRMAll, isSuccess: successRMAll, isError: errorRMAll } = mutationRemoveAll;
  useEffect(() => {
    if (successRMAll) {
      Toasts.successToast({ title: 'Xóa thành công' });
      setOpenRemoveAll(false);
    } else if (errorRMAll) {
      Toasts.errorToast({ title: 'Xóa không thành công' });
      setOpenRemoveAll(false);
    }
  }, [errorRMAll, successRMAll]);
  const handleRemoveAll = () => {
    mutationRemoveAll.mutate({ arrayProduct, userAccess });
  };
  //4end-------------Xử lý khi bấm nút tất cả xóa sản phẩm :

  //4-------------Khi Tạo Bảng về nhập dữ liệu vào submit để tạo sản phẩm mới------------
  //onChangeInput
  const handleChangeProduct = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Thiết lập kích thước mới cho ảnh
          const MAX_WIDTH = 800; // Chiều rộng tối đa
          const MAX_HEIGHT = 800; // Chiều cao tối đa
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Vẽ ảnh lên canvas
          ctx.drawImage(img, 0, 0, width, height);

          // Chuyển đổi ảnh trên canvas thành base64 với chất lượng thấp hơn
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Chất lượng 0.7 (70%)
          setOtherImage(dataUrl);

          // Chuyển base64 thành file để upload
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const newFile = new File([blob], file.name, { type: 'image/jpeg' });
              setStateProduct({
                ...stateProduct,
                image: newFile
              });
            });
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  //MuTation
  const mutation = useMutationHook((data) => {
    return ProductServices.createProduct(data);
  });

  const { isError, isSuccess, error, isLoading: loadingNew, data: dataCreate } = mutation;
  useEffect(() => {
    if (isSuccess && dataCreate?.status !== 'ERR') {
      setOpenModal(false);
      setStateProduct({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        location: '',
        discount: '',
        sold: '',
        image: ''
      });
      Toasts.successToast({ title: 'Tạo Sản Phẩm Mới Thành Công' });
    } else if (isError) {
      Toasts.errorToast({ title: 'Lỗi Sản Phẩm' });
    } else if (dataCreate?.status == 'ERR') {
      Toasts.errorToast({ title: dataCreate?.message });
    }
  }, [isSuccess, isError]);

  //khi thoát modal
  const handleCancelModal = () => {
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      description: '',
      rating: '',
      location: '',
      discount: '',
      sold: '',
      image: ''
    });
    setOtherType('');
    setOpenModal(false);
  };

  //submit
  const handleSubmitFormNew = (e) => {
    e.preventDefault();

    mutation.mutate(
      {
        ...stateProduct,
        image: otherImage
      },
      {
        onSettled: () => {
          ProductQuery.refetch();
        }
      }
    );
  };
  //4end-------------Khi Tạo Bảng về nhập dữ liệu vào submit để tạo sản phẩm mới-------

  return (
    <>
      <Spin spinning={loading}>
        <Box sx={{ pt: 5 }}>
          <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
            Quản Lý Sản Phẩm
          </Typography>
          <Button
            sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<DeleteForeverIcon></DeleteForeverIcon>}
              onClick={() => setOpenRemoveAll(true)}
              disabled={arrayProduct.length < 2}
            >
              Xóa Tất Cả
            </Button>
          </Box>

          <TableComponent
            products={productData?.data}
            columns={columns}
            rows={dataTable}
            LoadingProduct={LoadingProduct}
            getRowId={(dataTable) => dataTable._id}
            onRowClick={handleClickTable}
            onRowSelectionModelChange={handleRowSelectionChange}
          ></TableComponent>

          <Modal
            open={openModal}
            // onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  borderBottom: '1px solid #ccc',
                  '& .MuiTypography-root': {
                    fontSize: '1.6rem',
                    fontWeight: 700
                  },
                  '& .MuiSvgIcon-root': {
                    fontSize: '2rem'
                  }
                }}
              >
                <Typography>Thông Tin Sản Phẩm</Typography>

                <IconButton onClick={() => setOpenModal(false)}>
                  <CloseIcon></CloseIcon>
                </IconButton>
              </Box>
              <form onSubmit={handleSubmitFormNew}>
                <InputComponent
                  label="ISBN"
                  id="ISBN"
                  name="ISBN"
                  value={stateProduct.ISBN}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                {/* <InputComponent
              label="Type"
              id="type"
              name="type"
              value={stateProduct.type}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent> */}

                <InputComponent
                  label="Book-Title"
                  id="bookTitle"
                  name="bookTitle"
                  value={stateProduct.bookTitle}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Book-Author"
                  id="bookAuthor"
                  name="bookAuthor"
                  value={stateProduct.bookAuthor}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Year"
                  id="yearPublication"
                  name="yearPublication"
                  value={stateProduct.yearPublication}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Publisher"
                  id="Publisher"
                  name="Publisher"
                  value={stateProduct.Publisher}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>

                <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mr: 6 }}>Image</Typography>
                  <UploadComponent handleImageChange={handleImageChange}></UploadComponent>
                  {otherImage && (
                    <img src={otherImage} style={{ width: '33px', height: '33px', marginLeft: '10px' }}></img>
                  )}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    '& .MuiButtonBase-root': {
                      ml: 1,
                      padding: '8px 16px',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{ borderColor: '#34495e', color: '#34495e' }}
                    onClick={handleCancelModal}
                  >
                    Thoát
                  </Button>
                  <Button
                    // disabled={
                    //   stateProduct.name &&
                    //   stateProduct.countInStock &&
                    //   stateProduct.description &&
                    //   stateProduct.discount &&
                    //   stateProduct.location &&
                    //   stateProduct.price &&
                    //   stateProduct.rating &&
                    //   stateProduct.sold &&
                    //   (stateProduct.type || otherType) &&
                    //   stateProduct.image
                    //     ? false
                    //     : true
                    // }
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: '#34495e' }}
                  >
                    Tạo Mới
                  </Button>
                </Box>
              </form>
            </Box>
          </Modal>

          {/* DrawerHandle */}
          <DrawerComponent anchor="right" openDrawer={openDrawer} closeDrawer={handleCloseDrawer}>
            <Box
              sx={{
                mt: 9,
                px: 4
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 2,
                  py: 1,
                  width: '400px',
                  borderBottom: '1px solid #ccc',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  '& .MuiTypography-root': {
                    fontSize: '1.6rem',
                    fontWeight: 700
                  }
                }}
              >
                <Typography
                  sx={{
                    overflow: 'hidden' /* Ẩn nội dung bị tràn */,
                    whiteSpace: 'nowrap' /* Ngăn ngừa việc ngắt dòng */,
                    textOverflow: 'ellipsis'
                  }}
                >
                  Thông Tin Sản Phẩm {selectedName}
                </Typography>
              </Box>
              <form onSubmit={handleSubmitUpdateForm}>
                <InputComponent
                  disabled={true}
                  label="ISBN"
                  id="ISBN"
                  name="ISBN"
                  value={stateUpdateProduct.ISBN}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>

                <InputComponent
                  label="bookTitle"
                  id="bookTitle"
                  name="bookTitle"
                  value={stateUpdateProduct.bookTitle}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="bookAuthor"
                  id="bookAuthor"
                  name="bookAuthor"
                  value={stateUpdateProduct.bookAuthor}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="yearPublication"
                  id="yearPublication"
                  name="yearPublication"
                  value={stateUpdateProduct.yearPublication}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Publisher"
                  id="Publisher"
                  name="Publisher"
                  value={stateUpdateProduct.Publisher}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>

                <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mr: 12 }}>Image</Typography>
                  <UploadComponent handleImageChange={handleImageChangeDetails}></UploadComponent>
                  {imageForm ? (
                    <img
                      src={imageForm}
                      name="image"
                      style={{ width: '33px', height: '33px', marginLeft: '10px' }}
                    ></img>
                  ) : (
                    stateUpdateProduct?.image && (
                      <img
                        src={stateUpdateProduct.image}
                        name="image"
                        style={{ width: '33px', height: '33px', marginLeft: '10px' }}
                      ></img>
                    )
                  )}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& .MuiButtonBase-root': {
                      ml: 1,
                      padding: '8px 16px',
                      fontSize: '1.2rem',
                      fontWeight: 600
                    }
                  }}
                >
                  <Button variant="contained" type="submit" sx={{ backgroundColor: '#34495e' }}>
                    Cập Nhật
                  </Button>
                </Box>
              </form>
            </Box>
          </DrawerComponent>

          {/* modal của xóa */}
          <Modal
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
                Bạn có chắc xóa sản phẩm {selectedName} không?
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
          </Modal>

          {/* modal xóa tất cả */}
          <Modal
            open={openRemoveAll}
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
                Bạn có chắc chắn xóa tất cả sản phẩm này không ?
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
                <Button variant="outlined" onClick={() => setOpenRemoveAll(false)}>
                  Không
                </Button>
                <Button variant="contained" sx={{ backgroundColor: '#ff3838' }} onClick={handleRemoveAll}>
                  Xóa
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Spin>
    </>
  );
}

export default AdminProduct;
