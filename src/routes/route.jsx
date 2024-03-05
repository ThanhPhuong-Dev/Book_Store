import Home from '../page/Home';
import Product from '../page/ProductDetails';

export const publicRouter = [
  { path: '/', element: Home, isShowHeader: true },
  { path: '/product', element: Product, isShowHeader: true }
];
