import React, {useState} from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

import Courses from "../components/Dashboard/StudentDashboard/Courses";
import {Layout, Menu, Button, theme} from "antd";
import styled from "styled-components";
import AuthActions from "../components/auth/AuthActions";
import {useNavigate} from "react-router-dom";

const {Header, Sider, Content} = Layout;
const LayoutDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const handleLogout = () => {
    setCollapsed(false);
  };

  let navigate = useNavigate();

  function redirectToAnotherRoute() {
    navigate("/UploadCourse");
  }
  return (
    <LayoutWrapper>
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Home",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Message",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Courses",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Upload Courses",
                onClick: redirectToAnotherRoute,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{padding: 0, background: colorBgContainer}}>
            <AuthActions logOut={handleLogout} />
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Courses />
          </Content>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
  .layout {
    height: auto;
  }
`;

export default LayoutDashboard;
