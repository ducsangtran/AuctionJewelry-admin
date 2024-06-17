import React from "react";
import { Badge, Descriptions } from "antd";
const items = [
    {
        key: "1",
        label: "Product",
        children: "Cloud Database",
    },
    {
        key: "2",
        label: "Billing Mode",
        children: "Prepaid",
    },
    {
        key: "3",
        label: "Automatic Renewal",
        children: "YES",
    },
    {
        key: "4",
        label: "Order time",
        children: "2018-04-24 18:00:00",
    },
    {
        key: "5",
        label: "Usage Time",
        children: "2019-04-24 18:00:00",
        span: 2,
    },
    {
        key: "6",
        label: "Status",
        children: <Badge status="processing" text="Running" />,
        span: 3,
    },
    {
        key: "7",
        label: "Negotiated Amount",
        children: "$80.00",
    },
    {
        key: "8",
        label: "Discount",
        children: "$20.00",
    },
    {
        key: "9",
        label: "Official Receipts",
        children: "$60.00",
    },
    {
        key: "10",
        label: "Config Info",
        children: (
            <>
                Data disk type: MongoDB
                <br />
                Database version: 3.4
                <br />
                Package: dds.mongo.mid
                <br />
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1
                <br />
            </>
        ),
    },
];
const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // Check if the date is invalid
        return ""; // Return an empty string if the date is invalid
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};
const App = () => <Descriptions title="User Info" bordered items={items} />;
export default App;
