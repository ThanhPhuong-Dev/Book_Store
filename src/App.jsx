import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { publicRouter } from './routes/route';
import { Fragment } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        {publicRouter.map((route) => {
          const Page = route.element;
          const Layout = route.isShowHeader ? DefaultLayout : Fragment;
          return (
            <Route
              key={route.path}
              path={route.path}
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
