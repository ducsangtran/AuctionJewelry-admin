import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Switch, Button, Table, Space, Modal, Image, message } from "antd";
import { getAllDeliveries, getDeliveryById } from "../../../../../services/api/DeliveryApi";

const DeliveryManagement = () => {
    const [form] = Form.useForm();
    const [DeliveriesData, setDeliveriesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);
    useEffect(() => {
        fetchAllDeliveries();
    }, []);
    const fetchAllDeliveries = async () => {
        try {
            const response = await getAllDeliveries();
            const DeliveriesData = response.data;
            setDeliveriesData(DeliveriesData);
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
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
        },
        {
            title: "Full Name",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Jewelry",
            dataIndex: "jewelry",
            key: "jewelry",
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Staff",
            dataIndex: "staff",
            key: "staff",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
        },
        {
            title: "User",
            dataIndex: "user",
            key: "user",
        },
        {
            title: "Valuating Delivery",
            dataIndex: "valuatingDelivery",
            key: "valuatingDelivery",
            render: (text) => (text ? "True" : "False"),
        },

        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)} type="primary">
                        Edit
                    </Button>
                    <Button onClick={() => handleDelete(record.id)} type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];
    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Check if the date is invalid
            return ""; // Return an empty string if the date is invalid
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };
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

    const onSearch = async (value) => {
        try {
            if (!value) {
                // Nếu giá trị nhập vào là rỗng, gọi API để lấy tất cả các Delivery
                const response = await getAllDeliveries();
                const { data } = response;
                setDeliveriesData(data);
                setSearchStatus(null);
            } else {
                const response = await getDeliveryById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setDeliveriesData([]);
                } else {
                    setSearchStatus(null);
                    setDeliveriesData(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Delivery, Id does not exist!");
            setSearchStatus("No data found");
            setDeliveriesData([]);
        }
    };

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search deliveries" onSearch={onSearch} enterButton />
            </Space>
            <Table
                columns={columns}
                dataSource={DeliveriesData}
                rowKey="id"
                pagination={{ pageSize: 7 }}
            />

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
