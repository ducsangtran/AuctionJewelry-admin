import React from "react";
import { Outlet } from "react-router-dom";

export const AuctionManagement = () => {
    return (
        <div>
            <h1>Auction Management</h1>
            <Outlet />
        </div>
    );
};
