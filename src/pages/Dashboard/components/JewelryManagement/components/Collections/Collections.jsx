import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Space } from "antd";
import {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection,
    getCollectionById,
} from "../../../../../../services/api/Collections";
import { getAllBrands } from "../../../../../../services/api/BrandApi";
import moment from "moment";
const CollectionsManagement = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const [form] = Form.useForm();
    const [searchStatus, setSearchStatus] = useState(null);
    const userRole = localStorage.getItem("roleName");
    useEffect(() => {
        fetchBrands();
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await getAllCollections();
            const collectionsData = response.data;
            setCollections(collectionsData);
        } catch (error) {
            message.error("Failed to fetch collections data.");
        }
    };

    const fetchBrands = async () => {
        try {
            const response = await getAllBrands();
            const { data } = response;

            console.log(response);
            setBrands(data);
        } catch (error) {
            message.error("Failed to fetch brands data.");
        }
    };

    const handleAdd = () => {
        setEditingCollection(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingCollection(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            name: record.name,
            brand: record.brand.name,
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = async (id) => {
        try {
            await deleteCollection(id);
            message.success("Collection deleted successfully");
            fetchCollections();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            }
        }
    };

    const handleFormSubmit = async (formValues) => {
        try {
            console.log("Form values:", formValues); // Debugging line to check form values

            // Trích xuất giá trị name và brand từ form values
            const { name, brand } = formValues;

            if (editingCollection) {
                await updateCollection(editingCollection.id, name, brand);
                message.success("Collection updated successfully");
            } else {
                await createCollection(name, brand);
                message.success("Collection created successfully");
            }
            setIsModalVisible(false);
            form.resetFields();
            fetchCollections();
        } catch (error) {
            console.error("Error saving collection:", error); // Debugging line to check error
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error("Failed to save collection.");
            }
        }
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id, sortDirections: ["ascend", "descend"] },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Brand", dataIndex: ["brand", "name"], key: "brand_name" },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "created_at",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updated_at",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
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
                </>
            ),
        },
    ];
    const onSearch = async (value) => {
        try {
            if (!value) {
                // Nếu giá trị nhập vào là rỗng, gọi API để lấy tất cả các Collections
                const response = await getAllCollections();
                const { data } = response;
                setCollections(data);
                setSearchStatus(null);
            } else {
                const response = await getCollectionById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setCollections([]);
                } else {
                    setSearchStatus(null);
                    setCollections(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Collection, Id does not exist!");
            setSearchStatus("No data found");
            setCollections([]);
        }
    };
    return (
        <div>
            <Space style={{ margin: 15 }}>
                {(userRole === "Manager" || userRole === "Admin") && (
                    <Button type="primary" onClick={handleAdd}>
                        Add Collection
                    </Button>
                )}

                <Input.Search placeholder="Search Category By Id" onSearch={onSearch} enterButton style={{ marginLeft: 20 }} />
            </Space>
            <Table dataSource={collections} columns={columns} rowKey="id" pagination={{ pageSize: 7 }} />
            <Modal
                title={editingCollection ? "Edit Collection" : "Add Collection"}
                visible={isModalVisible}
                onOk={() => form.submit()}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
                        name="brand"
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
                                <Select.Option key={brand.id} value={brand.name}>
                                    {brand.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CollectionsManagement;
