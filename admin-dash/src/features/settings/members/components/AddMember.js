import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useMemberStore from "../../../../stores/memberStore";
import { showNotification } from "../../../common/headerSlice";
import { fetchPositionDetailsFromAPI } from "../../../../services/positionServices";

const AddMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, updateMember, fetchMemberById } = useMemberStore();
  const [positions, setPositions] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    semester: "",
    studentId: "",
    year: "",
    position_Id: "111",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await fetchPositionDetailsFromAPI();
        setPositions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchMemberData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMemberById(id);
        setFormData(data || {});
      } catch (err) {
        setError("Failed to fetch member details");
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id, fetchMemberById]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateMember(id, formData);
        dispatch(showNotification({ message: "Member updated!", status: 1 }));
      } else {
        await register(formData);
        dispatch(showNotification({ message: "Member added!", status: 1 }));
      }
      navigate("/app/members");
    } catch (err) {
      setError(
        id ? "Failed to update member details" : "Failed to save member details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {id ? "Update Member" : "Add Member"}
      </h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Semester</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Position</label>
          {positions.length === 0 ? (
            <p>Loading positions...</p> // Display a loading message while positions are being fetched
          ) : (
            <select
              name="position_Id"
              value={formData.position_Id}
              onChange={handleChange}
              className="input input-bordered w-full"
            >
              <option value="" disabled>
                Select Position
              </option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.title}
                </option>
              ))}
            </select>
          )}
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full`}
          disabled={loading}
        >
          {loading
            ? id
              ? "Updating..."
              : "Adding..."
            : id
            ? "Update Member"
            : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default AddMember;
