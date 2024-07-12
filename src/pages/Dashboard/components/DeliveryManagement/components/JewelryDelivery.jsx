import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Space, Modal, message, Select } from "antd";
import { useSelector } from "react-redux";
import { editDelivered, getAllDeliveries, getDeliveryById, getMyDelivery } from "../../../../../services/api/DeliveryApi";
import api from "../../../../../config/axios";
import { getAllShipper } from "../../../../../services/api/ShipperApi";
import moment from "moment";
const { Option } = Select;

const ValuatingDeliveryManagement = () => {
    const [form] = Form.useForm();
    const [JewelryDeliveryData, setJewelryDeliveryData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [searchStatus, setSearchStatus] = useState(null);
    const [myDeliveryData, setMyDeliveryData] = useState([]);
    const roleName = useSelector((state) => state.auth.roleName);
    const [shipperData, setShipperData] = useState([]);
    const userRole = useSelector((state) => state.auth.roleName);
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
            const jewelryDeliveryData = response.data;
            setJewelryDeliveryData(jewelryDeliveryData);
            // console.log(response.data);
        } catch (error) {
            message.error("Failed to fetch deliveries data.");
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
    const fetchAllShipper = async () => {
        try {
            const response = await getAllShipper();
            const shipperData = response.data;
            setShipperData(shipperData);
        } catch (error) {
            message.error("Failed to fetch user data.");
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
            title: "Jewelry",
            dataIndex: ["jewelry", "name"],
            key: "jewelry",
        },
        {
            title: "Phone Number",
            dataIndex: ["user", "phone_number"],
            key: "phoneNumber",
        },
        {
            title: "Address",
            dataIndex: ["address"],
            key: "address",
        },
        {
            title: "Staff",
            dataIndex: ["staff", "full_name"],
            key: "staff",
            filters:
                roleName === "Admin" || roleName === "Manager" ? getUniqueFilterValues(JewelryDeliveryData || [], "staff") : [],
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
        form.setFieldsValue({
            delivering_id: record.id,
            staff_id: record.staff ? record.staff.id : undefined,
        });
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        const newData = JewelryDeliveryData.filter((item) => item.id !== id);
        setJewelryDeliveryData(newData);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        form.resetFields();
        setEditingItem(null);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            await editDelivering(values.delivering_id, values.staff_id);
            const newData = JewelryDeliveryData.map((item) =>
                item.id === values.delivering_id
                    ? {
                          ...item,
                          staff: {
                              id: values.staff_id,
                              user: { full_name: shipperData.find((shipper) => shipper.id === values.staff_id)?.full_name },
                          },
                      }
                    : item
            );
            setJewelryDeliveryData(newData);
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
                setJewelryDeliveryData(data);
                setSearchStatus(null);
            } else {
                const response = await getDeliveryById(value);
                const data = response.data;
                if (Array.isArray(data) && data.length === 0) {
                    setSearchStatus("No data found");
                    setJewelryDeliveryData([]);
                } else {
                    setSearchStatus(null);
                    setJewelryDeliveryData(Array.isArray(data) ? data : [data]);
                }
            }
        } catch (error) {
            message.error("Failed to search Delivery, Id does not exist!");
            setSearchStatus("No data found");
            setJewelryDeliveryData([]);
        }
    };

    // Filter the deliveries based on the role and staff ID
    const filteredDeliveriesData =
        roleName === "Admin" || roleName === "Manager"
            ? JewelryDeliveryData.filter((item) => item.valuatingDelivery === false)
            : myDeliveryData.filter((item) => item.valuatingDelivery === false);

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search deliveries" onSearch={onSearch} enterButton />
            </Space>
            <Table columns={columns} dataSource={filteredDeliveriesData} rowKey="id" pagination={{ pageSize: 7 }} />

            <Modal title="Edit Delivery" visible={modalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <Form form={form} initialValues={editingItem}>
                    <Form.Item label="Delivering ID" name="delivering_id" rules={[{ required: true }]}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Staff" name="staff_id" rules={[{ required: true }]}>
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

const editDelivering = async (delivering_id, staff_id) => {
    try {
        const response = await api.put(`checkout/delivering`, { delivering_id, staff_id });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export default ValuatingDeliveryManagement;
