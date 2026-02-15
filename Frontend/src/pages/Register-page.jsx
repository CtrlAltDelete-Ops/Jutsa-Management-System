import React from "react";
import RegisterForm from "../components/Register-form";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  return (
    <div>
      <Helmet>
        <title>Register - jutsa</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
