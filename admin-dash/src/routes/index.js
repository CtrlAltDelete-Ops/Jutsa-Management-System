// All components mapping with path for internal routes

import { Children, lazy } from "react";

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

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },

  {
    path: "/finance",
    component: Finance,
  },
  {
    path: "/finance/add",
    component: AddFinance,
  },
  {
    path: "/finance/update/:id",
    component: AddFinance,
  },
  {
    path: "/sports",
    component: Sports,
  },
  {
    path: "/sports/add",
    component: AddSports,
  },
  {
    path: "/sports/update/:id",
    component: AddSports,
  },
  {
    path: "/positions",
    component: Positions,
  },
  {
    path: "/positions/add",
    component: AddPosition,
  },
  {
    path: "/positions/update/:id",
    component: AddPosition,
  },
  {
    path: "/caawiye",
    component: Caawiye,
  },
  {
    path: "/caawiye/add",
    component: AddCaawiye,
  },
  {
    path: "/caawiye/update/:id",
    component: AddCaawiye,
  },
  {
    path: "/activity",
    component: Activity,
  },
  {
    path: "/activity/add",
    component: AddActivity,
  },
  {
    path: "/activity/update/:id",
    component: AddActivity,
  },
  {
    path: "/members",
    component: Members,
  },
  {
    path: "/members/add",
    component: AddMember,
  },
  {
    path: "/members/update/:id",
    component: AddMember,
  },
  {
    path: "/it-day",
    component: Competitors,
  },
  {
    path: "/it-day/add",
    component: AddCompetitor,
  },
  {
    path: "/it-day/update/:id",
    component: AddCompetitor,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },

  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
];

export default routes;
