import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

/**
 * ProtectedRoute
 * Wraps a page component and enforces auth + role checks.
 *
 * Props:
 *  - allowedRoles: string[] — e.g. ["SUPER_ADMIN", "ADMIN"]
 *  - children: ReactNode   — the page to render when access is granted
 */
function ProtectedRoute({ allowedRoles = [], children }) {
    const { user, role } = useUser();

    // 1. Not authenticated → send to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. Authenticated but role not permitted → send to unauthorized page
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 3. Authorized → render the page
    return children;
}

export default ProtectedRoute;
