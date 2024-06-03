import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/Dashboard";
import { Statistics } from "@pages/Dashboard/components/Statistics";
import { TotalUserList } from "@pages/Dashboard/components/Statistics/TotalUserList/TotalUserList";
import { UserManagement } from "../../pages/Dashboard/components/UserManagement";
import { MaterialsManagement } from "../../pages/Dashboard/components/JewelryManagement/components/Materials/Materials";
import CategoriesManagement from "../../pages/Dashboard/components/JewelryManagement/components/Categories/Categories";
import BrandsManagement from "../../pages/Dashboard/components/JewelryManagement/components/Brands/Brands";
import JewelryAdmin from "../../pages/Dashboard/components/JewelryManagement/components/Jewelries/Jewelry";
import CollectionsManagement from "../../pages/Dashboard/components/JewelryManagement/components/Collections/Collections";

const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="statistics" element={<Statistics />}>
                    <Route path="totaluser" element={<TotalUserList />} />
                </Route>
                <Route path="usermanagement" element={<UserManagement />} />

                <Route path="materials" element={<MaterialsManagement />} />
                <Route path="categories" element={<CategoriesManagement />} />
                <Route path="brands" element={<BrandsManagement />} />
                <Route path="categories" element={<CategoriesManagement />} />
                <Route path="collections" element={<CollectionsManagement />} />
                <Route path="jewelries" element={<JewelryAdmin />} />
            </Route>
        </Routes>
    );
};

export default AppRouting;
