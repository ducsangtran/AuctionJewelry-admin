import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

// Cái này đổi thành danh mục ở sider bar nha a sang
const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: <Link to='/usermanagement'>User Management</Link>,
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: <Link to='/statistics/totaluser'>Tota lUser</Link>,
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: <Link to='/upload'>Bla bla</Link>,
  },
  {
    key: '4',
    icon: <UserOutlined />,
    label: <Link to='/nav4'>Bla bla</Link>,
  },
];

export const AppLayout = ({ components }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className='demo-logo-vertical' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {components}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
