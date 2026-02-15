import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TitleCard from "../../../components/Cards/TitleCard";
import useMemberStore from "../../../stores/memberStore";

const TopSideButtons = () => {
  const navigate = useNavigate();

  const handleAddMember = () => {
    navigate("/app/members/add");
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={handleAddMember}
      >
        Add New
      </button>
    </div>
  );
};

const Members = () => {
  const { MemberDetails, loading, error, fetchMemberDetails, deleteMember } =
    useMemberStore();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMemberDetails();
  }, [fetchMemberDetails]);

  const handleUpdate = (id) => {
    navigate(`/app/members/update/${id}`);
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      dispatch(
        showNotification({ message: "Member record deleted!", status: 1 })
      );
      fetchMemberDetails();
    } catch (error) {
      dispatch(
        showNotification({ message: "Failed to delete member!", status: 0 })
      );
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <TitleCard
        title="Team Members"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>Position ID</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MemberDetails.map((member) => (
                <tr key={member.id}>
                  <td>{member.studentId}</td>
                  <td>{member.name}</td>
                  <td>{member.address}</td>
                  <td>{member.email}</td>
                  <td>{member.position_Id}</td>
                  <td>{member.semester}</td>
                  <td>{member.year}</td>
                  <td>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleUpdate(member.id)}
                    >
                      <PencilIcon className="w-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      <TrashIcon className="w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default Members;
