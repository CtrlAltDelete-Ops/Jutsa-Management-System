import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import useCaawiyeStore from "../../stores/caawiyeStore";
import TitleCard from "../../components/Cards/TitleCard";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import useActivityStore from "../../stores/activityStore";

const TopSideButtons = () => (
  <div className="inline-block float-right">
    <Link to="/app/activity/add">
      <button className="btn px-6 btn-sm normal-case btn-primary">
        Add New
      </button>
    </Link>
  </div>
);

const Activity = () => {
  const { ActivitiesDetails, loading, error, fetchActivities, deleteActivity } =
    useActivityStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleDelete = async (id) => {
    try {
      await deleteActivity(id);
      dispatch(
        showNotification({ message: "Deleted successfully!", status: 1 })
      );
    } catch (err) {
      dispatch(showNotification({ message: err.message, status: 0 }));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/app/activities/update/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TitleCard
      title=" Activities"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>date</th>
              <th>Speaker</th>
              <th>Location</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ActivitiesDetails.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.title}</td>
                <td>{activity.description}</td>
                <td>{activity.date}</td>
                <td>{activity.speaker}</td>
                <td>{activity.location}</td>
                <td>{activity.type}</td>

                <td>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleUpdate(activity.id)}
                    >
                      <PencilIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleDelete(activity.id)}
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

export default Activity;
