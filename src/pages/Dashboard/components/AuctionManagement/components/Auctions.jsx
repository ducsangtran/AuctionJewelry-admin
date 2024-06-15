import React, { useState } from "react";
import { Form, Input, DatePicker, Switch, Button, Table, Space, Modal } from "antd";

const AuctionManagement = () => {
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
            title: "Seller Name",
            dataIndex: "sellerName",
            key: "sellerName",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
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
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Email Verified",
            dataIndex: "emailVerified",
            key: "emailVerified",
            render: (text) => (text ? "Yes" : "No"),
        },
        {
            title: "Active",
            dataIndex: "isActive",
            key: "isActive",
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
                        newData[index] = { ...editingItem, ...values };
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
                <Input.Search placeholder="Search auctions" onSearch={onSearch} enterButton />
            </Space>
            <Table columns={columns} dataSource={filteredData} rowKey="id" />

            <Modal
                title={editingItem ? "Edit Auction" : "Add New Auction"}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                    <Form.Item label="Seller Name" name="sellerName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
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
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email Verified" name="emailVerified" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Active" name="isActive" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AuctionManagement;
