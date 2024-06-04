import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import {
    createMaterial,
    getAllMaterials,
    updateMaterial,
    deleteMaterial,
} from "../../../../../../services/api/MaterialApi";

export const MaterialsManagement = () => {
    const [materials, setMaterials] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            // Fetch materials data from API
            const response = await getAllMaterials(); // Replace with your API endpoint
            const { data } = response; // Extract data array from the response object
            setMaterials(data);
        } catch (error) {
            message.error("Failed to fetch materials data.");
        }
    };

    const handleAdd = () => {
        setEditingMaterial(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingMaterial(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            name: record.name,
        });
    };
    const handleDelete = async (id) => {
        try {
            await deleteMaterial(id);
            setMaterials(materials.filter((item) => item.id !== id));
            message.success("Material deleted successfully.");
        } catch (error) {
            console.error("Failed to delete material:", error);
            message.error("Failed to delete material.");
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Validate form fields
            const name = values.name; // Extract the 'name' value from form data
            if (editingMaterial) {
                // Update category in API
                await updateMaterial(editingMaterial.id, name); // Replace with your API endpoint

                const updatedMaterials = materials.map((item) =>
                    item.id === editingMaterial.id ? { ...item } : item
                );
                setMaterials(updatedMaterials);
                message.success("Material updated successfully.");
                setIsModalVisible(false);
                fetchMaterials(); // Fetch categories again to update the data
            } else {
                const newMaterial = await createMaterial(name); // Call create API
                if (newMaterial) {
                    setMaterials([newMaterial, ...materials]); // Update the materials state with the new material
                    message.success("Material added successfully."); // Show success message
                } else {
                    throw new Error("Failed to create material."); // Throw an error if new material data is not received
                }
            }
            setIsModalVisible(false); // Hide the modal
            form.resetFields(); // Reset form fields
            fetchMaterials(); // Fetch materials again to update the data
        } catch (error) {
            console.error("Failed to save material:", error); // Log error if failed to create material
            message.error("Failed to save material."); // Show error message
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
        return `${year}-${month}-${day}`;
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
                <Space size="middle">
                    <Button
                        type="link"
                        primary
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button
                type="primary"
                onClick={handleAdd}
                style={{ marginBottom: 16 }}
            >
                Add Material
            </Button>
            <Table dataSource={materials} columns={columns} rowKey="id" />
            <Modal
                title={editingMaterial ? "Edit Material" : "Add Material"}
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

export default MaterialsManagement;
