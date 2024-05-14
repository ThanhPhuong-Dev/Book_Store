import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  avatar: '',
  access_token: '',
  isAdmin: false,
  userId: '',
  city: '',
  gender: ''
};

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const { name, email, access_token, avatar, phone, address, _id, isAdmin, userId, city, gender } = action.payload;
      state.id = _id;
      state.name = name || email;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      state.city = city;
      state.userId = userId;
      state.gender = gender;
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.phone = '';
      state.address = '';
      state.avatar = '';
      state.access_token = '';
      state.isAdmin = false;
      state.city = '';
      state.gender = '';
    },
    addOrderUser: (state, action) => {
      const { orderItemSelected } = action.payload;

      const otherOrderUser = [];
      orderItemSelected?.forEach((item) => {
        otherOrderUser.push(item);
      });
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser, addOrderUser } = userSlide.actions;

export default userSlide.reducer;
