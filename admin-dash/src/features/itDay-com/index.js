import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import useCompetitorStore from "../../stores/competitorStore";
import TitleCard from "../../components/Cards/TitleCard";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const TopSideButtons = () => (
  <div className="inline-block float-right">
    <Link to="/app/it-day/add">
      <button className="btn px-6 btn-sm normal-case btn-primary">
        Add New
      </button>
    </Link>
  </div>
);

const ItDayCompetitors = () => {
  const {
    competitors,
    loading,
    error,
    fetchCompetitors,
    deleteCompetitor,
  } = useCompetitorStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompetitors();
  }, [fetchCompetitors]);

  const handleDelete = async (id) => {
    try {
      await deleteCompetitor(id);
      dispatch(
        showNotification({ message: "Competitor deleted successfully!", status: 1 })
      );
      fetchCompetitors();
    } catch (err) {
      dispatch(showNotification({ message: err.message, status: 0 }));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/app/it-day/update/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TitleCard
      title="Competitors"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number</th>
              <th>Semester</th>
              <th>Class Name</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((competitor) => (
              <tr key={competitor.id}>
                <td>{competitor.id}</td>
                <td>{competitor.name}</td>
                <td>{competitor.number}</td>
                <td>{competitor.semester}</td>
                <td>{competitor.className}</td>
                <td>{competitor.projectName}</td>
                <td>{competitor.status}</td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleUpdate(competitor.id)}
                    >
                      <PencilIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleDelete(competitor.id)}
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

export default ItDayCompetitors;
