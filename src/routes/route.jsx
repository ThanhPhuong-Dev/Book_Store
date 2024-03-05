import Login from '~/page/Login';
import Home from '../page/Home';
import ProductDetails from '../page/ProductDetails';
import SignUp from '~/page/SignUp';

export const publicRouter = [
  { path: '/', element: Home, isShowHeader: true },
  { path: '/product-details', element: ProductDetails, isShowHeader: true },
  { path: '/login', element: Login, isShowHeader: true },
  { path: '/sign-up', element: SignUp, isShowHeader: true }
];
