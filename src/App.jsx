import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { roles } from "./constants/index";
import { PageTitleManager } from "./components/PageTitle";

/* PAGES
_________________________________________ */
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

import JoinPages from "./pages/join/index";
import UserPages from "./pages/user/index";
import CompaniesPages from "./pages/company/index";
import LocalMovingPages from "./pages/local_moving/index";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import NotAuthorizationPage from "./pages/NotAuthorizationPage";
import NotFoundPage from "./pages/NotFoundPage";

/* TOASTER
_________________________________________ */
import { Toaster } from "./components/ui/toaster";
import MembershipPage from "./pages/MembershipPage";

const AppContent = () => {
  const { user } = useAuth();

  const location = useLocation();

  const showHeader =
    !location.pathname.includes("/company/") &&
    !location.pathname.includes("/user/");

  return (
    <>
      <PageTitleManager />
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/join" element={<JoinPages.JoinMain />}>
          <Route path="company" element={<JoinPages.JoinCompanyPage />} />
          <Route path="realtors" element={<JoinPages.JoinRealtorsPage />} />
        </Route>
        <Route path="/authorization" element={<NotAuthorizationPage />} />
        <Route element={<ProtectedRoute roles={[roles.admin, roles.user]} />}>
          <Route path="/user/dashboard" element={<UserPages.DashboardPage />} />
        </Route>
        <Route
          element={<ProtectedRoute roles={[roles.admin, roles.company]} />}
        >
          <Route path="/company" element={<CompaniesPages.Layout />}>
            <Route
              path="dashboard"
              //element={<CompaniesPages.DashboardPage />}
              element={
                user && user.user_metadata.realtor_name ? (
                  <CompaniesPages.DashboardRealtorPage />
                ) : (
                  <CompaniesPages.DashboardPage />
                )
              }
            />
            <Route path="data" element={<CompaniesPages.DataPage />} />
            <Route
              path="notifications"
              element={<CompaniesPages.NotificationsPage />}
            />
            <Route path="leads">
              <Route
                path="phone-pool"
                element={<CompaniesPages.PhonePoolPage />}
              />
              <Route path="my-leads" element={<CompaniesPages.MyLeadsPage />} />
            </Route>
          </Route>
        </Route>
        <Route>
          <Route
            path="/local-moving/:id"
            element={<LocalMovingPages.InternalPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
