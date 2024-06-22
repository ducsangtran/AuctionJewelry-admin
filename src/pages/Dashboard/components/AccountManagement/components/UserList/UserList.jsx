// StaffManagement.js

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { getAllStaff } from "../../../../../../services/api/UserApi";

export const UserList = () => {
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
            dataIndex: ["role_id", "id"],
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
            dataIndex: "phone_number",
            key: "phone_number",
        },
        // Add more columns as needed (e.g., email, role, etc.)
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Button type="link" onClick={() => handleEdit(record)}>
                    Edit
                </Button>
            ),
        },
    ];

    const handleEdit = (record) => {
        // Implement edit logic here
        console.log("Edit staff:", record);
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
