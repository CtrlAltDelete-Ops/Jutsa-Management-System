import routes from "../routes/sidebar";
import { NavLink, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/useUser";

/** Returns colour classes for each role */
const roleMeta = (role) => {
  switch (role) {
    case "SUPER_ADMIN":
      return { label: "Super Admin", bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" };
    case "ADMIN":
      return { label: "Admin", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" };
    default:
      return { label: "User", bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };
  }
};

function LeftSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, role } = useUser();

  const close = () => {
    document.getElementById("left-sidebar-drawer").click();
  };

  const visibleRoutes = routes
    .map((route) => {
      if (route.submenu) {
        const visibleSubmenu = route.submenu.filter(
          (item) => !item.allowedRoles || item.allowedRoles.includes(role)
        );
        if (visibleSubmenu.length === 0) return null;
        return { ...route, submenu: visibleSubmenu };
      }
      return route;
    })
    .filter(
      (route) =>
        route !== null &&
        (!route.allowedRoles || route.allowedRoles.includes(role))
    );

  const meta = roleMeta(role);

  return (
    <div className="drawer-side z-30">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>

      {/* min-h-full + flex flex-col so the badge sticks to the bottom */}
      <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content flex flex-col">

        {/* Close button (mobile) */}
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={close}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        {/* Logo / brand */}
        <li className="mb-2 hover:none">
          <Link className="text-base font-extrabold" to="/app/dashboard">
            <img
              className="mask mask-squircle w-10"
              src="/logo192.png"
              alt="JUTSA Logo"
            />
            JUTSA CORE
          </Link>
        </li>

        {/* Nav links (filtered by role) */}
        {visibleRoutes.map((route, k) => (
          <li key={k}>
            {route.submenu ? (
              <SidebarSubmenu {...route} />
            ) : (
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  isActive ? "font-semibold bg-base-200" : "font-normal"
                }
              >
                {route.icon} {route.name}
                {location.pathname === route.path && (
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                    aria-hidden="true"
                  />
                )}
              </NavLink>
            )}
          </li>
        ))}

        {/* ── Role badge — pinned to the bottom ── */}
        <li className="mt-auto pt-4 border-t border-base-200">
          <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-base-200 cursor-default select-none">

            {/* Avatar initial */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold text-sm">
              {user?.data?.name
                ? user.data.name.charAt(0).toUpperCase()
                : "?"}
            </div>

            {/* Name + email */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-base-content truncate">
                {user?.data?.name || "Unknown"}
              </p>
              <p className="text-xs text-base-content/50 truncate">
                {user?.data?.email || ""}
              </p>
            </div>

            {/* Role pill */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${meta.bg} ${meta.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
