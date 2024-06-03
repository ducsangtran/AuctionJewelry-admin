import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message } from "antd";

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            // Fetch categories data from API
            const response = await fetch("/api/categories"); // Replace with your API endpoint
            const fetchedData = await response.json();
            setCategories(fetchedData);
        } catch (error) {
            // message.error("Failed to fetch categories data.");
        }
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingCategory(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: record.created_at ? new Date(record.created_at) : null,
            updated_at: record.updated_at ? new Date(record.updated_at) : null,
        });
    };

    const handleDelete = async (id) => {
        try {
            // Delete category by id from API
            await fetch(`/api/categories/${id}`, { method: "DELETE" }); // Replace with your API endpoint
            setCategories(categories.filter((item) => item.id !== id));
            message.success("Category deleted successfully.");
        } catch (error) {
            message.error("Failed to delete category.");
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

            if (editingCategory) {
                // Update category in API
                await fetch(`/api/categories/${editingCategory.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedValues),
                }); // Replace with your API endpoint

                const updatedCategories = categories.map((item) =>
                    item.id === editingCategory.id
                        ? { ...item, ...formattedValues }
                        : item
                );
                setCategories(updatedCategories);
                message.success("Category updated successfully.");
            } else {
                // Create new category in API
                const response = await fetch("/api/categories", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formattedValues),
                }); // Replace with your API endpoint
                const newCategory = await response.json();
                setCategories([...categories, newCategory]);
                message.success("Category added successfully.");
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
                Add Category
            </Button>
            <Table dataSource={categories} columns={columns} rowKey="id" />
            <Modal
                title={editingCategory ? "Edit Category" : "Add Category"}
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

export default CategoriesManagement;
