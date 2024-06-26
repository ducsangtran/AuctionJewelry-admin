import React from "react";
import { Outlet } from "react-router-dom";

export const ValuationManagement = () => {
    return (
        <div>
            <h1>Valuation Management</h1>
            <Outlet />
        </div>
    );
};
