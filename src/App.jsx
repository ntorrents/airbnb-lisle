import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import { CmsProvider } from "./cms/CmsContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ApartmentDetail from "./pages/ApartmentDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGuard from "./pages/admin/AdminGuard";
import AdminDashboard from "./pages/admin/AdminDashboard";

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
};

const PublicShell = ({ children }) => (
  <>
    <Navbar />
    <main className="main-content">{children}</main>
    <Footer />
  </>
);

function App() {
  return (
    <CmsProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollManager />
          <div className="app">
            <Routes>
              <Route
                path="/"
                element={
                  <PublicShell>
                    <Home />
                  </PublicShell>
                }
              />
              <Route
                path="/apto/:id"
                element={
                  <PublicShell>
                    <ApartmentDetail />
                  </PublicShell>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminGuard />}>
                <Route index element={<AdminDashboard />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </CmsProvider>
  );
}

export default App;
