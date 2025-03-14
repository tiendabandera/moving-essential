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
import AdminPages from "./pages/admin/index";
import UserPages from "./pages/user/index";
import CompaniesPages from "./pages/company/index";
import LocalMovingPages from "./pages/local_moving/index";
import RealtorsPages from "./pages/realtors/index";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header";
import NotAuthorizationPage from "./pages/NotAuthorizationPage";
import NotFoundPage from "./pages/NotFoundPage";

/* TOASTER
_________________________________________ */
import { Toaster } from "./components/ui/toaster";
import MembershipPage from "./pages/MembershipPage";
import useScrollToHash from "./hooks/useScrollToHash";
import ServicesPage from "./pages/ServicesPage";
import Footer from "./components/Footer";

const AppContent = () => {
  const { user } = useAuth();

  const location = useLocation();
  useScrollToHash(location);

  const showHeader =
    !location.pathname.startsWith("/company/") &&
    !location.pathname.startsWith("/user/") &&
    !location.pathname.startsWith("/admin/");

  return (
    <div className="app-container">
      <PageTitleManager />
      {showHeader && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/join" element={<JoinPages.JoinMain />}>
            <Route path="company" element={<JoinPages.JoinCompanyPage />} />
            <Route path="realtors" element={<JoinPages.JoinRealtorsPage />} />
          </Route>
          <Route path="/authorization" element={<NotAuthorizationPage />} />
          <Route element={<ProtectedRoute roles={[roles.admin]} />}>
            <Route path="/admin" element={<AdminPages.Layout />}>
              <Route path="dashboard" element={<AdminPages.DashboardPage />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute roles={[roles.admin, roles.user]} />}>
            <Route
              path="/user/dashboard"
              element={<UserPages.DashboardPage />}
            />
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
                <Route
                  path="my-leads"
                  element={<CompaniesPages.MyLeadsPage />}
                />
              </Route>
              <Route
                path="membership-premium-features"
                element={<CompaniesPages.PremiumFeatures />}
              />
            </Route>
            <Route path="/membership" element={<MembershipPage />} />
          </Route>
          <Route>
            <Route
              path="/local-moving"
              element={<LocalMovingPages.AllPage />}
            />
            <Route
              path="/local-moving/compare"
              element={<LocalMovingPages.ComparePage />}
            />
            <Route
              path="/local-moving/:id"
              element={<LocalMovingPages.InternalPage />}
            />
          </Route>
          <Route>
            <Route path="/realtors" element={<RealtorsPages.AllPage />} />
            <Route
              path="/realtors/compare"
              element={<RealtorsPages.ComparePage />}
            />
            <Route
              path="/realtors/:id"
              element={<RealtorsPages.InternalPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {showHeader && <Footer />}
    </div>
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
