import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import RegClosed from "../reg-closed";
import Spinner from "../ui/spinner";

const RegisterForm = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    monitorName: "",
    monitorNumber: "",
    className: "",
    description: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.monitorName)
      newErrors.monitorName = "Monitor name is required";
    if (!formData.monitorNumber) {
      newErrors.monitorNumber = "Monitor number is required";
    } else if (!/^\d+$/.test(formData.monitorNumber)) {
      newErrors.monitorNumber = "Monitor number must be numeric";
    }
    if (!formData.className) newErrors.className = "Class name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.amount) newErrors.amount = "Amount is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const clearText = () => {
    setFormData({
      monitorName: "",
      monitorNumber: "",
      className: "",
      description: "",
      amount: "",
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7005/api/sports/",
        formData
      );
      toast.success(response.data.message);
      clearText();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  const [showForm, setShowForm] = useState();
  const [formName] = useState("sportsForm");

  useEffect(() => {
    const fetchFormVisibility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7005/api/form/${formName}`
        );
        const data = response.data;
        setShowForm(data[formName] === true);
      } catch (error) {
        console.error("Error fetching form visibility:", error);
        setShowForm(false);
      } finally {
        setLoading(false);
      }
    };
    fetchFormVisibility();
  }, [formName]);

  if (loading)
    return <Spinner size="large" className="border border-blue-700" />;
  if (showForm === false) return <RegClosed />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 py-36 px-4">
      <div className="w-[800px] rounded-lg mx-auto bg-white text-black p-8 shadow-lg">
        <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
          Sports Registration
        </h1>
        <p className="mb-4 text-gray-700">
          Please fill in the form below to register for Sports Day
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="monitorName"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Monitor Name
              </label>
              <input
                onChange={handleChange}
                value={formData.monitorName}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="monitorName"
                name="monitorName"
                type="text"
                placeholder="Enter monitor's name"
              />
              {errors.monitorName && (
                <p className="text-red-500 text-xs">{errors.monitorName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="monitorNumber"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Monitor Phone Number
              </label>
              <input
                onChange={handleChange}
                value={formData.monitorNumber}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="monitorNumber"
                name="monitorNumber"
                type="tel"
                placeholder="Enter monitor's phone number"
              />
              {errors.monitorNumber && (
                <p className="text-red-500 text-xs">{errors.monitorNumber}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="className"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Class Name
            </label>
            <input
              onChange={handleChange}
              value={formData.className}
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="className"
              name="className"
              type="text"
              placeholder="Enter class name"
            />
            {errors.className && (
              <p className="text-red-500 text-xs">{errors.className}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              onChange={handleChange}
              value={formData.description}
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="description"
              name="description"
              type="text"
              placeholder="Enter sport description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="amount"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              onChange={handleChange}
              value={formData.amount}
              className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
              id="amount"
              name="amount"
              type="text"
              placeholder="Enter registration amount"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs">{errors.amount}</p>
            )}
          </div>

          <button
            className="w-full rounded-md bg-customBlue px-4 text-sm font-medium text-white py-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
