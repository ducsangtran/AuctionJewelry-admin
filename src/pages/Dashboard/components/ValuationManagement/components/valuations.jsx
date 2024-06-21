import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Space, Modal, message, Select } from "antd";
import {
    deleteValuation,
    editValuating,
    getAllValuations,
    getMyValuations,
    searchValuationById,
} from "../../../../../services/api/ValuationApi";
import { useSelector } from "react-redux";
import moment from "moment";
import ConfirmDeleteModal from "../../../../../components/form/ConfirmDeleteModal";

const { Option } = Select;

const ValuationManagement = () => {
    const [form] = Form.useForm();
    const [ValuationsData, setValuationsData] = useState([]);
    const [MyValuationsData, setMyValuationsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);
    const [staffIdFilter, setStaffIdFilter] = useState(null);

    // Fetch user role from Redux store
    const userRole = useSelector((state) => state.auth.roleName);
    const userId = useSelector((state) => state.auth.userId);
    const userRoleId = useSelector((state) => state.auth.roleId);

    useEffect(() => {
        if (userRole === "Manager" || userRole === "Admin") {
            fetchAllValuations();
        } else {
            fetchMyValuations();
        }
    }, []);

    const fetchAllValuations = async () => {
        try {
            const response = await getAllValuations();
            const ValuationsData = response.data;
            setValuationsData(ValuationsData);
            console.log(response.data);
        } catch (error) {
            message.error("Failed to fetch valuations data.");
        }
    };

    const fetchMyValuations = async () => {
        try {
            const response = await getMyValuations();
            const MyValuationsData = response.data;
            setMyValuationsData(MyValuationsData);
            console.log(response.data);
        } catch (error) {
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
            const filteredData = (
                userRole === "Manager" || userRole === "Admin" ? ValuationsData : MyValuationsData
            ).filter((item) => item.staff && item.staff.id === staffId);
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
            title: "Jewelry",
            dataIndex: ["jewelry", "name"],
            key: "jewelry",
        },
        {
            title: "Notes",
            dataIndex: "notes",
            key: "notes",
        },
        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => moment(text).format("YY-MM-DD HH:mm"),
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
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        onClick={() => handleEdit(record)}
                        disabled={record.online}
                        type="primary"
                    >
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
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteValuation(id);
            if (userRole === "Manager" || userRole === "Admin") {
                setValuationsData(ValuationsData.filter((item) => item.id !== id));
            } else {
                setMyValuationsData(MyValuationsData.filter((item) => item.id !== id));
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
            const {
                id,
                address,
                staffId,
                valuation_value,
                notes,
                status,
                desiredPrice,
                paymentMethod,
                valuatingMethod,
            } = values;

            const UpdatedItem = await editValuating(
                editingItem.id,
                address,
                staffId,
                valuation_value,
                notes,
                status,
                desiredPrice,
                paymentMethod,
                valuatingMethod
            );

            const updatedData = (
                userRole === "Manager" || userRole === "Admin" ? ValuationsData : MyValuationsData
            ).map((item) => (item.id === UpdatedItem.id ? UpdatedItem : item));

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
            console.log("Failed to update valuation:", error);
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
            message.error("Failed to search Valuation, Id does not exist!");
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
                <Select
                    placeholder="Filter by Staff ID"
                    onChange={handleStaffIdFilterChange}
                    allowClear
                    style={{ width: 200 }}
                >
                    {(userRole === "Manager" || userRole === "Admin"
                        ? ValuationsData
                        : MyValuationsData
                    )
                        .filter((valuation) => valuation.staff)
                        .map((valuation) => (
                            <Option key={valuation.staff.id} value={valuation.staff.id}>
                                {valuation.staff.full_name}
                            </Option>
                        ))}
                </Select>
            </Space>
            <Table
                columns={columns}
                dataSource={
                    userRole === "Manager" || userRole === "Admin"
                        ? ValuationsData
                        : MyValuationsData
                }
                rowKey="id"
            />

            <Modal
                title="Edit Valuation"
                open={modalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                    <Form.Item label="Address" name="address">
                        <Input />
                    </Form.Item>
                    {userRole === "Manager" && (
                        <Form.Item label="Staff ID" name="staffId">
                            <Input />
                        </Form.Item>
                    )}
                    <Form.Item label="Valuation Value" name="valuation_value">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Notes" name="notes">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: "Please select your status!" }]}
                    >
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
            </Modal>
            <ConfirmDeleteModal
                visible={deleteModalVisible}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default ValuationManagement;
