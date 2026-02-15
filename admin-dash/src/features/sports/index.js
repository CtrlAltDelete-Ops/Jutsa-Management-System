import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import useSportsStore from "../../stores/sportsStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";

const TopSideButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate("add")}
      >
        Add New
      </button>
    </div>
  );
};

function Sports() {
  const { SportsDetails, loading, error, fetchSportsDetails, deleteSports } =
    useSportsStore();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    fetchSportsDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSports(id);
      dispatch(
        showNotification({ message: "Sport record deleted!", status: 1 })
      );
      fetchSportsDetails();
    } catch (err) {
      dispatch(showNotification({ message: err.message, status: 0 }));
    }
  };

  const handleUpdate = (id) => {
    navigate(`update/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <TitleCard
        title="Sports"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Monitor Name</th>
                <th>Monitor Number</th>
                <th>Class Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Reg Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {SportsDetails.map((sport) => (
                <tr key={sport.id}>
                  <td>{sport.monitorName}</td>
                  <td>{sport.monitorNumber}</td>
                  <td>
                    <div className="badge badge-primary">{sport.className}</div>
                  </td>
                  <td>{sport.description}</td>
                  <td>${sport.amount}</td>
                  <td>
                    {" "}
                    {new Date(sport.createdAt).toLocaleString("en-US", {
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
                        onClick={() => handleUpdate(sport.id)}
                      >
                        <PencilIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => handleDelete(sport.id)}
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
    </>
  );
}

export default Sports;
