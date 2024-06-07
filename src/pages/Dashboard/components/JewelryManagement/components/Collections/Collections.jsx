// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     Button,
//     Modal,
//     Form,
//     Input,
//     DatePicker,
//     Select,
//     message,
// } from "antd";
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
//             const response = await getAllCollections();
//             const collectionsData = response.data;

//             // Directly map the brand name from nested brand object
//             const updatedCollections = collectionsData.map((collection) => ({
//                 ...collection,
//                 brandName: collection.brand ? collection.brand.name : "Unknown",
//             }));

//             setCollections(updatedCollections);
//         } catch (error) {
//             message.error("Failed to fetch collections data.");
//         }
//     };
//     const fetchBrands = async () => {
//         try {
//             // Fetch brands data from API
//             const response = await getAllBrands(); // Replace with your API endpoint
//             const { data } = response; // Extract data array from the response object
//             setBrands(data);
//         } catch (error) {
//             // message.error("Failed to fetch brands data.");
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
//             ...record,
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

//     const handleFormSubmit = async (values) => {
//         try {
//             if (editingCollection) {
//                 await updateCollection(editingCollection.id, values.name);
//                 message.success("Collection updated successfully");
//             } else {
//                 await createCollection(values.name, values.brand_id);
//                 message.success("Collection created successfully");
//             }
//             setIsModalVisible(false);
//             fetchCollections();
//         } catch (error) {
//             message.error("Failed to save collection.");
//         }
//     };
//     const columns = [
//         { title: "ID", dataIndex: "id", key: "id" },
//         { title: "Name", dataIndex: "name", key: "name" },
//         { title: "Brand", dataIndex: "brandName", key: "brandName" }, // Cập nhật cột này
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
//                     <Button
//                         type="link"
//                         danger
//                         onClick={() => handleDelete(record.id)}
//                     >
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
//             <Table dataSource={collections} columns={columns} rowKey="id" />
//             <Modal
//                 title={editingCollection ? "Edit Collection" : "Add Collection"}
//                 visible={isModalVisible}
//                 onOk={() => form.submit()}
//                 onCancel={handleCancel}
//             >
//                 <Form
//                     form={form}
//                     layout="vertical"
//                     onFinish={(values) => {
//                         const formattedValues = {
//                             ...values,
//                             created_at: values.created_at
//                                 ? values.created_at.toISOString()
//                                 : null,
//                             updated_at: values.updated_at
//                                 ? values.updated_at.toISOString()
//                                 : null,
//                         };
//                         if (editingCollection) {
//                             // Replace with API call
//                             updateCollectionAPI(
//                                 editingCollection.id,
//                                 formattedValues
//                             );
//                         } else {
//                             // Replace with API call
//                             createCollectionAPI(formattedValues);
//                         }
//                         setIsModalVisible(false);
//                         fetchCollections();
//                     }}
//                 >
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
//                         name="brand_id"
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
//                                 <Select.Option key={brand.id} value={brand.id}>
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

            // Directly map the brand name from nested brand object
            const updatedCollections = collectionsData.map((collection) => ({
                ...collection,
                brandName: collection.brand ? collection.brand.name : "Unknown",
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

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Brand", dataIndex: "brandName", key: "brandName" },
        { title: "Created At", dataIndex: "createdAt", key: "created_at" },
        { title: "Updated At", dataIndex: "updatedAt", key: "updated_at" },
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
                                <Select.Option
                                    key={brand.id}
                                    value={brand.name}
                                >
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
