import React from "react";
import { useState } from "react";
import AuthButton from "../../components/auth-button";
import FormInput from "../../components/form-input";
import AdminApi from "../../api/admin/AdminApi";
import { useNavigate } from "react-router-dom";

function RegisterAdmin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await AdminApi.post("/register", {
      name: user.name,
      email: user.email,
      password: user.password,
    })
      .then((response) => {
        if (response.data.status === "success") {
          navigate("/admin/login");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
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
            Create Admin Account
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
          <AuthButton label="sign up" onClick={handleRegister} />
        </form>
        <div className="flex items-center justify-center gap-2">
          <p>already have an account ? </p>
          <a href="/" className="text-blue-500 hover:underline">
            sign in as admin
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterAdmin;
