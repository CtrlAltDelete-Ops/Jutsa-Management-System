import React, { lazy, Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "./hooks/useUser";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

/**
 * AuthGuard — wraps the entire /app/* section.
 * If the user is not logged in, redirect to /login immediately.
 */
function AuthGuard({ children }) {
  const { user } = useUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/documentation" element={<Documentation />} />

            {/* Unauthorized access page — public so the redirect always works */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected app — requires login */}
            <Route
              path="/app/*"
              element={
                <AuthGuard>
                  <Layout />
                </AuthGuard>
              }
            />

            {/* Default redirect */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
