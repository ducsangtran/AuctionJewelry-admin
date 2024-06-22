import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/Dashboard";
// import { Statistics } from "@pages/Dashboard/components/Statistics";
// import { TotalUserList } from "@pages/Dashboard/components/Statistics/TotalUserList/TotalUserList";
// import { UserManagement } from "../../pages/Dashboard/components/UserManagement";
import { MaterialsManagement } from "../../pages/Dashboard/components/JewelryManagement/components/Materials/Materials";
import CategoriesManagement from "../../pages/Dashboard/components/JewelryManagement/components/Categories/Categories";
import BrandsManagement from "../../pages/Dashboard/components/JewelryManagement/components/Brands/Brands";
import JewelryAdmin from "../../pages/Dashboard/components/JewelryManagement/components/Jewelries/Jewelry";
import CollectionsManagement from "../../pages/Dashboard/components/JewelryManagement/components/Collections/Collections";
import { Login } from "@pages/Login/Login";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import AuctionManagement from "../../pages/Dashboard/components/AuctionManagement/components/Auctions";
import DeliveryManagement from "../../pages/Dashboard/components/DeliveryManagement/components/Deliveries";

import ValuationManagement from "../../pages/Dashboard/components/ValuationManagement/components/valuations";
import StaffManagement from "../../pages/Dashboard/components/AccountManagement/components/StaffList/StaffList";

const AppRouting = () => {
    const Auth = localStorage.getItem("fullName");
    console.log(Auth);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route exact path="/" element={<ProtectedRoute element={<Dashboard />} />}>
                {/* <Route path="statistics" element={<Statistics />}>
                    <Route path="totaluser" element={<TotalUserList />} />
                </Route> */}

                <Route path="staffs" element={<StaffManagement />} />
                <Route path="materials" element={<MaterialsManagement />} />
                <Route path="categories" element={<CategoriesManagement />} />
                <Route path="brands" element={<BrandsManagement />} />
                <Route path="categories" element={<CategoriesManagement />} />
                <Route path="collections" element={<CollectionsManagement />} />
                <Route path="jewelries" element={<JewelryAdmin />} />
                <Route path="auctions" element={<AuctionManagement />} />
                <Route path="deliveries" element={<DeliveryManagement />} />
                <Route path="valuations" element={<ValuationManagement />} />
            </Route>
        </Routes>
    );
};

export default AppRouting;
