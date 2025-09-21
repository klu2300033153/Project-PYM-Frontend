import React from "react";
import Header from "../components/Header";
import LoginPageComponent from "../components/LoginPageComponent";
import "../styles/login.css";

const Login = () => {
  return (
    <div id="login">
      <Header />
      <LoginPageComponent />
    </div>
  );
};

export default Login;
