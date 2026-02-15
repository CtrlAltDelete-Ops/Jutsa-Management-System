import React, { useEffect, useState } from "react";
import CandidateContent from "./CandidateContent";
import axios from "axios";
import { toast } from "sonner";
import Spinner from "../ui/spinner";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    studentID: "",
    name: "",
    number: "",
    email: "",
    gpa: "",
    department: "",
    semester: "",
    className: "",
    failedCourse: "",
    financeDue: "",
    experience: "",
    campaignPlan: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState();

  const [formName] = useState("presidentForm");

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "studentID":
        if (!value) error = "Student ID is required";
        break;
      case "name":
        if (!value) error = "Name is required";
        break;
      case "number":
        if (!value) error = "Phone number is required";
        else if (!/^\d+$/.test(value)) error = "Phone number must be numeric";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "gpa":
        if (!value) error = "GPA is required";
        else if (!/^\d(\.\d{1,2})?$/.test(value))
          error = "GPA must be numeric and can have at most 2 decimal places";
        else if (parseFloat(value) > 4.0)
          error = "GPA cannot be greater than 4.0";
        break;
      case "department":
        if (!value) error = "Department must be chosen";
        break;
      case "semester":
        if (!value) error = "Semester must be chosen";
        break;
      case "className":
        if (!value) error = "Class name must be chosen";
        break;
      case "failedCourse":
        if (!value) error = "Choose if you have failed any course";
        break;
      case "financeDue":
        if (!value) error = "Choose if you have any finance due";
        break;
      case "experience":
        if (!value || value.length < 50)
          error = "You have written less than 50 characters";
        else if (value.length > 150)
          error =
            "You have written more than 150 characters. Please limit your campaign plan to 150 characters.";
        break;
      case "campaignPlan":
        if (!value || value.length < 50)
          error = "You have written less than 50 characters";
        else if (value.length > 150)
          error =
            "You have written more than 150 characters. Please limit your campaign plan to 150 characters.";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const Validate = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (errors[key]) newErrors[key] = errors[key];
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!Validate()) {
      return;
    }

    setIsLoading(true);

    // Send the form data to the server
    try {
      const response = await axios.post(
        "https://jutsa-management-system.vercel.app/api/candidates/",
        formData
      );
      toast.success(response.data.message);
      setIsSubmitted(true);
      setFormData({
        studentID: "",
        name: "",
        number: "",
        email: "",
        gpa: "",
        department: "",
        semester: "",
        className: "",
        failedCourse: "",
        financeDue: "",
        experience: "",
        campaignPlan: "",
      });
    } catch (error) {
      // toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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
        setIsLoading(false);
      }
    };

    fetchFormVisibility();
  }, [formName]);

  if (isLoading) {
    return <Spinner size="large" className="border border-blue-700" />;
  }

  if (showForm === false) {
    return (
      <>
        <div className="mt-6 p-4 bg-red-100 text-red-600 text-center rounded-lg">
          <p className="font-semibold">The form is now closed.</p>
          <p className="text-sm">Submission is no longer available.</p>
        </div>
      </>
    );
  }

  return (
    <main className="w-full rounded-lg mx-auto text-black p-8">
      {isSubmitted ? (
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-700">
            Registration Successfully!
          </h2>
          <p className="text-gray-700 mt-2">
            Thank you for submitting your application. We will review it and get
            back to you soon.
          </p>
          <button
            className="mt-4 bg-customBlue text-white px-4 py-2 rounded-md"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <>
          <h1 className="my-4 text-3xl font-bold tracking-tight text-customBlue">
            President Candidate Application
          </h1>
          <p className="mb-4 text-gray-700">
            Fill out this form to apply as a candidate for the association
            president position.
          </p>
          <CandidateContent />
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="studentID"
                >
                  Student ID
                </label>
                <input
                  className="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="studentID"
                  placeholder="C1200000"
                  type="text"
                  name="studentID"
                  value={formData.studentID}
                  onChange={HandleChange}
                />
                {errors.studentID ? (
                  <p className="text-red-500 text-xs">{errors.studentID}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Enter your student ID.
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={HandleChange}
                />
                {errors.name ? (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                ) : (
                  <p class="text-gray-500 text-xs py-1">
                    Enter your full name as it appears on official documents.
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="number"
                >
                  Number
                </label>
                <input
                  className="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="number"
                  placeholder="615555555"
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={HandleChange}
                />
                {errors.number ? (
                  <p className="text-red-500 text-xs">{errors.number}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-2">
                    Enter your phone number in the format 615555555
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="rounded-md border placeholder:text-gray-600 border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="email"
                  placeholder="johndoe@gmail.com"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={HandleChange}
                />
                {errors.email ? (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Enter your email address to receive updates.
                  </p>
                )}
              </div>
            </div>
            {/* 2 */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="department"
                >
                  Department
                </label>
                <select
                  className="rounded-md border p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={HandleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Application">
                    Computer Application
                  </option>
                  <option value="Networking">
                    Networking and Cyber Security
                  </option>
                  <option value="Multimedia">
                    Multimedia and Animation Technology
                  </option>
                </select>
                {errors.department ? (
                  <p className="text-red-500 text-xs">{errors.department}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Select your department from the list.
                  </p>
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
                  className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={HandleChange}
                >
                  <option value="">Semester</option>
                  <option value="2">Semester 2</option>
                  <option value="4">Semester 4</option>
                  <option value="6">Semester 6</option>
                </select>
                {errors.semester ? (
                  <p className="text-red-500 text-xs">{errors.semester}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Select the semester you are currently in.
                  </p>
                )}
              </div>
            </div>
            {/* shsh */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="className"
                >
                  Class Name
                </label>
                <input
                  className="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="className"
                  placeholder="CA000"
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={HandleChange}
                />
                {errors.className ? (
                  <p className="text-red-500 text-xs">{errors.className}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Enter your class name
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="gpa"
                >
                  GPA
                </label>
                <input
                  className="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="gpa"
                  placeholder="3.0"
                  type="text"
                  name="gpa"
                  value={formData.gpa}
                  onChange={HandleChange}
                />
                {errors.gpa ? (
                  <p className="text-red-500 text-xs">{errors.gpa}</p>
                ) : (
                  <p className="text-red-500 text-xs">{errors.gpa}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="failedCourse"
                >
                  Have you failed any course before?{" "}
                </label>
                <select
                  className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="failedCourse"
                  name="failedCourse"
                  value={formData.failedCourse}
                  onChange={HandleChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.failedCourse ? (
                  <p className="text-red-500 text-xs">{errors.failedCourse}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Have you failed any course before?
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-1 text-sm font-medium text-gray-700"
                  htmlFor="financeDue"
                >
                  No Finance Due
                </label>
                <select
                  className="rounded-md border border-gray-300 p-2 text-sm text-black focus:border-primary focus:ring-primary"
                  id="financeDue"
                  name="financeDue"
                  value={formData.financeDue}
                  onChange={HandleChange}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.financeDue ? (
                  <p className="text-red-500 text-xs">{errors.financeDue}</p>
                ) : (
                  <p className="text-gray-500 text-xs py-1">
                    Have you paid all your fees?
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="experience"
              >
                Previous Leadership Experience
              </label>
              <textarea
                className="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="experience"
                rows={5}
                cols={50}
                placeholder="Describe your your previous Leadership roles and experience"
                name="experience"
                value={formData.experience}
                // minLength={50}
                // maxLength={150}
                onChange={HandleChange}
              />
              {errors.experience ? (
                <p className="text-red-500 text-xs">{errors.experience}</p>
              ) : (
                <p className="text-gray-500 text-xs py-1">
                  Write your experience
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="mb-1 text-sm font-medium text-gray-700"
                htmlFor="campaignPlan"
              >
                Campaign Plan
              </label>
              <textarea
                className="rounded-md border border-gray-300  p-2 text-sm text-black focus:border-primary focus:ring-primary"
                id="campaignPlan"
                rows={7}
                cols={50}
                placeholder="Enter your campaignPlan"
                name="campaignPlan"
                value={formData.campaignPlan}
                onChange={HandleChange}
              />
              {errors.campaignPlan ? (
                <p className="text-red-500 text-xs">{errors.campaignPlan}</p>
              ) : (
                <p className="text-gray-500 py-1 text-xs">
                  Enter your campaign plan if you are elected.
                </p>
              )}
            </div>
            <button
              className="w-full rounded-md bg-customBlue px-4 text-sm font-medium text-white py-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Register"}
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default CandidateForm;
