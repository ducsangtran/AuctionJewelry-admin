import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Space } from "antd";
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
        const fetchMaterials = async () => {
            try {
                const data = await getAllMaterials();
                if (Array.isArray(data)) {
                    setMaterials(data);
                } else {
                    console.error("Expected an array but received:", data);
                }
            } catch (error) {
                console.error("Failed to fetch materials:", error);
            }
        };

        fetchMaterials();
    }, []);

    const handleAdd = () => {
        setEditingMaterial(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingMaterial(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: record.created_at ? new Date(record.created_at) : null,
            updated_at: record.updated_at ? new Date(record.updated_at) : null,
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteMaterial(id);
            setMaterials(materials.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Failed to delete material:", error);
        }
    };

    const handleOk = () => {
        form.validateFields().then(async (values) => {
            const newValues = {
                ...values,
                created_at: values.created_at.toISOString(),
                updated_at: values.updated_at.toISOString(),
            };
            try {
                if (editingMaterial) {
                    // Update material
                    const updatedMaterial = await updateMaterial(
                        editingMaterial.id,
                        values.name
                    );
                    setMaterials(
                        materials.map((item) =>
                            item.id === editingMaterial.id
                                ? updatedMaterial
                                : item
                        )
                    );
                } else {
                    // Add new material
                    const newMaterial = await createMaterial(values.name);
                    setMaterials([...materials, newMaterial]);
                }
                setIsModalVisible(false);
                form.resetFields();
            } catch (error) {
                console.error("Failed to save material:", error);
            }
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
        )}-${String(date.getDate()).padStart(2, "0")} ${String(
            date.getHours()
        ).padStart(2, "0")}:${String(date.getMinutes()).padStart(
            2,
            "0"
        )}:${String(date.getSeconds()).padStart(2, "0")}`;
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
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
                    <Form.Item
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
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
