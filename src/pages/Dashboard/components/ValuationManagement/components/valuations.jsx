import React, { useState } from "react";
import { Form, Input, DatePicker, Switch, Button, Table, Space, Modal } from "antd";

const ValuationManagement = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Staff Name",
            dataIndex: "staffName",
            key: "staffName",
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
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },
        {
            title: "Role Name",
            dataIndex: "roleName",
            key: "roleName",
        },
        {
            title: "Email Verified",
            dataIndex: "email_verified",
            key: "email_verified",
            render: (text) => (text ? "Yes" : "No"),
        },
        {
            title: "Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (text) => (text ? "Yes" : "No"),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} type="danger">
                        Delete
                    </Button>
                    <Button onClick={() => handleAcceptValuating(record.id)} type="primary">
                        Accept Valuating
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        setEditingItem(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        setFilteredData(newData);
    };

    const handleAcceptValuating = (id) => {
        // Implement logic for accepting valuating
        console.log(`Accept valuation with ID: ${id}`);
        // You can update the status or perform other actions here
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                const newData = [...data];
                if (editingItem) {
                    const index = newData.findIndex((item) => item.id === editingItem.id);
                    if (index > -1) {
                        newData[index] = {
                            ...editingItem,
                            ...values,
                            updatedAt: new Date().toISOString(),
                        };
                    }
                }
                setData(newData);
                setFilteredData(newData);
                form.resetFields();
                setModalVisible(false);
                setEditingItem(null);
            })
            .catch((errorInfo) => {
                console.log("Validate Failed:", errorInfo);
            });
    };

    const onSearch = (value) => {
        const filtered = data.filter((item) =>
            Object.values(item).some(
                (val) => typeof val === "string" && val.toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search valuations" onSearch={onSearch} enterButton />
            </Space>
            <Table columns={columns} dataSource={filteredData} rowKey="id" />

            <Modal
                title={editingItem ? "Edit Valuation" : "Add New Valuation"}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                    <Form.Item label="Staff Name" name="staffName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="date_of_birth">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Role Name" name="roleName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email Verified" name="email_verified" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Active" name="is_active" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ValuationManagement;
