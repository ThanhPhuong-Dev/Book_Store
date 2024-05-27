import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { publicRouter } from './routes/route';
import { Fragment, useEffect } from 'react';
import './index.css';
import * as UserServices from './services/useService';

import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { updateUser } from './redux/Silde/userSilde';
import { ToastContainer } from 'react-toastify';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData) {
      decoded = jwtDecode(storageData);
    }
    return { storageData, decoded };
  };
  const handleGetDetailUser = async (id, access_token) => {
    const res = await UserServices.getDetailrUser(id, access_token);
    dispatch(updateUser({ ...res?.data, access_token }));
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <Router>
      <ToastContainer position="right"></ToastContainer>
      <ScrollToTop></ScrollToTop>
      <Routes>
        {publicRouter.map((route) => {
          const Page = route.element;
          const isCheckAuth = !route.isPrivate || user?.isAdmin;
          const Layout = route.isShowHeader ? DefaultLayout : Fragment;
          return (
            <Route
              key={route.path}
              path={isCheckAuth ? route.path : '/notFound'}
              element={
                <Layout>
                  <Page></Page>
                </Layout>
              }
            ></Route>
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
