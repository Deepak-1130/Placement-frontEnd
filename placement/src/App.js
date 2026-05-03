import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import AboutPage from "./Pages/About";
import CompaniesPage from "./Pages/Companies";
import ContactPage from "./Pages/Contactus";
import ShowCompany from "./Components/ShowCompany";
import CompanyCard from "./Cards/CompanyCard";
import CompanyRegister from "./Components/CompanyRegistration";
import PlacementRegistration from "./Pages/PlacementRegistration";
import AdminDashboard from "./Pages/AdminDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import "./App.css";

// ─── Simple auth guard ──────────────────────────────────────────────────────
function ProtectedRoute({ allowedRole, children }) {
  const role = sessionStorage.getItem("role");
  if (!role) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<PlacementRegistration />} />

        {/* ── Separate Navbar Pages ── */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ── Student dashboard ── */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Admin dashboard ── */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ── Company registration (admin only) ── */}
        <Route
          path="/admin/company/register"
          element={
            <ProtectedRoute allowedRole="admin">
              <CompanyRegister />
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;