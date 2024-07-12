import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { getAllTransactions } from "../../../../../services/api/TransactionApi";
import moment from "moment";
import { render } from "react-dom";

const TransactionManagement = () => {
    const [transactions, setTransactions] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    const fetchAllTransactions = async () => {
        try {
            const response = await getAllTransactions();
            const transactions = response;
            setTransactions(transactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const getUniqueFilterValues = (data, key) => {
        const uniqueValues = [...new Set(data.map((item) => item[key]?.full_name || "System"))];
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
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: "Money",
            dataIndex: "money",
            key: "money",
            sorter: (a, b) => a.money - b.money,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Sender",
            dataIndex: ["sender", "full_name"],
            key: "money",
            render: (text) => text || "System",
            filters: getUniqueFilterValues(transactions, "sender"),
            onFilter: (value, record) => (record.sender?.full_name || "System") === value,
        },

        {
            title: "Receiver",
            dataIndex: ["receiver", "full_name"],
            key: "receiverName",
            render: (text) => text || "System",
            filters: getUniqueFilterValues(transactions, "receiver"),
            onFilter: (value, record) => (record.receiver?.full_name || "System") === value,
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={transactions} rowKey="id" />
        </div>
    );
};

export default TransactionManagement;
