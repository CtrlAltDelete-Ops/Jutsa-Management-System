/** Icons are imported separately to reduce build time */
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { LuBookMarked } from "react-icons/lu";
import { MdOutlineSportsSoccer, MdSupportAgent } from "react-icons/md";
import { RiPresentationFill } from "react-icons/ri";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
    allowedRoles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    path: "/app/finance",
    icon: <InboxArrowDownIcon className={iconClasses} />,
    name: "Finance",
    allowedRoles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    path: "/app/it-day",
    icon: <LuBookMarked className={submenuIconClasses} />,
    name: "Faculty Day",
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    path: "/app/sports",
    icon: <MdOutlineSportsSoccer className={submenuIconClasses} />,
    name: "Sports",
    allowedRoles: ["SUPER_ADMIN", "ADMIN", "USER"],
  },
  {
    path: "",
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />,
    name: "Activities",
    allowedRoles: ["SUPER_ADMIN", "ADMIN", "USER"],
    submenu: [
      {
        path: "/app/activity",
        icon: <RiPresentationFill className={submenuIconClasses} />,
        name: "Seminars & Workshops",
        allowedRoles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
      {
        path: "/app/caawiye",
        icon: <MdSupportAgent className={submenuIconClasses} />,
        name: "Caawiye",
        allowedRoles: ["SUPER_ADMIN", "ADMIN", "USER"],
      },
    ],
  },
  {
    path: "",
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
    name: "Settings",
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
    submenu: [
      {
        path: "/app/Members",
        icon: <UsersIcon className={submenuIconClasses} />,
        name: "Team Members",
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        path: "/app/positions/",
        icon: <DocumentTextIcon className={submenuIconClasses} />,
        name: "Positions",
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];

export default routes;
