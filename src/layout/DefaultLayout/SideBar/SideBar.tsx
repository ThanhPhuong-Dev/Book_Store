import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Wrapper } from './styled';
import { HomeOutlined, LeftOutlined, PieChartOutlined, RightOutlined } from '@ant-design/icons';
const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    label: 'Home'
  },
  {
    key: '2',
    icon: <PieChartOutlined />,
    label: 'Theo Đánh Giá'
  },
  {
    key: '3',
    icon: <PieChartOutlined />,
    label: 'Phổ biến'
  }
];

function SideBar({ selectedKeys, setSelectedKeys }) {
  const [collapsed, setCollapsed] = useState(false);
  const handleClickMenu = (e) => {
    setSelectedKeys(e.key);
  };
  return (
    <Wrapper>
      <button onClick={() => setCollapsed((prev) => !prev)} className="btn-collapse">
        {collapsed ? <RightOutlined style={{ fontSize: 12 }} /> : <LeftOutlined style={{ fontSize: 12 }} />}
      </button>
      <Layout.Sider collapsible width={265} className="h-full bg-white overflow-y-auto" collapsed={collapsed}>
        <Menu
          className="py-10"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          items={items}
          selectedKeys={[selectedKeys]}
          onClick={handleClickMenu}
        ></Menu>
      </Layout.Sider>
    </Wrapper>
  );
}

export default SideBar;
