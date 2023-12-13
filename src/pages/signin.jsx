import React from "react";
import { useState } from "react";
import AuthButton from "../components/auth-button";
import FormInput from "../components/form-input";
import authApi from "../api/auth-api";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
    <div className="w-screen h-screen bg-mainWhite flex items-center justify-center">
      <div className="bg-mainWhite w-[60%] h-full flex flex-col items-center justify-center px-20">
        <form className="flex flex-col gap-10 w-[500px]">
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
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-2">
            <p>don't have an account ? </p>
            <a href="/signup" className="text-blue-500 hover:underline">
              sign up
            </a>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p>are you the owner ? </p>
            <a href="/admin/login" className="text-blue-500 hover:underline">
              sign in as admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
