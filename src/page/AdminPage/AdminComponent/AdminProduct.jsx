import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableComponent from '~/components/TableComponent/TableComponent';
import { useEffect, useState } from 'react';
import UploadComponent from '~/components/InputComponent/UploadComponent/UploadComponent';
import CloseIcon from '@mui/icons-material/Close';
import * as ProductServices from '~/services/productService';
import { useMutationHook } from '~/hooks/useMutationHook';
import { useQuery } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DrawerComponent from '~/components/DrawerComponent/DrawerComponent';
import * as Toasts from '~/utils/notification';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import InputComponent from '~/components/InputComponent/InputComponent';
import { Spin } from 'antd';

function AdminProduct() {
  const [openModal, setOpenModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openRemoveAll, setOpenRemoveAll] = useState(false);
  const [arrayProduct, setArrayProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [otherImage, setOtherImage] = useState('');
  const [imageForm, setImageForm] = useState('');
  const [otherType, setOtherType] = useState('');
  const [otherUpdateType, setOtherUpdateType] = useState('');

  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    description: '',
    rating: 1,
    location: '',
    discount: '',
    sold: ''
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
      const res = await ProductServices.getAllProduct(280000);
      setLoading(false);
      return res;
    } catch (error) {
      console.log('erre', error);
    }
  };
  const fetchTypeProduct = async () => {
    const res = await ProductServices.typeProduct();
    return res;
  };

  const ProductQuery = useQuery(['products'], fetchGetDataProduct);
  const TypeQuery = useQuery(['type-product'], fetchTypeProduct);
  const { data: dataTypeProduct } = TypeQuery;
  const { isLoading: LoadingProduct, data: productData } = ProductQuery;
  // const dataTable =
  //   productData?.data.length &&
  //   productData?.data?.map((product) => {
  //     return { ...product, key: product._id };
  //   });
  const dataTable = productData && productData?.data;

  useEffect(() => {
    if (!ProductQuery.data && !ProductQuery.isLoading) {
      fetchGetDataProduct();
    }
    if (!dataTypeProduct && !TypeQuery.isLoading) {
      fetchTypeProduct();
    }
  }, [ProductQuery, TypeQuery]);

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
        <DeleteIcon sx={{ color: '#d63031' }} onClick={() => setOpenRemoveModal(true)}></DeleteIcon>
        <ModeEditIcon sx={{ color: '#74b9ff' }} onClick={handleEditClick}></ModeEditIcon>
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
    if (res?.data) {
      setStateUpdateProduct({
        name: res?.data.name || '',
        type: res?.data.type || '',
        countInStock: res?.data.countInStock || '',
        price: res?.data.price || '',
        description: res?.data.description || '',
        rating: res?.data.rating || '',
        location: res?.data.location || '',
        discount: res?.data.discount || '',
        sold: res?.data.sold || '',
        image: res?.data.image || ''
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
    return await ProductServices.updateProduct(selectedRows, userAccess, data);
  });

  const { isLoading: loadingUpdate, isSuccess: successUpdate, isError: errorUpdate, data } = mutationUpdate;

  useEffect(() => {
    if (successUpdate && data?.status === 'OK') {
      setOpenDrawer(false);
      Toasts.successToast({ title: 'Cập nhật thành công ' });
    } else if (errorUpdate) {
      Toasts.errorToast({ title: 'Cập nhật thất bại ' });
    }
  }, [successUpdate]);
  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image', stateUpdateProduct.image);
    if (otherUpdateType) {
      mutationUpdate.mutate(
        { ...stateUpdateProduct, type: otherUpdateType, formdata },
        {
          onSettled: () => {
            ProductQuery.refetch();
          }
        }
      );
      setOtherUpdateType('');
    } else {
      mutationUpdate.mutate(
        { ...stateUpdateProduct, formdata },
        {
          onSettled: () => {
            ProductQuery.refetch();
          }
        }
      );
    }
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
      // const formdata = new FormData();
      // formdata.append('image', file);
      setStateProduct({
        ...stateProduct,
        image: file
      });
      const reader = new FileReader();
      reader.onload = (event) => {
        setOtherImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //MuTation
  const mutation = useMutationHook((data) => {
    return ProductServices.createProduct(data);
  });

  const { isError, isSuccess, error, isLoading: loadingNew } = mutation;

  useEffect(() => {
    if (isSuccess) {
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
    const formdata = new FormData();
    formdata.append('image', stateProduct.image);
    if (otherType) {
      mutation.mutate(
        { ...stateProduct, type: otherType, formdata },
        {
          onSettled: () => {
            ProductQuery.refetch();
          }
        }
      );
      setOtherType('');
    } else {
      mutation.mutate(
        { ...stateProduct, formdata },
        {
          onSettled: () => {
            ProductQuery.refetch();
          }
        }
      );
    }
  };
  //4end-------------Khi Tạo Bảng về nhập dữ liệu vào submit để tạo sản phẩm mới-------

  const handleSelectedType = (e) => {
    const typeName = e.target.value;
    setSelectedType(typeName);
    if (typeName === 'other-type') {
      setOtherType('');
    } else {
      setStateProduct({
        ...stateProduct,
        type: typeName
      });
    }
  };
  const handleAddType = (e) => {
    setOtherType(e.target.value);
  };

  const handleSelectedUpdateType = (e) => {
    const typeName = e.target.value;
    setSelectedType(typeName);
    if (typeName === 'other-type') {
      setOtherUpdateType('');
    } else {
      setStateUpdateProduct({
        ...stateUpdateProduct,
        type: typeName
      });
    }
  };
  const handleAddUpdateType = (e) => {
    setOtherUpdateType(e.target.value);
  };
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
                  label="Name"
                  id="name"
                  name="name"
                  value={stateProduct.name}
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
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 600 }}>Type</Typography>
                  <FormControl sx={{ width: '350px' }}>
                    <Select id="type" name="type" value={selectedType} onChange={handleSelectedType}>
                      {dataTypeProduct?.data.map((type, index) => (
                        <MenuItem key={index} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                      <MenuItem value="other-type">Thêm Type</MenuItem>
                    </Select>
                    {selectedType === 'other-type' && (
                      <input
                        style={{ width: '350px', height: '43px', marginTop: '10px' }}
                        value={otherType}
                        onChange={handleAddType}
                        name={selectedType === 'other-type' ? 'type' : ''}
                      ></input>
                    )}
                  </FormControl>
                </Box>

                <InputComponent
                  label="Count In Stock"
                  id="countInStock"
                  name="countInStock"
                  value={stateProduct.countInStock}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Price"
                  id="price"
                  name="price"
                  value={stateProduct.price}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Description"
                  id="description"
                  name="description"
                  value={stateProduct.description}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Location"
                  id="location"
                  name="location"
                  value={stateProduct.location}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Discount"
                  id="discount"
                  name="discount"
                  value={stateProduct.discount}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Sold"
                  id="sold"
                  name="sold"
                  value={stateProduct.sold}
                  handleChange={handleChangeProduct}
                  width="350px"
                ></InputComponent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    '& .MuiTypography-root': {
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      mr: 6
                    },
                    '& .MuiRating-root': {
                      fontSize: '2.4rem'
                    }
                  }}
                >
                  <Typography>Rating</Typography>
                  <Rating
                    id="rating"
                    name="rating"
                    value={parseInt(stateProduct.rating)}
                    onChange={handleChangeProduct}
                  ></Rating>
                </Box>
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
                    disabled={
                      stateProduct.name &&
                      stateProduct.countInStock &&
                      stateProduct.description &&
                      stateProduct.discount &&
                      stateProduct.location &&
                      stateProduct.price &&
                      stateProduct.rating &&
                      stateProduct.sold &&
                      (stateProduct.type || otherType) &&
                      stateProduct.image
                        ? false
                        : true
                    }
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
                  label="Name"
                  id="name"
                  name="name"
                  value={stateUpdateProduct.name}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: '1.4rem', fontWeight: 600 }}>Type</Typography>
                  <FormControl sx={{ width: '350px' }}>
                    <Select
                      id="type"
                      name="type"
                      value={stateUpdateProduct.type}
                      onChange={handleSelectedUpdateType}
                      defaultValue={stateUpdateProduct?.type}
                    >
                      {dataTypeProduct?.data.map((type, index) => (
                        <MenuItem key={index} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                      <MenuItem value="other-type">Thêm Type</MenuItem>
                    </Select>
                    {selectedType === 'other-type' && (
                      <input
                        style={{ width: '350px', height: '43px', marginTop: '10px' }}
                        value={otherUpdateType}
                        onChange={handleAddUpdateType}
                        name={selectedType === 'other-type' ? 'type' : ''}
                      ></input>
                    )}
                  </FormControl>
                </Box>
                <InputComponent
                  label="Count In Stock"
                  id="countInStock"
                  name="countInStock"
                  value={stateUpdateProduct.countInStock}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Price"
                  id="price"
                  name="price"
                  value={stateUpdateProduct.price}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Description"
                  id="description"
                  name="description"
                  value={stateUpdateProduct.description}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Location"
                  id="description"
                  name="location"
                  value={stateUpdateProduct.location}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Discount"
                  id="discount"
                  name="discount"
                  value={stateUpdateProduct.discount}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <InputComponent
                  label="Sold"
                  id="sold"
                  name="sold"
                  value={stateUpdateProduct.sold}
                  handleChange={handleChangeProductDetails}
                  width="350px"
                ></InputComponent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    '& .MuiTypography-root': {
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      mr: 6
                    },
                    '& .MuiRating-root': {
                      fontSize: '2.4rem'
                    }
                  }}
                >
                  <Typography>Rating</Typography>
                  <Rating
                    id="rating"
                    name="rating"
                    value={parseInt(stateUpdateProduct.rating)}
                    onChange={handleChangeProductDetails}
                  ></Rating>
                </Box>
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
                  <Button
                    disabled={
                      stateUpdateProduct.name &&
                      stateUpdateProduct.countInStock &&
                      stateUpdateProduct.description &&
                      stateUpdateProduct.discount &&
                      stateUpdateProduct.location &&
                      stateUpdateProduct.price &&
                      stateUpdateProduct.rating &&
                      stateUpdateProduct.sold &&
                      stateUpdateProduct.type &&
                      stateUpdateProduct.image
                        ? false
                        : true
                    }
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: '#34495e' }}
                  >
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
