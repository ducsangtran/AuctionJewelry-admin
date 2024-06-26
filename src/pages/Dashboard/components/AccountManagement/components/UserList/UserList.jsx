import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../../../../core/store/slices/userSlice";
import { addUser, updateUser, banUser } from "../../../../../../services/api/UserApi";
import TotalUsers from "./totalUsers";

const UserManagement = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        console.log("User Data:", userData);
    }, [userData]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: ["role_id", "name"],
            key: "roleName",
        },
        {
            title: "Role ID",
            dataIndex: ["role_id", "id"],
            key: "roleId",
        },
        {
            title: "Is Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (isActive) => (isActive ? "Active" : "Banned"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleBan(record.id)}>
                        Ban
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        setSelectedUser(record);
        setIsEditModalVisible(true);
    };

    const handleAdd = () => {
        setIsAddModalVisible(true);
    };

    const handleSaveAdd = async (values) => {
        try {
            await addUser(
                values.full_name,
                values.email,
                values.password,
                values.role_id,
                values.phone_number,
                values.address,
                values.date_of_birth
            );
            message.success("User added successfully.");
            setIsAddModalVisible(false);
            dispatch(fetchUsers()); // Refresh the user list
        } catch (error) {
            message.error("Failed to add user.");
        }
    };

    const handleSaveEdit = async (values) => {
        try {
            await updateUser(
                selectedUser.id,
                values.full_name,
                values.email,
                values.password,
                { id: values.role_id }, // Chuyển đổi giá trị role_id sang đối tượng
                values.phone_number,
                values.address,
                values.date_of_birth
            );
            message.success("User updated successfully.");
            setIsEditModalVisible(false);
            dispatch(fetchUsers()); // Refresh the user list
        } catch (error) {
            message.error("Failed to update user.");
        }
    };

    const handleBan = async (id) => {
        try {
            await banUser(id);
            message.success("User banned successfully.");
            dispatch(fetchUsers()); // Refresh the user list
        } catch (error) {
            message.error("Failed to ban user.");
        }
    };
    // Đặt lại selectedUser về null khi đóng modal
    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
        setSelectedUser(null);
    };
    // Kiểm tra userData.users.data là một mảng
    const dataSource = Array.isArray(userData.users.data) ? userData.users.data : [];

    return (
        <div>
            {/* <Button type="primary" onClick={handleAdd}>
                Add User
            </Button> */}
            {/* Hiển thị TotalUser */}
            <TotalUsers />
            <Table dataSource={dataSource} columns={columns} loading={userData.loading} />

            <Modal
                title="Add Account"
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleSaveAdd}>
                    <Form.Item
                        label="Name"
                        name="full_name"
                        rules={[{ required: true, message: "Please enter a name" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        rules={[{ required: true, message: "Please enter a phone number" }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Add more form fields as needed */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {selectedUser && (
                <Modal
                    title="Edit Account"
                    visible={isEditModalVisible}
                    onCancel={() => handleEditModalCancel()}
                    footer={null}
                >
                    <Form
                        initialValues={{
                            ...selectedUser,
                            role_id: selectedUser.role_id ? selectedUser.role_id.id : null,
                        }} // Đặt giá trị role_id.id vào trường role_id
                        onFinish={handleSaveEdit}
                    >
                        <Form.Item
                            label="Name"
                            name="full_name"
                            rules={[{ required: true, message: "Please enter a name" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: "Please enter an email" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: "Please enter a password" }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Role ID"
                            name="role_id"
                            rules={[{ required: true, message: "Please enter a role ID" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[{ required: true, message: "Please enter a phone number" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: "Please enter an address" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Date of Birth"
                            name="date_of_birth"
                            rules={[{ required: true, message: "Please enter a date of birth" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
};

export default UserManagement;
