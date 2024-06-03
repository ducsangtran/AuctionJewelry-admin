import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";

const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            // Fetch brands data from API
            const response = await fetch("/api/brands"); // Replace with your API endpoint
            const fetchedData = await response.json();
            setBrands(fetchedData);
        } catch (error) {
            // message.error("Failed to fetch brands data.");
        }
    };

    const handleAdd = () => {
        setEditingBrand(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingBrand(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: record.created_at ? new Date(record.created_at) : null,
            updated_at: record.updated_at ? new Date(record.updated_at) : null,
        });
    };

    const handleDelete = async (id) => {
        try {
            // Delete brand by id from API
            await fetch(`/api/brands/${id}`, { method: "DELETE" }); // Replace with your API endpoint
            setBrands(brands.filter((item) => item.id !== id));
            message.success("Brand deleted successfully.");
        } catch (error) {
            message.error("Failed to delete brand.");
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                ...values,
                created_at: values.created_at
                    ? values.created_at.toISOString()
                    : null,
                updated_at: values.updated_at
                    ? values.updated_at.toISOString()
                    : null,
            };

            if (editingBrand) {
                // Update brand in API
                await fetch(`/api/brands/${editingBrand.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedValues),
                }); // Replace with your API endpoint

                const updatedBrands = brands.map((item) =>
                    item.id === editingBrand.id
                        ? { ...item, ...formattedValues }
                        : item
                );
                setBrands(updatedBrands);
                message.success("Brand updated successfully.");
            } else {
                // Create new brand in API
                const response = await fetch("/api/brands", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedValues),
                }); // Replace with your API endpoint
                const newBrand = await response.json();
                setBrands([...brands, newBrand]);
                message.success("Brand added successfully.");
            }

            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error("Validation failed: " + error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Created At", dataIndex: "created_at", key: "created_at" },
        { title: "Updated At", dataIndex: "updated_at", key: "updated_at" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={handleAdd}>
                Add Brand
            </Button>
            <Table dataSource={brands} columns={columns} rowKey="id" />
            <Modal
                title={editingBrand ? "Edit Brand" : "Add Brand"}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        name="created_at"
                        label="Created At"
                        rules={[
                            {
                                required: true,
                                message: "Please select the created date!",
                            },
                        ]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        name="updated_at"
                        label="Updated At"
                        rules={[
                            {
                                required: true,
                                message: "Please select the updated date!",
                            },
                        ]}
                    >
                        <DatePicker showTime />
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    );
};

export default BrandsManagement;
