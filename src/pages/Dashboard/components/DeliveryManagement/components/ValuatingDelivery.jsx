import React, { useState, useEffect } from "react";
import { Form, Input, DatePicker, Switch, Button, Table, Space, Modal, message, Select } from "antd";
import {
    editDelivered,
    editDelivery,
    getAllDeliveries,
    getDeliveryById,
    getMyDelivery,
} from "../../../../../services/api/DeliveryApi";
import { getAllShipper } from "../../../../../services/api/ShipperApi";
import moment from "moment";

const ValuatingDeliveryManagement = () => {
    const [form] = Form.useForm();
    const [ValuatingDeliveryData, setValuatingDeliveryData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);
    const [shipperData, setShipperData] = useState([]);
    const [MyDeliveryData, setMyDeliveryData] = useState([]);

    const roleName = localStorage.getItem("roleName");
    useEffect(() => {
        if (roleName === "Admin" || roleName === "Manager") {
            fetchAllDeliveries();
            fetchAllShipper();
        } else {
            fetchMyDelivery();
        }
    }, []);

    const fetchAllDeliveries = async () => {
        try {
            const response = await getAllDeliveries();
            const ValuatingDeliveryData = response.data;
            setValuatingDeliveryData(ValuatingDeliveryData);
            console.log(response.data);
        } catch (error) {
            message.error("Failed to fetch deliveries data.");
        }
    };
    const fetchAllShipper = async () => {
        try {
            const response = await getAllShipper();
            const shipperData = response.data;
            setShipperData(shipperData);
        } catch (error) {
            message.error("Failed to fetch shipper data.");
        }
    };

    const fetchMyDelivery = async () => {
        try {
            const response = await getMyDelivery();
            const myDeliveryData = response.data;
            setMyDeliveryData(myDeliveryData);
            // console.log(response.data);
        } catch (error) {
            message.error("Failed to fetch deliveries data.");
        }
    };
    // Hàm để tạo danh sách các giá trị filter duy nhất
    const getUniqueFilterValues = (data, key) => {
        const uniqueValues = [...new Set(data.map((item) => item[key]?.full_name))];
        return uniqueValues.map((value) => ({ text: value, value }));
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => a.id - b.id,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: "Full Name",
            dataIndex: "full_name",
            key: "full_name",
        },

        {
            title: "Shipper",
            dataIndex: ["staff", "full_name"],
            key: "shipperName",
            filters:
                roleName === "Admin" || roleName === "Manager" ? getUniqueFilterValues(ValuatingDeliveryData || [], "staff") : [],
            onFilter: (value, record) => record.staff && record.staff.full_name === value,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Updated At",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
        },

        {
            title: "Valuating Delivery",
            dataIndex: "valuatingDelivery",
            key: "valuatingDelivery",
            render: (text) => (text ? "True" : "False"),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    {roleName === "Admin" || roleName === "Manager" ? (
                        <>
                            <Button onClick={() => handleEdit(record)} type="primary">
                                Edit
                            </Button>
                            <Button onClick={() => handleDelete(record.id)} type="primary" danger>
                                Delete
                            </Button>
                        </>
                    ) : roleName === "Shipper" ? (
                        <Button type="primary" onClick={() => handleConfirm(record.id)} disabled={record.status === "DELIVERED"}>
                            Confirm
                        </Button>
                    ) : null}
                </Space>
            ),
        },
    ];
    const handleConfirm = async (id) => {
        try {
            await editDelivered(id);
            message.success("Delivery confirmed successfully.");
            fetchMyDelivery(); // Refresh the deliveries data
        } catch (error) {
            message.error("Failed to confirm delivery.");
        }
    };
    const handleEdit = (record) => {
        setEditingItem(record);
        form.setFieldsValue(record);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        const newData = ValuatingDeliveryData.filter((item) => item.id !== id);
        setValuatingDeliveryData(newData);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            await editDelivery(values.id, values.staffId);
            const newData = ValuatingDeliveryData.map((item) =>
                item.id === values.id
                    ? {
                          ...item,
                          staff: {
                              id: values.staffId,
                              user: { full_name: shipperData.find((shipper) => shipper.id === values.staffId)?.full_name },
                          },
                          status: "DELIVERING", // Update status to DELIVERING
                      }
                    : item
            );
            setValuatingDeliveryData(newData);
            form.resetFields();
            setModalVisible(false);
            setEditingItem(null);
            message.success("Delivery updated successfully.");
            fetchAllDeliveries();
        } catch (error) {
            console.log("Validate Failed:", error);
            message.error("Failed to update delivery.");
        }
    };

    const onSearch = async (value) => {
        try {
            if (!value) {
                const response = await getAllDeliveries();
                const { data } = response;
                setValuatingDeliveryData(data);
                setSearchStatus(null);
            } else {
                const response = await getDeliveryById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setValuatingDeliveryData([]);
                } else {
                    setSearchStatus(null);
                    setValuatingDeliveryData(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Delivery, Id does not exist!");
            setSearchStatus("No data found");
            setValuatingDeliveryData([]);
        }
    };

    const filteredDeliveriesData =
        roleName === "Admin" || roleName === "Manager"
            ? ValuatingDeliveryData.filter((item) => item.valuatingDelivery === true)
            : MyDeliveryData.filter((item) => item.valuatingDelivery === true);
    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search deliveries" onSearch={onSearch} enterButton />
            </Space>
            <Table columns={columns} dataSource={filteredDeliveriesData} rowKey="id" pagination={{ pageSize: 7 }} />

            <Modal title="Edit Delivery" visible={modalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <Form form={form} onFinish={handleModalOk} initialValues={editingItem}>
                    <Form.Item label="Id" name="id">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Shipper" name="staffId" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a staff"
                            disabled={editingItem?.status === "VALUATED" || editingItem?.status === "VALUATING" ? true : false}
                        >
                            {shipperData.map((shipper) => (
                                <Option key={shipper.id} value={shipper.id}>
                                    {shipper.full_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ValuatingDeliveryManagement;
