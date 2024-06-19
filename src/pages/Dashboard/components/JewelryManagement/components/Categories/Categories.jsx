import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message, Space } from "antd";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "../../../../../../services/api/Categories";

const CategoriesManagement = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();
    const [searchStatus, setSearchStatus] = useState(null);
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            // Fetch categories data from API
            const response = await getAllCategories(); // Replace with your API endpoint
            const { data } = response; // Extract data array from the response object
            setCategories(data);
        } catch (error) {
            message.error("Failed to fetch categories data.");
        }
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingCategory(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            // Delete category by id from API
            await deleteCategory(id); // Replace with your API endpoint
            setCategories(categories.filter((item) => item.id !== id));
            message.success("Category deleted successfully.");
        } catch (error) {
            message.error("Failed to delete category.");
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Validate form fields
            const name = values.name; // Extract the 'name' value from form data
            // const newCategory = await createCategory(name); // Call create API
            if (editingCategory) {
                // Update category in API
                await updateCategory(editingCategory.id, name); // Replace with your API endpoint

                const updatedCategories = categories.map((item) =>
                    item.id === editingCategory.id ? { ...item } : item
                );
                setCategories(updatedCategories);
                message.success("Category updated successfully.");
                setIsModalVisible(false);
                fetchCategories(); // Fetch categories again to update the data
            } else {
                // Create new category in API
                const newCategory = await createCategory(name); // Call create API
                setCategories([newCategory, ...categories]);
                message.success ? "Category added successfully." : "Failed to create category.";
                setIsModalVisible(false);
                form.resetFields();
                fetchCategories(); // Fetch categories again to update the data
            }
        } catch (error) {
            message.error("Validation failed: " + error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };
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
    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];
    const onSearch = async (value) => {
        try {
            if (!value) {
                // Nếu giá trị nhập vào là rỗng, gọi API để lấy tất cả các Category
                const response = await getAllCategories();
                const { data } = response;
                setCategories(data);
                setSearchStatus(null);
            } else {
                const response = await getCategoryById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setCategories([]);
                } else {
                    setSearchStatus(null);
                    setCategories(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Category, Id does not exist!");
            setSearchStatus("No data found");
            setCategories([]);
        }
    };
    return (
        <div>
            <Space style={{ margin: 15 }}>
                <Button type="primary" onClick={handleAdd}>
                    Add Category
                </Button>

                <Input.Search
                    placeholder="Search Category By Id"
                    onSearch={onSearch}
                    enterButton
                    style={{ marginLeft: 20 }}
                />
            </Space>

            <Table
                dataSource={categories}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 7 }}
            />
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
                </Form>
            </Modal>
        </div>
    );
};

export default CategoriesManagement;
