import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import useFinanceStore from "../../stores/financeStore";
import TitleCard from "../../components/Cards/TitleCard";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

const TopSideButtons = () => {
  return (
    <div className="inline-block float-right">
      <Link to="/app/finance/add">
        <button className="btn px-6 btn-sm normal-case btn-primary">
          Add New
        </button>
      </Link>
    </div>
  );
};

const Leads = () => {
  const { financeDetails, loading, error, fetchFinanceDetails, deleteFinance } =
    useFinanceStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFinanceDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFinance(id);
      dispatch(
        showNotification({ message: "Finance record deleted!", status: 1 })
      );
      fetchFinanceDetails();
    } catch (err) {
      dispatch(showNotification({ message: err.message, status: 0 }));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/app/finance/update/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TitleCard
      title="Finance"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Transaction Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {financeDetails.map((key, index) => (
              <tr key={key.id}>
                <td>{key.id}</td>
                <td>{key.title}</td>
                <td>${key.amount}</td>
                <td>
                  <div
                    className={`badge ${
                      key.type === "income" ? "badge-success" : "badge-error"
                    }`}
                  >
                    {key.type}
                  </div>
                </td>
                <td>{key.category}</td>
                <td>
                  {" "}
                  {new Date(key.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleUpdate(key.id)}
                    >
                      <PencilIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleDelete(key.id)}
                    >
                      <TrashIcon className="w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Leads;
