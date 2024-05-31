import { Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/Dashboard";
import { Statistics } from "@pages/Dashboard/components/Statistics";
import { TotalUserList } from "@pages/Dashboard/components/Statistics/TotalUserList/TotalUserList";
import { UserManagement } from "../../pages/Dashboard/components/UserManagement";
// import { JewelryManagement } from "../../pages/Dashboard/components/JewelryManagement";
// import { Materials } from "../../pages/Dashboard/components/JewelryManagement/Materials/Materials";

const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}>
                <Route path="/statistics" element={<Statistics />}>
                    <Route path="totaluser" element={<TotalUserList />} />
                </Route>
                <Route path="/usermanagement" element={<UserManagement />} />

                {/* <Route path="/materials" element={<Materials />} /> */}
            </Route>
        </Routes>
    );
};

export default AppRouting;
