import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
// Cái này đổi thành danh mục ở sider bar nha a sang
const items = [
    // {
    //     key: "1",
    //     icon: <UserOutlined />,
    //     label: <Link to="/usermanagement">User Management</Link>,
    // },
    getItem("Account", "sub1", <UserOutlined />, [
        getItem("User", "1", <Link to="/usermanagement"></Link>),
        getItem("Total User", "2", <Link to="/statistics/totaluser"></Link>),
        getItem("Staff", "3"),
        getItem("Total Staff", "4"),
        getItem("Manager", "5"),
        getItem("Total Manager", "6"),
    ]),
    // {
    //     key: "2",
    //     icon: <VideoCameraOutlined />,
    //     label: <Link to="/statistics/totaluser">Total User</Link>,
    // },
    // {
    //     key: "3",
    //     icon: <UploadOutlined />,
    //     label: <Link to="/jewelrymanagement">Jewelry Management</Link>,
    // },
    getItem("jewelry ", "sub2", <UserOutlined />, [
        getItem("Materials", "1", <Link to="/materials"></Link>),
        getItem("Categories", "2"),
        getItem("Brands", "3"),
    ]),

    {
        key: "7",
        icon: <UserOutlined />,
        label: <Link to="/nav4">Bla bla</Link>,
    },
];

export const AppLayout = ({ components }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["4"]}
                    items={items}
                />
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
                        margin: "24px 16px 0",
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
                        textAlign: "center",
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
