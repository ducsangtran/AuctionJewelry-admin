import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, Button, Table, Space, Modal, message, Dropdown, Menu } from "antd";
import { getAllAuctions, getAuctionById, searchAuctionByAdmin } from "../../../../../services/api/AuctionApi";
import SearchModal from "./searchModal";
import moment from "moment";
import DetailAuctions from "./DetailAuctions";
import { MoreOutlined } from "@ant-design/icons";

const AuctionManagement = () => {
    const [form] = Form.useForm();
    const [AuctionsData, setAuctionData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [detailItem, setDetailItem] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);

    // Fetch all auctions on component mount
    useEffect(() => {
        fetchAllAuctions();
    }, []);

    const fetchAllAuctions = async () => {
        try {
            const response = await getAllAuctions();
            setAuctionData(response.data);
        } catch (error) {
            message.error("Failed to fetch auctions data.");
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm");
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
            dataIndex: ["jewelry", "startingPrice"],
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
                    <Dropdown overlay={menu(record)} trigger={["click"]}>
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const menu = (record) => (
        <Menu>
            <Menu.Item key="1" onClick={() => handleShowDetailModal(record)}>
                View Details
            </Menu.Item>
        </Menu>
    );

    const handleShowDetailModal = (record) => {
        if (record) {
            setDetailItem(record);
            setDetailModalVisible(true);
        }
    };

    const handleDetailModalCancel = () => {
        setDetailModalVisible(false);
        setDetailItem(null);
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
                form.resetFields();
                setModalVisible(false);
                setEditingItem(null);
            })
            .catch((errorInfo) => {
                console.log("Validate Failed:", errorInfo);
            });
    };

    const onSearch = async (value) => {
        try {
            if (!value) {
                const response = await getAllAuctions();
                const { data } = response;
                setAuctionData(data);
                setSearchStatus(null);
            } else {
                const response = await getAuctionById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setAuctionData([]);
                } else {
                    setSearchStatus(null);
                    setAuctionData(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Auction, Id does not exist!");
            setSearchStatus("No data found");
            setAuctionData([]);
        }
    };

    const handleOpenSearchModal = () => {
        setSearchModalVisible(true);
    };

    const handleCancelSearchModal = () => {
        setSearchModalVisible(false);
    };

    const handleSearch = async (searchParams) => {
        try {
            const response = await searchAuctionByAdmin(
                searchParams.collectionId,
                searchParams.categoryId,
                searchParams.minPrice,
                searchParams.maxPrice,
                searchParams.brandId,
                searchParams.jewelryCondition,
                searchParams.status,
                searchParams.sex
            );
            setAuctionData(response.content);
            setSearchModalVisible(false);
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
            <Modal title={editingItem ? "Edit Auction" : "Add New Auction"} visible={modalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <Form form={form}>
                    <Form.Item label="Start Time" name="startTime" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item label="End Time" name="endTime" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>

            <SearchModal visible={searchModalVisible} onCancel={handleCancelSearchModal} onSearch={handleSearch} />
            <DetailAuctions visible={detailModalVisible} onCancel={handleDetailModalCancel} auction={detailItem} />
        </div>
    );
};

export default AuctionManagement;
