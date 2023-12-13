import React from "react";
import { useState } from "react";
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
    <div className="w-screen h-screen bg-mainWhite flex flex-col items-center justify-center">
      <div className="bg-mainWhite w-[60%] h-full flex flex-col items-center justify-center px-20">
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
        <div className="flex items-center justify-center gap-2">
          <p>already have an account ? </p>
          <a href="/" className="text-blue-500 hover:underline">
            sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
