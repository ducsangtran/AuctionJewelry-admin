import React, { useState, useEffect } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    InputNumber,
    Row,
    Col,
    Space,
    message,
    Menu,
    Dropdown,
} from "antd";
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

    useEffect(() => {
        fetchJewelryData();
    }, []);

    const fetchJewelryData = async () => {
        try {
            const response = await getAllJewelries();
            const jewelriesData = response.data;
            setJewelryData(jewelriesData);
            console.log(response.data);
        } catch (error) {
            message.error("Failed to fetch jewelries data.");
        }
    };

    const handleAdd = () => {
        setVisible(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            // Send values to API to add/edit jewelry
            setVisible(false);
            form.resetFields();
        });
    };

    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
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

    const jewelryColumns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Seller", dataIndex: "sellerName", key: "seller_id" },
        { title: "Name", dataIndex: "name", key: "name" },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (text) => (
                <span title={text}>{text.length > 35 ? `${text.substring(0, 35)}...` : text}</span>
            ),
        },
        { title: "Category", dataIndex: ["category", "name"], key: "category_id" },
        { title: "Brand", dataIndex: ["brand", "name"], key: "brandName" },
        { title: "Material", dataIndex: "jewelryCondition", key: "condition" },
        { title: "Collection", dataIndex: ["collection", "name"], key: "collection_id" },
        { title: "Weight", dataIndex: "weight", key: "weight" },
        { title: "Size", dataIndex: "size", key: "size" },
        { title: "Color", dataIndex: "color", key: "color" },
        { title: "Sex", dataIndex: "sex", key: "sex" },
        { title: "Condition", dataIndex: "jewelryCondition", key: "condition" },
        { title: "Starting Price", dataIndex: "staringPrice", key: "starting_price" },
        { title: "Status", dataIndex: "status", key: "status" },
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
                pagination={{ pageSize: 7 }}
            />
            <Modal
                title="Add/Edit Jewelry"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="seller_id"
                                label="Seller ID"
                                rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[{ required: true }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="category_id"
                                label="Category ID"
                                rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="weight" label="Weight" rules={[{ required: true }]}>
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="color" label="Color" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="sex" label="Sex" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="brand_id"
                                label="Brand ID"
                                rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="condition"
                                label="Condition"
                                rules={[{ required: true }]}
                            >
                                <Select>
                                    <Option value="new">New</Option>
                                    <Option value="used">Used</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="starting_price"
                                label="Starting Price"
                                rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                <Select>
                                    <Option value="available">Available</Option>
                                    <Option value="sold">Sold</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="collection_id"
                                label="Collection ID"
                                rules={[{ required: true }]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <JewelryDetails
                visible={detailModalVisible}
                onCancel={handleDetailModalCancel}
                jewelry={detailItem} // Assuming you pass 'jewelry' as prop to JewelryDetails
            />
        </div>
    );
};

export default JewelryAdmin;
