import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, message } from "antd";
import {
    createMaterial,
    getAllMaterials,
    updateMaterial,
    deleteMaterial,
    getMaterialById,
} from "../../../../../../services/api/MaterialApi";
import moment from "moment";
export const MaterialsManagement = () => {
    const [materials, setMaterials] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const [form] = Form.useForm();
    const [searchStatus, setSearchStatus] = useState(null);
    const userRole = localStorage.getItem("roleName");
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

                const updatedMaterials = materials.map((item) => (item.id === editingMaterial.id ? { ...item } : item));
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

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id, sortDirections: ["ascend", "descend"] },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Unit", dataIndex: "unit", key: "unit" },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    {(userRole === "Manager" || userRole === "Admin") && (
                        <Button type="primary" onClick={() => handleEdit(record)}>
                            Edit
                        </Button>
                    )}
                    {(userRole === "Manager" || userRole === "Admin") && (
                        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                            Delete
                        </Button>
                    )}
                </Space>
            ),
        },
    ];
    const onSearch = async (value) => {
        try {
            if (!value) {
                // Nếu giá trị nhập vào là rỗng, gọi API để lấy tất cả các vật liệu
                const response = await getAllMaterials();
                const { data } = response;
                setMaterials(data);
                setSearchStatus(null);
            } else {
                const response = await getMaterialById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setMaterials([]);
                } else {
                    setSearchStatus(null);
                    setMaterials(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Material, Id does not exist!");
            setSearchStatus("No data found");
            setMaterials([]);
        }
    };

    return (
        <div>
            <Space style={{ margin: 15 }}>
                {(userRole === "Manager" || userRole === "Admin") && (
                    <Button type="primary" onClick={handleAdd}>
                        Add Material
                    </Button>
                )}
                <Input.Search placeholder="Search Materials By Id" onSearch={onSearch} enterButton style={{ marginLeft: 20 }} />
            </Space>
            <Table dataSource={materials} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
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
