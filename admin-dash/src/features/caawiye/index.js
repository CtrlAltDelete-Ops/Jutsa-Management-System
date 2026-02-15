import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import useCaawiyeStore from "../../stores/caawiyeStore";
import TitleCard from "../../components/Cards/TitleCard";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const TopSideButtons = () => (
  <div className="inline-block float-right">
    <Link to="/app/caawiye/add">
      <button className="btn px-6 btn-sm normal-case btn-primary">
        Add New
      </button>
    </Link>
  </div>
);

const Caawiye = () => {
  const { caawiyeDetails, loading, error, fetchCaawiyeDetails, deleteCaawiye } =
    useCaawiyeStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaawiyeDetails();
  }, [fetchCaawiyeDetails]);

  const handleDelete = async (id) => {
    try {
      await deleteCaawiye(id);
      dispatch(
        showNotification({ message: "Deleted successfully!", status: 1 })
      );
    } catch (err) {
      dispatch(showNotification({ message: err.message, status: 0 }));
    }
  };

  const handleUpdate = (id) => {
    navigate(`/app/caawiye/update/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <TitleCard
      title="Caawiye"
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
              <th>Password</th>
              <th>Problems</th>
              <th>Solutions</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {caawiyeDetails.map((caawiye) => (
              <tr key={caawiye.id}>
                <td>{caawiye.id}</td>
                <td>{caawiye.name}</td>
                <td>{caawiye.number}</td>
                <td>{caawiye.semester}</td>
                <td>{caawiye.className}</td>
                <td>{caawiye.password}</td>
                <td>{caawiye.problems}</td>
                <td>{caawiye.solutions}</td>
                <td>{caawiye.status}</td>
                <td>{new Date(caawiye.createdAt).toLocaleString()}</td>
                <td>{new Date(caawiye.updatedAt).toLocaleString()}</td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleUpdate(caawiye.id)}
                    >
                      <PencilIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleDelete(caawiye.id)}
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

export default Caawiye;
