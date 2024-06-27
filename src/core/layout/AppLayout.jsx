import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import {
    CrownOutlined,
    ShoppingOutlined,
    RocketOutlined,
    MonitorOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import { useSelector } from "react-redux"; // Import useSelector để lấy thông tin người dùng

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

export const AppLayout = ({ components }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Giả sử bạn có thông tin người dùng trong Redux store
    const roleName = useSelector((state) => state.auth.roleName); // Lấy thông tin roleName từ Redux store
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        console.log("Current roleName:", roleName); // Thêm log để kiểm tra roleName

        // Điều kiện hóa việc hiển thị mục AccountManagement dựa trên vai trò người dùng
        const items = [
            ...(roleName === "Admin"
                ? [
                      // Chỉ thêm mục này nếu người dùng là Admin
                      getItem("AccountManagement", "sub1", <UserOutlined />, [
                          getItem("User", "1", <Link to="/users"></Link>),
                          //   getItem("Total User", "2", <Link to="/totalUser"></Link>),
                          getItem("Staff", "3", <Link to="/staffs"></Link>),
                          //   getItem("Total Staff", "4", <Link to="/totalStaffs"></Link>),
                          getItem("Manager", "5", <Link to="/managers"></Link>),
                          //   getItem("Total Manager", "6", <Link to="/totalManagers"></Link>),
                      ]),
                  ]
                : []), // Nếu không phải Admin thì không thêm gì vào đây
            getItem("Jewelry Management", "sub2", <CrownOutlined />, [
                getItem("Materials", "7", <Link to="/materials"></Link>),
                getItem("Categories", "8", <Link to="/categories"></Link>),
                getItem("Brands", "9", <Link to="/brands"></Link>),
                getItem("Collections", "10", <Link to="/collections"></Link>),
                getItem("Jewelries", "11", <Link to="/jewelries"></Link>),
            ]),
            {
                key: "12",
                icon: <ShoppingOutlined />,
                label: <Link to="/auctions">Auction Management</Link>,
            },
            {
                key: "13",
                icon: <RocketOutlined />,
                label: <Link to="/deliveries">Delivery Management</Link>,
            },
            {
                key: "14",
                icon: <MonitorOutlined />,
                label: <Link to="/valuations">Valuating Management</Link>,
            },
        ];

        setMenuItems(items);
    }, [roleName]); // Chạy lại effect này mỗi khi roleName thay đổi

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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]} items={menuItems} />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <AppHeader />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px 0",
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: `81vh`,
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
