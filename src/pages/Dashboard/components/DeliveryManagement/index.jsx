import React from "react";
import { Outlet } from "react-router-dom";

export const DeliveryManagement = () => {
    return (
        <div>
            <h1>Delivery Management</h1>
            <Outlet />
        </div>
    );
};
