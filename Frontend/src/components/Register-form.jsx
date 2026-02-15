import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import RegClosed from "./reg-closed";
import Spinner from "./ui/spinner";

const RegisterForm = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    idNumber: "",
    email: "",
    semester: "",
    skill: "",
    className: "",
    type: "",
    projectName: "",
    technologies: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.number) {
      newErrors.number = "Phone number is required";
    } else if (!/^\d+$/.test(formData.number)) {
      newErrors.number = "Phone number must be numeric";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.semester) newErrors.semester = "Semester is required";
    if (!formData.skill) newErrors.skill = "Skill is required";
    if (!formData.className) newErrors.className = "Class Name is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.projectName)
      newErrors.projectName = "Project Name is required";
    if (!formData.technologies)
      newErrors.technologies = "Technologies are required";
    if (!formData.idNumber) newErrors.idNumber = "ID is required";

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
      name: "",
      number: "",
      idNumber: "",
      email: "",
      semester: "",
      skill: "",
      className: "",
      type: "",
      projectName: "",
      technologies: "",
    });
    setErrors({});
  };

  // useEffect(() => {
  //   setCurrentDate(new Date());
  // }, []);
  // const eventEndDate = new Date("2024-06-06");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://jutsa-api.vercel.app/api/competitors/",
        formData
      );
      toast.success(response.data.message);
      clearText();
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const [showForm, setShowForm] = useState();

  const [formName] = useState("facultyForm");

  useEffect(() => {
    // Fetch visibility status from the API when the component mounts
    const fetchFormVisibility = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7005/api/form/${formName}`
        );
        const data = response.data;
        if (data[formName] === true) {
          setShowForm(true);
        } else {
          setShowForm(false);
        }
      } catch (error) {
        console.error("Error fetching form visibility:", error);
        setShowForm(false);
      } finally {
        setLoading(false);
      }
    };

    fetchFormVisibility();
  }, [formName]);

  if (loading) {
    return <Spinner size="large" className="border border-blue-700" />;
  }

  if (showForm === false) {
    return <RegClosed />;
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-gray-100 py-36 px-4">
        <div className="w-[800px] rounded-lg mx-auto bg-white text-black p-8 shadow-lg ">
          <h1 className="my-4 text-3xl font-bold tracking-tight text-black">
            Registration
          </h1>
          <p className="mb-4 text-gray-700">
            Please fill in the form below to register for IT-DAY
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.name}
                  className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="number"
                >
                  Phone Number
                </label>
                <input
                  onChange={handleChange}
                  value={formData.number}
                  className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="number"
                  placeholder="Enter your phone number"
                  type="tel"
                  name="number"
                />
                {errors.number && (
                  <p className="text-red-500 text-xs">{errors.number}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={handleChange}
                  value={formData.email}
                  className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="semester"
                >
                  Semester
                </label>
                <select
                  value={formData.semester}
                  onChange={handleChange}
                  className="rounded-md border p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="semester"
                  name="semester"
                >
                  <option value="">Select Semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
                {errors.semester && (
                  <p className="text-red-500 text-xs">{errors.semester}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="className"
                >
                  Class Name
                </label>
                <input
                  onChange={handleChange}
                  value={formData.className}
                  className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="className"
                  placeholder="Enter your class name"
                  type="text"
                  name="className"
                />
                {errors.className && (
                  <p className="text-red-500 text-xs">{errors.className}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="id"
                >
                  ID
                </label>
                <input
                  onChange={handleChange}
                  value={formData.idNumber}
                  className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="id"
                  placeholder="Enter your id number"
                  type="text"
                  name="idNumber"
                />
                {errors.idNumber && (
                  <p className="text-red-500 text-xs">{errors.idNumber}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="type"
                >
                  Type
                </label>
                <select
                  value={formData.type}
                  name="type"
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="type"
                >
                  <option value="">Select Type</option>
                  <option value="Network">Network</option>
                  <option value="webdevelopment">Web Development</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="typing">Typing</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-xs">{errors.type}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="skill"
                >
                  Skill
                </label>
                <input
                  value={formData.skill}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="skill"
                  placeholder="Enter your skill"
                  type="text"
                  name="skill"
                />
                {errors.skill && (
                  <p className="text-red-500 text-xs">{errors.skill}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="projectName"
              >
                Project Name
              </label>
              <input
                value={formData.projectName}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="projectName"
                placeholder="Enter your project name"
                type="text"
                name="projectName"
              />
              {errors.projectName && (
                <p className="text-red-500 text-xs">{errors.projectName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="technologies"
              >
                Technologies
              </label>
              <input
                value={formData.technologies}
                onChange={handleChange}
                name="technologies"
                className="rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="technologies"
                placeholder="Enter the technologies used"
                type="text"
              />
              {errors.technologies && (
                <p className="text-red-500 text-xs">{errors.technologies}</p>
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
    </>
  );
};

export default RegisterForm;
