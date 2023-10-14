import React from "react";
import { useState, useEffect } from "react";
import AuthButton from "../components/auth-button";
import FormInput from "../components/form-input";
import authApi from "../api/auth-api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = new useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signinClick = () => {
    navigate("/");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await authApi
      .post("/signup", {
        name: user.name,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          alert("Registration completed. Please signin");
          navigate("/");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert("an error occured, please try again");
        console.log(error);
        console.clear();
      });

    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-screen h-screen bg-mainWhite flex">
      {/* left side */}
      <div className="bg-mainGreen w-[40%] h-full flex items-center justify-center px-20">
        <div className="flex flex-col gap-10">
          <h1 className="text-center text-mainWhite font-bold text-4xl">
            Welcome Back!
          </h1>
          <p className="text-center text-mainWhite font-light text-lg">
            To keep storing your orders <br /> please signin to your account
          </p>
          <button
            onClick={signinClick}
            className="bg-transparent border border-mainWhite w-[60%] mx-auto px-3 py-2 rounded-lg text-mainWhite uppercase font-medium transition-all duration-300 hover:scale-105"
          >
            sign in
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="bg-mainWhite w-[60%] h-full flex items-center justify-center px-20">
        <form className="flex flex-col gap-10 w-[500px]">
          <h1 className="text-center text-mainGreen font-bold text-4xl">
            Create Account
          </h1>
          <FormInput
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            autoComplete="off"
          />
          <FormInput
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            autoComplete="off"
          />
          <AuthButton label="sign up" onClick={handleSignup} />
        </form>
      </div>
    </div>
  );
}

export default Signup;
