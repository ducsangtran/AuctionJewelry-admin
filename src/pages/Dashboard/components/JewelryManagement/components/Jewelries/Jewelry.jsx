import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, InputNumber, Row, Col, Space, message, Menu, Dropdown } from "antd";
import { getAllJewelries, getJewelryById } from "../../../../../../services/api/JewelryApi";
import JewelryDetails from "./JewelryDetails";
import { MoreOutlined } from "@ant-design/icons";

const { Option } = Select;

const JewelryAdmin = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [jewelryData, setJewelryData] = useState([]);
    const [searchStatus, setSearchStatus] = useState(null);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [detailItem, setDetailItem] = useState(null);
    const [statusFilters, setStatusFilters] = useState([]);

    useEffect(() => {
        fetchJewelryData();
    }, []);

    const fetchJewelryData = async () => {
        try {
            const response = await getAllJewelries();
            const jewelriesData = response.data;
            setJewelryData(jewelriesData);
            // Lấy tất cả các giá trị unique của trường "status" để làm filters
            const uniqueStatusValues = Array.from(new Set(jewelriesData.map((item) => item.status)));
            setStatusFilters(uniqueStatusValues.map((value) => ({ text: value, value })));
        } catch (error) {
            message.error("Failed to fetch jewelries data.");
        }
    };

    const onSearch = async (value) => {
        try {
            if (!value) {
                // Nếu giá trị nhập vào là rỗng, gọi API để lấy tất cả các Jewelry
                const response = await getAllJewelries();
                const { data } = response;
                setJewelryData(data);
                setSearchStatus(null);
            } else {
                const response = await getJewelryById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setJewelryData([]);
                } else {
                    setSearchStatus(null);
                    setJewelryData(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Jewelry, Id does not exist!");
            setSearchStatus("No data found");
            setJewelryData([]);
        }
    };

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

    const handleTableChange = (pagination, filters, sorter) => {
        // Xử lý các thay đổi trên bảng như lọc và sắp xếp
        console.log("Various parameters", pagination, filters, sorter);
    };

    const jewelryColumns = [
        { title: "ID", dataIndex: "id", key: "id", sorter: (a, b) => a.id - b.id, sortDirections: ["ascend", "descend"] },
        { title: "Seller", dataIndex: "sellerName", key: "seller_id" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => <span title={text}>{text.length > 35 ? `${text.substring(0, 35)}...` : text}</span>,
        },

        { title: "Weight", dataIndex: "weight", key: "weight" },
        { title: "Size", dataIndex: "size", key: "size" },
        { title: "Color", dataIndex: "color", key: "color" },
        { title: "Sex", dataIndex: "sex", key: "sex" },
        {
            title: "Condition",
            dataIndex: "jewelryCondition",
            key: "jewelryCondition",
            filters: [
                { text: "New", value: "New" },
                { text: "Used", value: "Used" },
            ],
            onFilter: (value, record) => record.jewelryCondition === value,
        },
        {
            title: "Starting Price",
            dataIndex: "staringPrice",
            key: "starting_price",
            sorter: (a, b) => a.staringPrice - b.staringPrice,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: statusFilters,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "",
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

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search Jewelry By Id" onSearch={onSearch} enterButton />
            </Space>
            <Table
                columns={jewelryColumns}
                dataSource={jewelryData}
                rowKey="id"
                pagination={{ pageSize: 6 }}
                onChange={handleTableChange}
            />

            <JewelryDetails
                visible={detailModalVisible}
                onCancel={handleDetailModalCancel}
                jewelry={detailItem} // Giả sử bạn truyền 'jewelry' như prop vào JewelryDetails
            />
        </div>
    );
};

export default JewelryAdmin;
