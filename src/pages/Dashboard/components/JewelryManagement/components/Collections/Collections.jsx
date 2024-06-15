// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, Select, message, Collapse, Divider } from "antd";
// import {
//     getAllCollections,
//     createCollection,
//     updateCollection,
//     deleteCollection,
// } from "../../../../../../services/api/Collections";
// import { getAllBrands } from "../../../../../../services/api/BrandApi";

// const CollectionsManagement = () => {
//     const [collections, setCollections] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editingCollection, setEditingCollection] = useState(null);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         fetchBrands();
//         fetchCollections();
//     }, []);

//     const fetchCollections = async () => {
//         try {
//             const collectionsData = await getAllCollections();
//             // const collectionsData = response.data;

//             // Directly map the brand name from nested brand object
//             const updatedCollections = collectionsData.map((collection) => ({
//                 ...collection,
//                 brandName: collection.brand ? collection.brand.name : null,
//             }));

//             setCollections(updatedCollections);
//             // console.log(collectionsData);
//         } catch (error) {
//             message.error("Failed to fetch collections data.");
//         }
//     };

//     const fetchBrands = async () => {
//         try {
//             const response = await getAllBrands();
//             const { data } = response;
//             setBrands(data);
//         } catch (error) {
//             message.error("Failed to fetch brands data.");
//         }
//     };

//     const handleAdd = () => {
//         setEditingCollection(null);
//         setIsModalVisible(true);
//     };

//     const handleEdit = (record) => {
//         setEditingCollection(record);
//         setIsModalVisible(true);
//         form.setFieldsValue({
//             name: record.name,
//             brand: record.brand ? record.brand.name : null,
//         });
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//         form.resetFields();
//     };

//     const handleDelete = async (id) => {
//         try {
//             await deleteCollection(id);
//             message.success("Collection deleted successfully");
//             fetchCollections();
//         } catch (error) {
//             message.error("Failed to delete collection.");
//         }
//     };

//     const handleFormSubmit = async (formValues) => {
//         try {
//             console.log("Form values:", formValues); // Debugging line to check form values
//             const values = await form.validateFields(); // Lấy giá trị từ form

//             // Trích xuất giá trị name và brand từ form values
//             const { name, brand } = values;

//             if (editingCollection) {
//                 await updateCollection(editingCollection.id, name, brand);
//                 message.success("Collection updated successfully");
//             } else {
//                 await createCollection(name, brand);
//                 message.success("Collection created successfully");
//             }
//             setIsModalVisible(false);
//             fetchCollections();
//         } catch (error) {
//             console.error("Error saving collection:", error); // Debugging line to check error
//             message.error("Failed to save collection.");
//         }
//     };

//     const columns = [
//         { title: "ID", dataIndex: "id", key: "id" },
//         { title: "Name", dataIndex: "name", key: "name" },
//         { title: "Brand", dataIndex: "brandName", key: "brandName" },
//         { title: "Created At", dataIndex: "createdAt", key: "created_at" },
//         { title: "Updated At", dataIndex: "updatedAt", key: "updated_at" },
//         {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//                 <>
//                     <Button type="link" onClick={() => handleEdit(record)}>
//                         Edit
//                     </Button>
//                     <Button type="link" danger onClick={() => handleDelete(record.id)}>
//                         Delete
//                     </Button>
//                 </>
//             ),
//         },
//     ];

//     return (
//         <div>
//             <Button type="primary" onClick={handleAdd}>
//                 Add Collection
//             </Button>
//             <Table dataSource={collections} columns={columns} rowKey="id" scroll={{ x: 1000 }} />
//             <Modal
//                 title={editingCollection ? "Edit Collection" : "Add Collection"}
//                 visible={isModalVisible}
//                 onOk={() => form.submit()}
//                 onCancel={handleCancel}
//             >
//                 <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
//                     <Form.Item
//                         name="name"
//                         label="Name"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input the name!",
//                             },
//                         ]}
//                     >
//                         <Input />
//                     </Form.Item>
//                     <Form.Item
//                         name="brand"
//                         label="Brand"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please select the brand!",
//                             },
//                         ]}
//                     >
//                         <Select>
//                             {brands.map((brand) => (
//                                 <Select.Option key={brand.id} value={brand.name}>
//                                     {brand.name}
//                                 </Select.Option>
//                             ))}
//                         </Select>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </div>
//     );
// };

// export default CollectionsManagement;
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection,
} from "../../../../../../services/api/Collections";
import { getAllBrands } from "../../../../../../services/api/BrandApi";

const CollectionsManagement = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchBrands();
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const response = await getAllCollections();
            const collectionsData = response.data;

            // Map the brand name to the collections data
            const updatedCollections = collectionsData.map((collection) => ({
                ...collection,
                brandName: collection.brand ? collection.brand.name : "unknown",
            }));

            setCollections(updatedCollections);
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
            brand: record.brand ? record.brand.name : null,
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
            message.error("Failed to delete collection.");
        }
    };

    const handleFormSubmit = async (formValues) => {
        try {
            console.log("Form values:", formValues); // Debugging line to check form values
            const values = await form.validateFields(); // Lấy giá trị từ form

            // Trích xuất giá trị name và brand từ form values
            const { name, brand } = values;

            if (editingCollection) {
                await updateCollection(editingCollection.id, name, brand);
                message.success("Collection updated successfully");
            } else {
                await createCollection(name, brand);
                message.success("Collection created successfully");
            }
            setIsModalVisible(false);
            fetchCollections();
        } catch (error) {
            console.error("Error saving collection:", error); // Debugging line to check error
            message.error("Failed to save collection.");
        }
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
        { title: "Brand", dataIndex: "brandName", key: "brand_name" },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "created_at",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updated_at",
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

    return (
        <div>
            <Button type="primary" onClick={handleAdd}>
                Add Collection
            </Button>
            <Table dataSource={collections} columns={columns} rowKey="id" />
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
