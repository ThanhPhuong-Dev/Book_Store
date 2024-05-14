import { Spin } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import Evaluate from '~/page/HomePage/Evaluate';
import Home from '~/page/HomePage/Home';
import Popular from '~/page/HomePage/Popular';
import MainPage from '~/page/HomePage/mainPage';

export const Content = ({ selectedKeys, setSelectedKeys }) => {
  return (
    <div className="flex-1 ml-4 px-4 py-10">
      {selectedKeys == '1' && <MainPage></MainPage>}
      {selectedKeys == '2' && <Evaluate></Evaluate>}
      {selectedKeys == '3' && <Popular></Popular>}
      {/* <Spin spinning={!store.getState()?.contract?.loadedContract && isConnected}></Spin> */}
    </div>
  );
};
