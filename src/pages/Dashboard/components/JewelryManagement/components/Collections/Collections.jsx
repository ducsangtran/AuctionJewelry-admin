import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";

const CollectionsManagement = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCollections();
        fetchBrands();
    }, []);

    const fetchCollections = async () => {
        // Replace with API call
        const fetchedData = []; // Mock data
        setCollections(fetchedData);
    };

    const fetchBrands = async () => {
        // Replace with API call
        const fetchedBrandsData = []; // Mock data
        setBrands(fetchedBrandsData);
    };

    const handleAdd = () => {
        setEditingCollection(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingCollection(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: new Date(record.created_at),
            updated_at: new Date(record.updated_at),
        });
    };

    const handleDelete = async (id) => {
        // Replace with API call
        setCollections(collections.filter((item) => item.id !== id));
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formattedValues = {
                ...values,
                created_at: values.created_at.toISOString(),
                updated_at: values.updated_at.toISOString(),
            };
            if (editingCollection) {
                const updatedCollections = collections.map((item) =>
                    item.id === editingCollection.id
                        ? { ...item, ...formattedValues }
                        : item
                );
                setCollections(updatedCollections);
            } else {
                const newCollection = {
                    ...formattedValues,
                    id: collections.length + 1,
                };
                setCollections([...collections, newCollection]);
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (errorInfo) {
            console.log("Validation failed:", errorInfo);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Brand ID", dataIndex: "brand_id", key: "brand_id" },
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
                Add Collection
            </Button>
            <Table dataSource={collections} columns={columns} rowKey="id" />
            <Modal
                title={editingCollection ? "Edit Collection" : "Add Collection"}
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
                        name="brand_id"
                        label="Brand"
                        rules={[
                            {
                                required: true,
                                message: "Please select the brand!",
                            },
                        ]}
                    >
                        <Select>
                            {brands.map((brand) => (
                                <Select.Option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
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

export default CollectionsManagement;
