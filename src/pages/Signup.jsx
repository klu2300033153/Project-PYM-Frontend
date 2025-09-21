import React from "react";
import Header from "./../components/Header";
import SignupPageComponent from "../components/SignupPageComponent";
import "./../styles/signup.css";

const Signup = () => {
  return (
    <div id="signup">
      <Header />
      <SignupPageComponent />
    </div>
  );
};

export default Signup;
