import Login from '~/page/Login';
import Home from '../page/HomePage/Home';
import ProductDetails from '../page/ProductDetails';
import SignUp from '~/page/SignUp';
import AdminPage from '~/page/AdminPage/AdminPage';

export const publicRouter = [
  { path: '/', element: Home, isShowHeader: true },
  { path: '/product-details/:id', element: ProductDetails, isShowHeader: true },
  { path: '/login', element: Login, isShowHeader: false },
  { path: '/sign-up', element: SignUp, isShowHeader: true },
  { path: '/system/admin', element: AdminPage, isShowHeader: false, isPrivate: true }
];
