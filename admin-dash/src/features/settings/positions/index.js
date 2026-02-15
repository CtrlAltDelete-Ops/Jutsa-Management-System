import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TitleCard from "../../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import usePositionStore from "../../../stores/positionStore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";

const TopSideButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate("/app/positions/add")}
      >
        Add New
      </button>
    </div>
  );
};

function Positions() {
  const {
    PositionsDetails,
    loading,
    error,
    fetchPositionDetails,
    deletePosition,
  } = usePositionStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPositionDetails();
  }, [fetchPositionDetails]);

  const handleDelete = async (id) => {
    try {
      await deletePosition(id);
      dispatch(showNotification({ message: "Position deleted!", status: 1 }));
      fetchPositionDetails(); // Refresh positions list after deletion
    } catch (err) {
      dispatch(showNotification({ message: err.message, status: 0 }));
    }
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
        title="Positions"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {PositionsDetails.map((position) => (
              <tr key={position.id}>
                <td>{position.title}</td>
                <td>{position.description}</td>
                <td>{position.createdAt.slice(0, 10)}</td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => navigate(`/app/positions/update/${position.id}`)}
                  >
                    <PencilIcon className="w-5" />
                  </button>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => handleDelete(position.id)}
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TitleCard>
    </>
  );
}

export default Positions;
