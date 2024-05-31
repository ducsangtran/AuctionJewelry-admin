import React from "react";
import { Outlet } from "react-router-dom";

export const JewelryManagement = () => {
    return (
        <div>
            <h1>Jewelry Management</h1>
            <Outlet />
        </div>
    );
};
