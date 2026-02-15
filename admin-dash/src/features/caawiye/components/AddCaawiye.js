import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice"; // Ensure correct path
import useCaawiyeStore from "../../../stores/caawiyeStore"; // Ensure correct path
import TitleCard from "../../../components/Cards/TitleCard";

const AddCaawiye = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchCaawiyeById, registerCaawiye, updateCaawiye, selectedCaawiye } =
    useCaawiyeStore();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    number: "",
    semester: "",
    className: "",
    password: "",
    problems: "",
    solutions: "",
    status: "", // Set a default status
  });

  useEffect(() => {
    if (id) {
      fetchCaawiyeById(id);
    }
  }, [id, fetchCaawiyeById]);

  useEffect(() => {
    if (id && selectedCaawiye) {
      setFormData(selectedCaawiye);
    }
  }, [id, selectedCaawiye]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateCaawiye(id, formData);
        console.log(formData);
        dispatch(
          showNotification({ message: "Updated successfully!", status: 1 })
        );
      } else {
        await registerCaawiye(formData);
        console.log(formData);
        dispatch(
          showNotification({ message: "Registered successfully!", status: 1 })
        );
      }
      navigate("/app/caawiye");
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
          {id ? "Update Caawiye" : "Add Caawiye"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 mt-5">
          {!id && (
            <div>
              <label className="block text-sm font-medium">Student ID</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Number</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Semester</label>
            <input
              type="text"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Class Name</label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Problems</label>
            <input
              type="text"
              name="problems"
              value={formData.problems}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Solutions</label>
            <input
              type="text"
              name="solutions"
              value={formData.solutions}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </TitleCard>
  );
};

export default AddCaawiye;
