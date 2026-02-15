import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice"; // Ensure correct path
import useCaawiyeStore from "../../../stores/caawiyeStore"; // Ensure correct path
import TitleCard from "../../../components/Cards/TitleCard";
import useActivityStore from "../../../stores/activityStore";

const AddActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    fetchActivityById,
    registerActivity,
    updateActivity,
    selectedCaawiye,
  } = useActivityStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    speaker: "",
    location: "",
    type: "",
  });

  // useEffect(() => {
  //   if (id) {
  //     fetchActivityById(id);
  //   }
  // }, [id, fetchCaawiyeById]);

  // useEffect(() => {
  //   if (id && selectedCaawiye) {
  //     setFormData(selectedCaawiye);
  //   }
  // }, [id, selectedCaawiye]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateActivity(id, formData);
        console.log(formData);
        dispatch(
          showNotification({ message: "Updated successfully!", status: 1 })
        );
      } else {
        await registerActivity(formData);
        console.log(formData);
        dispatch(
          showNotification({ message: "Registered successfully!", status: 1 })
        );
      }
      navigate("/app/activity");
    } catch (err) {
      dispatch(
        showNotification({
          message: err.message || "An error occurred.",
          status: 0,
        })
      );
    }
  };

  return (
    <TitleCard>
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          {id ? "Update Activity" : "Add Activity"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          {/* {!id && (
            <div>
              <label className="block text-sm font-medium">ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          )} */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="Date"
              name="Date"
              value={formData.date}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Speaker</label>
            <input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="Location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </TitleCard>
  );
};

export default AddActivity;
