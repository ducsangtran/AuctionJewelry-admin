import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Space, Modal, message, Select, Descriptions, Row, Col, Typography } from "antd";
import { deleteValuation, editValuating, getAllValuations, getMyValuations, searchValuationById } from "../../../../../services/api/ValuationApi";
import { useSelector } from "react-redux";
import moment from "moment";
import ConfirmDeleteModal from "../../../../../components/form/ConfirmDeleteModal";
import TextArea from "antd/es/input/TextArea";
import { getAllStaff } from "../../../../../services/api/StaffApi";

const { Option } = Select;
const { Title } = Typography;
const ValuationManagement = () => {
    const [form] = Form.useForm();
    const [valuationsData, setValuationsData] = useState([]);
    const [myValuationsData, setMyValuationsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);
    const [staffIdFilter, setStaffIdFilter] = useState(null);
    const [staffsData, setStaffsData] = useState([]);
    // Fetch user role from Redux store
    const userRole = useSelector((state) => state.auth.roleName);

    const userRoleId = useSelector((state) => state.auth.roleId);

    useEffect(() => {
        if (userRole === "Manager" || userRole === "Admin") {
            fetchAllValuations();
        } else {
            fetchMyValuations();
        }
        fetchAllStaffs();
    }, []);

    const fetchAllStaffs = async () => {
        try {
            const response = await getAllStaff();
            const staffsData = response.data;
            setStaffsData(staffsData);
        } catch (error) {
            message.error("Failed to fetch staff data.");
        }
    };
    const fetchAllValuations = async () => {
        try {
            const response = await getAllValuations();
            const valuationsData = response.data;
            setValuationsData(valuationsData);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch all valuations data:", error);
            message.error("Failed to fetch valuations data.");
        }
    };

    const fetchMyValuations = async () => {
        try {
            const response = await getMyValuations();
            const myValuationsData = response.data;
            setMyValuationsData(myValuationsData);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch my valuations data:", error);
            message.error("Failed to fetch valuations data.");
        }
    };

    const handleStaffIdFilterChange = (value) => {
        setStaffIdFilter(value);
        filterValuationsByStaffId(value);
    };

    const filterValuationsByStaffId = async (staffId) => {
        if (!staffId) {
            if (userRole === "Manager" || userRole === "Admin") {
                fetchAllValuations();
            } else {
                fetchMyValuations();
            }
            return;
        }

        try {
            const filteredData = (userRole === "Manager" || userRole === "Admin" ? valuationsData : myValuationsData).filter((item) => item.staff && item.staff.id === staffId);
            if (userRole === "Manager" || userRole === "Admin") {
                setValuationsData(filteredData);
            } else {
                setMyValuationsData(filteredData);
            }
        } catch (error) {
            message.error("Failed to filter valuations data.");
        }
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Jewelry",
            dataIndex: ["jewelry", "name"],
            key: "jewelry",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => moment(text).format("YY-MM-DD HH:mm"),
        },
        {
            title: "Desired Price",
            dataIndex: "desiredPrice",
            key: "desiredPrice",
        },

        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },

        {
            title: "Valuating Fee",
            dataIndex: "valuatingFee",
            key: "valuatingFee",
        },
        {
            title: "Valuating Method",
            dataIndex: "valuatingMethod",
            key: "valuatingMethod",
        },
        {
            title: "Valuation Value",
            dataIndex: "valuation_value",
            key: "valuation_value",
        },
        {
            title: "Online",
            dataIndex: "online",
            key: "online",
            render: (text) => (text ? "True" : "False"),
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => moment(text).format("YY-MM-DD HH:mm"),
        },
        {
            title: "Staff Name",
            dataIndex: ["staff", "full_name"],
            key: "staffName",
        },
        {
            title: "Staff Id",
            dataIndex: ["staff", "id"],
            key: "staffId",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
                { text: "VALUATING", value: "VALUATING" },
                { text: "VALUATED", value: "VALUATED" },
                { text: "REQUEST", value: "REQUEST" },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Notes               ",
            dataIndex: "notes",
            key: "notes",
            render: (text) => <span title={text}>{text.length > 30 ? `${text.substring(0, 30)}...` : text}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEdit(record)} type="primary">
                        Edit
                    </Button>
                    <Button onClick={() => showDeleteModal(record.id)} type="primary" danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleEdit = (record) => {
        setEditingItem(record);
        form.setFieldsValue({
            ...record,
            staffId: record.staff?.id,
            full_name: record.staff?.full_name,
        });
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteValuation(id);
            if (userRole === "Manager" || userRole === "Admin") {
                setValuationsData(valuationsData.filter((item) => item.id !== id));
            } else {
                setMyValuationsData(myValuationsData.filter((item) => item.id !== id));
            }
            message.success("Valuation deleted successfully.");
        } catch (error) {
            console.error("Failed to delete valuation:", error);
            message.error("Failed to delete valuation.");
        }
    };

    const showDeleteModal = (id) => {
        setDeleteId(id);
        setDeleteModalVisible(true);
    };

    const handleConfirmDelete = () => {
        handleDelete(deleteId);
        setDeleteModalVisible(false);
    };

    const handleCancelDelete = () => {
        setDeleteModalVisible(false);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            const { id, address, staffId, valuation_value, notes, status, desiredPrice, paymentMethod, valuatingMethod } = values;

            const UpdatedItem = await editValuating(editingItem.id, address, staffId, valuation_value, notes, status, desiredPrice, paymentMethod, valuatingMethod);

            const updatedData = (userRole === "Manager" || userRole === "Admin" ? valuationsData : myValuationsData).map((item) => (item.id === UpdatedItem.id ? UpdatedItem : item));

            if (userRole === "Manager" || userRole === "Admin") {
                setValuationsData(updatedData);
            } else {
                setMyValuationsData(updatedData);
            }

            form.resetFields();
            setModalVisible(false);
            setEditingItem(null);
            if (userRole === "Manager" || userRole === "Admin") {
                fetchAllValuations();
            } else {
                fetchMyValuations();
            }
            message.success("Success to update valuation.");
        } catch (error) {
            console.error("Failed to update valuation:", error);
            message.error("Failed to update valuation.");
        }
    };

    const onSearch = async (value) => {
        try {
            if (!value) {
                // If the search value is empty, fetch all valuations or my valuations based on role
                if (userRole === "Manager" || userRole === "Admin") {
                    fetchAllValuations();
                } else {
                    fetchMyValuations();
                }
                setSearchStatus(null);
            } else {
                const response = await searchValuationById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    if (userRole === "Manager" || userRole === "Admin") {
                        setValuationsData([]);
                    } else {
                        setMyValuationsData([]);
                    }
                } else {
                    setSearchStatus(null);
                    if (userRole === "Manager" || userRole === "Admin") {
                        setValuationsData(Array.isArray(data) ? data : [data]);
                    } else {
                        setMyValuationsData(Array.isArray(data) ? data : [data]);
                    }
                }
            }
        } catch (error) {
            console.error("Failed to search valuation by ID:", error);
            message.error("Failed to search valuation, Id does not exist!");
            setSearchStatus("No data found");
            if (userRoleId === 1 || userRole === "Admin") {
                setValuationsData([]);
            } else {
                setMyValuationsData([]);
            }
        }
    };

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search valuations" onSearch={onSearch} enterButton />
                <Select placeholder="Filter by Staff ID" onChange={handleStaffIdFilterChange} allowClear style={{ width: 200 }}>
                    {(userRole === "Manager" || userRole === "Admin" ? valuationsData : myValuationsData)
                        .filter((valuation) => valuation.staff)
                        .map((valuation) => (
                            <Option key={valuation.staff.id} value={valuation.staff.id}>
                                {valuation.staff.full_name}
                            </Option>
                        ))}
                </Select>
            </Space>
            <Table columns={columns} dataSource={userRole === "Manager" || userRole === "Admin" ? valuationsData : myValuationsData} rowKey="id" />

            <Modal width={800} open={modalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                {editingItem && editingItem.jewelry && (
                    <Row gutter={16}>
                        <Col span={12}>
                            <Descriptions title="Jewelry Details" bordered column={2}>
                                <Descriptions.Item label="Name" span={2}>
                                    {editingItem.jewelry.name}
                                </Descriptions.Item>
                                {/* <Descriptions.Item label="Image" span={2}>
                                    {editingItem.jewelry.jewelryImages.url}
                                </Descriptions.Item> */}
                                <Descriptions.Item label="Material" span={2}>
                                    {editingItem.jewelry.jewelryMaterials[0]?.material.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Material Weight" span={2}>
                                    {editingItem.jewelry.jewelryMaterials[0]?.weight}
                                </Descriptions.Item>
                                <Descriptions.Item label="Description" span={2}>
                                    {editingItem.jewelry.description}
                                </Descriptions.Item>
                                <Descriptions.Item label="Jewelry Condition" span={2}>
                                    {editingItem.jewelry.jewelryCondition}
                                </Descriptions.Item>
                                <Descriptions.Item label="Sex" span={2}>
                                    {editingItem.jewelry.sex}
                                </Descriptions.Item>

                                <Descriptions.Item label="Status " span={2}>
                                    {editingItem.jewelry.status}
                                </Descriptions.Item>
                                <Descriptions.Item label="Jewelry Weight" span={2}>
                                    {editingItem.jewelry.weight}
                                </Descriptions.Item>
                                <Descriptions.Item label="Brand" span={2}>
                                    {editingItem.jewelry.brand.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Category" span={2}>
                                    {editingItem.jewelry.category.name}
                                </Descriptions.Item>
                                <Descriptions.Item label="Collection" span={2}>
                                    {editingItem.jewelry.collection.name}
                                </Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Edit Valuation</Title>
                            <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                                {userRole === "Manager" || userRole === "Admin" ? (
                                    <Form.Item label="Staff" name="staffId">
                                        <Select placeholder="Select a Staff">
                                            {staffsData.map((staff) => (
                                                <Option key={staff.id} value={staff.id}>
                                                    {staff.full_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                ) : null}
                                <Form.Item label="Valuation Value" name="valuation_value">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Notes" name="notes">
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select your status!" }]}>
                                    <Select placeholder="Select your status">
                                        {userRole === "Staff" && <Option value="VALUATING">VALUATING</Option>}
                                        {userRole === "Admin" || userRole === "Manager" ? (
                                            <>
                                                <Option value="VALUATED">VALUATED</Option>
                                                <Option value="REJECTED">REJECTED</Option>
                                            </>
                                        ) : (
                                            <Option value="VALUATING">VALUATING</Option>
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Payment Method" name="paymentMethod">
                                    <Input />
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                )}
            </Modal>

            <ConfirmDeleteModal visible={deleteModalVisible} onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
        </div>
    );
};

export default ValuationManagement;
