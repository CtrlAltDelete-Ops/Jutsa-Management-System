import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import apiClient from "../../utils/apiClient";

import DashboardStats from "./components/DashboardStats";
import { showNotification } from "../common/headerSlice";
import { useUser } from "../../hooks/useUser";

import {
  UsersIcon,
  UserGroupIcon,
  CircleStackIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LockClosedIcon,
  CalendarDaysIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const FORM_NAMES = ["facultyForm", "sportsForm", "presidentForm"];
const API_BASE = "http://localhost:7005/api";

// ── Role banner config ──────────────────────────────────────────────────────────
const ROLE_BANNER = {
  SUPER_ADMIN: {
    icon: <ShieldCheckIcon className="w-8 h-8 text-purple-600" />,
    accent: "from-purple-50 to-purple-100 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    label: "Super Admin",
    tagline: "You have full system access. Manage users, roles, and all data.",
  },
  ADMIN: {
    icon: <SparklesIcon className="w-8 h-8 text-blue-600" />,
    accent: "from-blue-50 to-blue-100 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    label: "Admin",
    tagline: "You can manage content, activities, and association records.",
  },
  USER: {
    icon: <CalendarDaysIcon className="w-8 h-8 text-green-600" />,
    accent: "from-green-50 to-green-100 border-green-200",
    badge: "bg-green-100 text-green-700",
    label: "Member",
    tagline: "Welcome! Browse activities, view sports records, and stay updated.",
  },
};

// ── Quick actions per role ──────────────────────────────────────────────────────
const QUICK_ACTIONS = {
  SUPER_ADMIN: [
    { label: "Manage Members", to: "/app/Members", icon: <UserGroupIcon className="w-5 h-5" />, color: "btn-primary" },
    { label: "View Finances", to: "/app/finance", icon: <BanknotesIcon className="w-5 h-5" />, color: "btn-secondary" },
    { label: "IT Day Entries", to: "/app/it-day", icon: <TrophyIcon className="w-5 h-5" />, color: "btn-accent" },
    { label: "Manage Positions", to: "/app/positions", icon: <DocumentTextIcon className="w-5 h-5" />, color: "btn-neutral" },
  ],
  ADMIN: [
    { label: "Manage Members", to: "/app/Members", icon: <UserGroupIcon className="w-5 h-5" />, color: "btn-primary" },
    { label: "Add Finance", to: "/app/finance/add", icon: <BanknotesIcon className="w-5 h-5" />, color: "btn-secondary" },
    { label: "Add Activity", to: "/app/activity/add", icon: <CalendarDaysIcon className="w-5 h-5" />, color: "btn-accent" },
    { label: "IT Day Entries", to: "/app/it-day", icon: <TrophyIcon className="w-5 h-5" />, color: "btn-neutral" },
  ],
  USER: [
    { label: "View Activities", to: "/app/activity", icon: <CalendarDaysIcon className="w-5 h-5" />, color: "btn-primary" },
    { label: "View Finance", to: "/app/finance", icon: <BanknotesIcon className="w-5 h-5" />, color: "btn-secondary" },
    { label: "IT Day", to: "/app/it-day", icon: <TrophyIcon className="w-5 h-5" />, color: "btn-accent" },
    { label: "Sports", to: "/app/sports", icon: <SparklesIcon className="w-5 h-5" />, color: "btn-neutral" },
  ],
};

function Dashboard() {
  const { user, role } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formVisibility, setFormVisibility] = useState({});
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalActivities: 0,
    competitors: 0,
    totalFinances: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch form visibility (admins only)
  useEffect(() => {
    if (role === "USER") return;
    const fetchFormVisibility = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/form`);
        setFormVisibility(data);
      } catch (error) {
        console.error("Failed to fetch form visibility", error);
      }
    };
    fetchFormVisibility();
  }, [role]);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const requests = [
          apiClient("/api/activities"),
          apiClient("/api/competitors"),
        ];

        // Extra stats for admins
        if (role !== "USER") {
          requests.push(apiClient("/api/members"));
          requests.push(apiClient("/api/finances"));
        }

        const [activitiesRes, competitorsRes, membersRes, financesRes] =
          await Promise.all(requests);

        setStats({
          totalActivities: activitiesRes?.data?.length ?? 0,
          competitors: competitorsRes?.total ?? competitorsRes?.data?.length ?? 0,
          totalMembers: membersRes?.data?.length ?? 0,
          totalFinances: financesRes?.data?.length ?? 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, [role]);

  // Toggle form visibility
  const toggleForm = async (formName, show) => {
    try {
      const { data } = await axios.post(`${API_BASE}/form/${formName}`, {
        showForm: show,
      });
      setFormVisibility((prev) => ({ ...prev, [formName]: show }));
      dispatch(showNotification({ message: data.message, status: 1 }));
    } catch (error) {
      console.error(`Failed to toggle form: ${formName}`, error);
    }
  };

  const banner = ROLE_BANNER[role] ?? ROLE_BANNER.USER;
  const quickActions = QUICK_ACTIONS[role] ?? QUICK_ACTIONS.USER;

  // Stats cards — filtered by role
  const statsData = [
    // All roles see Activities & Competitors
    {
      title: "Total Activities",
      icon: <CircleStackIcon className="w-6 h-6" />,
      value: loadingStats ? "…" : stats.totalActivities,
    },
    {
      title: "IT Day Competitors",
      icon: <TrophyIcon className="w-6 h-6" />,
      value: loadingStats ? "…" : stats.competitors,
    },
    // Admin & Super Admin only
    ...(role !== "USER"
      ? [
        {
          title: "Team Members",
          icon: <UserGroupIcon className="w-6 h-6" />,
          value: loadingStats ? "…" : stats.totalMembers,
        },
        {
          title: "Finance Records",
          icon: <BanknotesIcon className="w-6 h-6" />,
          value: loadingStats ? "…" : stats.totalFinances,
        },
      ]
      : []),
  ];

  return (
    <div className="py-2">
      {/* ── Welcome banner ───────────────────────────────────────────────────── */}
      <div
        className={`rounded-2xl border bg-gradient-to-r ${banner.accent} px-6 py-5 mb-8 flex items-center gap-4`}
      >
        <div className="flex-shrink-0">{banner.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-lg font-bold text-base-content">
              Welcome back, {user?.data?.name?.split(" ")[0] ?? "there"} 👋
            </h1>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${banner.badge}`}>
              {banner.label}
            </span>
          </div>
          <p className="text-sm text-base-content/60">{banner.tagline}</p>
        </div>
      </div>

      {/* ── Stats cards ──────────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mb-8">
        {statsData.map((item, index) => (
          <DashboardStats key={index} {...item} colorIndex={index} />
        ))}
      </div>

      {/* ── Quick actions ────────────────────────────────────────────────────── */}
      <div className="bg-base-100 rounded-2xl shadow p-6 mb-8">
        <h2 className="text-base font-bold text-base-content mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className={`btn btn-sm ${action.color} gap-2`}
            >
              {action.icon}
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Form Visibility Controls (ADMIN & SUPER_ADMIN only) ──────────────── */}
      {role !== "USER" && (
        <div className="bg-base-100 rounded-2xl shadow p-6 mb-8">
          <h2 className="text-base font-bold text-base-content mb-1">
            Form Visibility Management
          </h2>
          <p className="text-sm text-base-content/50 mb-5">
            Toggle public-facing forms on or off for students.
          </p>
          <div className="space-y-3">
            {FORM_NAMES.map((formName) => (
              <div
                key={formName}
                className="flex items-center justify-between py-3 border-b border-base-200 last:border-0"
              >
                <div>
                  <p className="font-medium text-sm capitalize text-base-content">
                    {formName.replace("Form", " Form")}
                  </p>
                  <p className="text-xs text-base-content/40">
                    {formVisibility[formName]
                      ? "Currently visible to students"
                      : "Currently hidden from students"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${formVisibility[formName]
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {formVisibility[formName] ? "Enabled" : "Disabled"}
                  </span>
                  <button
                    onClick={() => toggleForm(formName, true)}
                    className="btn btn-xs btn-success"
                    disabled={formVisibility[formName] === true}
                  >
                    Enable
                  </button>
                  <button
                    onClick={() => toggleForm(formName, false)}
                    className="btn btn-xs btn-error"
                    disabled={formVisibility[formName] === false}
                  >
                    Disable
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── USER: read-only info notice ──────────────────────────────────────── */}
      {role === "USER" && (
        <div className="bg-base-100 rounded-2xl shadow p-6 flex items-start gap-4">
          <LockClosedIcon className="w-6 h-6 text-base-content/30 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-base-content mb-1">
              View-only access
            </p>
            <p className="text-sm text-base-content/50">
              You can browse all public content. Administrative features such as
              managing members, positions, and form controls are reserved for
              Admins. Contact your association administrator to request elevated
              access.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
