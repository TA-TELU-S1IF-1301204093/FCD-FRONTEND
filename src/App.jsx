import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Summary from "./pages/summary";
import Search from "./pages/search";
import Settings from "./pages/settings";
import Help from "./pages/help";
import LoginAdmin from "./pages/admin/LoginAdmin";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageHelp from "./pages/admin/ManageHelp";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/search" element={<Search />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />

                {/* admin */}
                <Route path="/admin/login" element={<LoginAdmin />} />
                <Route path="/admin/dashboard" element={<DashboardAdmin />} />
                <Route path="/admin/manage-users" element={<ManageUsers />} />
                <Route path="/admin/manage-helps" element={<ManageHelp />} />
            </Routes>
        </Router>
    );
}

export default App;
