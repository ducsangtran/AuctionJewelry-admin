import React from "react";
import { Badge, Descriptions } from "antd";

const DetailAuctions = ({ auction }) => (
    <Descriptions title="Auctions Details" bordered column={4}>
        <Descriptions.Item label="Product" span={2}>
            Cloud Database
        </Descriptions.Item>
        <Descriptions.Item label="Billing Mode" span={2}>
            Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal" span={2}>
            YES
        </Descriptions.Item>
        <Descriptions.Item label="Order time" span={2}>
            2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
            2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
            <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount" span={2}>
            $80.00
        </Descriptions.Item>
        <Descriptions.Item label="Discount" span={2}>
            $20.00
        </Descriptions.Item>
        <Descriptions.Item label="Official Receipts" span={2}>
            $60.00
        </Descriptions.Item>
        <Descriptions.Item label="Config Info" span={3}>
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
        </Descriptions.Item>
    </Descriptions>
);

export default DetailAuctions;
