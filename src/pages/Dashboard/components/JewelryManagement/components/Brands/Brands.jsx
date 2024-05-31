import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";

const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);

    const [form] = Form.useForm();

    useEffect(() => {
        // Fetch brands data from API
        // setBrands(fetchedData);
    }, []);

    const handleAdd = () => {
        setEditingBrand(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingBrand(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: moment(record.created_at),
            updated_at: moment(record.updated_at),
        });
    };

    const handleDelete = (id) => {
        // Delete brand by id from API
        setBrands(brands.filter((item) => item.id !== id));
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingBrand) {
                // Update brand
                const updatedBrands = brands.map((item) =>
                    item.id === editingBrand.id ? { ...item, ...values } : item
                );
                setBrands(updatedBrands);
            } else {
                // Add new brand
                setBrands([...brands, { ...values, id: brands.length + 1 }]);
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

export default BrandsManagement;
