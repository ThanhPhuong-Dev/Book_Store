import SideBar from '~/layout/DefaultLayout/SideBar/SideBar';
import { useState } from 'react';
import { Content } from '~/layout/DefaultLayout/Content/Content';

function Home() {
  const [selectedKeys, setSelectedKeys] = useState('1');

  return (
    <div className="flex-1 flex ">
      <SideBar selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}></SideBar>
      <div className="flex-1 overflow-y-auto">
        <Content selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys}></Content>
      </div>
    </div>
  );
}

export default Home;
