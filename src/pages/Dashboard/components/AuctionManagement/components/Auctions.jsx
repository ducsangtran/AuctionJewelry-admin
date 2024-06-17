import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    DatePicker,
    Button,
    Table,
    Space,
    Modal,
    message,
    Dropdown,
    Menu,
} from "antd";
import {
    cancelAuction,
    getAllAuctions,
    searchAuctionByAdmin,
} from "../../../../../services/api/AuctionApi";
import SearchModal from "./searchModal";
import moment from "moment";
import DetailAuctions from "./DetailAuctions";
import { MoreOutlined } from "@ant-design/icons";

const AuctionManagement = () => {
    const [form] = Form.useForm();
    const [AuctionsData, setAuctionData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [detailItem, setDetailItem] = useState(null);

    useEffect(() => {
        fetchAllAuctions();
    }, []);

    const fetchAllAuctions = async () => {
        try {
            const response = await getAllAuctions();
            const AuctionsData = response.data;
            setAuctionData(AuctionsData);
            setFilteredData(AuctionsData);
        } catch (error) {
            message.error("Failed to fetch auctions data.");
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
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
                    <Button onClick={() => handleDelete(record.auctionId)} type="danger">
                        Cancel
                    </Button>
                    <Dropdown overlay={menu(record)} trigger={["click"]}>
                        <Button icon={<MoreOutlined />} />
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const menu = (record) => (
        <Menu>
            <Menu.Item key="1" onClick={() => showDetailModal(record)}>
                View Details
            </Menu.Item>
        </Menu>
    );

    const showDetailModal = (record) => {
        setDetailItem(record);
        setDetailModalVisible(true);
    };

    const handleDetailModalCancel = () => {
        setDetailModalVisible(false);
        setDetailItem(null);
    };

    const handleEdit = (record) => {
        setEditingItem(record);
        form.setFieldsValue({
            ...record,
            startTime: moment(record.startTime),
            endTime: moment(record.endTime),
        });
        setModalVisible(true);
    };

    const handleDelete = async (auctionId) => {
        try {
            await cancelAuction(auctionId);
            message.success("Auction cancelled successfully.");
            fetchAllAuctions();
        } catch (error) {
            message.error("Failed to cancel auction.");
        }
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
            );
            const updatedAuctions = AuctionsData.content.map((auction) => ({
                ...auction,
            }));
            setAuctionData(updatedAuctions);
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
            <Table columns={columns} dataSource={filteredData} rowKey="id" />

            <Modal
                title={editingItem ? "Edit Auction" : "Add New Auction"}
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form}>
                    <Form.Item label="Start Time" name="startTime" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item label="End Time" name="endTime" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                </Form>
            </Modal>

            <SearchModal
                open={searchModalVisible}
                onCancel={handleCancelSearchModal}
                onSearch={handleSearch}
            />

            <DetailAuctions
                open={detailModalVisible}
                onCancel={handleDetailModalCancel}
                auction={detailItem}
            />
        </div>
    );
};

export default AuctionManagement;
