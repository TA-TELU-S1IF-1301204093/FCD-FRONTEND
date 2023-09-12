import React from "react";
import { useState, useEffect } from "react";
import AuthButton from "../components/auth-button";
import FormInput from "../components/form-input";
import authApi from "../api/auth-api";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = new useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const signupClick = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await authApi
      .post("/signin", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        console.clear();
      });

    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-screen h-screen bg-mainWhite flex">
      {/* left side */}
      <div className="bg-mainWhite w-[60%] h-full flex items-center justify-center px-20">
        <form className="flex flex-col gap-10">
          <h1 className="text-center text-mainGreen font-bold text-4xl">
            Sign In to MNote
          </h1>
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
          <AuthButton label="sign in" onClick={handleLogin} />
        </form>
      </div>
      {/* right side */}
      <div className="bg-mainGreen w-[40%] h-full flex items-center justify-center px-20">
        <div className="flex flex-col gap-10">
          <h1 className="text-center text-mainWhite font-bold text-4xl">
            Hello, User!
          </h1>
          <p className="text-center text-mainWhite font-light text-lg">
            Enter your personal detail and start storing your orders
          </p>
          <button
            onClick={signupClick}
            className="bg-transparent border border-mainWhite w-[60%] mx-auto px-3 py-2 rounded-lg text-mainWhite uppercase font-medium transition-all duration-300 hover:scale-105"
          >
            sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
