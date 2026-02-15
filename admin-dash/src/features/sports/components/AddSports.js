import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSportsStore from "../../../stores/sportsStore";
import { showNotification } from "../../common/headerSlice";
import { useDispatch } from "react-redux";

const AddSports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { fetchSportsById, registerSport, updateSports } = useSportsStore();

  const [formData, setFormData] = useState({
    monitorName: "",
    monitorNumber: "",
    className: "",
    description: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSportData = async () => {
      if (id) {
        setLoading(true);
        setError(null);
        try {
          const sportData = await fetchSportsById(id);
          if (sportData) {
            setFormData({
              monitorName: sportData.monitorName || "",
              monitorNumber: sportData.monitorNumber || "",
              className: sportData.className || "",
              description: sportData.description || "",
              amount: sportData.amount || "",
            });
          } else {
            setError("Sport record not found.");
          }
        } catch (err) {
          setError(err.message || "Failed to fetch sport details.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSportData();
  }, [id]);

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
        await updateSports(id, formData);
        dispatch(
          showNotification({ message: "Sport record updated!", status: 1 })
        );
      } else {
        await registerSport(formData);
        dispatch(showNotification({ message: "New Sport Added!", status: 1 }));
      }
      navigate("/app/sports");
    } catch (err) {
      setError(err.message || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Update Sport" : "Add Sport"}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block mb-2">Monitor Name</label>
          <input
            type="text"
            name="monitorName"
            placeholder="Monitor Name"
            value={formData.monitorName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Monitor Number</label>
          <input
            type="text"
            name="monitorNumber"
            placeholder="Monitor Number"
            value={formData.monitorNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Class Name</label>
          <input
            type="text"
            name="className"
            placeholder="Class Name"
            value={formData.className}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className={`btn btn-primary w-full`}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddSports;
