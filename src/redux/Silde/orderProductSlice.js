import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  orderItemSelected: [],
  shippingAddress: {},
  delivery: '',
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAl: '',
  isdelivered: false,
  deliveredAt: '',
  isSucessOrder: false
};

export const orderProductSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product);
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
      } else {
        state?.orderItems.push(orderItem);
      }
    },

    increaseAmount: (state, action) => {
      const { idProduct } = action.payload;

      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      const itemOrderSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct);
      itemOrder.amount++;
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
      const itemOrderSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct);
      itemOrder.amount--;
      if (itemOrderSelected) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct);
      const itemOrderSelected = state?.orderItemSelected?.filter((item) => item?.product !== idProduct);

      state.orderItems = itemOrder;
      if (itemOrderSelected) {
        state.orderItemSelected = itemOrderSelected;
      }
    },
    removeAll: (state, action) => {
      const { listChecked } = action.payload;
      const itemOrder = state?.orderItems?.filter((item) => !listChecked.includes(item.product));
      const itemOrderSelected = state?.orderItemSelected?.filter((item) => !listChecked.includes(item.product));
      state.orderItems = itemOrder;
      if (itemOrderSelected) {
        state.orderItemSelected = itemOrderSelected;
      }
    },
    selectedOrder: (state, action) => {
      const { listChecked } = action.payload;
      const orderSelected = [];
      state.orderItems.forEach((order) => {
        if (listChecked.includes(order.product)) {
          orderSelected.push(order);
        }
      });
      state.orderItemSelected = orderSelected;
    },
    orderProductBuy: (state, action) => {
      // const { otherOder } = action.payload;

      state.orderItemSelected = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAll,
  selectedOrder,
  orderProductBuy,
  resetOrder
} = orderProductSlice.actions;

export default orderProductSlice.reducer;
