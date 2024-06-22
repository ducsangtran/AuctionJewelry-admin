import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Space } from "antd";
import { getAllStaff } from "../../../../../../services/api/UserApi";

const StaffManagement = () => {
    const [staffData, setStaffData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchAllStaffs();
    }, []);

    const fetchAllStaffs = async () => {
        try {
            const response = await getAllStaff();
            setStaffData(response.data);
        } catch (error) {
            message.error("Failed to fetch staff data.");
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
        // {
        //     title: "Role",
        //     dataIndex: ["role_id", "name"],
        //     key: "roleName",
        // },
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
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date Of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },

        // Add more columns as needed (e.g., email, role, etc.)
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="primary" danger onClick={() => handleDelete(record)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        // Implement edit logic here
        console.log("Edit staff:", record);
    };
    const handleDelete = (record) => {
        // Implement delete logic here
        console.log("Delete staff:", record);
    };
    const handleAdd = () => {
        setIsModalVisible(true);
    };

    const handleSave = (values) => {
        // Implement save logic here
        console.log("New staff:", values);
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button type="primary" onClick={handleAdd}>
                Add Staff
            </Button>
            <Table dataSource={staffData} columns={columns} />

            <Modal
                title="Add Staff"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form onFinish={handleSave}>
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
        </div>
    );
};

export default StaffManagement;
