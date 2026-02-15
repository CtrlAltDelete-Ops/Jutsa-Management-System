import React from "react";
import ContactContent from "../components/jutsa-components/ContactContent";
import ContactForm from "../components/jutsa-components/ContactForm";

const Contact = () => {
  return (
    <main className="h-full max-w-5xl mx-auto px-4 py-32 space-y-5">
      <ContactContent />
      <ContactForm />
    </main>
  );
};

export default Contact;
