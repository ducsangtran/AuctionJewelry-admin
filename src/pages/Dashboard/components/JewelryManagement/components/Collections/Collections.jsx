import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
import moment from "moment";

const CollectionsManagement = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch collections data from API
        // setCollections(fetchedData);
        // Fetch brands data from API
        // setBrands(fetchedBrandsData);
    }, []);

    const handleAdd = () => {
        setEditingCollection(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingCollection(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: moment(record.created_at),
            updated_at: moment(record.updated_at),
        });
    };

    const handleDelete = (id) => {
        // Delete collection by id from API
        setCollections(collections.filter((item) => item.id !== id));
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingCollection) {
                // Update collection
                const updatedCollections = collections.map((item) =>
                    item.id === editingCollection.id
                        ? { ...item, ...values }
                        : item
                );
                setCollections(updatedCollections);
            } else {
                // Add new collection
                setCollections([
                    ...collections,
                    { ...values, id: collections.length + 1 },
                ]);
            }
            setIsModalVisible(false);
            form.resetFields();
        });
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
                        label="Brand ID"
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
