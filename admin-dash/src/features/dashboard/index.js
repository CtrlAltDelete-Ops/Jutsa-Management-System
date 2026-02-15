import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardTopBar from "./components/DashboardTopBar";
import DashboardStats from "./components/DashboardStats";
import { showNotification } from "../common/headerSlice";
import { useUser } from "../../hooks/useUser";

import {
  UsersIcon,
  UserGroupIcon,
  CircleStackIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";

const FORM_NAMES = ["facultyForm", "sportsForm", "presidentForm"];
const API_BASE_URL = "http://localhost:7005/api";

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(user);
  const [formVisibility, setFormVisibility] = useState({});
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMembers: 0,
    totalActivities: 0,
    competitors: 0,
  });

  // console.log(stats);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch form visibility
  useEffect(() => {
    const fetchFormVisibility = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/form`);
        setFormVisibility(data);
      } catch (error) {
        console.error("Failed to fetch form visibility", error);
      }
    };
    fetchFormVisibility();
  }, []);

  // Fetch stats data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [membersRes, activitiesRes, competitorsRes] = await Promise.all([
          // axios.get(`${API_BASE_URL}/users`),
          axios.get(`${API_BASE_URL}/members`),
          axios.get(`${API_BASE_URL}/activities`),
          axios.get(`${API_BASE_URL}/competitors`),
        ]);

        setStats({
          totalMembers: membersRes.data.data.length,
          totalActivities: activitiesRes.data.data.length,
          competitors: competitorsRes.data.total,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  // Toggle form visibility
  const toggleForm = async (formName, showForm) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/form/${formName}`, {
        showForm,
      });
      setFormVisibility((prev) => ({ ...prev, [formName]: showForm }));
      dispatch(showNotification({ message: data.message, status: 1 }));
    } catch (error) {
      console.error(`Failed to toggle form: ${formName}`, error);
    }
  };

  const updateDashboardPeriod = (range) => {
    dispatch(
      showNotification({
        message: `Period updated to ${range.startDate} → ${range.endDate}`,
        status: 1,
      })
    );
  };

  const currentYear = new Date().getFullYear();

  const statsData = [
    {
      title: "Total Users",
      icon: <UsersIcon className="w-6 h-6" />,
      value: stats.totalUsers,
    },
    {
      title: "Total Members",
      icon: <UserGroupIcon className="w-6 h-6" />,
      value: stats.totalMembers,
    },
    {
      title: "Total Activities",
      icon: <CircleStackIcon className="w-6 h-6" />,
      value: stats.totalActivities,
    },
    {
      title: `Competitors`,
      icon: <CreditCardIcon className="w-6 h-6" />,
      value: stats.competitors,
    },
  ];

  return (
    <>
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
        {statsData.map((item, index) => (
          <DashboardStats key={index} {...item} colorIndex={index} />
        ))}
      </div>

      {/* Form Visibility Controls */}
      <div className="mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Form Visibility Management</h2>
        <div className="space-y-4">
          {FORM_NAMES.map((formName) => (
            <div
              key={formName}
              className="flex items-center justify-between border-b pb-3"
            >
              <span className="capitalize font-medium text-gray-700">
                {formName.replace("Form", " Form")}
              </span>
              <div className="flex items-center gap-4">
                <span
                  className={`font-semibold ${
                    formVisibility[formName] ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formVisibility[formName] ? "Enabled" : "Disabled"}
                </span>
                <button
                  onClick={() => toggleForm(formName, true)}
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                  Enable
                </button>
                <button
                  onClick={() => toggleForm(formName, false)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Disable
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
