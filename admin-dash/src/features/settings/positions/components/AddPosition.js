import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import usePositionStore from "../../../../stores/positionStore";
import { showNotification } from "../../../common/headerSlice";

const AddPosition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchPositionById, register, updatePosition } = usePositionStore();

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPositionData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPositionById(id);
        console.log(data);
        setFormData(data || {});
      } catch (err) {
        setError("Failed to fetch position details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositionData();
  }, [id, fetchPositionById]);

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
        await updatePosition(id, formData);
        dispatch(
          showNotification({
            message: "Position updated successfully!",
            status: 1,
          })
        );
      } else {
        await register(formData);
        dispatch(
          showNotification({
            message: "Position added successfully!",
            status: 1,
          })
        );
      }
      navigate("/app/positions");
    } catch (err) {
      setError("Failed to save position details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update Position" : "Add Position"}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          ></textarea>
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
            ? "Update Position"
            : "Add Position"}
        </button>
      </form>
    </div>
  );
};

export default AddPosition;
