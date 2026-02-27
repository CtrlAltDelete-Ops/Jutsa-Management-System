// All components mapping with path for internal routes

import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Finance = lazy(() => import("../pages/protected/Finance"));
const AddFinance = lazy(() => import("../pages/protected/Add-finance"));
const Sports = lazy(() => import("../pages/protected/Sports"));
const AddSports = lazy(() => import("../pages/protected/Add-sports"));
const Members = lazy(() => import("../pages/protected/members"));
const AddMember = lazy(() => import("../pages/protected/Add-member"));
const Positions = lazy(() => import("../pages/protected/Positions"));
const AddPosition = lazy(() => import("../pages/protected/Add-position"));
const Competitors = lazy(() => import("../pages/protected/itday-competitors"));
const AddCompetitor = lazy(() => import("../pages/protected/Add-competitor"));
const AddCaawiye = lazy(() => import("../pages/protected/Add-caawiye"));
const Caawiye = lazy(() => import("../pages/protected/Caawiye"));
const Activity = lazy(() => import("../pages/protected/Activity"));
const AddActivity = lazy(() => import("../pages/protected/Add-activity"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Transactions"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));

// ─── Role constants ────────────────────────────────────────────────────────────
const ALL_ROLES = ["SUPER_ADMIN", "ADMIN", "USER"];
const ADMIN_AND_ABOVE = ["SUPER_ADMIN", "ADMIN"];
const SUPER_ADMIN_ONLY = ["SUPER_ADMIN"];

// ─── Route definitions ─────────────────────────────────────────────────────────
const routes = [
  // ── Dashboard (all authenticated roles) ──────────────────────────────────────
  {
    path: "/dashboard",
    component: Dashboard,
    allowedRoles: ALL_ROLES,
  },

  // ── Finance (view: all | add/edit: admin+) ───────────────────────────────────
  {
    path: "/finance",
    component: Finance,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/finance/add",
    component: AddFinance,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/finance/update/:id",
    component: AddFinance,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Sports (view: all | add/edit: admin+) ────────────────────────────────────
  {
    path: "/sports",
    component: Sports,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/sports/add",
    component: AddSports,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/sports/update/:id",
    component: AddSports,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Positions (admin+) ───────────────────────────────────────────────────────
  {
    path: "/positions",
    component: Positions,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/positions/add",
    component: AddPosition,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/positions/update/:id",
    component: AddPosition,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Caawiye (view: all | add/edit: admin+) ───────────────────────────────────
  {
    path: "/caawiye",
    component: Caawiye,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/caawiye/add",
    component: AddCaawiye,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/caawiye/update/:id",
    component: AddCaawiye,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Activity/Seminars (view: all | add/edit: admin+) ─────────────────────────
  {
    path: "/activity",
    component: Activity,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/activity/add",
    component: AddActivity,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/activity/update/:id",
    component: AddActivity,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Members (admin+) ─────────────────────────────────────────────────────────
  {
    path: "/members",
    component: Members,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/members/add",
    component: AddMember,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/members/update/:id",
    component: AddMember,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── IT Day Competitors (admin+) ──────────────────────────────────────────────
  {
    path: "/it-day",
    component: Competitors,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/it-day/add",
    component: AddCompetitor,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/it-day/update/:id",
    component: AddCompetitor,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Settings (admin+) ────────────────────────────────────────────────────────
  {
    path: "/settings-team",
    component: Team,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/transactions",
    component: Transactions,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/settings-billing",
    component: Bills,
    allowedRoles: ADMIN_AND_ABOVE,
  },

  // ── Misc ─────────────────────────────────────────────────────────────────────
  {
    path: "/calendar",
    component: Calendar,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/charts",
    component: Charts,
    allowedRoles: ADMIN_AND_ABOVE,
  },
  {
    path: "/integration",
    component: Integration,
    allowedRoles: SUPER_ADMIN_ONLY,
  },

  // ── Docs (all authenticated roles) ───────────────────────────────────────────
  {
    path: "/getting-started",
    component: GettingStarted,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/features",
    component: DocFeatures,
    allowedRoles: ALL_ROLES,
  },
  {
    path: "/components",
    component: DocComponents,
    allowedRoles: ALL_ROLES,
  },
];

export default routes;
