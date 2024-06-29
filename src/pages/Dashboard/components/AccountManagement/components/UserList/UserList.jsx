import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space, DatePicker, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../../../../../core/store/slices/userSlice";
import { updateUser, banUser, getRoles } from "../../../../../../services/api/UserApi";
import TotalUsers from "./totalUsers";
import dayjs from "dayjs";

const { Option } = Select;

const UserManagement = () => {
    // const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [rolesData, setRolesData] = useState([]);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchUsers());
        fetchRoles();
    }, [dispatch]);

    useEffect(() => {
        console.log("User Data:", userData);
    }, [userData]);

    const fetchRoles = async () => {
        try {
            const response = await getRoles();
            setRolesData(response.data);
        } catch (error) {
            message.error("Failed to fetch roles data.");
        }
    };

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
            filters: rolesData.map((role) => ({ text: role.name, value: role.name })),
            onFilter: (value, record) => record.role_id.name === value,
        },

        {
            title: "Is Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (isActive) => (isActive ? "Active" : "Banned"),
            filters: [
                { text: "Active", value: true },
                { text: "Banned", value: false },
            ],
            onFilter: (value, record) => record.is_active === value,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleBan(record.id)} disabled={record.is_active === false}>
                        Ban
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        console.log("Selected User:", record); // Debugging log
        setSelectedUser(record);
        setIsEditModalVisible(true);
    };

    // const handleSaveAdd = async (values) => {
    //     try {
    //         await addUser(values.full_name, values.email, values.password, values.roleId, values.phone_number, values.address, values.date_of_birth.format("YYYY-MM-DD"));
    //         message.success("User added successfully.");
    //         setIsAddModalVisible(false);
    //         dispatch(fetchUsers()); // Refresh the user list
    //     } catch (error) {
    //         message.error("Failed to add user.");
    //     }
    // };

    const handleSaveEdit = async (values) => {
        try {
            await updateUser(
                selectedUser.id,
                values.full_name,
                values.email,
                values.password,
                values.roleId,
                values.phone_number,
                values.address,
                values.is_active,
                values.date_of_birth ? values.date_of_birth.format("YYYY-MM-DD") : null
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

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
        setSelectedUser(null);
    };

    const dataSource = Array.isArray(userData.users.data) ? userData.users.data : [];

    return (
        <div>
            <TotalUsers />
            <Table dataSource={dataSource} columns={columns} loading={userData.loading} pagination={{ pageSize: 7 }} />

            {selectedUser && (
                <Modal title="Edit Account" visible={isEditModalVisible} onCancel={() => handleEditModalCancel()} footer={null}>
                    <Form
                        initialValues={{
                            ...selectedUser,
                            roleId: selectedUser.role_id ? selectedUser.role_id.id : null,
                            date_of_birth: selectedUser.date_of_birth ? dayjs(selectedUser.date_of_birth) : null,
                        }}
                        onFinish={handleSaveEdit}
                    >
                        <Form.Item label="Name" name="full_name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Role" name="roleId">
                            <Select placeholder="Select a role">
                                {rolesData.map((role) => (
                                    <Option key={role.id} value={role.id}>
                                        {role.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phone_number">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Address" name="address">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Date of Birth" name="date_of_birth">
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item label="Is Active" name="is_active">
                            <Select>
                                <Option value={true}>Active</Option>
                                <Option value={false}>Banned</Option>
                            </Select>
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
