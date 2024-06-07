// import React, { useState, useEffect } from "react";
// import { Table, Button, Modal, Form, Input, DatePicker, Select } from "antd";
// import { getAllCollections } from "../../../../../../services/api/Collections";
// // import { getAllBrands } from "../../../../../../services/api/BrandApi";
// const CollectionsManagement = () => {
//     const [collections, setCollections] = useState([]);
//     const [brands, setBrands] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [editingCollection, setEditingCollection] = useState(null);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         fetchCollections();
//     }, []);

//     const fetchCollections = async () => {
//         try {
//             // Fetch collections data from API
//             const response = await getAllCollections(); // Replace with your API endpoint
//             const { data, data. } = response; // Extract data array from the response object

//             setCollections(data);
//         } catch (error) {
//             message.error("Failed to fetch collections data.");
//         }
//     };

//     // const fetchCollections = async () => {
//     //     try {
//     //         const response = await getAllCollections();
//     //         const collectionsData = response.data;

//     //         // Kết hợp tên Brand vào dữ liệu collections
//     //         const updatedCollections = collectionsData.map((collection) => {
//     //             const brand = brands.find(
//     //                 (brand) => brand.id === collection.brand_id
//     //             );
//     //             return {
//     //                 ...collection,
//     //                 brandName: brand ? brand.name : "Unknown",
//     //             };
//     //         });

//     //         setCollections(updatedCollections);
//     //     } catch (error) {
//     //         message.error("Failed to fetch collections data.");
//     //     }
//     // };

//     const handleAdd = () => {
//         setEditingCollection(null);
//         setIsModalVisible(true);
//     };

//     const handleEdit = (record) => {
//         setEditingCollection(record);
//         setIsModalVisible(true);
//         form.setFieldsValue({
//             ...record,
//             created_at: record.created_at ? new Date(record.created_at) : null,
//             updated_at: record.updated_at ? new Date(record.updated_at) : null,
//         });
//     };

//     const handleCancel = () => {
//         setIsModalVisible(false);
//         form.resetFields();
//     };

//     const columns = [
//         { title: "ID", dataIndex: "id", key: "id" },
//         { title: "Name", dataIndex: "name", key: "name" },
//         // { title: "Brand", dataIndex: "name", key: "brand_id" },
//         { title: "Brand", dataIndex: "brand.name", key: "brandName" },
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
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    message,
} from "antd";
import { getAllCollections } from "../../../../../../services/api/Collections";
import { getAllBrands } from "../../../../../../services/api/BrandApi";

const CollectionsManagement = () => {
    const [collections, setCollections] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCollection, setEditingCollection] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        // fetchBrands();
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

    // const fetchBrands = async () => {
    //     try {
    //         const response = await getAllBrands();
    //         setBrands(response.data);
    //     } catch (error) {
    //         message.error("Failed to fetch brands data.");
    //     }
    // };

    const handleAdd = () => {
        setEditingCollection(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record) => {
        setEditingCollection(record);
        setIsModalVisible(true);
        form.setFieldsValue({
            ...record,
            created_at: record.created_at ? new Date(record.created_at) : null,
            updated_at: record.updated_at ? new Date(record.updated_at) : null,
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Brand", dataIndex: "brandName", key: "brandName" }, // Cập nhật cột này
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
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        const formattedValues = {
                            ...values,
                            created_at: values.created_at
                                ? values.created_at.toISOString()
                                : null,
                            updated_at: values.updated_at
                                ? values.updated_at.toISOString()
                                : null,
                        };
                        if (editingCollection) {
                            // Replace with API call
                            updateCollectionAPI(
                                editingCollection.id,
                                formattedValues
                            );
                        } else {
                            // Replace with API call
                            createCollectionAPI(formattedValues);
                        }
                        setIsModalVisible(false);
                        fetchCollections();
                    }}
                >
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
                </Form>
            </Modal>
        </div>
    );
};

export default CollectionsManagement;
