import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import useCompetitorsStore from "../../../stores/competitorStore";
import { showNotification } from "../../common/headerSlice";

const AddCompetitor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    fetchCompetitorById,
    registerCompetitor,
    updateCompetitor,
  } = useCompetitorsStore();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    semester: "",
    className: "",
    projectName: "",
    status: "",
    email: "",
    idNumber: "",
    skill: "",
    type: "",
    technologies: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCompetitorData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCompetitorById(id);
        console.log(data);
        setFormData(data || {});
      } catch (err) {
        setError("Failed to fetch competitor details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitorData();
  }, [id, fetchCompetitorById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (id) {
        await updateCompetitor(id, formData);
        dispatch(
          showNotification({ message: "Competitor updated!", status: 1 })
        );
      } else {
        await registerCompetitor(formData);
        console.log(formData);
        dispatch(
          showNotification({ message: "Competitor added!", status: 1 })
        );
      }
      navigate("/app/it-day");
    } catch (err) {
      setError("Failed to save competitor details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {id ? "Update Competitor" : "Add Competitor"}
      </h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
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
            <label>Phone Number</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label>ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Academic Information</h2>
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
            <label>Class Name</label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Project Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Project Information</h2>
          <div>
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label>Technologies</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Status and Skill */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Status & Skill</h2>
          <div>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label>Skill</label>
            <input
              type="text"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
          </div>
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
            ? "Update Competitor"
            : "Add Competitor"}
        </button>
      </form>
    </div>
  );
};

export default AddCompetitor;
