import React, { useState, useRef } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { toast } from "sonner"; // Import toast for notifications
import emailjs from "@emailjs/browser"; // Import emailjs to send emails

const ContactForm = () => {
  // State to manage form data and loading status
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // Define loading state
  const form = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData({
      ...contactData,
      [name]: value,
    });
  };

  const Validate = () => {
    const errors = {};

    if (!contactData.name) errors.name = "Name is required ";
    if (!contactData.email) errors.email = "Email is required ";
    if (!contactData.subject) errors.subject = "Subject is required";
    if (!contactData.message) errors.message = "Message is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!Validate()) return;

    setLoading(true);

    try {
      if (form.current) {
        emailjs
          .sendForm(
            "service_gi9q6i4", // Replace with your service ID
            "template_zl3sn78", // Replace with your template ID
            form.current,
            "xqsQ_LZhrZvC4f6Gf" // Replace with your user ID
          )
          .then(
            () => {
              toast.success("Email sent successfully");
              setLoading(false);
            },
            (error) => {
              toast.error("Failed to send message");
              setLoading(false);
            }
          );
        setContactData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (e) {
      toast.error("Failed to send message");
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="space-y-7" ref={form} onSubmit={sendEmail}>
        <div className="flex flex-col space-y-2">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary focus:outline-customGreen"
            id="name"
            placeholder="Enter your name"
            type="text"
            name="name"
            value={contactData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col space-y-2">
            <label
              className="mb-1 text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary focus:outline-customGreen"
              id="email"
              placeholder="@example.jutsa.com"
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <label
              className="mb-1 text-sm font-medium text-gray-700"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary focus:outline-customGreen"
              id="subject"
              placeholder="E.g (Support, Feedback, etc.)"
              type="text"
              name="subject"
              value={contactData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            className="mb-1 text-sm font-medium text-gray-700"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="rounded-md border border-gray-300  p-3 text-sm text-black focus:border-primary focus:ring-primary resize-none focus:outline-customGreen"
            id="message"
            placeholder="e.g. I want a seminar about tech"
            name="message"
            rows="6"
            value={contactData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <button
          className="w-full rounded-md bg-black px-4 text-sm font-medium text-white py-3"
          type="submit"
          disabled={loading} // Disable button while submitting
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="flex justify-between pt-10 border-t border-gray-200">
        <p className="text-gray-600 mb-4">Connect with us on social media:</p>
        <div className="flex space-x-4">
          <a href="#" className="text-customBlue-600 hover:text-customGreen">
            <FaFacebook className="w-6 h-6" />
          </a>
          <a href="#" className="text-customBlue-600 hover:text-customGreen">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="#" className="text-customBlue-600 hover:text-customGreen">
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
