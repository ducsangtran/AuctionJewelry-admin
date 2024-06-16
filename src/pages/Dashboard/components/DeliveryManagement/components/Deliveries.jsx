import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Switch, Button, Table, Space, Modal, Image, message } from "antd";
import { getAllDeliveries } from "../../../../../services/api/DeliveryApi";

const DeliveryManagement = () => {
    const [form] = Form.useForm();
    const [DeliveriesData, setDeliveriesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    useEffect(() => {
        fetchAllDeliveries();
    }, []);
    const fetchAllDeliveries = async () => {
        try {
            const response = await getAllDeliveries();
            const DeliveriesData = response.data;
            // Directly map the brand name from nested brand object
            const updatedDeliveries = DeliveriesData.map((delivery) => ({
                ...delivery,
                // jewelryName: auction.jewelry.name,
                // winnerName: auction.winner.full_name,
                // startingPrice: auction.jewelry.staringPrice,
                // collectionName: auction.collection.name,
            }));
            setDeliveriesData(updatedDeliveries);
            console.log(response.data);
        } catch (error) {
            message.error("Failed to fetch auctions data.");
        }
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
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
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (text) => <Image width={50} src={text} />,
        },
        {
            title: "Date of Birth",
            dataIndex: "date_of_birth",
            key: "date_of_birth",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
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
                <Input.Search placeholder="Search deliveries" onSearch={onSearch} enterButton />
            </Space>
            <Table columns={columns} dataSource={filteredData} rowKey="id" />

            <Modal
                title={editingItem ? "Edit Delivery" : "Add New Delivery"}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                    <Form.Item label="User Name" name="userName" rules={[{ required: true }]}>
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
                    <Form.Item label="Image URL" name="imageUrl" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="date_of_birth">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
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

export default DeliveryManagement;
