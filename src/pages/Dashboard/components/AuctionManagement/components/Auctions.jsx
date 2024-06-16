import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Switch, Button, Table, Space, Modal, message } from "antd";
import { getAllAuctions, searchAuctionByAdmin } from "../../../../../services/api/AuctionApi";
import SearchModal from "./searchModal";

const AuctionManagement = () => {
    const [form] = Form.useForm();
    const [AuctionsData, setAuctionData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false); // State để điều khiển hiển thị modal tìm kiếm

    useEffect(() => {
        fetchAllAuctions();
    }, []);

    const fetchAllAuctions = async () => {
        try {
            const response = await getAllAuctions();
            const AuctionsData = response.data;
            // Directly map the brand name from nested brand object

            setAuctionData(AuctionsData);
        } catch (error) {
            message.error("Failed to fetch auctions data.");
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
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => formatDateTime(text),
        },

        {
            title: "Jewelry",
            dataIndex: ["jewelry", "name"],
            key: "jewelryName",
        },
        {
            title: "Current Price",
            dataIndex: "currentPrice",
            key: "currentPrice",
        },
        {
            title: "Start Time",
            dataIndex: "startTime",
            key: "startTime",
            render: (text) => formatDateTime(text),
        },
        {
            title: "End Time",
            dataIndex: "endTime",
            key: "endTime",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Starting Price",
            dataIndex: ["jewelry", "staringPrice"],
            key: "startingPrice",
        },
        {
            title: "Step",
            dataIndex: "step",
            key: "step",
        },
        {
            title: "Total Bid",
            dataIndex: "totalBids",
            key: "totalBids",
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => formatDateTime(text),
        },
        {
            title: "Winner",
            dataIndex: ["winner", "full_name"],
            key: "winnerName",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.id)} type="danger">
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        setEditingItem(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        const newData = AuctionsData.filter((item) => item.id !== id);
        setAuctionData(newData);
        setFilteredData(newData);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleModalOk = () => {
        form.validateFields()
            .then((values) => {
                const newData = [...AuctionsData];
                if (editingItem) {
                    const index = newData.findIndex((item) => item.id === editingItem.id);
                    if (index > -1) {
                        newData[index] = { ...editingItem, ...values };
                    }
                }
                setAuctionData(newData);
                setFilteredData(newData);
                form.resetFields();
                setModalVisible(false);
                setEditingItem(null);
            })
            .catch((errorInfo) => {
                console.log("Validate Failed:", errorInfo);
            });
    };

    const onSearch = (value) => {
        const filtered = AuctionsData.filter((item) =>
            Object.values(item).some(
                (val) => typeof val === "string" && val.toLowerCase().includes(value.toLowerCase())
            )
        );
        setFilteredData(filtered);
    };

    const handleOpenSearchModal = () => {
        setSearchModalVisible(true);
    };

    const handleCancelSearchModal = () => {
        setSearchModalVisible(false);
    };

    const handleSearch = async (searchParams) => {
        try {
            const AuctionsData = await searchAuctionByAdmin(
                searchParams.collectionId,
                searchParams.categoryId,
                searchParams.minPrice,
                searchParams.maxPrice,
                searchParams.brandId,
                searchParams.jewelryCondition,
                searchParams.status,
                searchParams.sex
                // searchParams.page || 1
                // Assuming you are starting from page 1
            );
            console.log("Response Data:", AuctionsData); // In ra phản hồi từ API
            const updatedAuctions = AuctionsData.content.map((auction) => ({
                ...auction,
            }));
            setAuctionData(updatedAuctions);
            // setFilteredData(updatedAuctions);
            setSearchModalVisible(false); // Hide modal after search
        } catch (error) {
            message.error("Failed to search auctions.");
        }
    };
    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search auctions" onSearch={onSearch} enterButton />
                <Button type="primary" onClick={handleOpenSearchModal}>
                    Advanced Search
                </Button>
            </Space>
            <Table columns={columns} dataSource={AuctionsData} rowKey="id" />

            <Modal
                title={editingItem ? "Edit Auction" : "Add New Auction"}
                visible={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                    <Form.Item label="Seller Name" name="sellerName" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date of Birth" name="dateOfBirth">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Role" name="role">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email Verified" name="emailVerified" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Active" name="isActive" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
            {console.log("AuctionsData:", AuctionsData)}
            {/* Modal tìm kiếm */}
            <SearchModal
                visible={searchModalVisible}
                onCancel={handleCancelSearchModal}
                onSearch={handleSearch}
            />
        </div>
    );
};

export default AuctionManagement;
