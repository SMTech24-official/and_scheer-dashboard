import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DashboardLayout from "../components/layouts/Dashboard";
import SignInPage from "../components/signIn/SignIn";
import NotFound from "../components/notFound/NotFound";
import Overview from "../components/rightsidecomponent/overview/Overview";
import JobManagement from "../components/rightsidecomponent/jobmanagement/JobManagement";
import UserManagement from "../components/rightsidecomponent/usermanagement/UserManagement";
import Subscription from "../components/rightsidecomponent/subscription/Subscription";
import PaymentHistory from "../components/rightsidecomponent/paymenthistory/PaymentHistory";
import Setting from "../components/rightsidecomponent/setting/Setting";

const RouterProvider: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignInPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    {/* <Route index={true} element={<Overview />} /> */}
                    <Route path="overview" element={<Overview  title="Overview"/>} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="job-management" element={<JobManagement />} />
                    <Route path="subscription" element={<Subscription />} />
                    <Route path="payment-history" element={<PaymentHistory />} />
                    <Route path="setting" element={<Setting />} />                   
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default RouterProvider;