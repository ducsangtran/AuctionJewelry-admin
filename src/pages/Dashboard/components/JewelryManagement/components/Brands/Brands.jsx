import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, message, Space } from "antd";
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../../../../../../services/api/BrandApi";
import moment from "moment";
const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [form] = Form.useForm();
    const [searchStatus, setSearchStatus] = useState(null);
    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            // Fetch brands data from API
            const response = await getAllBrands(); // Replace with your API endpoint
            const { data } = response; // Extract data array from the response object
            setBrands(data);
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
            await deleteBrand(id);
            setBrands(brands.filter((item) => item.id !== id));
            message.success("Brand deleted successfully.");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            }
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields(); // Validate form fields
            const name = values.name; // Extract the 'name' value from form data
            if (editingBrand) {
                // Update brand in API
                await updateBrand(editingBrand.id, name); // Replace with your API endpoint

                const updatedBrand = brands.map((item) => (item.id === editingBrand.id ? { ...item } : item));
                setBrands(updatedBrand);
                message.success("Brand updated successfully.");
                setIsModalVisible(false);
                fetchBrands(); // Fetch categories again to update the data
            } else {
                // Create new Brand in API
                const newBrand = await createBrand(name); // Call create API
                setBrands([newBrand, ...brands]);
                message.success ? "Brand added successfully." : "Failed to create brand.";
            }
            setIsModalVisible(false);
            form.resetFields();

            fetchBrands(); // Fetch materials again to update the data
        } catch (error) {
            message.error("Validation failed: " + error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id, sortDirections: ["ascend", "descend"] },
        { title: "Name", dataIndex: "name", key: "name" },
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
                <>
                    <Space size="middle">
                        <Button type="primary" onClick={() => handleEdit(record)}>
                            Edit
                        </Button>
                        <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                            Delete
                        </Button>
                    </Space>
                </>
            ),
        },
    ];
    const onSearch = async (value) => {
        try {
            if (!value) {
                // Nếu giá trị nhập vào là rỗng, gọi API để lấy tất cả các Brand
                const response = await getAllBrands();
                const { data } = response;
                setBrands(data);
                setSearchStatus(null);
            } else {
                const response = await getBrandById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setBrands([]);
                } else {
                    setSearchStatus(null);
                    setBrands(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Category, Id does not exist!");
            setSearchStatus("No data found");
            setBrands([]);
        }
    };
    return (
        <div>
            <Space style={{ margin: 15 }}>
                <Button type="primary" onClick={handleAdd}>
                    Add Brand
                </Button>

                <Input.Search placeholder="Search Brand By Id" onSearch={onSearch} enterButton style={{ marginLeft: 20 }} />
            </Space>
            <Table dataSource={brands} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
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
                </Form>
            </Modal>
        </div>
    );
};

export default BrandsManagement;
