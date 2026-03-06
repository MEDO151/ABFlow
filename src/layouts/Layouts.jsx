import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Layout for general visitors (also shared by logged in users doing general browsing)
export function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Layout specifically for authentication pages (Login, Register). Simple, no navbar/footer.
export function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

// Layout for authenticated users (Dashboard, Settings, etc.)
// If there are specific features/nav rules for logged-in users only.
export function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-14">
        {/* Adds padding to accommodate the fixed navbar if needed */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
