import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/Dashboard";

import { MaterialsManagement } from "../../pages/Dashboard/components/JewelryManagement/components/Materials/Materials";
import CategoriesManagement from "../../pages/Dashboard/components/JewelryManagement/components/Categories/Categories";
import BrandsManagement from "../../pages/Dashboard/components/JewelryManagement/components/Brands/Brands";
import JewelryAdmin from "../../pages/Dashboard/components/JewelryManagement/components/Jewelries/Jewelry";
import CollectionsManagement from "../../pages/Dashboard/components/JewelryManagement/components/Collections/Collections";
import { Login } from "@pages/Login/Login";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import AuctionManagement from "../../pages/Dashboard/components/AuctionManagement/components/Auctions";
import ValuationManagement from "../../pages/Dashboard/components/ValuationManagement/components/valuations";
import StaffManagement from "../../pages/Dashboard/components/AccountManagement/components/StaffList/StaffList";
import UserManagement from "../../pages/Dashboard/components/AccountManagement/components/UserList/UserList";
import ManagerManagement from "../../pages/Dashboard/components/AccountManagement/components/ManagerList/ManagerList";

import BlogList from "../../pages/Dashboard/components/Blog/components/BlogList";
import BlogEdit from "../../pages/Dashboard/components/Blog/components/BlogEdit";
import AddBlog from "../../pages/Dashboard/components/Blog/components/AddBlog";
import ValuatingDeliveryManagement from "../../pages/Dashboard/components/DeliveryManagement/components/ValuatingDelivery";
import JewelryDeliveryManagement from "../../pages/Dashboard/components/DeliveryManagement/components/JewelryDelivery";
import ShipperManagement from "../../pages/Dashboard/components/AccountManagement/components/ShipperList/ShipperList";

const AppRouting = () => {
    const Auth = localStorage.getItem("fullName");
    console.log(Auth);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route exact path="/" element={<ProtectedRoute element={<Dashboard />} />}>
                <Route path="users" element={<UserManagement />} />
                <Route path="staffs" element={<StaffManagement />} />
                <Route path="managers" element={<ManagerManagement />} />
                <Route path="shippers" element={<ShipperManagement />} />
                <Route path="materials" element={<MaterialsManagement />} />
                <Route path="categories" element={<CategoriesManagement />} />
                <Route path="brands" element={<BrandsManagement />} />
                <Route path="categories" element={<CategoriesManagement />} />
                <Route path="collections" element={<CollectionsManagement />} />
                <Route path="jewelries" element={<JewelryAdmin />} />
                <Route path="auctions" element={<AuctionManagement />} />
                <Route path="valuatingDelivery" element={<ValuatingDeliveryManagement />} />
                <Route path="jewelryDelivery" element={<JewelryDeliveryManagement />} />
                <Route path="valuations" element={<ValuationManagement />} />
                <Route path="blogs" element={<BlogList />} />
                <Route path="/blogs/add" element={<AddBlog />} />
                <Route path="/edit/:id" element={<BlogEdit />} />
            </Route>
        </Routes>
    );
};

export default AppRouting;
