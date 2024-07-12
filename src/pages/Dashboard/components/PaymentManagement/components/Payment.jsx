import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { getAllPayment } from "../../../../../services/api/PaymentApi";
import moment from "moment";

const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchAllPayments();
    }, []);

    const fetchAllPayments = async () => {
        try {
            const response = await getAllPayment();
            const payments = response.data;
            setPayments(payments);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };
    // Hàm để trích xuất phần số từ chuỗi id
    const extractNumber = (id) => {
        return parseInt(id.match(/\d+/g)[0], 10);
    };

    // Hàm để tạo danh sách các giá trị filter duy nhất
    const getUniqueFilterValues = (data, key) => {
        const uniqueValues = [...new Set(data.map((item) => item.wallet.user.full_name))];
        return uniqueValues.map((value) => ({ text: value, value }));
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => extractNumber(a.id) - extractNumber(b.id),
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
            title: "Wallet ID",
            dataIndex: ["wallet", "id"],
            key: "walletId",
            sorter: (a, b) => a.wallet.id - b.wallet.id,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "User Name",
            dataIndex: ["wallet", "user", "full_name"],
            key: "userName",
            filters: getUniqueFilterValues(payments, "userName"),
            onFilter: (value, record) => record.wallet.user.full_name === value,
        },
        {
            title: "Money in Wallet",
            dataIndex: ["wallet", "money"],
            key: "moneyWallet",
            sorter: (a, b) => a.wallet.money - b.wallet.money,
            sortDirections: ["ascend", "descend"],
        },

        {
            title: "Amount",
            dataIndex: ["amount"],
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
            sortDirections: ["ascend", "descend"],
        },
        {
            title: "Bank Code",
            dataIndex: "bankCode",
            key: "bankCode",
        },
        {
            title: "Payment",
            dataIndex: "payment",
            key: "payment",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: [
                { text: "PENDING", value: "PENDING" },
                { text: "SUCCESS", value: "SUCCESS" },
                { text: "FAILED", value: "FAILED" },
            ],
            onFilter: (value, record) => record.status === value,
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={payments} rowKey="id" />
        </div>
    );
};

export default PaymentManagement;
