import React from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";

const TotalShipper = () => {
    const shipperData = useSelector((state) => state.shipper);

    const shipperCount = shipperData.shippers && shipperData.shippers.data ? shipperData.shippers.data.length : 0;

    return (
        <Card title="">
            <p>Total shippers: {shipperCount}</p>
        </Card>
    );
};

export default TotalShipper;
