// src/TransactionManagement.js
import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getAllTransactions } from "../../../../../services/api/TransactionApi";

const TransactionManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAllTransaction();
    }, []);

    const fetchAllTransaction = async () => {
        try {
            const response = await getAllTransactions();
            const transactions = response.data;
            setTransactions(transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            setTransactions([...transactions, { ...values, id: transactions.length + 1 }]);
            form.resetFields();
            setIsModalVisible(false);
        });
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
        },
        {
            title: "Money",
            dataIndex: "money",
            key: "money",
        },
        {
            title: "Sender",
            key: "sender",
            render: (text, record) => (
                <Space size="middle">
                    <span>{record.sender.full_name}</span>
                    <span>{record.sender.email}</span>
                </Space>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Pending" ? "volcano" : "green"} key={status}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "System Receive",
            dataIndex: "systemReceive",
            key: "systemReceive",
            render: (systemReceive) => (systemReceive ? "Yes" : "No"),
        },
        {
            title: "System Send",
            dataIndex: "systemSend",
            key: "systemSend",
            render: (systemSend) => (systemSend ? "Yes" : "No"),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button type="danger">Delete</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
                Add Transaction
            </Button>
            <Table columns={columns} dataSource={transactions} rowKey="id" />
            <Modal title="Add Transaction" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="createdAt" label="Created At" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="money" label="Money" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="sender" label="Sender" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="systemReceive" label="System Receive" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="systemSend" label="System Send" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TransactionManagement;
