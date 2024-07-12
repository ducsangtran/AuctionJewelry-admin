import React, { useState, useEffect } from "react";
import { Table } from "antd";
import moment from "moment";
import { getWalletSystem } from "../../../../../services/api/WalletApi";

const WalletManagement = () => {
    const [walletData, setWalletData] = useState([]);

    useEffect(() => {
        fetchWalletSystem();
    }, []);

    const fetchWalletSystem = async () => {
        try {
            const response = await getWalletSystem();
            const walletData = response.data ? [response.data] : [];
            setWalletData(walletData);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
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
            title: "Account Balance",
            dataIndex: "account_balance",
            key: "account_balance",
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={walletData} rowKey="id" />
        </div>
    );
};

export default WalletManagement;
