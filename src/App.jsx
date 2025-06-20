/* HOOKS
_________________________________________ */
import useScrollBehavior from "./hooks/useScrollBehavior";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { roles } from "./constants/index";

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
import LandingsPages from "./pages/landing/index";

import ProtectedRoute from "./ProtectedRoute";
import NotAuthorizationPage from "./pages/NotAuthorizationPage";
import NotFoundPage from "./pages/NotFoundPage";

import ServicesPage from "./pages/ServicesPage";
import InternalListingPage from "./pages/company/listings/InternalListingPage";
import TestPage from "./pages/TestPage";
import FAQsPage from "./pages/FAQsPage";
import TipsPage from "./pages/TipsPage";
import ContactPage from "./pages/ContactPage";
import MembershipPage from "./pages/MembershipPage";

/* COMPONENTS
_________________________________________ */
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import { PageTitleManager } from "./components/PageTitle";
import { useEffect } from "react";
import { fbq, initFacebookPixel } from "./utils/facebookPixel";

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();

  useScrollBehavior();

  const showHeader =
    !location.pathname.startsWith("/company/") &&
    !location.pathname.startsWith("/user/") &&
    !location.pathname.startsWith("/admin/");

  useEffect(() => {
    initFacebookPixel("411070631613487"); // Reemplaza con tu ID real
  }, []);

  useEffect(() => {
    fbq("track", "PageView");
    //console.log("📡 PageView disparado en:", location.pathname);
  }, [location.pathname]); // Se dispara cada vez que cambia la URL

  return (
    <div className="app-container">
      <PageTitleManager />
      {showHeader && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/landing">
            <Route path="user" element={<LandingsPages.UserPage />} />
            <Route path="company" element={<LandingsPages.CompanyPage />} />
            <Route path="realtor" element={<LandingsPages.RealtorPage />} />
          </Route>
          <Route path="/join" element={<JoinPages.JoinMain />}>
            <Route path="company" element={<JoinPages.JoinCompanyPage />} />
            <Route path="realtors" element={<JoinPages.JoinRealtorsPage />} />
          </Route>
          <Route path="/authorization" element={<NotAuthorizationPage />} />
          <Route element={<ProtectedRoute roles={[roles.admin]} />}>
            <Route path="/admin" element={<AdminPages.Layout />}>
              <Route path="dashboard" element={<AdminPages.DashboardPage />} />
              <Route path="phone-pool" element={<AdminPages.PhonePoolPage />} />
              <Route path="reviews">
                <Route path="appeals" element={<AdminPages.AppealsPage />} />
                <Route
                  path="deleted"
                  element={<AdminPages.ReviewsDeletedPage />}
                />
              </Route>
            </Route>
          </Route>
          <Route element={<ProtectedRoute roles={[roles.admin, roles.user]} />}>
            <Route path="/user" element={<UserPages.Layout />}>
              <Route path="dashboard" element={<UserPages.DashboardPage />} />
              <Route
                path="interactions"
                element={<UserPages.InteractionsPage />}
              />
            </Route>
          </Route>
          <Route
            element={<ProtectedRoute roles={[roles.admin, roles.company]} />}
          >
            <Route path="/company" element={<CompaniesPages.Layout />}>
              <Route
                path="dashboard"
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
              <Route path="crm">
                <Route
                  path="integrations"
                  element={<CompaniesPages.IntegrationsPage />}
                />
                <Route
                  path="my-integrations"
                  element={<CompaniesPages.MyIntegrationsPage />}
                />
              </Route>
              <Route
                path="listings"
                element={<CompaniesPages.CreateListingPage />}
              />

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
          <Route path="/properties/:id" element={<InternalListingPage />} />
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
